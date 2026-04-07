import { NextRequest } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const SYSTEM_PROMPT = `You are "CureStone AI Assistant" — a friendly, professional kidney health chatbot for CureStone Clinic, led by Dr. Deepanshu Gupta, one of India's top urologists.

YOUR ROLE:
- Answer basic questions about kidney stones: types, causes, symptoms, prevention, diet tips, hydration, and general lifestyle advice.
- Explain procedures briefly: RIRS (Retrograde Intrarenal Surgery), ESWL (Extracorporeal Shock Wave Lithotripsy), URSL (Ureteroscopic Lithotripsy), and PCNL.
- Be warm, empathetic, and supportive. Use simple language patients can understand.

STRICT RULES:
1. You are NOT a doctor. You provide general health information only.
2. For ANY question that requires medical diagnosis, prescriptions, medication advice, treatment decisions, or involves serious/emergency symptoms (severe pain, blood in urine, high fever, vomiting, inability to urinate), you MUST:
   - Clearly state you cannot provide medical advice for that specific concern
   - Strongly recommend they consult Dr. Deepanshu Gupta or visit the clinic
   - Always include the clinic phone number: +91 88002 63884
   - Suggest booking an appointment at the clinic
3. NEVER prescribe medications, suggest dosages, or provide specific treatment plans.
4. NEVER diagnose conditions.
5. If someone describes an emergency (severe pain with fever, complete urinary blockage, blood clots in urine), tell them to call the emergency number IMMEDIATELY: +91 88002 63884 or visit the nearest hospital.
6. Keep responses concise (2-4 short paragraphs max). Use bullet points when listing tips.
7. Always end responses about symptoms or concerns with a reminder to consult a specialist.

CLINIC INFO (share when relevant):
- Clinic: CureStone — India's Leading Kidney Stone Treatment Center
- Doctor: Dr. Deepanshu Gupta, Senior Urologist
- Phone: +91 88002 63884
- Specialties: RIRS Laser Surgery, ESWL, URSL, PCNL
- USP: No cuts, no scars, 98% success rate, day-care procedures

Format responses using markdown for readability (bold for emphasis, bullet lists, etc.)`;

// Try multiple models in order — fallback if one hits quota
const MODELS = [
  "gemini-2.5-flash",
  "gemini-2.5-pro",
  "gemini-2.0-flash",
];

async function callGemini(model: string, geminiMessages: Array<{ role: string; parts: Array<{ text: string }> }>) {
  const geminiPayload = {
    system_instruction: {
      parts: [{ text: SYSTEM_PROMPT }],
    },
    contents: geminiMessages,
    generationConfig: {
      temperature: 0.7,
      topP: 0.9,
      topK: 40,
      maxOutputTokens: 1024,
    },
    safetySettings: [
      { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
      { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
      { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
      { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
    ],
  };

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(geminiPayload),
  });

  return res;
}

export async function POST(request: NextRequest) {
  if (!GEMINI_API_KEY) {
    return Response.json(
      { error: "Gemini API key not configured. Please set GEMINI_API_KEY in your environment variables." },
      { status: 500 }
    );
  }

  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return Response.json({ error: "Invalid request body" }, { status: 400 });
    }

    // Build Gemini-compatible conversation format
    const geminiMessages = messages.map((msg: { role: string; content: string }) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    // Try each model — fall back on quota/rate errors
    let lastError = "";
    for (const model of MODELS) {
      try {
        console.log(`Trying model: ${model}`);
        const geminiResponse = await callGemini(model, geminiMessages);

        if (geminiResponse.ok) {
          const data = await geminiResponse.json();
          const reply =
            data?.candidates?.[0]?.content?.parts?.[0]?.text ||
            "I'm sorry, I couldn't process your request right now. Please try again or call us directly at **+91 88002 63884**.";
          return Response.json({ reply });
        }

        const status = geminiResponse.status;
        const errorText = await geminiResponse.text();

        // 429 = quota/rate limit — try the next model
        if (status === 429) {
          console.warn(`Model ${model} hit rate limit, trying next...`);
          lastError = errorText;
          continue;
        }

        // Other errors — don't retry
        console.error(`Gemini API error (${model}):`, errorText);
        lastError = errorText;
        break;
      } catch (fetchErr) {
        console.error(`Fetch error for model ${model}:`, fetchErr);
        lastError = String(fetchErr);
        continue;
      }
    }

    console.error("All models failed. Last error:", lastError);
    return Response.json(
      { error: "Our AI is temporarily busy. Please try again in a moment, or call us at **+91 88002 63884** for immediate help." },
      { status: 502 }
    );
  } catch (error) {
    console.error("Chat API error:", error);
    return Response.json(
      { error: "Something went wrong. Please try again or call us at +91 88002 63884." },
      { status: 500 }
    );
  }
}
