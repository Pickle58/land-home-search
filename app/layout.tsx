import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
import type { Metadata } from "next";
import { Source_Serif_4, Geist } from "next/font/google";
import { AppNav } from "@/components/AppNav";
import { ConvexClientProvider } from "@/components/ConvexClientProvider";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const display = Source_Serif_4({
  variable: "--font-source-serif",
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
      <html
        lang="en"
        className={cn("h-full", display.variable, geist.variable)}
      >
        <body className="min-h-full bg-background font-sans text-foreground antialiased">
          <ConvexClientProvider>
            <AppNav />
            <main className="mx-auto max-w-7xl px-4 py-6">{children}</main>
          </ConvexClientProvider>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
}
