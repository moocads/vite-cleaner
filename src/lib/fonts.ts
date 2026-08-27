import localFont from "next/font/local";

const display = localFont({
  src: "../../public/fonts/obadiah-pro-regular.ttf",
  variable: "--font-display",
  weight: "400",
  display: "swap",
});

const body = localFont({
  src: [
    {
      path: "../../public/fonts/helvetica-now-text-regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/helvetica-now-text-medium.ttf",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-body",
  display: "swap",
});

const lead = localFont({
  src: "../../public/fonts/fellix-light.ttf",
  variable: "--font-lead",
  weight: "300",
  display: "swap",
});

export const brandFontVariables = `${display.variable} ${body.variable} ${lead.variable}`;
