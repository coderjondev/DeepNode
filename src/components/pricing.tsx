"use client";

import { useMemo, useState } from "react";
import { Check, Minus, Sparkles, Zap } from "lucide-react";
import { Button } from "./ui/button";
import { PLANS } from "@/data/pricing.data";
import type { BillingCycle, Plan } from "@/types/pricing.types";

function groupThousands(value: number): string {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function formatPrice(amount: number): string {
  return amount === 0 ? "$0" : `$${amount}`;
}

interface BillingToggleProps {
  cycle: BillingCycle;
  onChange: (c: BillingCycle) => void;
}

function BillingToggle({ cycle, onChange }: BillingToggleProps) {
  const yearly = cycle === "yearly";

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-border bg-card p-1 shadow-sm">
      <Button
        type="button"
        variant="ghost"
        onClick={() => onChange("monthly")}
        className={`rounded-full px-3 py-2 text-sm font-medium transition-colors sm:px-4
          ${
            !yearly
              ? "bg-foreground text-background hover:bg-foreground/90 hover:text-background"
              : "bg-transparent text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          }
        `}
      >
        Oylik
      </Button>

      <Button
        type="button"
        variant="ghost"
        onClick={() => onChange("yearly")}
        className={`flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition-colors sm:px-4
          ${
            yearly
              ? "bg-foreground text-background hover:bg-foreground/90 hover:text-background"
              : "bg-transparent text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          }
        `}
      >
        Yillik
        <span
          className={`rounded-full px-2 py-0.5 text-xs font-semibold
            ${
              yearly
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            }
          `}
        >
          −20%
        </span>
      </Button>
    </div>
  );
}

interface PlanCardProps {
  plan: Plan;
  cycle: BillingCycle;
}

function PlanCard({ plan, cycle }: PlanCardProps) {
  const amount = plan.pricing[cycle];
  const isFree = amount === 0;

  return (
    <div
      className={` relative flex flex-col rounded-2xl border p-6 transition-colors sm:p-8
        ${
          plan.highlight
            ? ` border-primary bg-primary text-primary-foreground shadow-[0_20px_60px_-15px_oklch(0.68_0.17_255/0.35)] lg:-translate-y-4`
            : `border-border bg-card text-card-foreground shadow-sm`
        }
      `}
    >
      {plan.highlight && (
        <div
          className="absolute -top-3 left-6 flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground ring-4 ring-background sm:left-8
        "
        >
          <Sparkles className="h-3.5 w-3.5" />
          Eng ko&apos;p tanlanadi
        </div>
      )}

      <h3 className="font-display text-xl font-semibold">{plan.name}</h3>

      <p
        className={` mt-1 text-sm
          ${
            plan.highlight
              ? "text-primary-foreground/70"
              : "text-muted-foreground"
          }
        `}
      >
        {plan.tagline}
      </p>

      <div className="mt-6 flex items-end gap-1">
        <span className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          {formatPrice(amount)}
        </span>

        {!isFree && (
          <span
            className={` pb-1.5 text-sm
              ${
                plan.highlight
                  ? "text-primary-foreground/70"
                  : "text-muted-foreground"
              }
            `}
          >
            /oyiga
          </span>
        )}
      </div>

      <div
        className={`mt-4 flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium
          ${
            plan.highlight
              ? "bg-primary-foreground/10 text-primary-foreground"
              : "bg-muted text-foreground"
          }
        `}
      >
        <Zap
          className={`h-4 w-4
            ${plan.highlight ? "text-primary-foreground" : "text-primary"}
          `}
        />
        {groupThousands(plan.monthlyCredits)} kredit/oy
      </div>

      <Button
        className={`mt-6 w-full rounded-full py-3 text-sm font-semibold transition-transform active:scale-[0.98]
          ${
            plan.highlight
              ? `bg-background text-foreground hover:bg-background/90
              `
              : `bg-primary text-primary-foreground hover:bg-primary/90`
          }
        `}
      >
        {plan.ctaLabel}
      </Button>

      <ul className="mt-8 flex flex-col gap-3.5">
        {plan.features.map((f) => (
          <li key={f.label} className="flex items-start gap-3 text-sm">
            {f.included ? (
              <Check
                className={`mt-0.5 h-4 w-4 shrink-0
                  ${plan.highlight ? "text-primary-foreground" : "text-primary"}
                `}
              />
            ) : (
              <Minus
                className={`mt-0.5 h-4 w-4 shrink-0
                  ${
                    plan.highlight
                      ? "text-primary-foreground/30"
                      : "text-muted-foreground/40"
                  }
                `}
              />
            )}

            <span
              className={
                f.included
                  ? ""
                  : plan.highlight
                    ? "text-primary-foreground/45"
                    : "text-muted-foreground/60"
              }
            >
              {f.label}

              {f.note && (
                <span
                  className={` ml-1.5 text-xs
                    ${
                      plan.highlight
                        ? "text-primary-foreground/45"
                        : "text-muted-foreground/60"
                    }
                  `}
                >
                  ({f.note})
                </span>
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function PricingPage() {
  const [cycle, setCycle] = useState<BillingCycle>("yearly");

  const plans = useMemo(() => PLANS, []);

  return (
    <main className="min-h-screen bg-background font-sans text-foreground transition-colors">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto mt-4 max-w-2xl text-center">
          <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            Narxlar, murakkabliksiz
          </h1>

          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Suhbatlashing, rasm va video yarating — o&apos;nlab AI modeli, bitta
            kredit hovuzida. Yashirin to&apos;lovlar yo&apos;q, istalgan vaqt
            bekor qilish mumkin.
          </p>

          <div className="mt-8 flex justify-center">
            <BillingToggle cycle={cycle} onChange={setCycle} />
          </div>
        </div>

        <div className="mt-14 grid gap-6 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} cycle={cycle} />
          ))}
        </div>
      </div>
    </main>
  );
}
