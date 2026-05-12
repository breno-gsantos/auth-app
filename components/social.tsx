'use client'

import { Button } from "@/components/ui/button"
import { FaGithub } from 'react-icons/fa'

export function Social(){
    async function onClick(){
        console.log(onClick)
    }
    
    return (
        <Button className="w-full" size='lg' variant='outline' onClick={onClick}>
            <FaGithub className='size-5' />
        </Button>
    )
}