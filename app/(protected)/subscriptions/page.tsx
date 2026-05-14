import { auth } from "@/auth";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Filter } from "@/components/subscriptions/filter";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/db";
import { Plus } from "lucide-react";
import Link from "next/link";

export default async function SubscriptionsPage(){
    const session = await auth();

    const subscriptions = await prisma.subscription.findMany({
        where: {
            userId: session?.user?.id
        }
    })

    return (
        <DashboardLayout title="Assinaturas" user={session?.user}>
            <div className='space-y-6'>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className='text-sm text-muted-foreground'>
                            Gerencie todas as suas assinaturas em um só lugar.
                        </p>
                    </div>
                    <Button asChild>
                        <Link href='/subscriptions/new'>
                            <Plus className='mr-2 size-4' />
                            Nova Assinatura
                        </Link>
                    </Button>
                </div>

                <Filter subscriptions={subscriptions} />
            </div>
        </DashboardLayout>
    )
}