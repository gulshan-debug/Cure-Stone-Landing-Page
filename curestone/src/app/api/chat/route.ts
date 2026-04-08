import { GoogleGenerativeAI } from "@google/generative-ai";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";
import { sendAppointmentToSheet, AppointmentData } from "@/utils/appointmentSheet";

// 1. Initialize Rate Limiter
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(5, "1m"), 
  analytics: true,
});

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// 2. High-Conversion Professional System Prompt
const SYSTEM_PROMPT = `You are "Cure Stone AI Assistant," representing Cure Stone Hospital and Dr. Deepanshu Gupta.
- ROLE: Provide friendly, professional info on kidney stones (symptoms, types, prevention) and surgeries (RIRS, ESWL, URSL).
- LIMITS: You are NOT a doctor. For specific diagnoses or emergencies (blood in urine, severe pain), direct them to call +91 88002 63884.
- STYLE: Use Markdown (**bold** for emphasis), short paragraphs, and bullet points.
- GOAL: Be helpful and encourage booking a consultation with Dr. Gupta.`;

export async function POST(req: NextRequest) {
  // --- SPAM PROTECTION ---
  const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1";
  const { success, limit, reset } = await ratelimit.limit(`chat_${ip}`);

  if (!success) {
    return NextResponse.json(
      { reply: "Slow down! You've sent too many messages. Please wait a minute." },
      { 
        status: 429, 
        headers: { "X-RateLimit-Limit": limit.toString(), "X-RateLimit-Reset": reset.toString() } 
      }
    );
  }

  try {
    const { messages, appointmentState, language } = await req.json();
    const lastMsg = messages[messages.length - 1]?.content?.toLowerCase() || "";

    // --- APPOINTMENT BOOKING LOGIC ---
    if (messages.length === 1 && !appointmentState) {
      return NextResponse.json({
        reply: language === 'hi' ? "नमस्ते! मैं आपकी बेहतर सहायता कैसे कर सकता हूँ? क्या मैं आपका पूरा नाम जान सकता हूँ?" : "Welcome! To assist you better, may I have your full name?",
        appointmentState: { active: true, step: 1, data: {} }
      });
    }

    const bookingIntent = /book|appointment|doctor|visit|consult|appointment|appointment/.test(lastMsg);

    if (appointmentState?.active || bookingIntent) {
      let state = appointmentState || { active: true, step: 0, data: {} };
      const steps = [
        { key: "name", q: "What is your full name?" },
        { key: "phone", q: "Your phone number?" },
        { key: "date", q: "Preferred date (YYYY-MM-DD)?" },
        { key: "reason", q: "What is the reason for your visit?" },
      ];

      if (state.step === 0 && bookingIntent) {
        state.step = 1;
        return NextResponse.json({ reply: `Sure! ${steps[0].q}`, appointmentState: state });
      }

      if (state.step > 0 && state.step <= steps.length) {
        state.data[steps[state.step - 1].key] = lastMsg;
      }

      if (state.step === steps.length) {
        try {
          await sendAppointmentToSheet(state.data as AppointmentData);
          return NextResponse.json({
            reply: "Details received! Would you like to confirm a slot now? (yes/no)",
            appointmentState: { active: false, readyToBook: true, data: state.data }
          });
        } catch {
          return NextResponse.json({ reply: "Error saving details. Please call +91 88002 63884.", appointmentState: { active: false } });
        }
      }

      state.step++;
      return NextResponse.json({ reply: steps[state.step - 1].q, appointmentState: state });
    }

    // --- AI CHAT LOGIC (TOKEN OPTIMIZED) ---
    const optimizedHistory = messages.slice(-4).map((m: any) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
    }));

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite", 
      systemInstruction: language === 'hi' ? `${SYSTEM_PROMPT} Respond in Hindi.` : SYSTEM_PROMPT
    });

    const result = await model.generateContent({
      contents: optimizedHistory,
      generationConfig: {
        maxOutputTokens: 450,
        temperature: 0.4,
      }
    });

    return NextResponse.json({ reply: result.response.text() });

  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json({ reply: "I'm connecting with the hospital. Call +91 88002 63884." }, { status: 200 });
  }
}