'use client'

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface Props {
    children: React.ReactNode;
    mode?: 'modal' | 'redirect';
    asChild?: boolean;
}

export function LoginButton({children, asChild, mode='redirect'}: Props){
    const router = useRouter();

    function onClick(){
        router.push('/login');
    }

    return (
        <span onClick={onClick}>
            {children}
        </span>
    )
}