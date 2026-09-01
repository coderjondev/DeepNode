import type { AiModel } from "@/types/pricing.types";

export const AI_MODELS: AiModel[] = [
  {
    id: "gemini-2.5-flash-lite",
    label: "Gemini 2.5 Flash Lite",
    kind: "text",
    creditsPerUse: 1,
    minTier: "free",
  },
  {
    id: "gemini-3.1-flash-lite",
    label: "Gemini 3.1 Flash Lite",
    kind: "text",
    creditsPerUse: 1,
    minTier: "free",
  },
  {
    id: "glm-4.5-flash",
    label: "GLM-4.5 Flash",
    kind: "text",
    creditsPerUse: 1,
    minTier: "free",
  },

  {
    id: "gemini-3.5-flash-lite",
    label: "Gemini 3.5 Flash Lite",
    kind: "text",
    creditsPerUse: 2,
    minTier: "plus",
  },
  {
    id: "qwen-3.5-flash",
    label: "Qwen 3.5 Flash",
    kind: "text",
    creditsPerUse: 2,
    minTier: "plus",
  },
  {
    id: "deepseek-v4-flash",
    label: "DeepSeek V4 Flash",
    kind: "text",
    creditsPerUse: 2,
    minTier: "plus",
  },
  {
    id: "glm-4.7-flash",
    label: "GLM-4.7 Flash",
    kind: "text",
    creditsPerUse: 2,
    minTier: "plus",
  },
  {
    id: "glm-v4.6-flash",
    label: "GLM-V4.6 Flash",
    kind: "text",
    creditsPerUse: 2,
    minTier: "plus",
  },
  {
    id: "claude-haiku-3.5",
    label: "Claude Haiku 3.5",
    kind: "text",
    creditsPerUse: 3,
    minTier: "plus",
  },

  {
    id: "claude-haiku-4.5",
    label: "Claude Haiku 4.5",
    kind: "text",
    creditsPerUse: 4,
    minTier: "pro",
  },
  {
    id: "glm-4.5-air",
    label: "GLM-4.5 Air",
    kind: "text",
    creditsPerUse: 4,
    minTier: "pro",
  },
  {
    id: "qwen-3.7-plus",
    label: "Qwen 3.7 Plus",
    kind: "text",
    creditsPerUse: 5,
    minTier: "pro",
  },
  {
    id: "deepseek-v4-pro",
    label: "DeepSeek V4 Pro",
    kind: "text",
    creditsPerUse: 5,
    minTier: "pro",
  },

  {
    id: "claude-sonnet-5",
    label: "Claude Sonnet 5",
    kind: "text",
    creditsPerUse: 8,
    minTier: "max",
  },
  {
    id: "gpt-5.6-luna",
    label: "GPT-5.6 Luna",
    kind: "text",
    creditsPerUse: 8,
    minTier: "max",
  },
  {
    id: "grok-4.20-reasoning",
    label: "Grok 4.20 Reasoning",
    kind: "text",
    creditsPerUse: 10,
    minTier: "max",
  },
  {
    id: "qwen-3.7-max",
    label: "Qwen 3.7 Max",
    kind: "text",
    creditsPerUse: 8,
    minTier: "max",
  },

  {
    id: "qwen-image-2",
    label: "Qwen Image 2",
    kind: "image",
    creditsPerUse: 3,
    minTier: "plus",
  },
  {
    id: "gemini-2.5-flash-image",
    label: "Gemini 2.5 Flash Image",
    kind: "image",
    creditsPerUse: 4,
    minTier: "plus",
  },
  {
    id: "qwen-image-plus",
    label: "Qwen Image Plus",
    kind: "image",
    creditsPerUse: 6,
    minTier: "pro",
  },
  {
    id: "qwen-image-2-pro",
    label: "Qwen Image 2 Pro",
    kind: "image",
    creditsPerUse: 10,
    minTier: "max",
  },

  {
    id: "veo-3.1-lite",
    label: "Veo 3.1 Lite",
    kind: "video",
    creditsPerUse: 15,
    minTier: "pro",
  },
  {
    id: "veo-3.1-fast",
    label: "Veo 3.1 Fast",
    kind: "video",
    creditsPerUse: 20,
    minTier: "max",
  },
  {
    id: "veo-3.1",
    label: "Veo 3.1",
    kind: "video",
    creditsPerUse: 30,
    minTier: "max",
  },
  {
    id: "sora-2",
    label: "Sora 2",
    kind: "video",
    creditsPerUse: 25,
    minTier: "max",
  },
  {
    id: "sora-2-pro",
    label: "Sora 2 Pro",
    kind: "video",
    creditsPerUse: 35,
    minTier: "max",
  },
];

const TIER_ORDER = ["free", "plus", "pro", "max"] as const;
export function countModelsForTier(tier: (typeof TIER_ORDER)[number]): {
  text: number;
  image: number;
  video: number;
} {
  const tierIndex = TIER_ORDER.indexOf(tier);
  const available = AI_MODELS.filter(
    (m) => TIER_ORDER.indexOf(m.minTier) <= tierIndex,
  );
  return {
    text: available.filter((m) => m.kind === "text").length,
    image: available.filter((m) => m.kind === "image").length,
    video: available.filter((m) => m.kind === "video").length,
  };
}
