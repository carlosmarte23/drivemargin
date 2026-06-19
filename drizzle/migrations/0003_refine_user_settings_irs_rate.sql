ALTER TABLE "user_settings" RENAME COLUMN "irs_mileage_deduction_rate_cents" TO "irs_mileage_deduction_rate_cents_per_mile";

ALTER TABLE "user_settings"
ALTER COLUMN "irs_mileage_deduction_rate_cents_per_mile"
TYPE numeric(4, 2)
USING "irs_mileage_deduction_rate_cents_per_mile"::numeric(4, 2);

ALTER TABLE "user_settings"
ALTER COLUMN "irs_mileage_deduction_rate_cents_per_mile"
SET DEFAULT 72.5;
