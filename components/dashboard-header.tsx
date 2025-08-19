"use client"

import { User2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b border-grindgrid-shadow-dark bg-grindgrid-card px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 shadow-neumorphic-sm w-full text-grindgrid-text-primary">
      <SidebarTrigger className="sm:hidden text-grindgrid-text-primary hover:text-grindgrid-accent" /> {/* Mobile sidebar toggle */}
      <div className="ml-auto flex items-center gap-2">
        <Avatar className="h-8 w-8 border border-grindgrid-accent/20">
          <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User Avatar" />
          <AvatarFallback className="bg-grindgrid-bg text-grindgrid-accent">JD</AvatarFallback>
        </Avatar>
        <Avatar className="h-8 w-8 border border-grindgrid-accent/20">
          <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User Avatar" />
          <AvatarFallback className="bg-grindgrid-bg text-grindgrid-accent">JD</AvatarFallback>
        </Avatar>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="secondary"
            size="icon"
            className="overflow-hidden rounded-full bg-grindgrid-bg text-grindgrid-accent hover:bg-grindgrid-accent hover:text-white shadow-neumorphic-sm"
          >
            <User2 className="h-5 w-5" />
            <span className="sr-only">User menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-grindgrid-card shadow-neumorphic rounded-lg">
          <DropdownMenuLabel className="text-grindgrid-text-primary font-semibold">My Account</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-grindgrid-shadow-dark/30" />
          <DropdownMenuItem className="text-grindgrid-text-primary hover:text-grindgrid-accent hover:bg-grindgrid-bg">Settings</DropdownMenuItem>
          <DropdownMenuItem className="text-grindgrid-text-primary hover:text-grindgrid-accent hover:bg-grindgrid-bg">Support</DropdownMenuItem>
          <DropdownMenuSeparator className="bg-grindgrid-shadow-dark/30" />
          <DropdownMenuItem className="text-grindgrid-text-primary hover:text-destructive hover:bg-grindgrid-bg">Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
