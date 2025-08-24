import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function GET() {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: "OpenAI API key not configured" }, { status: 500 });
    }

    const client = new OpenAI({ 
      apiKey: process.env.OPENAI_API_KEY 
    });

    // Test with a simple completion
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "user", content: "Say 'Hello, API is working!'" }
      ],
      max_tokens: 10
    });

    return NextResponse.json({ 
      message: "API is working",
      response: response.choices[0]?.message?.content,
      hasApiKey: !!process.env.OPENAI_API_KEY
    });
  } catch (e: any) {
    return NextResponse.json({ 
      error: e?.message || "Failed",
      details: e?.toString()
    }, { status: 400 });
  }
}
