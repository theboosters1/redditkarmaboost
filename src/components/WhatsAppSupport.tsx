import React, { useState } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";

export default function WhatsAppSupport() {
  const [isOpen, setIsOpen] = useState(false);
  const [userQuery, setUserQuery] = useState("");

  const phoneNumber = "923029626015";

  const messageOptions = [
    { text: "Verify an order campaign", query: "Hello! I want to verify my Reddit Karma Boost campaign." },
    { text: "Reseller bulk discount queries", query: "Hi, I am looking for custom bulk reseller pricing packages." },
    { text: "Safe campaign check", query: "Hello! Is my account safe for a 1,500 Karma boost?" }
  ];

  const triggerChat = (customMsg: string) => {
    const encoded = encodeURIComponent(customMsg);
    window.open(`https://wa.me/${phoneNumber}?text=${encoded}`, "_blank");
  };

  const handleSendQuery = (e: React.FormEvent) => {
    e.preventDefault();
    if (userQuery.trim()) {
      triggerChat(userQuery);
      setUserQuery("");
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 font-sans" id="whatsapp-support-floating">
      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-650 text-white rounded-full flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer relative group"
          id="wa-fab-trigger"
        >
          <MessageCircle className="w-6.5 h-6.5" />
          {/* Notification bubble */}
          <span className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-orange-500 rounded-full text-[9px] font-extrabold text-white flex items-center justify-center animate-pulse border-2 border-zinc-950">
            1
          </span>
        </button>
      )}

      {/* Slide-up Instant Assist Panel */}
      {isOpen && (
        <div className="w-80 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden animate-fade-in flex flex-col text-left">
          {/* Header */}
          <div className="bg-emerald-600 p-4 flex items-center justify-between pb-4 text-white">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold font-mono text-sm leading-none shrink-0 border border-white/20 text-white">
                  KB
                </div>
                {/* Active dot */}
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-zinc-900 rounded-full"></div>
              </div>
              <div>
                <h4 className="text-sm font-bold leading-tight">Growth Support</h4>
                <span className="text-[10px] text-emerald-100 flex items-center gap-0.5 mt-0.5">
                  <Sparkles className="w-2.5 h-2.5 text-white fill-white" /> Online • Replies in 2 mins
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-emerald-100 hover:bg-emerald-700 hover:text-white transition-colors"
              id="wa-panel-close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Interactive Chat Board */}
          <div className="p-4 bg-zinc-950/40 flex-1 space-y-4 max-h-[300px] overflow-y-auto">
            <div className="bg-zinc-900 p-3 rounded-xl border border-zinc-850 text-xs text-zinc-300 leading-relaxed font-sans max-w-[90%]">
              Hello there! 👋 Welcome to RedditKarmaBoost.com support desk. How can our organic campaigners assist you today?
            </div>

            {/* Quick Presets list */}
            <div className="space-y-2 pt-1 font-sans">
              <span className="text-[9px] text-zinc-550 uppercase tracking-wider font-mono block">Suggested Questions</span>
              {messageOptions.map((opt, index) => (
                <button
                  key={index}
                  onClick={() => triggerChat(opt.query)}
                  className="w-full text-left p-2.5 rounded-xl bg-zinc-900 border border-zinc-850 hover:bg-zinc-800 text-xs font-semibold text-orange-400 font-sans transition flex items-center justify-between group cursor-pointer"
                  id={`wa-preset-btn-${index}`}
                >
                  <span>{opt.text}</span>
                  <span className="text-zinc-650 group-hover:text-orange-400 transition-colors text-xs font-mono">→</span>
                </button>
              ))}
            </div>
          </div>

          {/* Input field Footer */}
          <form onSubmit={handleSendQuery} className="p-3 bg-zinc-900 border-t border-zinc-850 flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask anything here..."
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
              className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-600 transition"
              id="wa-text-input-query"
            />
            <button
              type="submit"
              className="p-2 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-white transition cursor-pointer"
              id="wa-btn-send-message"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>
      )}
    </div>
  );
}
