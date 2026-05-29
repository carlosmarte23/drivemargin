import type { Vehicle } from "@/types/domain";

export const demoVehicles: Vehicle[] = [
  {
    id: "demo-vehicle-secondary",
    name: "2018 Toyota Corolla",
    make: "Toyota",
    model: "Corolla",
    year: 2018,
    estimatedMpg: 31,
    isDefault: false,
  },
  {
    id: "demo-vehicle-primary",
    name: "2016 Honda CRV",
    make: "Honda",
    model: "CRV",
    year: 2016,
    estimatedMpg: 26,
    isDefault: true,
  },
];
