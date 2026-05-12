'use client'

import { logoutAction } from "@/actions/logout"
import { Button } from "@/components/ui/button"

export function LogoutButton(){
    async function onClick(){
        await logoutAction()
    }

    return (
        <Button onClick={onClick} className='w-full'>
            Sair
        </Button>
    )
}