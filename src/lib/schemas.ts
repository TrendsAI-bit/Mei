import { z } from "zod";

export const DialogueSchema = z.object({
  speaker: z.string(),
  text: z.string()
});

export const PanelSchema = z.object({
  id: z.string(),
  prompt: z.string(),
  caption: z.string(),
  dialogue: z.array(DialogueSchema)
});

export const ComicSchema = z.object({
  title: z.string(),
  logline: z.string(),
  panels: z.array(PanelSchema)
});

export const GenerateRequestSchema = z.object({
  idea: z.string(),
  style: z.string().optional()
});

export const ImageRequestSchema = z.object({
  prompt: z.string(),
  size: z.string().optional()
});
