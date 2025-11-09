import { AppSidebar } from "@/components/app-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen w-full bg-gray-50 text-gray-900">
      <AppSidebar />
      <div className="flex flex-col w-full flex-1">
        <DashboardHeader />
        <main className="flex-1 p-4 md:p-6 lg:p-8 w-full overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  )
}
