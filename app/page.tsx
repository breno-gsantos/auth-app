import { Benefits } from "@/components/home/benefits";
import { CTA } from "@/components/home/cta";
import { Features } from "@/components/home/features";
import { Footer } from "@/components/home/footer";
import { Hero } from "@/components/home/hero";
import { Navbar } from "@/components/home/navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Benefits />
      <CTA />
      <Footer />
    </>
  )
}