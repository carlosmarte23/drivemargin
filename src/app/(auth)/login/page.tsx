"use client";

import { useActionState } from "react";

import { AuthFormCard } from "@/app/(auth)/auth-form-card";
import { AuthShell } from "@/app/(auth)/auth-shell";
import { Button } from "@/components/ui/button";
import { login, type AuthFormState } from "@/features/auth/actions";

const initialState: AuthFormState = {
  success: false,
  message: null,
};

export default function LoginPage() {
  return (
    <AuthShell>
      <AuthFormCard
        title="Welcome back"
        description="Login to continue tracking your real profit."
        footer="New to DriveMargin?"
        label="Create an account"
        href="/signup"
      >
        <LoginForm />
      </AuthFormCard>
    </AuthShell>
  );
}

function LoginForm() {
  const [state, formAction, isPending] = useActionState(login, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-5">
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

      <Button
        type="submit"
        variant="default"
        size="lg"
        className="mt-2"
        disabled={isPending}
      >
        {isPending ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  );
}
