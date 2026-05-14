'use client'

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Header } from "@/components/header";
import { BackButton } from "@/components/auth/back-button";

interface Props {
    children: React.ReactNode;
    header: string;
    backButtonLabel: string;
    backButtonHref: string;
}

export function CardWrapper({children, header, backButtonHref, backButtonLabel}: Props){
    return (
        <Card className="w-100 shadow-muted">
            <CardHeader>
                <Header label={header} />
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            <CardFooter>
                <BackButton href={backButtonHref} label={backButtonLabel} />
            </CardFooter>
        </Card>
    )
}