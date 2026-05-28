import { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp, Sparkles } from "lucide-react";
import { TRUST_FAQ_ITEMS } from "../data";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-zinc-950 py-16 md:py-24 px-4 md:px-8 border-b border-zinc-900 scroll-mt-10" id="faqs">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header Section */}
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <span className="text-orange-500 text-xs font-black uppercase tracking-widest font-mono">
            Structured Answers
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight font-sans">
            People Also Asked (PAA)
          </h2>
          <p className="text-zinc-400 text-xs md:text-sm">
            Got queries? We have complete, transparent answers regarding our safe campaign procedures.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {TRUST_FAQ_ITEMS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-zinc-900 border border-zinc-850 rounded-2xl overflow-hidden transition-all duration-200"
                id={`faq-item-${index}`}
              >
                <button
                  onClick={() => toggleQuestion(index)}
                  className="w-full p-5 md:p-6 text-left flex items-start justify-between gap-4 cursor-pointer focus:outline-none"
                  id={`btn-faq-toggle-${index}`}
                >
                  <div className="flex items-start gap-3">
                    <HelpCircle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                    <span className="text-sm md:text-base font-bold text-white font-sans">{faq.question}</span>
                  </div>
                  <span className="p-1 rounded-lg bg-zinc-950 text-zinc-400">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 md:px-6 md:pb-6 text-zinc-300 text-xs md:text-sm space-y-3 border-t border-zinc-850 pt-4 bg-zinc-950/30 animate-fade-in">
                    <p className="leading-relaxed">{faq.answer}</p>
                    {faq.subAnswer && (
                      <div className="flex items-start gap-2 text-[11px] md:text-xs text-zinc-450 border-l border-zinc-800 pl-3.5 mt-2.5 font-sans">
                        <Sparkles className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" />
                        <span>{faq.subAnswer}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support helper box */}
        <div className="bg-gradient-to-r from-orange-600/5 via-zinc-900 to-zinc-900 border border-zinc-850 p-6 rounded-2xl text-left flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-white font-bold text-sm font-sans">Still have queries or custom requirements?</h4>
            <p className="text-zinc-400 text-xs mt-0.5 max-w-lg">
              Contact our Reddit organic scaling specialized leads. We can formulate bulk reseller campaigns customized for agency networks.
            </p>
          </div>
          <a
            href="https://wa.me/923029626015?text=Hello%21%20I%20have%20read%20the%20FAQs%20but%20I%3Dhave%20custom%20campaign%20requirements%20for%20my%20agency."
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-555 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition duration-200 cursor-pointer shrink-0"
            id="faq-btn-wa-support"
          >
            <span>Ask on WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
}
