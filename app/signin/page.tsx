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
            <Input
              id="password"
              name="password"
              type="password"
              required
              minLength={8}
            />
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
          onClick={() =>
            setFlow((f) => (f === "signIn" ? "signUp" : "signIn"))
          }
        >
          {flow === "signIn"
            ? "Need an account? Sign up"
            : "Already have an account? Sign in"}
        </Button>
      </CardContent>
    </Card>
  );
}
