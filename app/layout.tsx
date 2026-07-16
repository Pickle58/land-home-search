import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
import type { Metadata } from "next";
import { Source_Serif_4, DM_Sans } from "next/font/google";
import { AppNav } from "@/components/AppNav";
import { ConvexClientProvider } from "@/components/ConvexClientProvider";
import "./globals.css";

const display = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
});

const sans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Land Tracker",
  description: "Personal real estate and land research tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexAuthNextjsServerProvider>
      <html lang="en" className={`${display.variable} ${sans.variable} h-full`}>
        <body className="min-h-full bg-[#f3efe7] font-sans text-stone-900 antialiased">
          <ConvexClientProvider>
            <AppNav />
            <main className="mx-auto max-w-7xl px-4 py-6">{children}</main>
          </ConvexClientProvider>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
}
