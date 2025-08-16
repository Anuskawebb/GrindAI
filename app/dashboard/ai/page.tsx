"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { supabase } from "@/lib/supabase-client"
import type { Tables } from "@/types/supabase"

type Conversation = Tables<"conversations">

export default function AIHubPage() {
  const [chatHistory, setChatHistory] = useState<Conversation[]>([])
  const [currentInput, setCurrentInput] = useState("")
  const [loadingChat, setLoadingChat] = useState(false)
  const [quizTopic, setQuizTopic] = useState("")
  const [generatedQuiz, setGeneratedQuiz] = useState<string | null>(null)
  const [loadingQuiz, setLoadingQuiz] = useState(false)
  const [learningSuggestion, setLearningSuggestion] = useState<string | null>(null)
  const [loadingSuggestion, setLoadingSuggestion] = useState(false)

  const chatContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchConversations = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (user) {
        const { data, error } = await supabase
          .from("conversations")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: true })

        if (error) {
          console.error("Error fetching conversations:", error)
        } else {
          setChatHistory(data || [])
        }
      }
    }
    fetchConversations()
  }, [])

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [chatHistory])

  const handleSendMessage = async () => {
    if (!currentInput.trim()) return

    const userMessage: Conversation = {
      id: crypto.randomUUID(), // Client-side ID for immediate display
      user_id: "", // Will be filled by API route
      question: currentInput,
      response: "", // AI response will fill this
      created_at: new Date().toISOString(),
    }

    setChatHistory((prev) => [...prev, userMessage])
    setCurrentInput("")
    setLoadingChat(true)

    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: userMessage.question }),
      })

      let errorMessage = "Failed to get response from AI."

      if (!response.ok) {
        try {
          const errorData = await response.json()
          errorMessage = errorData.error || `HTTP ${response.status}: ${response.statusText}`
        } catch (jsonError) {
          // If JSON parsing fails, use the response status
          errorMessage = `HTTP ${response.status}: ${response.statusText}`
        }
        throw new Error(errorMessage)
      }

      const data = await response.json()
      const aiResponse = data.response

      if (!aiResponse) {
        throw new Error("No response received from AI service.")
      }

      setChatHistory((prev) => prev.map((msg) => (msg.id === userMessage.id ? { ...msg, response: aiResponse } : msg)))
    } catch (error: any) {
      console.error("Error sending message to AI:", error)
      setChatHistory((prev) =>
        prev.map((msg) => (msg.id === userMessage.id ? { ...msg, response: `Error: ${error.message}` } : msg)),
      )
    } finally {
      setLoadingChat(false)
    }
  }

  const handleGenerateQuiz = async () => {
    if (!quizTopic.trim()) return
    setLoadingQuiz(true)
    setGeneratedQuiz(null)

    try {
      const prompt = `Generate a multiple-choice quiz with 3-5 questions about "${quizTopic}". For each question, provide 4 options (A, B, C, D) and indicate the correct answer. Format it clearly with question numbers and options.`
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to generate quiz.")
      }

      const data = await response.json()
      setGeneratedQuiz(data.response)
    } catch (error: any) {
      console.error("Error generating quiz:", error)
      setGeneratedQuiz(`Error generating quiz: ${error.message}`)
    } finally {
      setLoadingQuiz(false)
    }
  }

  const handleGetLearningSuggestions = async () => {
    setLoadingSuggestion(true)
    setLearningSuggestion(null)

    try {
      // In a real app, you'd fetch user's actual progress data here
      const dummyProgress = "Web Development: 75%, Data Science: 40%, AI Fundamentals: 20%"
      const prompt = `Based on my current progress in skills like ${dummyProgress}, what should I learn today to maximize my growth? Provide a concise suggestion.`
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to get suggestions.")
      }

      const data = await response.json()
      setLearningSuggestion(data.response)
    } catch (error: any) {
      console.error("Error getting learning suggestions:", error)
      setLearningSuggestion(`Error getting suggestions: ${error.message}`)
    } finally {
      setLoadingSuggestion(false)
    }
  }

  return (
    <div className="grid gap-6">
      <h1 className="text-3xl font-bold text-grindgrid-text-primary">AI Hub</h1>

      <Card className="bg-grindgrid-card shadow-neumorphic rounded-lg">
        <CardHeader>
          <CardTitle>AI Chat Assistant (Gemini)</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            ref={chatContainerRef}
            className="h-64 border border-grindgrid-shadow-dark rounded-lg p-4 overflow-y-auto bg-grindgrid-bg shadow-neumorphic-inset flex flex-col space-y-2"
          >
            {chatHistory.length === 0 && !loadingChat && (
              <p className="text-grindgrid-text-secondary text-center italic">Start a conversation with Gemini!</p>
            )}
            {chatHistory.map((msg, index) => (
              <div key={msg.id || index} className={`flex ${msg.response ? "justify-start" : "justify-end"}`}>
                {msg.response ? (
                  <div className="bg-grindgrid-accent/10 text-grindgrid-text-primary p-3 rounded-lg max-w-[80%] self-start">
                    <p className="font-semibold">AI:</p>
                    <p>{msg.response}</p>
                  </div>
                ) : (
                  <div className="bg-grindgrid-accent text-white p-3 rounded-lg max-w-[80%] self-end">
                    <p className="font-semibold">You:</p>
                    <p>{msg.question}</p>
                  </div>
                )}
              </div>
            ))}
            {loadingChat && (
              <div className="flex justify-start">
                <div className="bg-grindgrid-accent/10 text-grindgrid-text-primary p-3 rounded-lg max-w-[80%] self-start">
                  <p className="font-semibold">AI:</p>
                  <p>Typing...</p>
                </div>
              </div>
            )}
          </div>
          <div className="flex gap-2 mt-4">
            <Input
              placeholder="Ask Gemini anything..."
              className="flex-1 bg-grindgrid-bg shadow-neumorphic-inset"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter" && !loadingChat) {
                  handleSendMessage()
                }
              }}
              disabled={loadingChat}
            />
            <Button
              onClick={handleSendMessage}
              className="bg-grindgrid-accent text-white shadow-neumorphic-sm hover:bg-grindgrid-accent/90"
              disabled={loadingChat}
            >
              Send
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-grindgrid-card shadow-neumorphic rounded-lg">
          <CardHeader>
            <CardTitle>Generate Quiz</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              placeholder="Enter quiz topic (e.g., 'React Hooks')"
              className="mb-4 bg-grindgrid-bg shadow-neumorphic-inset"
              value={quizTopic}
              onChange={(e) => setQuizTopic(e.target.value)}
              disabled={loadingQuiz}
            />
            <Button
              onClick={handleGenerateQuiz}
              className="w-full bg-grindgrid-accent text-white shadow-neumorphic-sm hover:bg-grindgrid-accent/90"
              disabled={loadingQuiz}
            >
              {loadingQuiz ? "Generating..." : "Generate MCQ Quiz"}
            </Button>
            <div className="mt-4 p-4 border border-grindgrid-shadow-dark rounded-lg bg-grindgrid-bg shadow-neumorphic-inset min-h-[100px] overflow-y-auto">
              {generatedQuiz ? (
                <p className="text-grindgrid-text-primary whitespace-pre-wrap">{generatedQuiz}</p>
              ) : (
                <p className="text-grindgrid-text-secondary">Quiz questions will appear here...</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-grindgrid-card shadow-neumorphic rounded-lg">
          <CardHeader>
            <CardTitle>Learning Suggestions</CardTitle>
          </CardHeader>
          <CardContent>
            <Button
              onClick={handleGetLearningSuggestions}
              className="w-full bg-grindgrid-accent text-white shadow-neumorphic-sm hover:bg-grindgrid-accent/90"
              disabled={loadingSuggestion}
            >
              {loadingSuggestion ? "Getting Suggestions..." : "Get Suggestions"}
            </Button>
            <div className="mt-4 p-4 border border-grindgrid-shadow-dark rounded-lg bg-grindgrid-bg shadow-neumorphic-inset min-h-[100px] overflow-y-auto">
              {learningSuggestion ? (
                <p className="text-grindgrid-text-primary whitespace-pre-wrap">{learningSuggestion}</p>
              ) : (
                <p className="text-grindgrid-text-secondary">
                  Ask Gemini "Based on my progress, what should I learn today?" and display answer
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
