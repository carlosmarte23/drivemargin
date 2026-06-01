import type { EntityId, MileageEntryMode, MoneyCents } from "@/types/domain";

export interface DemoSessionTemplate {
  id: EntityId;
  vehicleId: EntityId;
  dayOffset: number;
  startTime: string;
  endTime: string;
  mileageEntryMode: MileageEntryMode;
  totalMiles: number;
  startOdometer?: number;
  endOdometer?: number;
  notes?: string;
}

export interface DemoSessionAppEarningTemplate {
  id: EntityId;
  sessionTemplateId: EntityId;
  workAppId: EntityId;
  amountCents: MoneyCents;
}

export const demoSessionTemplates: DemoSessionTemplate[] = [
  {
    id: "demo-session-template-001",
    vehicleId: "demo-vehicle-primary",
    dayOffset: -27,
    startTime: "17:15",
    endTime: "21:30",
    mileageEntryMode: "manual",
    totalMiles: 54.2,
    notes: "Weeknight dinner shift",
  },
  {
    id: "demo-session-template-002",
    vehicleId: "demo-vehicle-primary",
    dayOffset: -25,
    startTime: "11:00",
    endTime: "14:20",
    mileageEntryMode: "odometer",
    totalMiles: 38.7,
    startOdometer: 84210,
    endOdometer: 84248.7,
  },
  {
    id: "demo-session-template-003",
    vehicleId: "demo-vehicle-secondary",
    dayOffset: -22,
    startTime: "18:00",
    endTime: "23:10",
    mileageEntryMode: "manual",
    totalMiles: 72.4,
  },
  {
    id: "demo-session-template-004",
    vehicleId: "demo-vehicle-primary",
    dayOffset: -20,
    startTime: "07:30",
    endTime: "10:45",
    mileageEntryMode: "manual",
    totalMiles: 31.5,
    notes: "Breakfast and commute-heavy orders",
  },
  {
    id: "demo-session-template-005",
    vehicleId: "demo-vehicle-primary",
    dayOffset: -18,
    startTime: "16:45",
    endTime: "22:15",
    mileageEntryMode: "odometer",
    totalMiles: 81.3,
    startOdometer: 84302,
    endOdometer: 84383.3,
  },
  {
    id: "demo-session-template-006",
    vehicleId: "demo-vehicle-primary",
    dayOffset: -15,
    startTime: "12:15",
    endTime: "16:00",
    mileageEntryMode: "manual",
    totalMiles: 44.8,
  },
  {
    id: "demo-session-template-007",
    vehicleId: "demo-vehicle-secondary",
    dayOffset: -13,
    startTime: "18:20",
    endTime: "00:10",
    mileageEntryMode: "manual",
    totalMiles: 92.6,
    notes: "Late weekend rush",
  },
  {
    id: "demo-session-template-008",
    vehicleId: "demo-vehicle-primary",
    dayOffset: -11,
    startTime: "09:30",
    endTime: "13:05",
    mileageEntryMode: "odometer",
    totalMiles: 36.9,
    startOdometer: 84441,
    endOdometer: 84477.9,
  },
  {
    id: "demo-session-template-009",
    vehicleId: "demo-vehicle-primary",
    dayOffset: -9,
    startTime: "17:00",
    endTime: "21:40",
    mileageEntryMode: "manual",
    totalMiles: 63.1,
  },
  {
    id: "demo-session-template-010",
    vehicleId: "demo-vehicle-secondary",
    dayOffset: -7,
    startTime: "10:45",
    endTime: "15:30",
    mileageEntryMode: "manual",
    totalMiles: 58.4,
  },
  {
    id: "demo-session-template-011",
    vehicleId: "demo-vehicle-primary",
    dayOffset: -5,
    startTime: "16:30",
    endTime: "20:25",
    mileageEntryMode: "odometer",
    totalMiles: 47.2,
    startOdometer: 84536,
    endOdometer: 84583.2,
  },
  {
    id: "demo-session-template-012",
    vehicleId: "demo-vehicle-primary",
    dayOffset: -4,
    startTime: "20:00",
    endTime: "23:35",
    mileageEntryMode: "manual",
    totalMiles: 41.6,
  },
  {
    id: "demo-session-template-013",
    vehicleId: "demo-vehicle-primary",
    dayOffset: -3,
    startTime: "11:20",
    endTime: "14:50",
    mileageEntryMode: "manual",
    totalMiles: 39.3,
    notes: "Lunch shift near downtown",
  },
  {
    id: "demo-session-template-014",
    vehicleId: "demo-vehicle-secondary",
    dayOffset: -2,
    startTime: "17:10",
    endTime: "22:45",
    mileageEntryMode: "odometer",
    totalMiles: 76.8,
    startOdometer: 61280,
    endOdometer: 61356.8,
  },
  {
    id: "demo-session-template-015",
    vehicleId: "demo-vehicle-primary",
    dayOffset: -1,
    startTime: "08:15",
    endTime: "11:40",
    mileageEntryMode: "manual",
    totalMiles: 34.7,
  },
  {
    id: "demo-session-template-016",
    vehicleId: "demo-vehicle-primary",
    dayOffset: 0,
    startTime: "16:00",
    endTime: "19:25",
    mileageEntryMode: "manual",
    totalMiles: 42.5,
    notes: "Current week demo session",
  },
];

