"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { CalendarCheck, Gauge, Lightbulb, NotebookPen } from 'lucide-react'
import { usePathname } from 'next/navigation' // Import usePathname for active link highlighting

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar"

export function AppSidebar() {
  const { isMobile } = useSidebar()
  const pathname = usePathname() // Get current path for active link

  const menuItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: Gauge,
    },
    {
      title: "Tasks",
      href: "/dashboard/tasks",
      icon: CalendarCheck,
    },
    {
      title: "Notes",
      href: "/dashboard/notes",
      icon: NotebookPen,
    },
    {
      title: "AI Chat",
      href: "/dashboard/ai",
      icon: Lightbulb,
    },
  ]

  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Image src="/placeholder.svg?height=24&width=24" alt="GrindGrid Logo" width={24} height={24} />
          <span className="text-lg">GrindGrid</span>
        </Link>
        {/* Removed search input */}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.href}>
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Removed Projects collapsible */}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  Username
                  <span className="ml-auto h-4 w-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width] bg-grindgrid-card shadow-neumorphic rounded-lg"
              >
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
