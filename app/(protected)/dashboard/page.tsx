import { auth } from "@/auth"
import { LogoutButton } from "@/components/auth/logout-button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { redirect } from "next/navigation";

export default async function DashboardPage(){
    const session = await auth();

    if(!session){
        redirect('/login')
    }

    const sessionData = [
        { id: 1, label: session?.user.id, title: 'ID' },
        { id: 2, label: session?.user.name, title: 'Nome' },
        { id: 3, label: session?.user.email, title: 'Email' },
        { id: 4, label: session?.user.role, title: 'Role' },
    ]

    return (
        <main className='flex flex-col min-h-screen items-center justify-center'>
            <Card>
                <CardHeader>
                    <CardTitle>Consulta de Dados</CardTitle>
                </CardHeader>
                <CardContent>
                    {sessionData.map(({id, title, label}) => (
                        <h1 key={id}>
                            <span className="text-base font-medium">{title}</span>:  <span className="text-muted-foreground italic">{label}</span>
                        </h1>
                    ))}
                </CardContent>
                <CardFooter>
                    <LogoutButton />
                </CardFooter>
            </Card>
        </main>
    )
}