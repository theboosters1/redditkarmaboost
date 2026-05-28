import { useState, useEffect } from "react";
import { ArrowUp, Star, ShieldCheck, Zap, Users, MessageSquare } from "lucide-react";

interface HeroProps {
  onGetStartedClick: () => void;
}

export default function Hero({ onGetStartedClick }: HeroProps) {
  const [upvoteCount, setUpvoteCount] = useState(342);
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [deliveredCount, setDeliveredCount] = useState(148200);

  // Live delivered counter increments slowly to show active delivery loops
  useEffect(() => {
    const interval = setInterval(() => {
      setDeliveredCount(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleUpvote = () => {
    if (!hasUpvoted) {
      setUpvoteCount(prev => prev + 1);
      setHasUpvoted(true);
    } else {
      setUpvoteCount(prev => prev - 1);
      setHasUpvoted(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-zinc-950 py-16 md:py-24 px-4 md:px-8 border-b border-zinc-900" id="hero-section">
      {/* Background glow graphics */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[600px] h-[350px] bg-orange-600/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Column Text Content */}
        <div className="lg:col-span-7 space-y-6 text-left">
          {/* Trust Pilot Mimic Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-xs text-zinc-300">
            <span className="flex text-orange-500">
              <Star className="w-3.5 h-3.5 fill-current" />
              <Star className="w-3.5 h-3.5 fill-current" />
              <Star className="w-3.5 h-3.5 fill-current" />
              <Star className="w-3.5 h-3.5 fill-current" />
              <Star className="w-3.5 h-3.5 fill-current" />
            </span>
            <span className="text-zinc-400">|</span>
            <span className="font-semibold text-white">4.9/5 Rating</span>
            <span className="text-zinc-650">•</span>
            <span className="text-zinc-400">12,000+ Accounts Levelled</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] font-sans">
            Unshackle Your <br className="hidden md:inline" />
            Reddit Account. <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-400 to-amber-500">Boost Karma safely.</span>
          </h1>

          <p className="text-zinc-400 text-sm md:text-base max-w-2xl leading-relaxed">
            Stuck behind strict subreddit karma filters? Bypass robotic auto-moderators instantly. <strong>RedditKarmaBoost.com</strong> delivers premium comment and post karma points organically. No password needed, with bank-grade Stripe security.
          </p>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-3 gap-4 border-t border-b border-zinc-900 py-4 max-w-xl">
            <div>
              <span className="text-zinc-500 text-[10px] uppercase font-mono tracking-wider block">Completed Delivery</span>
              <strong className="text-xl md:text-2xl font-bold font-mono text-white tracking-tight">
                {deliveredCount.toLocaleString()}+
              </strong>
            </div>
            <div>
              <span className="text-zinc-500 text-[10px] uppercase font-mono tracking-wider block">Average Speed</span>
              <strong className="text-xl md:text-2xl font-bold font-mono text-white tracking-tight">
                &lt; 24 Hrs
              </strong>
            </div>
            <div>
              <span className="text-zinc-500 text-[10px] uppercase font-mono tracking-wider block">Security Integrity</span>
              <strong className="text-xl md:text-2xl font-bold font-mono text-emerald-400 tracking-tight">
                100% Safe
              </strong>
            </div>
          </div>

          {/* Primary Action CTA Column */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
            <button
              onClick={onGetStartedClick}
              className="px-8 py-4 bg-orange-600 hover:bg-orange-500 active:bg-orange-550 text-white font-extrabold rounded-2xl text-sm transition-all duration-200 shadow-xl shadow-orange-500/10 cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.01]"
              id="hero-cta-pricing"
            >
              <span>Explore Instant Packages</span>
              <Zap className="w-4 h-4 fill-current" />
            </button>
            
            <a
              href="https://wa.me/923029626015?text=Hello%21%20I%20am%20interested%20in%20a%20Reddit%20Karma%20Boost%20campaign%20to%20help%20grow%20my%20subreddit%20ranking."
              target="_blank"
              rel="noreferrer"
              className="px-6 py-4 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-bold border border-zinc-800 rounded-2xl text-sm transition duration-200 flex items-center justify-center gap-2 cursor-pointer"
              id="hero-cta-whatsapp"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Consulting</span>
            </a>
          </div>

          {/* Trust seals line */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[10px] text-zinc-550 font-mono pt-1">
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-orange-500" /> NO PASSWORD OR CREDENTIALS REQUIRED</span>
            <span>•</span>
            <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-orange-500" /> AUTOMATIC STRIPE REFUND INSURANCE</span>
          </div>
        </div>

        {/* Right Column Interactive Reddit mimic Sandbox */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="w-full max-w-sm bg-zinc-900 border border-zinc-850 rounded-2xl shadow-2xl p-5 text-left flex flex-col relative select-none">
            {/* Header Reddit mockup badge */}
            <div className="flex items-center justify-between border-b border-zinc-850 pb-3.5 mb-3.5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center shrink-0">
                  <span className="text-xs text-white font-black font-sans">r/</span>
                </div>
                <div>
                  <span className="text-zinc-300 font-bold text-xs block font-sans">r/SaaS_Founders</span>
                  <span className="text-[10px] text-zinc-500 block">Posted by u/RedditKarmaBoost • 6h ago</span>
                </div>
              </div>
              <span className="text-[9px] bg-orange-600/10 border border-orange-500/20 text-orange-500 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider font-mono">Simulated Boost</span>
            </div>

            {/* Mock post description copy */}
            <div className="space-y-2 bg-gradient-to-b from-zinc-900 to-zinc-950 p-2.5 rounded-xl border border-zinc-850">
              <h3 className="text-sm font-bold text-white leading-snug font-sans">
                💡 How I cleared posting limitations on high-profile Subreddits instantly? Read details!
              </h3>
              <p className="text-xs text-zinc-450 leading-relaxed font-sans">
                Was trying to launch our SaaS tooling. Automod immediately flagged and deleted the post because my karma score was below 100. Used this premium boost service and within hours my Karma skyrocketed safely! 100% recommended.
              </p>
            </div>

            {/* Interactive Upvoting footer interface */}
            <div className="flex items-center justify-between mt-5 pt-3.5 border-t border-zinc-850">
              <button
                onClick={handleUpvote}
                className={`py-1.5 px-3.5 rounded-xl border flex items-center gap-2 transition duration-200 cursor-pointer ${hasUpvoted ? "bg-orange-600 border-orange-500 text-white font-extrabold shadow-lg" : "bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white"}`}
                id="interactive-upvote-btn"
              >
                <ArrowUp className={`w-4 h-4 ${hasUpvoted ? "text-white scale-125 transition-transform" : "text-zinc-500"}`} />
                <span className="text-xs font-mono">{hasUpvoteCount(upvoteCount)}</span>
              </button>

              <span className="text-[10px] text-zinc-500 font-mono flex items-center gap-1">
                <Users className="w-3.5 h-3.5" /> Hover & tap to upvote
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );

  function hasUpvoteCount(count: number) {
    return count;
  }
}
