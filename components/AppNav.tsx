"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthActions } from "@convex-dev/auth/react";
import { useConvexAuth } from "convex/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Properties" },
  { href: "/map", label: "Map" },
  { href: "/compare", label: "Compare" },
  { href: "/properties/new", label: "Add", accent: true },
];

export function AppNav() {
  const pathname = usePathname();
  const { isAuthenticated } = useConvexAuth();
  const { signOut } = useAuthActions();

  return (
    <header className="border-b border-primary/15 bg-primary text-primary-foreground shadow-sm">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <Link
          href="/"
          className="font-display text-lg font-semibold tracking-tight text-primary-foreground"
        >
          Land Tracker
        </Link>
        <nav className="flex flex-wrap items-center gap-1">
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Button
                key={link.href}
                variant="ghost"
                size="sm"
                asChild
                className={cn(
                  "text-primary-foreground/85 hover:bg-primary-foreground/10 hover:text-primary-foreground",
                  active &&
                    (link.accent
                      ? "bg-accent text-accent-foreground hover:bg-accent/90 hover:text-accent-foreground"
                      : "bg-primary-foreground/15 text-primary-foreground hover:bg-primary-foreground/20"),
                )}
              >
                <Link href={link.href}>{link.label}</Link>
              </Button>
            );
          })}
          {isAuthenticated ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => void signOut()}
              className="ml-1 text-primary-foreground/75 hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              Sign out
            </Button>
          ) : null}
        </nav>
      </div>
    </header>
  );
}
