import { Zap } from "lucide-react";

interface Props {
    label: string;
}

export function Header({label}: Props){
    return (
        <div className="w-full flex flex-col gap-y-2 items-center justify-center">
            <h1 className="text-3xl flex items-center gap-2 font-semibold">
                <div className="border bg-accent-foreground size-10 rounded-lg flex items-center justify-center">
                    <Zap className="size-7 text-accent" />
                </div>
                Renewly
            </h1>
            <p className="text-muted-foreground">{label}</p>
        </div>
    )
}