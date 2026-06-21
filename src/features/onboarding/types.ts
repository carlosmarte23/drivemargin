export type OnboardingFormState = {
  status: "idle" | "error";
  message: string | null;
};

export const initialOnboardingFormState: OnboardingFormState = {
  status: "idle",
  message: null,
};
