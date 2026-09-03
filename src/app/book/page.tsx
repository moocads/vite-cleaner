import type { Metadata } from "next";
import { BookingDemo } from "@/components/booking/booking-demo";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Book Garment Care",
  description: "Choose a Vite service, appointment time and pickup option.",
};

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<{ postal?: string; method?: string }>;
}) {
  const params = await searchParams;

  return (
    <main className="min-h-[100dvh] bg-vite-surface pt-[76px] lg:pt-20">
      <SiteHeader />
      <BookingDemo initialPostal={params.postal ?? ""} initialMethod={params.method === "dropoff" ? "dropoff" : "pickup"} />
    </main>
  );
}
