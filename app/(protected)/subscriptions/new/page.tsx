import { auth } from "@/auth";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { SubscriptionForm } from "@/components/subscriptions/new/subscription-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function SubscriptionNewPage() {
  const session = await auth();

  return (
    <DashboardLayout title="Nova Assinatura" user={session?.user}>
      <div className="mx-auto max-w-2xl space-y-6">
        <Button variant='ghost' size='sm' className="-ml-2" asChild>
          <Link href='/subscriptions'>
            <ArrowLeft className="mr-2 size-4" />
            Voltar
          </Link>
        </Button>

        <SubscriptionForm />
      </div>
    </DashboardLayout>
  )
}