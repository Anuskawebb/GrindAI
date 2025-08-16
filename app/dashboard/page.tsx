"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Copy, User2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { supabase } from "@/lib/supabase-client"
import type { Tables } from "@/types/supabase"
import dynamic from "next/dynamic"
import { useState, useEffect } from "react"

// Dynamically import Recharts components to avoid SSR issues
const AreaChart = dynamic(() => import("recharts").then((mod) => ({ default: mod.AreaChart })), { ssr: false })
const Area = dynamic(() => import("recharts").then((mod) => ({ default: mod.Area })), { ssr: false })
const XAxis = dynamic(() => import("recharts").then((mod) => ({ default: mod.XAxis })), { ssr: false })
const YAxis = dynamic(() => import("recharts").then((mod) => ({ default: mod.YAxis })), { ssr: false })
const CartesianGrid = dynamic(() => import("recharts").then((mod) => ({ default: mod.CartesianGrid })), { ssr: false })
const Tooltip = dynamic(() => import("recharts").then((mod) => ({ default: mod.Tooltip })), { ssr: false })
const ResponsiveContainer = dynamic(() => import("recharts").then((mod) => ({ default: mod.ResponsiveContainer })), {
  ssr: false,
})

// Adjusted dummy data for the Progress Tracking chart
const progressTrendData = [
  { name: "Jan", value: 10, line2: 15, line3: 20 },
  { name: "Feb", value: 25, line2: 30, line3: 35 },
  { name: "Mar", value: 15, line2: 22, line3: 28 },
  { name: "Apr", value: 40, line2: 45, line3: 50 },
  { name: "May", value: 20, line2: 28, line3: 35 },
  { name: "Jun", value: 120, line2: 130, line3: 140 },
  { name: "Jul", value: 80, line2: 90, line3: 100 },
  { name: "Aug", value: 100, line2: 110, line3: 120 },
  { name: "Sep", value: 90, line2: 100, line3: 110 },
]

