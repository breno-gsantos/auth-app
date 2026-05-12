import { auth } from "@/auth";
import { redirect } from "next/navigation";

interface Props{
    children: React.ReactNode;
}

export default async function AuthLayout({children}: Props){
    const session = await auth();

    if(session){
        redirect('/dashboard')
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-zinc-100 via-zinc-50 to-white">
            {children}
        </div>
    )
}