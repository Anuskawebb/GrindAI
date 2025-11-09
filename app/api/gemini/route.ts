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
    } = await (await supabase).auth.getUser()

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

    // First, get available models to find one that works
    let availableModels: string[] = []
    try {
      const modelsResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models?key=${geminiApiKey}`,
      )
      if (modelsResponse.ok) {
        const modelsData = await modelsResponse.json()
        availableModels = (modelsData.models || [])
          .filter((m: any) => {
            const name = m.name || ""
            const supportedMethods = m.supportedGenerationMethods || []
            return name.includes("gemini") && supportedMethods.includes("generateContent")
          })
          .map((m: any) => m.name)
        console.log("Available models with generateContent:", availableModels)
      } else {
        console.log("Failed to fetch models list:", modelsResponse.status, await modelsResponse.text())
      }
    } catch (e) {
      console.log("Could not fetch available models list:", e)
    }

    // Try models in order: use available models first, then fallback to common names
    const modelNamesToTry = availableModels.length > 0 
      ? availableModels.map(name => name.replace("models/", ""))
      : [
          "gemini-1.5-flash",
          "gemini-1.5-pro",
          "gemini-pro",
          "gemini-1.0-pro",
        ]

    let text: string | null = null
    let lastError: Error | null = null

    // Use Google Generative AI REST API directly
    for (const modelName of modelNamesToTry) {
      try {
        console.log(`Trying model: ${modelName}`)
        
        const apiResponse = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${geminiApiKey}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: prompt,
                    },
                  ],
                },
              ],
              generationConfig: {
                maxOutputTokens: 1000,
                temperature: 0.7,
              },
            }),
          },
        )

        if (!apiResponse.ok) {
          const errorData = await apiResponse.json().catch(() => ({}))
          throw new Error(
            `API returned ${apiResponse.status}: ${JSON.stringify(errorData)}`,
          )
        }

        const data = await apiResponse.json()
        
        if (data.candidates && data.candidates[0] && data.candidates[0].content) {
          text = data.candidates[0].content.parts[0].text
          console.log(`Successfully used model: ${modelName}`)
          break
        } else {
          throw new Error("Invalid response format from API")
        }
      } catch (error: any) {
        console.log(`Model ${modelName} failed:`, error.message)
        lastError = error
        continue
      }
    }

    if (!text) {
      const errorMsg = lastError 
        ? `All model attempts failed. Last error: ${lastError.message}` 
        : "All model attempts failed"
      throw new Error(errorMsg)
    }

    // Save conversation to Supabase
    const { error: dbError } = await (await supabase).from("conversations").insert({
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
