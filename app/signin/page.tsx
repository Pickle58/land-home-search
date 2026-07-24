"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { useConvexAuth } from "convex/react";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignInPage() {
  const { signIn } = useAuthActions();
  const { isAuthenticated, isLoading } = useConvexAuth();
  const router = useRouter();
  const [flow, setFlow] = useState<"signIn" | "signUp">("signIn");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, isLoading, router]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError(null);
    const form = new FormData(event.currentTarget);
    try {
      await signIn("password", form);
      router.replace("/");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Authentication failed";
      setError(
        message === "InvalidAccountId" || message === "InvalidSecret"
          ? flow === "signIn"
            ? "Invalid email or password. Need an account? Sign up."
            : "Could not create account. Try a different email."
          : message,
      );
    } finally {
      setPending(false);
    }
  }

  return (
    <Card className="mx-auto mt-16 max-w-md border-primary/10 shadow-md">
      <CardHeader>
        <CardTitle className="font-display text-2xl">
          {flow === "signIn" ? "Sign in" : "Create account"}
        </CardTitle>
        <CardDescription>
          Land Tracker is private. Sign in to access your research.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <input name="flow" type="hidden" value={flow} />
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                minLength={8}
                autoComplete={
                  flow === "signIn" ? "current-password" : "new-password"
                }
                className="pr-20 [&::-ms-reveal]:hidden [&::-ms-clear]:hidden"
              />
              <button
                type="button"
                className="absolute top-1/2 right-1 z-10 flex -translate-y-1/2 items-center gap-1 rounded-md border border-border bg-card px-2 py-0.5 text-xs font-semibold text-foreground shadow-sm hover:bg-muted"
                onClick={() => setShowPassword((visible) => !visible)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
                    <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
                    <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-4.508" />
                    <path d="m2 2 20 20" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
                <span>{showPassword ? "Hide" : "Show"}</span>
              </button>
            </div>
          </div>
          {error ? (
            <p className="text-sm text-destructive">{error}</p>
          ) : null}
          <Button type="submit" className="w-full" disabled={pending}>
            {pending
              ? "Please wait…"
              : flow === "signIn"
                ? "Sign in"
                : "Sign up"}
          </Button>
        </form>
        <Button
          type="button"
          variant="link"
          className="mt-4 h-auto p-0 text-muted-foreground"
          onClick={() => {
            setFlow((f) => (f === "signIn" ? "signUp" : "signIn"));
            setShowPassword(false);
            setError(null);
          }}
        >
          {flow === "signIn"
            ? "Need an account? Sign up"
            : "Already have an account? Sign in"}
        </Button>
      </CardContent>
    </Card>
  );
}
