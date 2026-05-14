import { auth } from "@/auth"
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { Sidebar } from "@/components/dashboard/sidebar";
import { redirect } from "next/navigation";

interface Props{
  children: React.ReactNode;
}

export default async function ProtectedLayout({ children }: Props) {
  const session = await auth();

  if (!session?.user) {
    redirect('/login')
  }

  return (
    <>
      <Sidebar />
      {children}
    </>
  )
}