export default function DashboardPage() {
  const [totalProgress, setTotalProgress] = useState(0)
  const [skillCount, setSkillCount] = useState(0)
  const [recentNotes, setRecentNotes] = useState<Tables<"notes">[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        // Fetch skills to calculate overall progress
        const { data: skills, error: skillsError } = await supabase
          .from("skills")
          .select("progress_percentage")
          .eq("user_id", user.id)

        if (skillsError) {
          console.error("Error fetching skills for progress:", skillsError)
        } else {
          const count = skills.length
          setSkillCount(count)
          if (count > 0) {
            const progress = skills.reduce((sum, skill) => sum + (skill.progress_percentage || 0), 0) / count
            setTotalProgress(progress)
          }
        }

        // Fetch recent notes
        const { data: notesData, error: notesError } = await supabase
          .from("notes")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(3)

        if (notesError) {
          console.error("Error fetching notes:", notesError)
        } else {
          setRecentNotes(notesData || [])
        }
      }
      setLoading(false)
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="grid gap-6">
        <div className="flex items-center justify-center h-64">
          <p className="text-grindgrid-text-secondary">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid gap-6 w-full">
      {/* Progress Tracking Section */}
      <Card className="bg-grindgrid-card shadow-neumorphic rounded-lg p-6 w-full">
        <CardHeader className="p-0 pb-4">
          <CardTitle className="text-2xl font-bold text-grindgrid-text-primary">Progress Tracking</CardTitle>
        </CardHeader>
        <CardContent className="p-0 flex flex-col lg:flex-row items-center gap-8">
          <div className="w-full lg:w-3/4 h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={progressTrendData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--grindgrid-shadow-dark))" />
                <XAxis dataKey="name" stroke="hsl(var(--grindgrid-text-secondary))" />
                <YAxis stroke="hsl(var(--grindgrid-text-secondary))" domain={[0, 200]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--grindgrid-card))",
                    border: "1px solid hsl(var(--grindgrid-shadow-dark))",
                    borderRadius: "0.5rem",
                  }}
                />
                <defs>
                  <linearGradient id="colorArea1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(217.2 91.2% 59.8%)" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="hsl(217.2 91.2% 59.8%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorArea2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(217.2 91.2% 59.8% / 0.7)" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="hsl(217.2 91.2% 59.8% / 0.7)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorArea3" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(217.2 91.2% 59.8% / 0.4)" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="hsl(217.2 91.2% 59.8% / 0.4)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(217.2 91.2% 59.8%)"
                  fill="url(#colorArea1)"
                  strokeWidth={2}
                  dot={{ r: 0 }}
                  activeDot={{ r: 6 }}
                />
                <Area
                  type="monotone"
                  dataKey="line2"
                  stroke="hsl(217.2 91.2% 59.8% / 0.7)"
                  fill="url(#colorArea2)"
                  strokeWidth={2}
                  dot={{ r: 0 }}
                  activeDot={{ r: 6 }}
                />
                <Area
                  type="monotone"
                  dataKey="line3"
                  stroke="hsl(217.2 91.2% 59.8% / 0.4)"
                  fill="url(#colorArea3)"
                  strokeWidth={2}
                  dot={{ r: 0 }}
                  activeDot={{ r: 6 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="w-full lg:w-1/4 flex flex-col items-center justify-center">
            <div
              className="relative h-32 w-32 rounded-full flex items-center justify-center text-grindgrid-text-primary font-bold text-3xl"
              style={{
                background: `conic-gradient(hsl(217.2 91.2% 59.8%) ${totalProgress}%, hsl(220 13% 85%) 0%)`,
              }}
            >
              <div className="absolute inset-[10px] bg-grindgrid-card rounded-full flex items-center justify-center shadow-neumorphic-inset">
                {Math.round(totalProgress)}%
              </div>
            </div>
            <p className="text-sm text-grindgrid-text-secondary mt-4">Overall Progress</p>
          </div>
        </CardContent>
      </Card>

      {/* Recent Notes and AI Chat Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        {/* Recent Notes Card */}
        <Card className="bg-grindgrid-card shadow-neumorphic rounded-lg p-6 w-full lg:w-auto">
          <CardHeader className="p-0 pb-4">
            <CardTitle className="text-2xl font-bold text-grindgrid-text-primary">Recent Notes</CardTitle>
          </CardHeader>
          <CardContent className="p-0 space-y-4">
            {recentNotes.length > 0 ? (
              recentNotes.map((note) => (
                <div
                  key={note.id}
                  className="flex items-center justify-between p-3 rounded-md bg-grindgrid-bg shadow-neumorphic-inset"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="h-6 w-6 text-grindgrid-accent" />
                    <div>
                      <h3 className="font-semibold text-grindgrid-text-primary">
                        {note.content.split("\n")[0].substring(0, 30)}
                        {note.content.split("\n")[0].length > 30 ? "..." : ""}
                      </h3>
                      <p className="text-sm text-grindgrid-text-secondary truncate">
                        {note.content.split("\n").slice(1).join(" ").substring(0, 50)}
                        {note.content.split("\n").slice(1).join(" ").length > 50
                          ? "..."
                          : "No additional content"}
                      </p>
                    </div>
                  </div>
                  <Copy className="h-5 w-5 text-grindgrid-text-secondary cursor-pointer hover:text-grindgrid-accent" />
                </div>
              ))
            ) : (
              <p className="text-grindgrid-text-secondary text-center">No recent notes. Start writing!</p>
            )}
          </CardContent>
        </Card>

        {/* AI Chat Card */}
        <Card className="bg-grindgrid-card shadow-neumorphic rounded-lg p-6 w-full lg:w-auto">
          <CardHeader className="p-0 pb-4">
            <CardTitle className="text-2xl font-bold text-grindgrid-text-primary">AI Chat</CardTitle>
          </CardHeader>
          <CardContent className="p-0 space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src="/placeholder.svg?height=48&width=48" alt="AI Assistant" />
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-grindgrid-text-primary">AI Assistant</h3>
                <p className="text-sm text-grindgrid-text-secondary">Ready to help</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-md bg-grindgrid-bg shadow-neumorphic-inset">
              <User2 className="h-5 w-5 text-grindgrid-text-secondary" />
              <span className="text-grindgrid-text-secondary">Start a conversation</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
