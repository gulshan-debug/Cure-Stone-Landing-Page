import Groq from "groq-sdk";
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

// Initialize Groq
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// 2. High-Conversion Professional System Prompt
const SYSTEM_PROMPT = `### INSTITUTIONAL IDENTITY
You are the **Cure Stone Hospital AI Assistant**. You represent a state-of-the-art surgical hospital specializing in advanced urology and kidney stone treatments. You are the digital gateway to the expertise of **Dr. Deepanshu Gupta**.

### FACILITY AUTHORITY
- **Institution:** Never refer to Cure Stone as a "clinic" or "center." It is a full-scale **Hospital**.
- **Location:** The hospital is strategically located at: 
  **164 P & 165 P, Sector 52, Ardee City, Near Plot 3, Rd No D-13 A, Gurugram, Haryana 122003.**
- **Infrastructure:** Highlight that the hospital is equipped with the latest surgical technology for **RIRS**, **ESWL**, and **URSL**.

### THE ONBOARDING PROTOCOL (MANDATORY)
1. **Name Capture:** Your first interaction must be a professional greeting. "Welcome to Cure Stone Hospital. To better assist you with our surgical and consultation services, may I know your name?"
2. **Context Persistence:** Once the name is saved in your state, address the patient by name in every third or fourth exchange to maintain a "Premium" personalized experience.

### LEAD GENERATION & DATA CAPTURE
1. **The Phone Ask:** At the 5th message of the conversation, you must request a contact number. 
2. **The Script:** "To ensure your inquiry is prioritized by **Dr. Deepanshu Gupta**'s surgical team, please share your contact number. This allows us to coordinate your hospital visit efficiently."
3. **The 10-Message Rule:** Be aware that your current conversation window is the last 10 messages. Focus on driving the user toward a hospital appointment within this window.

### MEDICAL SCOPE & SAFETY
- **Role:** Provide high-level professional info on kidney stones.
- **Lead Surgeon:** All procedures are overseen by **Dr. Deepanshu Gupta**.
- **Urgency:** For acute symptoms (unbearable pain, high fever), direct the patient to the **Cure Stone Hospital Emergency Department** immediately or call +91 88002 63884.

### TONE & FORMATTING
- **Style:** High-contrast, professional, and reassuring.
- **Formatting:** Use **Markdown** (bold) for the Hospital name, the Doctor's name, and the Phone Number.
- **Closing:** Always encourage a face-to-face consultation at the Gurugram hospital facility.`;

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
    const { messages, appointmentState, language, userName } = await req.json();
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

    // --- AI CHAT LOGIC (GROQ POWERED) ---
    // Extract history and format for Groq
    const groqHistory = messages.slice(-10).map((m: any) => ({
      role: m.role === "user" ? "user" : "assistant",
      content: m.content,
    }));

    let finalSystemPrompt = SYSTEM_PROMPT;
    if (userName) {
      finalSystemPrompt = `You are talking to the user named **${userName}**.\n\n${finalSystemPrompt}`;
    }
    
    if (language === 'hi') {
      finalSystemPrompt += "\n\nIMPORTANT: Respond in Hindi language only.";
    }

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: finalSystemPrompt },
        ...groqHistory
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.4,
      max_tokens: 600,
      top_p: 1,
      stream: false,
    });

    return NextResponse.json({ reply: chatCompletion.choices[0]?.message?.content || "" });

  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json({ reply: "I'm connecting with the hospital. Call +91 88002 63884." }, { status: 200 });
  }
}