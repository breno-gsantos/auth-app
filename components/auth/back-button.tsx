import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props {
    href: string;
    label: string;
}

export function BackButton({href, label}: Props){
    return (
        <Button variant='link' className="text-muted-foreground" size='sm' asChild>
            <Link href={href}>
                {label}
            </Link>
        </Button>
    )
}