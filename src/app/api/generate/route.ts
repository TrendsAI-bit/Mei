import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { ComicSchema } from "@/lib/schemas";
import { CHARACTER_PROMPT, MEI_CHARACTER } from "@/lib/character";

export async function POST(req: NextRequest) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: "OpenAI API key not configured" }, { status: 500 });
    }

    const client = new OpenAI({ 
      apiKey: process.env.OPENAI_API_KEY 
    });
    const { idea, style } = await req.json();
    const system = `You are a Japanese manga writer and storyboarder specializing in elegant, character-driven stories with a touch of magical realism. 
    
${CHARACTER_PROMPT}

You must respond with a valid JSON object that includes:
- "title": A catchy Japanese-style title for the manga (can include English translation)
- "logline": A brief summary of the story in elegant prose
- "panels": An array of 4-6 panel objects, each with:
  - "id": A unique identifier
  - "prompt": A detailed visual description for image generation
  - "caption": A brief, elegant caption for the panel
  - "dialogue": An array of dialogue objects with "speaker" and "text"

Create engaging, sophisticated stories that showcase ${MEI_CHARACTER.name}'s personality, abilities, and the Japanese manga aesthetic. Stories should have a sense of wonder, mystery, and elegance.`;

    const schema = ComicSchema;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: system },
        { role: "user", content: `Story idea: ${idea}\nTarget visual style: ${style || "Japanese manga style, clean line art, expressive eyes, flowing hair, elegant proportions, Studio Ghibli meets modern anime aesthetic, soft shading, detailed character design"}.` }
      ],
      response_format: { type: "json_object" }
    });

    const text = response.choices[0]?.message?.content || "";
    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch (e) {
      console.error("Failed to parse JSON response:", text);
      return NextResponse.json({ error: "Invalid JSON response from AI" }, { status: 500 });
    }
    
    try {
      const validated = schema.parse(parsed);
      return NextResponse.json(validated);
    } catch (e) {
      console.error("Schema validation failed:", e);
      return NextResponse.json({ error: "AI response doesn't match expected format" }, { status: 500 });
    }
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Failed" }, { status: 400 });
  }
}
