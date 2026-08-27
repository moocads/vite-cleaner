import type { Metadata } from "next";
import { LoadingIntro } from "@/components/motion/loading-intro";
import { brandFontVariables } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Vite Cleaners | Modern Garment Care in Toronto",
    template: "%s | Vite Cleaners",
  },
  description:
    "Modern garment care, intelligent storage and thoughtful local service across Toronto and the GTA.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${brandFontVariables} antialiased`}>
        <LoadingIntro />
        {children}
      </body>
    </html>
  );
}
