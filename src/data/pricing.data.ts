import type { Plan } from "@/types/pricing.types";
import { countModelsForTier } from "@/components/model";

const freeModels = countModelsForTier("free");
const plusModels = countModelsForTier("plus");
const proModels = countModelsForTier("pro");
const maxModels = countModelsForTier("max");

export const PLANS: Plan[] = [
  {
    id: "free",
    name: "Free",
    tagline: "Sinab ko'rish uchun",
    pricing: { monthly: 0, yearly: 0 },
    highlight: false,
    ctaLabel: "Bepul boshlash",
    ctaHref: "/signup?plan=free",
    monthlyCredits: 40,
    features: [
      { label: "Oyiga 40 kredit", included: true },
      {
        label: `${freeModels.text} ta arzon matn modeli`,
        included: true,
        note: "Gemini Flash Lite, GLM Flash",
      },
      { label: "Rasm generatsiyasi", included: false },
      { label: "Video generatsiyasi", included: false },
      { label: "Suhbat tarixi (30 kun)", included: true },
      { label: "Ustuvor qayta ishlash", included: false },
      { label: "API kirish huquqi", included: false, note: "tez orada" },
    ],
  },
  {
    id: "plus",
    name: "Plus",
    tagline: "Kundalik foydalanish uchun",
    pricing: { monthly: 12, yearly: 9 },
    highlight: false,
    ctaLabel: "Plus'ga o'tish",
    ctaHref: "/signup?plan=plus",
    monthlyCredits: 400,
    features: [
      { label: "Oyiga 400 kredit", included: true },
      { label: `${plusModels.text} ta matn modeli`, included: true },
      {
        label: `${plusModels.image} ta rasm modeli`,
        included: true,
        note: "Qwen Image, Gemini Flash Image",
      },
      { label: "Video generatsiyasi", included: false },
      { label: "Cheksiz suhbat tarixi", included: true },
      { label: "Yuqori tezlikdagi generatsiya", included: false },
      { label: "API kirish huquqi", included: false, note: "tez orada" },
    ],
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "Kontent yaratuvchilar uchun",
    pricing: { monthly: 29, yearly: 23 },
    highlight: true,
    ctaLabel: "Pro'ga o'tish",
    ctaHref: "/signup?plan=pro",
    monthlyCredits: 1500,
    features: [
      { label: "Oyiga 1500 kredit", included: true },
      { label: `${proModels.text} ta matn modeli`, included: true },
      { label: `${proModels.image} ta rasm modeli`, included: true },
      {
        label: `${proModels.video} ta video modeli`,
        included: true,
        note: "Veo 3.1 Lite",
      },
      { label: "Cheksiz suhbat tarixi", included: true },
      { label: "Yuqori tezlikdagi generatsiya", included: true },
      { label: "API kirish huquqi", included: false, note: "tez orada" },
    ],
  },
  {
    id: "max",
    name: "Max",
    tagline: "Eng kuchli modellar, cheklovsiz ishlash uchun",
    pricing: { monthly: 79, yearly: 63 },
    highlight: false,
    ctaLabel: "Max'ga o'tish",
    ctaHref: "/signup?plan=max",
    monthlyCredits: 4000,
    features: [
      { label: "Oyiga 4000 kredit", included: true },
      {
        label: `Barcha ${maxModels.text} matn modeli`,
        included: true,
        note: "shu jumladan Sonnet 5, GPT-5.6, Grok",
      },
      { label: `Barcha ${maxModels.image} rasm modeli`, included: true },
      {
        label: `Barcha ${maxModels.video} video modeli`,
        included: true,
        note: "shu jumladan Sora-2-Pro, Veo 3.1",
      },
      { label: "Eng yuqori tezlikdagi generatsiya", included: true },
      {
        label: "API kirish huquqi",
        included: true,
        note: "birinchilardan bo'lib ulanish",
      },
    ],
  },
];
