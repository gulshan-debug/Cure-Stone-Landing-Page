import { GoogleGenerativeAI } from "@google/generative-ai";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";

// 1. Initialize Rate Limiter (Prevents Spam)
// Create a free account at upstash.com to get these keys
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(5, "1m"), // 5 requests per minute per IP
  analytics: true,
});

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const SYSTEM_PROMPT = `Your existing prompt here...`;

export async function POST(req: NextRequest) {
  // --- SPAM PROTECTION ---
  const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1";
  const { success, limit, reset, remaining } = await ratelimit.limit(`chat_${ip}`);

  if (!success) {
    return NextResponse.json(
      { reply: "Slow down! You've sent too many messages. Try again in a minute." },
      {
        status: 429,
        headers: { "X-RateLimit-Limit": limit.toString(), "X-RateLimit-Reset": reset.toString() }
      }
    );
  }

  try {
    const { messages } = await req.json();

    // --- TOKEN OPTIMIZATION ---
    // Only send the last 4 messages to stay under the 250k TPM limit
    const optimizedHistory = messages.slice(-4).map((m: any) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
    }));

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite", // Fast, Cheap, and High Quota
      systemInstruction: SYSTEM_PROMPT
    });

    const result = await model.generateContent({
      contents: optimizedHistory,
      generationConfig: {
        maxOutputTokens: 500, // Limit response length to save tokens
        temperature: 0.5,     // Lower temp = more predictable & cheaper processing
      }
    });

    return NextResponse.json({ reply: result.response.text() });

  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json(
      { reply: "I'm temporarily busy. Please call us at +91 88002 63884 for help." },
      { status: 200 } // Graceful failure
    );
  }
}