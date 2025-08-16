import { cookies } from "next/headers"
import { AppSidebar } from "@/components/app-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { SidebarInset } from "@/components/ui/sidebar"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = cookies()
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true"

  return (
    <div className="flex min-h-screen"> {/* Add a flex container to ensure layout works without SidebarProvider */}
      <AppSidebar />
      <SidebarInset>
        <DashboardHeader />
        {/* Added max-w-7xl and mx-auto to center the content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </SidebarInset>
    </div>
  )
}
