"use client";

import { useActionState } from "react";

import { AuthShell } from "@/app/(auth)/auth-shell";
import { Button } from "@/components/ui/button";
import { signup, type AuthFormState } from "@/features/auth/actions";

import { AuthFormCard } from "../auth-form-card";

const initialState: AuthFormState = {
  success: false,
  message: null,
};

export default function SignupPage() {
  return (
    <AuthShell showSidePanel>
      <AuthFormCard
        title="Create your account"
        description="Start tracking your real margin."
        footer="Already have an account?"
        label="Login"
        href="/login"
      >
        <SignupForm />
      </AuthFormCard>
    </AuthShell>
  );
}

function SignupForm() {
  const [state, formAction, isPending] = useActionState(signup, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-4">
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
        {isPending ? "Creating your account..." : "Create account"}
      </Button>
    </form>
  );
}
