import { Star } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-zinc-950 py-10 md:py-14 px-4 md:px-8 border-b border-zinc-900" id="hero-section">
      {/* Background glow graphics */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[600px] h-[350px] bg-orange-600/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto text-center space-y-5 relative z-10">
        
        {/* Trust Pilot Mimic Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-[11px] md:text-xs text-zinc-350 mx-auto">
          <span className="flex text-orange-500">
            <Star className="w-3 h-3 fill-current" />
            <Star className="w-3 h-3 fill-current" />
            <Star className="w-3 h-3 fill-current" />
            <Star className="w-3 h-3 fill-current" />
            <Star className="w-3 h-3 fill-current" />
          </span>
          <span className="text-zinc-650">|</span>
          <span className="font-semibold text-white">4.9/5 Rating</span>
          <span className="text-zinc-650">•</span>
          <span className="text-zinc-450">12,000+ Accounts Levelled</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black text-white tracking-tight leading-[1.15] font-sans">
          Unshackle Your Reddit Account. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-400 to-amber-500">Boost Karma safely.</span>
        </h1>

        <p className="text-zinc-400 text-xs md:text-sm max-w-2xl leading-relaxed mx-auto">
          Stuck behind strict subreddit karma filters? Bypass robotic auto-moderators instantly. <strong>RedditKarmaBoost.com</strong> delivers premium comment and post karma points organically. No password needed, with bank-grade Stripe security.
        </p>

        {/* Step-by-Step Instruction Guide */}
        <div className="mt-8 pt-8 border-t border-zinc-900 text-left max-w-3xl mx-auto space-y-6" id="how-it-works-guide">
          <div className="text-center space-y-1">
            <span className="px-2 py-0.5 rounded bg-orange-500/15 text-orange-400 border border-orange-500/30 text-[10px] uppercase font-black tracking-widest font-mono">
              Quickstart Roadmap
            </span>
            <h3 className="text-base md:text-lg font-black text-white uppercase tracking-wider font-sans">
              How RedditKarmaBoost Works & How to Start
            </h3>
            <p className="text-zinc-400 text-xs">
              Follow these three organic steps to securely achieve your target score
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Step 1 */}
            <div className="bg-zinc-900/60 border border-zinc-800 hover:border-orange-500/40 transition-all duration-200 rounded-xl p-5 space-y-3 flex flex-col justify-between relative group">
              <div className="absolute -top-3 -left-3 bg-gradient-to-r from-orange-600 to-amber-500 text-white font-mono text-xs font-black w-7 h-7 rounded-lg flex items-center justify-center shadow-lg shadow-orange-500/20">
                01
              </div>
              <div className="space-y-2 mt-1">
                <h4 className="text-xs font-black text-orange-400 font-sans uppercase tracking-widest">
                  Secure WhatsApp Chat
                </h4>
                <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                  Place and confirm your order through WhatsApp chat where we provide the most feasible payment gateway for your assistance.
                </p>
              </div>
              <div className="pt-2 text-[10px] text-zinc-500 font-mono font-bold uppercase tracking-wider">
                ✓ Encrypted Channels
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-zinc-900/60 border border-zinc-800 hover:border-orange-500/40 transition-all duration-200 rounded-xl p-5 space-y-3 flex flex-col justify-between relative group">
              <div className="absolute -top-3 -left-3 bg-gradient-to-r from-orange-600 to-amber-500 text-white font-mono text-xs font-black w-7 h-7 rounded-lg flex items-center justify-center shadow-lg shadow-orange-500/20">
                02
              </div>
              <div className="space-y-2 mt-1">
                <h4 className="text-xs font-black text-orange-400 font-sans uppercase tracking-widest">
                  Secure Co-Posting
                </h4>
                <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                  Once order is placed, our team sends you high-reputation sub-links and custom <strong className="text-white font-bold underline decoration-orange-500">TEXT</strong> templates so that the karma is built organicly by the <span className="text-white font-semibold">real account author</span>.
                </p>
              </div>
              <div className="pt-2 text-[10px] text-zinc-500 font-mono font-bold uppercase tracking-wider">
                ✓ 100% Organically Safe
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-zinc-900/60 border border-zinc-800 hover:border-orange-500/40 transition-all duration-200 rounded-xl p-5 space-y-3 flex flex-col justify-between relative group">
              <div className="absolute -top-3 -left-3 bg-gradient-to-r from-orange-600 to-amber-500 text-white font-mono text-xs font-black w-7 h-7 rounded-lg flex items-center justify-center shadow-lg shadow-orange-500/20">
                03
              </div>
              <div className="space-y-2 mt-1">
                <h4 className="text-xs font-black text-orange-400 font-sans uppercase tracking-widest">
                  Achieving Target
                </h4>
                <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                  The team will keep suggesting optimized interactive posts and safe threads until your desired custom Karma count target is fully achieved.
                </p>
              </div>
              <div className="pt-2 text-[10px] text-zinc-500 font-mono font-bold uppercase tracking-wider">
                ✓ Delivered Guaranteed
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
