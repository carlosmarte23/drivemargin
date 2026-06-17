"use client";

import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import { login, type AuthFormState } from "@/features/auth/actions";

const initialState: AuthFormState = {
  success: false,
  message: null,
};

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(login, initialState);

  return (
    <main className="mx-auto flex min-h-svh flex-col items-center justify-center">
      <h1 className="text-2xl font-semibold">Welcome back</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Continue tracking your real profit.
      </p>

      <form action={formAction} className="mt-8 flex flex-col gap-4">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            className="w-full rounded-md border bg-background px-3 py-2 text-sm"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            className="w-full rounded-md border bg-background px-3 py-2 text-sm"
          />
        </div>

        {state.message && (
          <p className="text-sm text-destructive">{state.message}</p>
        )}

        <Button type="submit" variant="default" disabled={isPending}>
          {isPending ? "Signing in..." : "Sign in"}
        </Button>
      </form>

      <div className="mt-4 flex items-center gap-2">
        <h2 className="text-sm font-medium">Don&apos;t have an account?</h2>
        <a href="/signup" className="text-sm underline">
          Sign up
        </a>
      </div>
    </main>
  );
}
