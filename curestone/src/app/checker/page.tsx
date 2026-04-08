"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import Image from "next/image";

type Message = {
  role: "bot" | "user";
  content: string;
  timestamp: Date;
};

type OnboardingStep = "name" | "state" | "problem" | "phone" | "done";

interface UserInfo {
  name: string;
  state: string;
  problem: string;
  phone: string;
}

const ONBOARDING = {
  en: {
    name: "Hello! 👋 Welcome to **Cure Stone AI**.\n\nBefore we begin, I'd love to know you a little better.\n\nWhat is your **full name**?",
    state: (name: string) =>
      `Nice to meet you, **${name}**! 😊\n\nWhich **city or state** are you from?`,
    problem:
      "Got it! Now, can you briefly describe your **main problem or concern**?\n\n_(e.g. kidney stone pain, blood in urine, scan reports, etc.)_",
    phone:
      "Thank you for sharing that. 🙏\n\nLastly, what is your **phone number** so our team can follow up if needed?",
    done: (info: UserInfo) =>
      `Perfect! Here's a quick summary:\n\n• **Name:** ${info.name}\n• **Location:** ${info.state}\n• **Problem:** ${info.problem}\n• **Phone:** ${info.phone}\n\nOur team has been notified. Now, how can I help you today?\n\nFeel free to ask me anything about kidney stones, RIRS surgery, treatments, or symptoms! 👇`,
  },
  hi: {
    name: "नमस्ते! 👋 **Cure Stone AI** में आपका स्वागत है।\n\nशुरू करने से पहले, मैं आपको थोड़ा जानना चाहता हूँ।\n\nआपका **पूरा नाम** क्या है?",
    state: (name: string) =>
      `आपसे मिलकर खुशी हुई, **${name}**! 😊\n\nआप किस **शहर या राज्य** से हैं?`,
    problem:
      "समझ गया! अब, क्या आप अपनी **मुख्य समस्या या चिंता** संक्षेप में बता सकते हैं?\n\n_(जैसे किडनी स्टोन दर्द, पेशाब में खून, स्कैन रिपोर्ट, आदि)_",
    phone:
      "साझा करने के लिए धन्यवाद। 🙏\n\nअंत में, आपका **फ़ोन नंबर** क्या है ताकि हमारी टीम जरूरत पड़ने पर संपर्क कर सके?",
    done: (info: UserInfo) =>
      `बिल्कुल! आपकी जानकारी का सारांश:\n\n• **नाम:** ${info.name}\n• **स्थान:** ${info.state}\n• **समस्या:** ${info.problem}\n• **फ़ोन:** ${info.phone}\n\nहमारी टीम को सूचित कर दिया गया है। अब बताइए मैं आपकी कैसे मदद कर सकता हूँ?\n\nकिडनी स्टोन, RIRS सर्जरी, उपचार या लक्षणों के बारे में कुछ भी पूछें! 👇`,
  },
};

const QUICK_PROMPTS = {
  en: [
    { label: "Stone Types", prompt: "What are the different types of kidney stones?" },
    { label: "Symptoms", prompt: "What are the common symptoms of kidney stones?" },
    { label: "Prevention", prompt: "How can I prevent kidney stones?" },
    { label: "RIRS Surgery", prompt: "What is RIRS laser surgery?" },
  ],
  hi: [
    { label: "पथरी के प्रकार", prompt: "किडनी की पथरी कितने प्रकार की होती है?" },
    { label: "लक्षण", prompt: "किडनी की पथरी के सामान्य लक्षण क्या हैं?" },
    { label: "बचाव", prompt: "मैं किडनी की पथरी से कैसे बच सकता हूँ?" },
    { label: "RIRS सर्जरी", prompt: "RIRS लेजर सर्जरी क्या है?" },
  ],
};

const PLACEHOLDERS: Record<OnboardingStep, { en: string; hi: string }> = {
  name: { en: "Type your full name...", hi: "अपना पूरा नाम लिखें..." },
  state: { en: "Type your city or state...", hi: "अपना शहर या राज्य लिखें..." },
  problem: { en: "Describe your problem briefly...", hi: "अपनी समस्या संक्षेप में बताएं..." },
  phone: { en: "Enter your phone number...", hi: "अपना फ़ोन नंबर दर्ज करें..." },
  done: {
    en: "Ask about symptoms, RIRS, or surgery...",
    hi: "लक्षण, RIRS या सर्जरी के बारे में पूछें...",
  },
};

