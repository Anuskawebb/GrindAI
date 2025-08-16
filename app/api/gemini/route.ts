import { generateText } from "ai"
import { google } from "@ai-sdk/google"
import { createSupabaseServerClient } from "@/lib/supabase-server"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json()

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    const supabase = createSupabaseServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check for API key in environment variables
    const geminiApiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY

    if (!geminiApiKey) {
      console.error(
        "Missing API key. Available env vars:",
        Object.keys(process.env).filter((key) => key.includes("GEMINI") || key.includes("GOOGLE")),
      )
      return NextResponse.json({ error: "Google Generative AI API key is not configured" }, { status: 500 })
    }

    console.log("Using API key:", geminiApiKey.substring(0, 10) + "...")

    // Generate text using Gemini - API key is automatically picked up from environment variables
    const { text } = await generateText({
      model: google("gemini-1.5-flash"),
      prompt: prompt,
      maxTokens: 1000,
    })

    // Save conversation to Supabase
    const { error: dbError } = await supabase.from("conversations").insert({
      user_id: user.id,
      question: prompt,
      response: text,
    })

    if (dbError) {
      console.error("Error saving conversation to Supabase:", dbError)
      // Continue to return AI response even if saving fails
    }

    return NextResponse.json({ response: text })
  } catch (error: any) {
    console.error("Error in Gemini API route:", error)

    // Handle specific API errors
    if (error.message?.includes("API key")) {
      return NextResponse.json(
        { error: "Invalid API key. Please check your Google Generative AI API key." },
        { status: 401 },
      )
    }

    if (error.message?.includes("quota")) {
      return NextResponse.json({ error: "API quota exceeded. Please try again later." }, { status: 429 })
    }

    return NextResponse.json(
      {
        error: `AI service error: ${error.message || "An unexpected error occurred"}`,
      },
      { status: 500 },
    )
  }
}
