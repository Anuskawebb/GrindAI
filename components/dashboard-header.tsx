"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b border-gray-200 bg-white px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 shadow-sm w-full text-gray-900">
      <SidebarTrigger className="sm:hidden text-gray-900 hover:text-blue-600" /> {/* Mobile sidebar toggle */}
    </header>
  )
}