function renderMarkdown(text: string) {
  const lines = text.split("\n");
  const elements: React.ReactNode[] = [];
  lines.forEach((line, idx) => {
    const bullet = line.match(/^[\s]*[-*•]\s+(.*)/);
    if (bullet) {
      elements.push(
        <div key={idx} className="flex items-start gap-2 ml-1 my-1.5 group">
          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0 group-hover:bg-primary transition-colors" />
          <span className="text-slate-700 leading-snug">{renderInline(bullet[1])}</span>
        </div>
      );
    } else if (line.trim() === "") {
      elements.push(<div key={idx} className="h-2" />);
    } else {
      elements.push(
        <p key={idx} className="my-0.5 text-slate-700 leading-relaxed">
          {renderInline(line)}
        </p>
      );
    }
  });
  return elements;
}

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|_[^_]+_)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**"))
      return (
        <strong key={i} className="font-extrabold text-slate-900">
          {part.slice(2, -2)}
        </strong>
      );
    if (part.startsWith("_") && part.endsWith("_"))
      return (
        <em key={i} className="italic text-slate-500 text-[13px]">
          {part.slice(1, -1)}
        </em>
      );
    return part;
  });
}

export default function KidneyChatBot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [language, setLanguage] = useState<"en" | "hi">("en");
  const [onboardingStep, setOnboardingStep] = useState<OnboardingStep>("name");
  const [userInfo, setUserInfo] = useState<UserInfo>({ name: "", state: "", problem: "", phone: "" });

  const chatRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  }, []);

  // Init / language switch
  useEffect(() => {
    setMounted(true);
    setMessages([{ role: "bot", content: ONBOARDING[language].name, timestamp: new Date() }]);
    setOnboardingStep("name");
    setUserInfo({ name: "", state: "", problem: "", phone: "" });
    setInput("");
  }, [language]);

  useEffect(() => { scrollToBottom(); }, [messages, isTyping, scrollToBottom]);
  useEffect(() => { inputRef.current?.focus(); }, [onboardingStep, isTyping]);

  const addBot = (content: string) =>
    setMessages((prev) => [...prev, { role: "bot", content, timestamp: new Date() }]);

  const handleReset = () => {
    setMessages([{ role: "bot", content: ONBOARDING[language].name, timestamp: new Date() }]);
    setOnboardingStep("name");
    setUserInfo({ name: "", state: "", problem: "", phone: "" });
    setInput("");
    setIsTyping(false);
  };

  const handleOnboarding = useCallback(
    async (text: string) => {
      const onb = ONBOARDING[language];
      setMessages((prev) => [...prev, { role: "user", content: text, timestamp: new Date() }]);
      setInput("");
      setIsTyping(true);
      await new Promise((r) => setTimeout(r, 700));
      setIsTyping(false);

      if (onboardingStep === "name") {
        const info = { ...userInfo, name: text.trim() };
        setUserInfo(info);
        setOnboardingStep("state");
        addBot(onb.state(text.trim()));
      } else if (onboardingStep === "state") {
        const info = { ...userInfo, state: text.trim() };
        setUserInfo(info);
        setOnboardingStep("problem");
        addBot(onb.problem);
      } else if (onboardingStep === "problem") {
        const info = { ...userInfo, problem: text.trim() };
        setUserInfo(info);
        setOnboardingStep("phone");
        addBot(onb.phone);
      } else if (onboardingStep === "phone") {
        const info = { ...userInfo, phone: text.trim() };
        setUserInfo(info);
        setOnboardingStep("done");
        // Fire & forget to backend
        fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ appointmentState: { active: false, data: info }, messages: [] }),
        }).catch(() => {});
        addBot(onb.done(info));
      }
    },
    [onboardingStep, userInfo, language]
  );

  const sendChatMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isTyping || messages.length >= 60) return;
      const userMsg: Message = { role: "user", content: text, timestamp: new Date() };
      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setIsTyping(true);
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            language,
            userInfo,
            messages: [...messages, userMsg].map((m) => ({
              role: m.role === "user" ? "user" : "assistant",
              content: m.content,
            })),
          }),
        });
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setMessages((prev) => [...prev, { role: "bot", content: data.reply, timestamp: new Date() }]);
      } catch {
        const err =
          language === "en"
            ? "I'm having trouble connecting. Please call **+91 88002 63884** for help."
            : "मुझसे संपर्क करने में समस्या हो रही है। सहायता के लिए कृपया **+91 88002 63884** पर कॉल करें।";
        setMessages((prev) => [...prev, { role: "bot", content: err, timestamp: new Date() }]);
      } finally {
        setIsTyping(false);
      }
    },
    [isTyping, messages, language, userInfo]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;
    onboardingStep !== "done" ? handleOnboarding(input) : sendChatMessage(input);
  };

  const onboardSteps = ["name", "state", "problem", "phone"];
  const stepIdx = onboardSteps.indexOf(onboardingStep);
  const showQuickPrompts =
    onboardingStep === "done" &&
    messages.filter((m) => m.role === "user").length === 4;

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      <Navbar />
      <main className="flex-grow pt-20 md:pt-28 pb-4 flex flex-col items-center">
        <div className="w-full max-w-4xl flex flex-col h-[calc(100svh-120px)] md:h-[780px] px-3 md:px-6">
          <div className="hidden md:block mb-6 text-center">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Cure Stone <span className="text-primary italic">Intelligence</span>
            </h1>
          </div>

          <div className="flex-grow flex flex-col bg-white rounded-[1.5rem] md:rounded-[2.5rem] shadow-[0_20px_70px_-10px_rgba(0,0,0,0.1)] border border-white overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-5 md:px-8 py-4 border-b border-slate-50 bg-white/80 backdrop-blur-md z-10">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-11 h-11 rounded-2xl bg-white border border-slate-100 flex items-center justify-center overflow-hidden shadow-lg shadow-slate-200/50">
                    <Image
                      src="/Curestone wm.png"
                      alt="Cure Stone AI"
                      width={40}
                      height={40}
                      className="object-contain p-1 transform scale-110"
                      unoptimized
                    />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500 border-2 border-white" />
                  </span>
                </div>
                <div>
                  <p className="text-sm font-black text-slate-900 tracking-tight leading-none mb-1">
                    Cure Stone AI
                  </p>
                  <button
                    onClick={() => setLanguage(language === "en" ? "hi" : "en")}
                    className="text-[10px] font-black text-primary uppercase tracking-widest bg-primary/10 px-2 py-1 rounded-lg hover:bg-primary/20 transition-all border border-primary/20"
                  >
                    {language === "en" ? "हिन्दी में पूछें" : "Switch to English"}
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleReset}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-all"
                >
                  {language === "en" ? "Reset" : "साफ़ करें"}
                </button>
                <Link
                  href="/book"
                  className="hidden sm:flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-primary transition-all"
                >
                  {language === "en" ? "Book Visit" : "मिलने का समय लें"}
                </Link>
              </div>
            </div>

            {/* Progress bar — only during onboarding */}
            {onboardingStep !== "done" && (
              <div className="px-6 py-2.5 bg-slate-50/70 border-b border-slate-100">
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    {language === "en" ? "Quick Setup" : "त्वरित सेटअप"}
                  </p>
                  <p className="text-[10px] font-black text-primary uppercase tracking-widest">
                    {stepIdx + 1} / 4
                  </p>
                </div>
                <div className="flex gap-1.5">
                  {onboardSteps.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                        i < stepIdx ? "bg-primary" : i === stepIdx ? "bg-primary/40" : "bg-slate-200"
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Messages */}
            <div ref={chatRef} className="flex-grow overflow-y-auto px-4 md:px-8 py-6 space-y-5 scroll-smooth">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`flex flex-col gap-1.5 max-w-[90%] md:max-w-[75%] ${msg.role === "user" ? "items-end" : "items-start"}`}>
                    <div
                      className={`px-5 py-3.5 rounded-[1.5rem] shadow-sm text-[14px] md:text-[15px] ${
                        msg.role === "user"
                          ? "bg-primary text-white rounded-tr-none font-semibold"
                          : "bg-[#F1F5F9] text-slate-800 rounded-tl-none border border-slate-200/50"
                      }`}
                    >
                      {msg.role === "bot" ? renderMarkdown(msg.content) : msg.content}
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 px-2 uppercase tracking-tighter">
                      {msg.role === "user" ? (language === "en" ? "You" : "आप") : "Cure Stone AI"} •{" "}
                      {mounted
                        ? msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                        : "--:--"}
                    </span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-slate-100 px-6 py-4 rounded-3xl rounded-tl-none">
                    <div className="flex gap-1">
                      {[0, 200, 400].map((delay) => (
                        <div
                          key={delay}
                          className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"
                          style={{ animationDelay: `${delay}ms` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {showQuickPrompts && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                  {QUICK_PROMPTS[language].map((qp, i) => (
                    <button
                      key={i}
                      onClick={() => sendChatMessage(qp.prompt)}
                      className="text-left px-4 py-3 rounded-2xl border border-slate-200 hover:border-primary hover:bg-primary/5 transition-all group"
                    >
                      <p className="text-[10px] font-black text-primary uppercase mb-0.5 tracking-widest">
                        {language === "en" ? "Quick Question" : "त्वरित प्रश्न"}
                      </p>
                      <p className="text-xs font-bold text-slate-700 group-hover:text-primary">{qp.label}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 md:p-6 bg-white border-t border-slate-50">
              <form
                onSubmit={handleSubmit}
                className="relative flex items-center bg-slate-100 rounded-2xl md:rounded-full p-1.5 focus-within:ring-2 focus-within:ring-primary/20 transition-all"
              >
                <input
                  ref={inputRef}
                  type={onboardingStep === "phone" ? "tel" : "text"}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={PLACEHOLDERS[onboardingStep][language]}
                  className="flex-grow bg-transparent px-5 py-3 outline-none text-sm font-semibold text-slate-700 placeholder:text-slate-400"
                  disabled={isTyping}
                  autoFocus
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="bg-primary text-white w-12 h-12 md:w-14 md:h-11 rounded-xl md:rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-50 shadow-lg shadow-primary/25"
                >
                  <svg className="w-5 h-5 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </form>
              <p className="text-[9px] text-center mt-3 text-slate-400 font-bold uppercase tracking-[0.2em]">
                {language === "en" ? "Built for Precision • Cure Stone" : "सटीकता के लिए निर्मित • क्योर स्टोन"}
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}