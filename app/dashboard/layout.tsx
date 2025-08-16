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
  const defaultOpen = await (await cookieStore).get("sidebar:state")?.value === "true"

  return (
    <div className="flex min-h-screen w-full"> {/* Added w-full to ensure full width */}
      <AppSidebar />
      <SidebarInset className="flex flex-col w-full"> {/* Added flex-col and w-full to ensure proper layout */}
        <DashboardHeader />
        <main className="flex-1 p-4 md:p-6 lg:p-8 w-full overflow-x-hidden"> {/* Removed max-w-7xl and mx-auto to use full width */}
          {children}
        </main>
      </SidebarInset>
    </div>
  )
}
