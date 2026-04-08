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
  ]
};

const INITIAL_MESSAGE = (lang: 'en' | 'hi'): Message => ({
  role: "bot",
  content: lang === 'en' 
    ? "Hello! 👋 I'm your **Cure Stone AI Assistant**.\n\nI can help you understand symptoms, risk factors, and modern treatments like **RIRS** or **Laser surgery**.\n\nHow can I assist you today?"
    : "नमस्ते! 👋 मैं आपका **Cure Stone AI सहायक** हूँ।\n\nमैं लक्षणों, जोखिम कारकों और **RIRS** या **लेजर सर्जरी** जैसे आधुनिक उपचारों को समझने में आपकी मदद कर सकता हूँ।\n\nआज मैं आपकी क्या सहायता कर सकता हूँ?",
  timestamp: new Date(),
});

function renderMarkdown(text: string) {
  const lines = text.split("\n");
  const elements: React.ReactNode[] = [];
  lines.forEach((line, lineIdx) => {
    const bulletMatch = line.match(/^[\s]*[-*•]\s+(.*)/);
    if (bulletMatch) {
      elements.push(
        <div key={lineIdx} className="flex items-start gap-2 ml-1 my-1.5 group">
          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0 group-hover:bg-primary transition-colors" />
          <span className="text-slate-700 leading-snug">{renderInline(bulletMatch[1])}</span>
        </div>
      );
    } else if (line.trim() === "") {
      elements.push(<div key={lineIdx} className="h-3" />);
    } else {
      elements.push(<p key={lineIdx} className="my-1 text-slate-700 leading-relaxed">{renderInline(line)}</p>);
    }
  });
  return elements;
}

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="font-extrabold text-slate-900 px-0.5">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

