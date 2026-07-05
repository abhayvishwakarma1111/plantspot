import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  metadataBase: new URL("https://plantspot.vercel.app"), // change later to your real domain

  title: {
    default: "PlantSpot",
    template: "%s | PlantSpot",
  },

  description:
    "Digital passports for your plants. Register, care and grow with PlantSpot.",

  applicationName: "PlantSpot",

  appleWebApp: {
    title: "PlantSpot",
    capable: true,
    statusBarStyle: "default",
  },
};

export const viewport = {
  themeColor: "#4CAF50",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
