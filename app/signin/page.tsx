"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { useConvexAuth } from "convex/react";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
      // Password provider surfaces missing accounts as InvalidAccountId
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
    <div className="mx-auto mt-16 max-w-md rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-semibold">
        {flow === "signIn" ? "Sign in" : "Create account"}
      </h1>
      <p className="mt-1 text-sm text-stone-600">
        Land Tracker is private. Sign in to access your research.
      </p>
      <form onSubmit={onSubmit} className="mt-6 space-y-3">
        <input name="flow" type="hidden" value={flow} />
        <label className="block text-sm">
          <span className="mb-1 block font-medium">Email</span>
          <input
            name="email"
            type="email"
            required
            className="w-full rounded-md border border-stone-300 px-3 py-2"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium">Password</span>
          <input
            name="password"
            type="password"
            required
            minLength={8}
            className="w-full rounded-md border border-stone-300 px-3 py-2"
          />
        </label>
        {error ? <p className="text-sm text-red-700">{error}</p> : null}
        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-md bg-stone-900 px-3 py-2 text-sm font-medium text-white disabled:opacity-60"
        >
          {pending
            ? "Please wait…"
            : flow === "signIn"
              ? "Sign in"
              : "Sign up"}
        </button>
      </form>
      <button
        type="button"
        className="mt-4 text-sm text-stone-600 underline"
        onClick={() =>
          setFlow((f) => (f === "signIn" ? "signUp" : "signIn"))
        }
      >
        {flow === "signIn"
          ? "Need an account? Sign up"
          : "Already have an account? Sign in"}
      </button>
    </div>
  );
}
