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

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-3 gap-2 border-t border-b border-zinc-900/80 py-3 max-w-lg mx-auto">
          <div>
            <span className="text-zinc-500 text-[9px] uppercase font-mono tracking-wider block">Completed Delivery</span>
            <strong className="text-base md:text-lg font-bold font-mono text-white tracking-tight">
              {deliveredCount.toLocaleString()}+
            </strong>
          </div>
          <div>
            <span className="text-zinc-500 text-[9px] uppercase font-mono tracking-wider block">Average Speed</span>
            <strong className="text-base md:text-lg font-bold font-mono text-white tracking-tight">
              &lt; 24 Hrs
            </strong>
          </div>
          <div>
            <span className="text-zinc-500 text-[9px] uppercase font-mono tracking-wider block">Security Integrity</span>
            <strong className="text-base md:text-lg font-bold font-mono text-emerald-400 tracking-tight">
              100% Safe
            </strong>
          </div>
        </div>

        {/* Primary Action CTA Column */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={onGetStartedClick}
            className="w-full sm:w-auto px-7 py-3.5 bg-orange-600 hover:bg-orange-500 active:bg-orange-550 text-white font-extrabold rounded-xl text-xs sm:text-sm transition-all duration-200 shadow-xl shadow-orange-500/10 cursor-pointer flex items-center justify-center gap-1.5 hover:scale-[1.01]"
            id="hero-cta-pricing"
          >
            <span>Explore Instant Packages</span>
            <Zap className="w-3.5 h-3.5 fill-current" />
          </button>
          
          <a
            href="https://wa.me/923029626015?text=Hello%21%20I%20am%20interested%20in%20a%20Reddit%20Karma%20Boost%20campaign%20to%20help%20grow%20my%20subreddit%20ranking."
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto px-6 py-3.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-bold border border-zinc-800 rounded-xl text-xs sm:text-sm transition duration-200 flex items-center justify-center gap-1.5 cursor-pointer"
            id="hero-cta-whatsapp"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
            <span>WhatsApp Consulting</span>
          </a>
        </div>

        {/* Trust seals line */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[9px] text-zinc-550 font-mono pt-1">
          <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-orange-500" /> NO PASSWORD REQUIRED</span>
          <span>•</span>
          <span className="flex items-center gap-1"><Zap className="w-3 h-3 text-orange-500" /> AUTOMATIC REFUND INSURANCE</span>
        </div>
      </div>
    </section>
  );
}
