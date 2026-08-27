import { Hero } from "@/components/home/hero";
import { HomepageSections } from "@/components/home/homepage-sections";
import { SiteHeader } from "@/components/site-header";

export default function HomePage() {
  return (
    <main className="min-h-[100dvh] overflow-x-clip bg-vite-paper pt-[76px] lg:pt-20">
      <SiteHeader />
      <Hero />
      <HomepageSections />
    </main>
  );
}
