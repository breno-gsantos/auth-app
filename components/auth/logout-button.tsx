'use client'

import { logoutAction } from "@/actions/logout"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

export function LogoutButton(){
    async function onClick(){
        await logoutAction()
    }

    return (
        <Button onClick={onClick} size='icon-sm' variant='ghost' className="w-full">
            <LogOut className="mr-2 size-4" />
            Sair
        </Button>
    )
}