'use client'

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Header } from "@/components/header";
import { Social } from "@/components/social";
import { BackButton } from "@/components/auth/back-button";

interface Props {
    children: React.ReactNode;
    header: string;
    backButtonLabel: string;
    backButtonHref: string;
    showSocial?: boolean;
}

export function CardWrapper({children, header, backButtonHref, backButtonLabel, showSocial}: Props){
    return (
        <Card className="w-100 shadow-muted">
            <CardHeader>
                <Header label={header} />
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            {showSocial && (
                <CardFooter>
                    <Social />
                </CardFooter>
            )}
            <CardFooter>
                <BackButton href={backButtonHref} label={backButtonLabel} />
            </CardFooter>
        </Card>
    )
}