export default function KidneyChatBot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  
  // Ref for the specific scrollable chat container
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Function to scroll only the chat div
  const scrollToBottom = useCallback(() => {
    if (chatContainerRef.current) {
      const scrollContainer = chatContainerRef.current;
      scrollContainer.scrollTo({
        top: scrollContainer.scrollHeight,
        behavior: "smooth",
      });
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    setMessages([INITIAL_MESSAGE(language)]);
  }, [language]);

  // Scroll whenever messages update or bot starts typing
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  const handleReset = () => {
    setMessages([INITIAL_MESSAGE(language)]);
    setInput("");
    setIsTyping(false);
  };

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isTyping || messages.length >= 30) return;
      
      const userMsg: Message = { role: "user", content: text, timestamp: new Date() };
      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setIsTyping(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            language: language,
            messages: [...messages, userMsg].map(m => ({
              role: m.role === "user" ? "user" : "assistant",
              content: m.content
            }))
          }),
        });
        
        const data = await res.json();
        if (data.error) throw new Error(data.error);

        setMessages((prev) => [...prev, { role: "bot", content: data.reply, timestamp: new Date() }]);
      } catch (err) {
        const errorMsg = language === 'en' 
          ? "I'm having trouble connecting. Please call **+91 88002 63884** for help."
          : "मुझसे संपर्क करने में समस्या हो रही है। सहायता के लिए कृपया **+91 88002 63884** पर कॉल करें।";
        setMessages((prev) => [...prev, { role: "bot", content: errorMsg, timestamp: new Date() }]);
      } finally {
        setIsTyping(false);
      }
    },
    [isTyping, messages, language]
  );

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

          <div className="flex-grow flex flex-col bg-white rounded-[1.5rem] md:rounded-[2.5rem] shadow-[0_20px_70px_-10px_rgba(0,0,0,0.1)] border border-white overflow-hidden relative">
            
            {/* Header / Status Bar */}
            <div className="flex items-center justify-between px-5 md:px-8 py-4 border-b border-slate-50 bg-white/80 backdrop-blur-md z-10">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-11 h-11 rounded-2xl bg-white border border-slate-100 flex items-center justify-center overflow-hidden shadow-lg shadow-slate-200/50">
                    <Image src="/Curestone wm.png" alt="Cure Stone AI" width={40} height={40} className="object-contain p-1 transform scale-110" unoptimized />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500 border-2 border-white"></span>
                  </span>
                </div>
                <div>
                  <p className="text-sm font-black text-slate-900 tracking-tight leading-none mb-1">Cure Stone AI</p>
                  <button 
                    onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                    className="text-[10px] font-black text-primary uppercase tracking-widest bg-primary/10 px-2 py-1 rounded-lg hover:bg-primary/20 transition-all border border-primary/20"
                  >
                    {language === 'en' ? 'हिन्दी में पूछें' : 'Switch to English'}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button onClick={handleReset} className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-all">
                  {language === 'en' ? 'Reset' : 'साफ़ करें'}
                </button>
                <Link href="/book" className="hidden sm:flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-primary transition-all">
                  {language === 'en' ? 'Book Visit' : 'मिलने का समय लें'}
                </Link>
              </div>
            </div>

            {/* Message History Area - ATTACHED REF FOR LOCAL SCROLLING */}
            <div 
              ref={chatContainerRef}
              className="flex-grow overflow-y-auto px-4 md:px-8 py-6 space-y-6 scroll-smooth"
            >
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`flex flex-col gap-1.5 max-w-[90%] md:max-w-[75%] ${msg.role === "user" ? "items-end" : "items-start"}`}>
                    <div className={`px-5 py-3.5 rounded-[1.5rem] shadow-sm text-[14px] md:text-[15px] ${
                      msg.role === "user" 
                      ? "bg-primary text-white rounded-tr-none font-semibold" 
                      : "bg-[#F1F5F9] text-slate-800 rounded-tl-none border border-slate-200/50"
                    }`}>
                      {msg.role === "bot" ? renderMarkdown(msg.content) : msg.content}
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 px-2 uppercase tracking-tighter">
                      {msg.role === "user" ? (language === 'en' ? "You" : "आप") : "Cure Stone AI"} • {mounted ? msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "--:--"}
                    </span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start items-center gap-3">
                  <div className="bg-slate-100 px-6 py-4 rounded-3xl rounded-tl-none">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                      <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: "200ms" }}></div>
                      <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: "400ms" }}></div>
                    </div>
                  </div>
                </div>
              )}

              {messages.length <= 1 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
                  {QUICK_PROMPTS[language].map((qp, i) => (
                    <button key={i} onClick={() => sendMessage(qp.prompt)} className="text-left px-4 py-3 rounded-2xl border border-slate-200 hover:border-primary hover:bg-primary/5 transition-all group">
                      <p className="text-[10px] font-black text-primary uppercase mb-0.5 tracking-widest">{language === 'en' ? 'Quick Question' : 'त्वरित प्रश्न'}</p>
                      <p className="text-xs font-bold text-slate-700 group-hover:text-primary">{qp.label}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input Form Area */}
            <div className="p-4 md:p-6 bg-white border-t border-slate-50">
              <form onSubmit={(e) => { e.preventDefault(); sendMessage(input); }} className="relative flex items-center bg-slate-100 rounded-2xl md:rounded-full p-1.5 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={language === 'en' ? "Ask about symptoms, RIRS, or surgery..." : "लक्षण, RIRS या सर्जरी के बारे में पूछें..."}
                  className="flex-grow bg-transparent px-5 py-3 outline-none text-sm font-semibold text-slate-700 placeholder:text-slate-400"
                  disabled={isTyping}
                />
                <button type="submit" disabled={!input.trim() || isTyping} className="bg-primary text-white w-12 h-12 md:w-14 md:h-11 rounded-xl md:rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-50 shadow-lg shadow-primary/25">
                  <svg className="w-5 h-5 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </form>
              <p className="text-[9px] text-center mt-3 text-slate-400 font-bold uppercase tracking-[0.2em]">
                {language === 'en' ? 'Built for Precision • Cure Stone' : 'सटीकता के लिए निर्मित • क्योर स्टोन'}
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}