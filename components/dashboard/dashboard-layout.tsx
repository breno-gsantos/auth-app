import { Sidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { Session } from "next-auth"

interface DashboardLayoutProps {
  children: React.ReactNode
  title?: string
  user: Session['user']
}

export async function DashboardLayout({ children, title, user }: DashboardLayoutProps) {
  const session = await auth();

  if (!session?.user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="pl-60">
        <DashboardHeader title={title} user={session.user} />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
