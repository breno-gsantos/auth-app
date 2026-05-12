import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import { homeData } from "@/constants/data";

export default function Home() {
  const {title, loginBtn, subtitle} = homeData;

  return (
    <main className='flex flex-col min-h-screen items-center justify-center bg-linear-to-br from-zinc-100 via-zinc-50 to-white'>
      <div className="space-y-6 text-center">
        <h1 className="text-6xl font-semibold drop-shadow-md">{title}</h1>
        <p className="text-muted-foreground text-lg">{subtitle}</p>
        <div>
          <LoginButton>
            <Button className="w-full" size='lg'>
              {loginBtn}
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
