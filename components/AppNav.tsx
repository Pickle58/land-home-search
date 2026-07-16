"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthActions } from "@convex-dev/auth/react";
import { useConvexAuth } from "convex/react";

const links = [
  { href: "/", label: "Properties" },
  { href: "/map", label: "Map" },
  { href: "/compare", label: "Compare" },
  { href: "/properties/new", label: "Add" },
];

export function AppNav() {
  const pathname = usePathname();
  const { isAuthenticated } = useConvexAuth();
  const { signOut } = useAuthActions();

  return (
    <header className="border-b border-stone-200 bg-[#f7f4ef]">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="text-lg font-semibold tracking-tight text-stone-900">
          Land Tracker
        </Link>
        <nav className="flex flex-wrap items-center gap-1">
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
                  active
                    ? "bg-stone-900 text-white"
                    : "text-stone-700 hover:bg-stone-200/70"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          {isAuthenticated ? (
            <button
              type="button"
              onClick={() => void signOut()}
              className="ml-2 rounded-md px-3 py-1.5 text-sm text-stone-600 hover:bg-stone-200/70"
            >
              Sign out
            </button>
          ) : null}
        </nav>
      </div>
    </header>
  );
}
