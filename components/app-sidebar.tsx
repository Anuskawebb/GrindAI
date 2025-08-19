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
    <Sidebar className="bg-grindgrid-bg text-grindgrid-text-primary border-r border-grindgrid-shadow-dark">
      <SidebarHeader>
        <Link href="/" className="flex items-center gap-2 font-semibold text-grindgrid-text-primary">
          <Image src="/placeholder.svg?height=24&width=24" alt="GrindGrid Logo" width={24} height={24} />
          <span className="text-lg">GrindGrid</span>
        </Link>
        {/* Removed search input */}
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-grindgrid-text-secondary">Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={pathname === item.href}
                    className={cn(
                      "hover:bg-grindgrid-card hover:text-grindgrid-accent transition-colors",
                      pathname === item.href && "text-grindgrid-accent bg-grindgrid-card shadow-neumorphic-sm"
                    )}
                  >
                    <Link href={item.href} className="flex items-center gap-2">
                      <item.icon className={cn("h-4 w-4", pathname === item.href ? "text-grindgrid-accent" : "text-grindgrid-text-primary")} />
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

      <SidebarFooter className="border-t border-grindgrid-shadow-dark">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="text-grindgrid-text-primary hover:text-grindgrid-accent hover:bg-grindgrid-card transition-colors">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Username</span>
                  </div>
                  <div className="ml-auto flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-grindgrid-accent" />
                    <span className="text-xs text-grindgrid-text-secondary">Online</span>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-grindgrid-card shadow-neumorphic" align="start" side="top">
                <DropdownMenuItem className="text-grindgrid-text-primary hover:text-grindgrid-accent hover:bg-grindgrid-bg">
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-grindgrid-text-primary hover:text-grindgrid-accent hover:bg-grindgrid-bg">
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-grindgrid-text-primary hover:text-destructive hover:bg-grindgrid-bg">
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
