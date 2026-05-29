import type { UserSettings } from "@/types/domain";

export const demoSettings: UserSettings = {
  currency: "USD",
  defaultVehicleId: "demo-vehicle-primary",
  targetNetCentsPerHour: 2000, // $20/hr
  targetNetCentsPerMile: 175, // $1.75/mi
  irsMileageRateCentsPerMile: 75, // $0.75/mi
  theme: "light",
  language: "en",
};
