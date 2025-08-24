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
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b border-gray-200 bg-white px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 shadow-sm w-full text-gray-900">
      <SidebarTrigger className="sm:hidden text-gray-900 hover:text-blue-600" /> {/* Mobile sidebar toggle */}
      <div className="ml-auto flex items-center gap-2">
        <Avatar className="h-8 w-8 border border-blue-200">
          <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User Avatar" />
          <AvatarFallback className="bg-gray-100 text-blue-600">JD</AvatarFallback>
        </Avatar>
        <Avatar className="h-8 w-8 border border-blue-200">
          <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User Avatar" />
          <AvatarFallback className="bg-gray-100 text-blue-600">JD</AvatarFallback>
        </Avatar>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="secondary"
            size="icon"
            className="overflow-hidden rounded-full bg-gray-100 text-blue-600 hover:bg-blue-600 hover:text-white shadow-sm"
          >
            <User2 className="h-5 w-5" />
            <span className="sr-only">User menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-white shadow-lg border border-gray-200 rounded-lg">
          <DropdownMenuLabel className="text-gray-900 font-semibold">My Account</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-gray-200" />
          <DropdownMenuItem className="text-gray-900 hover:text-blue-600 hover:bg-gray-50">Settings</DropdownMenuItem>
          <DropdownMenuItem className="text-gray-900 hover:text-blue-600 hover:bg-gray-50">Support</DropdownMenuItem>
          <DropdownMenuSeparator className="bg-gray-200" />
          <DropdownMenuItem className="text-gray-900 hover:text-red-600 hover:bg-gray-50">Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
