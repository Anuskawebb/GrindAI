"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { CalendarCheck, Gauge, Lightbulb, NotebookPen, Settings } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { supabase } from "@/lib/supabase-client"
import { cn } from "@/lib/utils"
import {
  SidebarAnimated,
  SidebarBody,
  SidebarLink,
} from "@/components/ui/sidebar-animated"

export function AppSidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [userName, setUserName] = useState<string>("User")

  useEffect(() => {
    async function fetchUser() {
      const {
        data: { user: currentUser },
      } = await supabase.auth.getUser()
      if (currentUser) {
        setUser(currentUser)
        // Try to get username from profile
        const { data: profile } = await supabase
          .from("profiles")
          .select("username")
          .eq("id", currentUser.id)
          .single()
        if (profile?.username) {
          setUserName(profile.username)
        } else if (currentUser.email) {
          setUserName(currentUser.email.split("@")[0])
        }
      }
    }
    fetchUser()
  }, [])

  const menuItems = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <Gauge className="h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Tasks",
      href: "/dashboard/tasks",
      icon: <CalendarCheck className="h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Notes",
      href: "/dashboard/notes",
      icon: <NotebookPen className="h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "AI Chat",
      href: "/dashboard/ai",
      icon: <Lightbulb className="h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Settings",
      href: "/dashboard/settings",
      icon: <Settings className="h-5 w-5 flex-shrink-0" />,
    },
  ]

  return (
    <SidebarAnimated open={open} setOpen={setOpen}>
      <SidebarBody className="justify-between gap-10">
        <div className="flex flex-col flex-1 overflow-y-auto min-w-0" style={{ overflowX: 'visible' }}>
          {open ? <Logo /> : <LogoIcon />}
          <div className="mt-8 flex flex-col gap-2">
            {menuItems.map((link, idx) => (
              <SidebarLink
                key={idx}
                link={link}
                className={cn(
                  pathname === link.href && "bg-gray-100"
                )}
                isActive={pathname === link.href}
              />
            ))}
          </div>
        </div>
        <div className="flex-shrink-0">
          <SidebarLink
            link={{
              label: userName,
              href: "/dashboard/settings",
              icon: (
                <div className="h-7 w-7 flex-shrink-0 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs font-semibold">
                  {userName.charAt(0).toUpperCase()}
                </div>
              ),
            }}
            isActive={pathname === "/dashboard/settings"}
          />
        </div>
      </SidebarBody>
    </SidebarAnimated>
  )
}

export const Logo = () => {
  return (
    <Link
      href="/dashboard"
      className="font-normal flex space-x-2 items-center text-sm text-gray-900 py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-gray-900 rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-semibold text-gray-900 whitespace-pre"
      >
        GrindGrid
      </motion.span>
    </Link>
  )
}

export const LogoIcon = () => {
  return (
    <Link
      href="/dashboard"
      className="font-normal flex space-x-2 items-center text-sm text-gray-900 py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-gray-900 rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  )
}
