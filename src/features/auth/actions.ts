"use server";

import { redirect } from "next/navigation";

import { loginSchema, signupSchema } from "@/features/auth/schemas";
import { createClient } from "@/lib/supabase/server";

export type AuthFormState = {
  success: boolean;
  message: string | null;
};

export async function login(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return {
      success: false,
      message: "Enter a valid email and password.",
    };
  }

  const { email, password } = parsed.data;

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      success: false,
      message: "Invalid email or password.",
    };
  }

  redirect("/app/dashboard");
}

export async function signup(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const parsed = signupSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return {
      success: false,
      message: "Enter a valid email and password.",
    };
  }

  const { email, password } = parsed.data;

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  redirect("/onboarding");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();

  redirect("/login");
}
