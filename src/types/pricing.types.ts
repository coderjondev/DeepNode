export type PlanId = "free" | "plus" | "pro" | "max";

export type BillingCycle = "monthly" | "yearly";

export type ModelKind = "text" | "image" | "video";

export type PlanTier = "free" | "plus" | "pro" | "max";

export interface AiModel {
  id: string;
  label: string;
  kind: ModelKind;
  creditsPerUse: number;
  minTier: PlanTier;
}

export interface PlanFeature {
  label: string;
  included: boolean;
  note?: string;
}

export interface PlanPricing {
  monthly: number;
  yearly: number;
}

export interface Plan {
  id: PlanId;
  name: string;
  tagline: string;
  pricing: PlanPricing;
  highlight: boolean;
  ctaLabel: string;
  ctaHref: string;
  features: PlanFeature[];
  monthlyCredits: number;
}
