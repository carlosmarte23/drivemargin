import { describe, expect, it, vi } from "vitest";

import { DemoResetButton } from "./demo-reset-button";

const resetDemoData = vi.fn(() => ({
  settings: {
    theme: "light",
  },
}));

const setTheme = vi.fn();

vi.mock("@/components/demo/demo-data-provider", () => ({
  useDemoData: () => ({
    resetDemoData,
  }),
}));

vi.mock("next-themes", () => ({
  useTheme: () => ({
    setTheme,
  }),
}));

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
  },
}));

describe("DemoResetButton", () => {
  it("resets demo data without changing the active theme", () => {
    const button = DemoResetButton();

    button.props.onClick();

    expect(resetDemoData).toHaveBeenCalledOnce();
    expect(setTheme).not.toHaveBeenCalled();
  });
});
