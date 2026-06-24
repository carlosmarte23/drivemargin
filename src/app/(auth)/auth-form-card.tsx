import Link from "next/link";

import { ShieldCheck } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function AuthFormCard({
  title,
  description,
  footer,
  label,
  href,
  children,
}: {
  title: string;
  description: string;
  footer?: string;
  label: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex w-full flex-col items-center justify-center gap-6">
      <Card className="w-full max-w-90 gap-3 py-5">
        <CardHeader className="px-8 text-center">
          <CardTitle className="text-2xl font-semibold">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>

        <CardContent className="px-8 py-4">{children}</CardContent>

        <CardFooter className="flex flex-col justify-center gap-0.5 border-t-0 bg-transparent px-8 pt-3 pb-5 sm:flex-row sm:gap-2 sm:py-3">
          <p className="text-sm text-muted-foreground">{footer}</p>
          <Link
            href={href}
            className="font-semibold text-primary hover:underline"
          >
            <span>{label}</span>
          </Link>
        </CardFooter>
      </Card>

      <div className="flex max-w-xs flex-col items-center gap-3 text-center">
        <div className="flex size-12 items-center justify-center rounded-xl border bg-card text-primary">
          <ShieldCheck className="size-5" />
        </div>

        <p className="text-sm leading-relaxed text-muted-foreground">
          Your data stays private and protected. We don&apos;t sell or share
          your personal data.
        </p>
      </div>
    </section>
  );
}
