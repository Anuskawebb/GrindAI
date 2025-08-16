import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import { cookies } from "next/headers"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "GrindGrid - Master Your Skills, Forge Your Future",
  description: "AI-powered SaaS platform for skill development and progress tracking.",
  generator: 'v0.dev'
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Use await with cookies() to fix the error
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true"

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {/* SidebarProvider is needed for the sidebar state management */}
          <SidebarProvider defaultOpen={true}>
            {children}
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
