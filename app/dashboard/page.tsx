"use client"

import { supabase } from "@/lib/supabase-client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import DivergingProgressCard from "@/components/ui/stacked-diverging-bar"

export default function DashboardPage() {
  const [totalProgress, setTotalProgress] = useState(0)
  const [skillCount, setSkillCount] = useState(0)
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

      }
      setLoading(false)
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="grid gap-6 w-full">
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid gap-6 w-full">
      {/* Progress Tracking Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <DivergingProgressCard title="Progress Tracking" totalProgress={totalProgress} />
      </motion.div>

    </div>
  )
}