export const demoSessionAppEarningTemplates: DemoSessionAppEarningTemplate[] = [
  {
    id: "demo-session-earning-template-001",
    sessionTemplateId: "demo-session-template-001",
    workAppId: "demo-work-app-doordash",
    amountCents: 7285,
  },
  {
    id: "demo-session-earning-template-002",
    sessionTemplateId: "demo-session-template-001",
    workAppId: "demo-work-app-uber-eats",
    amountCents: 3460,
  },
  {
    id: "demo-session-earning-template-003",
    sessionTemplateId: "demo-session-template-002",
    workAppId: "demo-work-app-doordash",
    amountCents: 5125,
  },
  {
    id: "demo-session-earning-template-004",
    sessionTemplateId: "demo-session-template-003",
    workAppId: "demo-work-app-uber-eats",
    amountCents: 11840,
  },
  {
    id: "demo-session-earning-template-005",
    sessionTemplateId: "demo-session-template-004",
    workAppId: "demo-work-app-doordash",
    amountCents: 4370,
  },
  {
    id: "demo-session-earning-template-006",
    sessionTemplateId: "demo-session-template-005",
    workAppId: "demo-work-app-doordash",
    amountCents: 9860,
  },
  {
    id: "demo-session-earning-template-007",
    sessionTemplateId: "demo-session-template-005",
    workAppId: "demo-work-app-uber-eats",
    amountCents: 4215,
  },
  {
    id: "demo-session-earning-template-008",
    sessionTemplateId: "demo-session-template-006",
    workAppId: "demo-work-app-uber-eats",
    amountCents: 6425,
  },
  {
    id: "demo-session-earning-template-009",
    sessionTemplateId: "demo-session-template-007",
    workAppId: "demo-work-app-doordash",
    amountCents: 8920,
  },
  {
    id: "demo-session-earning-template-010",
    sessionTemplateId: "demo-session-template-007",
    workAppId: "demo-work-app-uber-eats",
    amountCents: 6740,
  },
  {
    id: "demo-session-earning-template-011",
    sessionTemplateId: "demo-session-template-008",
    workAppId: "demo-work-app-doordash",
    amountCents: 5535,
  },
  {
    id: "demo-session-earning-template-012",
    sessionTemplateId: "demo-session-template-009",
    workAppId: "demo-work-app-doordash",
    amountCents: 8125,
  },
  {
    id: "demo-session-earning-template-013",
    sessionTemplateId: "demo-session-template-009",
    workAppId: "demo-work-app-uber-eats",
    amountCents: 3180,
  },
  {
    id: "demo-session-earning-template-014",
    sessionTemplateId: "demo-session-template-010",
    workAppId: "demo-work-app-uber-eats",
    amountCents: 7345,
  },
  {
    id: "demo-session-earning-template-015",
    sessionTemplateId: "demo-session-template-011",
    workAppId: "demo-work-app-doordash",
    amountCents: 6890,
  },
  {
    id: "demo-session-earning-template-016",
    sessionTemplateId: "demo-session-template-012",
    workAppId: "demo-work-app-uber-eats",
    amountCents: 5715,
  },
  {
    id: "demo-session-earning-template-017",
    sessionTemplateId: "demo-session-template-013",
    workAppId: "demo-work-app-doordash",
    amountCents: 4975,
  },
  {
    id: "demo-session-earning-template-018",
    sessionTemplateId: "demo-session-template-013",
    workAppId: "demo-work-app-uber-eats",
    amountCents: 2065,
  },
  {
    id: "demo-session-earning-template-019",
    sessionTemplateId: "demo-session-template-014",
    workAppId: "demo-work-app-doordash",
    amountCents: 9360,
  },
  {
    id: "demo-session-earning-template-020",
    sessionTemplateId: "demo-session-template-014",
    workAppId: "demo-work-app-uber-eats",
    amountCents: 4840,
  },
  {
    id: "demo-session-earning-template-024",
    sessionTemplateId: "demo-session-template-014",
    workAppId: "demo-work-app-instacart",
    amountCents: 1725,
  },
  {
    id: "demo-session-earning-template-021",
    sessionTemplateId: "demo-session-template-015",
    workAppId: "demo-work-app-doordash",
    amountCents: 4625,
  },
  {
    id: "demo-session-earning-template-022",
    sessionTemplateId: "demo-session-template-016",
    workAppId: "demo-work-app-doordash",
    amountCents: 5360,
  },
  {
    id: "demo-session-earning-template-023",
    sessionTemplateId: "demo-session-template-016",
    workAppId: "demo-work-app-uber-eats",
    amountCents: 2895,
  },
  {
    id: "demo-session-earning-template-025",
    sessionTemplateId: "demo-session-template-016",
    workAppId: "demo-work-app-instacart",
    amountCents: 1410,
  },
  {
    id: "demo-session-earning-template-026",
    sessionTemplateId: "demo-session-template-016",
    workAppId: "demo-work-app-spark",
    amountCents: 980,
  },
];
