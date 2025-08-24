import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { MEI_CHARACTER } from "@/lib/character";

export async function POST(req: NextRequest) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: "OpenAI API key not configured" }, { status: 500 });
    }

    const client = new OpenAI({ 
      apiKey: process.env.OPENAI_API_KEY 
    });
    const { prompt, size } = await req.json();

    // Enhance the prompt with character consistency based on reference image
    const enhancedPrompt = `Create an image that is an exact replica of the reference character ${MEI_CHARACTER.name} from the image "${MEI_CHARACTER.referenceImage}". ${MEI_CHARACTER.imagePrompt}. ${prompt}. Japanese manga panel style, clean lines, consistent character design, elegant composition. The character must be exactly: ${MEI_CHARACTER.detailedDesign.body}, ${MEI_CHARACTER.detailedDesign.hair}, ${MEI_CHARACTER.detailedDesign.ears}, ${MEI_CHARACTER.detailedDesign.eyes}, ${MEI_CHARACTER.detailedDesign.face}, ${MEI_CHARACTER.detailedDesign.outfit}, ${MEI_CHARACTER.detailedDesign.posture}, ${MEI_CHARACTER.detailedDesign.features}, ${MEI_CHARACTER.detailedDesign.style}, ${MEI_CHARACTER.detailedDesign.proportions}. The character should look exactly like the reference image in every panel - same proportions, same style, same elegant black neko appearance.`;

    const img = await client.images.generate({
      model: "gpt-4o",
      prompt: enhancedPrompt,
      size: size || "1024x1024",
      quality: "hd",
      n: 1
    });

    const imageData = img.data?.[0];
    if (!imageData) throw new Error("No image returned");
    
    console.log("Image data received:", JSON.stringify(imageData, null, 2));
    
    // GPT-4o returns URLs
    if (imageData.url) {
      return NextResponse.json({ url: imageData.url });
    } else {
      console.log("Available image data keys:", Object.keys(imageData));
      throw new Error("No image data returned");
    }
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Failed" }, { status: 400 });
  }
}
