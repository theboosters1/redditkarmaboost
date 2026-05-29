import { useState } from "react";
import { Flame, Sparkles, ShieldCheck, Sliders, Percent } from "lucide-react";
import { COMMENT_KARMA_PLANS, POST_KARMA_PLANS } from "../data";
import { KarmaPackage } from "../types";

interface PricingProps {
  onSelectPackage: (pkg: KarmaPackage) => void;
  pricingMode?: "standard" | "custom" | "vouch";
  onChangePricingMode?: (mode: "standard" | "custom" | "vouch") => void;
}

export default function Pricing({ onSelectPackage, pricingMode: propPricingMode, onChangePricingMode: propOnChangePricingMode }: PricingProps) {
  // Mode toggle: Standard vs Custom vs Free Vouch Copy
  const [internalPricingMode, setInternalPricingMode] = useState<"standard" | "custom" | "vouch">("standard");

  const pricingMode = propPricingMode !== undefined ? propPricingMode : internalPricingMode;
  const setPricingMode = propOnChangePricingMode !== undefined ? propOnChangePricingMode : setInternalPricingMode;

  // Helper boolean for simpler layout handling in older places
  const isCustomMode = pricingMode === "custom";

  // 1) Standard Presets States
  const [commentIndex, setCommentIndex] = useState(0); // Default to index 0 (10 Comment Karma)
  const [postIndex, setPostIndex] = useState(0);       // Default to index 0 (15 Post Karma)
  
  // 2) Exact Custom amount States
  const [customCommentAmount, setCustomCommentAmount] = useState<number>(30);
  const [customPostAmount, setCustomPostAmount] = useState<number>(100);
  
  const [redditUsername, setRedditUsername] = useState("");

  const selectedComment = COMMENT_KARMA_PLANS[commentIndex];
  const selectedPost = POST_KARMA_PLANS[postIndex];

  // Best-fit piecewise linear interpolation logic from preset values
  const getCommentKarmaPrice = (karma: number): number => {
    if (karma <= 0) return 0;
    if (karma <= 10) return Math.max(4.50, karma * 0.50); // scales to 10 Comment Karma ($5)
    if (karma <= 15) {
      // Interp between (10, 5) and (15, 10). Slope = 1
      return 5 + (karma - 10) * 1.0;
    }
    if (karma <= 50) {
      // Interp between (15, 10) and (50, 50). Slope = 40/35 = 1.14
      return 10 + (karma - 15) * 1.1428;
    }
    if (karma <= 100) {
      // Interp between (50, 50) and (100, 99). Slope = 49/50 = 0.98
      return 50 + (karma - 50) * 0.98;
    }
    // > 100 comment karma: high volume bonus discount
    return 99 + (karma - 100) * 0.85;
  };

  const getPostKarmaPrice = (karma: number): number => {
    if (karma <= 0) return 0;
    if (karma <= 15) return Math.max(4.50, karma * 0.3333); // scales to 15 Post Karma ($5)
    if (karma <= 50) {
      // Interp between (15, 5) and (50, 10). Slope = 5/35 = 0.1428
      return 5 + (karma - 15) * 0.1428;
    }
    if (karma <= 300) {
      // Interp between (50, 10) and (300, 30). Slope = 20/250 = 0.08
      return 10 + (karma - 50) * 0.08;
    }
    if (karma <= 1000) {
      // Interp between (300, 30) and (1000, 60). Slope = 30/700 = 0.0428
      return 30 + (karma - 300) * 0.0428;
    }
    // > 1000 post karma: high volume bonus discount
    return 60 + (karma - 1000) * 0.035;
  };

  // Derive active values based on Mode Selection
  const commentKarmaValue = pricingMode === "custom" 
    ? customCommentAmount 
    : pricingMode === "vouch" 
      ? 5 
      : selectedComment.karma;

  const commentKarmaPrice = pricingMode === "custom" 
    ? getCommentKarmaPrice(customCommentAmount) 
    : pricingMode === "vouch" 
      ? 0 
      : selectedComment.price;

  const postKarmaValue = pricingMode === "custom" 
    ? customPostAmount 
    : pricingMode === "vouch" 
      ? 5 
      : selectedPost.karma;

  const postKarmaPrice = pricingMode === "custom" 
    ? getPostKarmaPrice(customPostAmount) 
    : pricingMode === "vouch" 
      ? 0 
      : selectedPost.price;

  const totalKarma = commentKarmaValue + postKarmaValue;
  const totalPrice = commentKarmaPrice + postKarmaPrice;

  const handleCustomCheckout = () => {
    const cleanUsername = redditUsername.trim().replace(/^u\//i, "");
    
    // Construct rich, professional order details to send to WhatsApp chat
    const message = pricingMode === "vouch"
      ? `- *FREE REDDIT VOUCH COPY REQUEST* -\n----------------------------------------\n- *Reddit Username:* ${cleanUsername ? `u/${cleanUsername}` : "_Not specified_"}\n- *Package:* FREE VOUCH COPY (+10 Karma)\n- *In Exchange For:* High-authority vouch thread review\n- *Combined Price:* $0.00 (FREE)\n----------------------------------------`
      : `- *NEW REDDIT KARMA BOOST CAMPAIGN* -\n----------------------------------------\n- *Reddit Username:* ${cleanUsername ? `u/${cleanUsername}` : "_Not specified_"}\n- *Comment Karma:* ${commentKarmaValue > 0 ? `+${commentKarmaValue} CK ($${commentKarmaPrice.toFixed(2)})` : "None"}\n- *Post Karma:* ${postKarmaValue > 0 ? `+${postKarmaValue} PK ($${postKarmaPrice.toFixed(2)})` : "None"}\n- *Total Target Karma:* +${totalKarma} Points\n- *Combined Price:* $${totalPrice.toFixed(2)}\n----------------------------------------`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/923029626015?text=${encoded}`, "_blank");
  };

  return (
    <section className="bg-zinc-950 py-10 md:py-14 px-4 md:px-8 border-b border-zinc-900 scroll-mt-10" id="pricing">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Section Header */}
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500 text-xs font-black uppercase tracking-widest font-mono">
            Optimized Campaigns
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight font-sans">
            Level-Up Your Account reputation
          </h2>
          <p className="text-zinc-400 text-xs md:text-sm leading-relaxed">
            Pick predefined campaign slices, or easily input custom amount levels below. Interactive algorithm fetches standard volume rates instantly.
          </p>
        </div>

        {/* Mode Switch Tab Bar */}
        <div className="flex bg-zinc-950 p-1 rounded-xl border border-zinc-900 max-w-lg mx-auto relative z-20">
          <button
            type="button"
            onClick={() => setPricingMode("standard")}
            className={`flex-1 py-2.5 rounded-lg text-xs font-black transition-all duration-150 flex items-center justify-center gap-1.5 ${
              pricingMode === "standard" 
                ? "bg-zinc-900 text-white font-extrabold border border-zinc-800 shadow" 
                : "text-zinc-400 hover:text-zinc-200 cursor-pointer"
            }`}
          >
            🚀 Standard Levels
          </button>
          <button
            type="button"
            onClick={() => setPricingMode("custom")}
            className={`flex-1 py-2.5 rounded-lg text-xs font-black transition-all duration-150 flex items-center justify-center gap-1.5 ${
              pricingMode === "custom" 
                ? "bg-zinc-900 text-white font-extrabold border border-zinc-850 shadow" 
                : "text-zinc-400 hover:text-zinc-200 cursor-pointer"
            }`}
          >
            💎 Direct Custom
          </button>
          <button
            type="button"
            id="vouch-tab-btn"
            onClick={() => setPricingMode("vouch")}
            className={`flex-1 py-2.5 rounded-lg text-xs font-black transition-all duration-150 flex items-center justify-center gap-1.5 relative overflow-hidden ${
              pricingMode === "vouch" 
                ? "bg-zinc-900 text-orange-400 font-extrabold border border-orange-550/20 shadow bg-gradient-to-r from-orange-500/10 to-amber-500/10 animate-vouch-active" 
                : "text-zinc-400 hover:text-orange-300 cursor-pointer animate-vouch-idle"
            }`}
          >
            {/* Shimmer sweep effect */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full animate-vouch-shimmer pointer-events-none" />
            
            <span className="vouch-gift-emoji animate-vouch-emoji-wiggle">🎁</span> 
            <span className="vouch-text-glow">Try Free Karma</span>

            {/* Pulsing indicator badge */}
            <span className="absolute top-1 right-2 flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-orange-500"></span>
            </span>
          </button>
        </div>

        {/* Interactive Custom Karma Campaign Builder Section */}
        <div className="bg-zinc-900/40 border border-orange-500/20 rounded-2xl p-5 md:p-6 shadow-2xl relative overflow-hidden" id="custom-karma-builder-container">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative space-y-6">
                {/* Widget Title Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-900/60 pb-4">
              <div className="space-y-0.5 text-left">
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20 text-[9px] font-black uppercase tracking-wider font-mono">
                    {pricingMode === "vouch" ? "VOUCH COUPON PROGRAM" : "Instant Customizer"}
                  </span>
                  <span className="flex items-center gap-1 text-zinc-400 text-[11px] font-bold">
                    <Sliders className="w-3 h-3 text-orange-550 animate-pulse" /> {pricingMode === "vouch" ? "Zero Transaction Fees" : "Real-time price estimator"}
                  </span>
                </div>
                <h3 className="text-lg md:text-xl font-extrabold text-white font-sans tracking-tight">
                  {pricingMode === "standard" ? "Preset Tiers Selection" : pricingMode === "custom" ? "Direct Custom Campaign" : "Try Free Karma"}
                </h3>
              </div>
              
              {/* Promo tag */}
              <div id="pricing-promo-tag" className="bg-orange-600/10 border border-orange-500/20 rounded-lg px-3 py-1.5 flex items-center gap-2 shrink-0 self-start sm:self-auto">
                <Percent id="pricing-promo-icon" className="w-3.5 h-3.5 text-orange-400" />
                <div className="text-left font-sans">
                  <span id="pricing-promo-label" className="text-[9px] text-zinc-400 block font-mono uppercase font-bold tracking-wider leading-none">
                    {pricingMode === "vouch" ? "FREE OFFER" : "Summed Promo"}
                  </span>
                  <span id="pricing-promo-value" className="text-[11px] text-white font-black leading-none">
                    {pricingMode === "vouch" ? "100% OFF TRIAL COPY" : "Ratio Discount Built-In"}
                  </span>
                </div>
              </div>
            </div>

            {/* Main customization controllers block */}
            <div className="space-y-5">
              
              {/* Mode A: Standard Segmented Bars */}
              {pricingMode === "standard" && (
                <div className="space-y-5">
                  {/* 1. Comment Karma bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-zinc-200 font-extrabold uppercase tracking-wider font-sans flex items-center gap-1.5 text-xs">
                        <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                        Comment Karma Preset
                      </span>
                      <span className="text-orange-400 font-mono font-bold text-xs bg-orange-500/10 border border-orange-500/20 rounded-md px-2.5 py-1">
                        {`+${selectedComment.karma} CK ($${selectedComment.price.toFixed(2)})`}
                      </span>
                    </div>
                    
                    <div className="relative h-11 bg-zinc-950 border border-zinc-900 rounded-xl p-1 flex items-center gap-1">
                      <div 
                        className="absolute left-1 top-1 bottom-1 bg-gradient-to-r from-orange-600/20 to-amber-500/20 rounded-lg border border-orange-500/30 transition-all duration-300"
                        style={{
                          width: `calc(${(commentIndex / (COMMENT_KARMA_PLANS.length - 1)) * 105}% - ${8 * (COMMENT_KARMA_PLANS.length - 1 - commentIndex) / COMMENT_KARMA_PLANS.length}px)`,
                          minWidth: '40px'
                        }}
                      />
                      {COMMENT_KARMA_PLANS.map((plan, index) => {
                        const isSelected = commentIndex === index;
                        return (
                          <button
                            key={index}
                            type="button"
                            onClick={() => setCommentIndex(index)}
                            className={`flex-1 h-full rounded-lg text-xs transition-all duration-150 relative z-10 flex flex-col justify-center items-center py-0.5 ${
                              isSelected 
                                ? "text-white bg-zinc-900 border border-zinc-800 shadow" 
                                : "text-zinc-400 hover:text-zinc-200 cursor-pointer"
                            }`}
                          >
                            <span className="font-mono font-black text-[11px] md:text-xs">{`+${plan.karma}`}</span>
                            <span className="text-[9px] text-orange-400 font-bold font-mono">${plan.price}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 2. Post Karma bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-zinc-200 font-extrabold uppercase tracking-wider font-sans flex items-center gap-1.5 text-xs">
                        <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                        Post Karma Preset
                      </span>
                      <span className="text-orange-400 font-mono font-bold text-xs bg-orange-500/10 border border-orange-500/20 rounded-md px-2.5 py-1">
                        {`+${selectedPost.karma} PK ($${selectedPost.price.toFixed(2)})`}
                      </span>
                    </div>
                    
                    <div className="relative h-11 bg-zinc-950 border border-zinc-900 rounded-xl p-1 flex items-center gap-1">
                      <div 
                        className="absolute left-1 top-1 bottom-1 bg-gradient-to-r from-orange-600/20 to-amber-500/20 rounded-lg border border-orange-500/30 transition-all duration-300"
                        style={{
                          width: `calc(${(postIndex / (POST_KARMA_PLANS.length - 1)) * 105}% - ${8 * (POST_KARMA_PLANS.length - 1 - postIndex) / POST_KARMA_PLANS.length}px)`,
                          minWidth: '40px'
                        }}
                      />
                      {POST_KARMA_PLANS.map((plan, index) => {
                        const isSelected = postIndex === index;
                        return (
                          <button
                            key={index}
                            type="button"
                            onClick={() => setPostIndex(index)}
                            className={`flex-1 h-full rounded-lg text-xs transition-all duration-150 relative z-10 flex flex-col justify-center items-center py-0.5 ${
                              isSelected 
                                ? "text-white bg-zinc-900 border border-zinc-800 shadow" 
                                : "text-zinc-400 hover:text-zinc-200 cursor-pointer"
                            }`}
                          >
                            <span className="font-mono font-black text-[11px] md:text-xs">{`+${plan.karma}`}</span>
                            <span className="text-[9px] text-orange-400 font-bold font-mono">${plan.price}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Mode B: Interactive Direct Input & Fluid Range Sliders */}
              {pricingMode === "custom" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Custom Comment Karma range customizer */}
                  <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-900 space-y-3">
                    <div className="flex justify-between items-center">
                      <label className="text-zinc-200 font-bold uppercase tracking-wider text-[11px] font-mono flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                        Custom Comment Karma
                      </label>
                      <span className="text-xs text-orange-400 font-mono font-bold">
                        Est. ${commentKarmaPrice.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min="5"
                        max="400"
                        step="5"
                        value={customCommentAmount}
                        onChange={(e) => setCustomCommentAmount(Number(e.target.value))}
                        className="flex-1 accent-orange-500 bg-zinc-900 rounded-lg h-1.5 cursor-pointer"
                      />
                      <input
                        type="number"
                        min="0"
                        max="10000"
                        value={customCommentAmount}
                        onChange={(e) => setCustomCommentAmount(Math.max(0, Math.min(10000, Number(e.target.value) || 0)))}
                        className="w-16 bg-zinc-900 border border-zinc-800 rounded-lg px-2 py-1 text-center text-xs font-mono font-bold text-white focus:border-orange-500 focus:outline-none"
                      />
                    </div>
                    <span className="text-[10px] text-zinc-500 block">
                      Recommended limits: 10 - 200 CK per campaign drip.
                    </span>
                  </div>

                  {/* Custom Post Karma range customizer */}
                  <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-900 space-y-3">
                    <div className="flex justify-between items-center">
                      <label className="text-zinc-200 font-bold uppercase tracking-wider text-[11px] font-mono flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                        Custom Post Karma
                      </label>
                      <span className="text-xs text-orange-400 font-mono font-bold">
                        Est. ${postKarmaPrice.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min="10"
                        max="2000"
                        step="10"
                        value={customPostAmount}
                        onChange={(e) => setCustomPostAmount(Number(e.target.value))}
                        className="flex-1 accent-orange-500 bg-zinc-900 rounded-lg h-1.5 cursor-pointer"
                      />
                      <input
                        type="number"
                        min="0"
                        max="50000"
                        value={customPostAmount}
                        onChange={(e) => setCustomPostAmount(Math.max(0, Math.min(50000, Number(e.target.value) || 0)))}
                        className="w-16 bg-zinc-900 border border-zinc-800 rounded-lg px-2 py-1 text-center text-xs font-mono font-bold text-white focus:border-orange-500 focus:outline-none"
                      />
                    </div>
                    <span className="text-[10px] text-zinc-500 block">
                      Recommended limits: 15 - 1500 PK per campaign drip.
                    </span>
                  </div>
                </div>
              )}

              {/* Mode C: Free Vouch Copy Review Plan */}
              {pricingMode === "vouch" && (
                <div className="space-y-4 bg-zinc-950/20 p-5 rounded-xl border border-dashed border-orange-500/30 text-left">
                  <div className="flex items-center gap-2.5">
                    <span id="vouch-badge-promo" className="p-1 px-2.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20 text-[10px] font-black uppercase text-orange-400 font-mono tracking-wider animate-vouch-badge-glow">
                      🎁 VOUCH TRIAL COPY
                    </span>
                    <h4 className="text-white text-xs font-black uppercase tracking-wider font-sans">
                      Redeem 100% Free Karma Package
                    </h4>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] text-zinc-400 pt-1">
                    <div className="flex items-center gap-2">
                       <span className="text-orange-500 font-bold">✓</span>
                       <span>No payment method or password info requested</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-orange-500 font-bold">✓</span>
                      <span>Drip-delivered safely in 4-8 hours</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-orange-500 font-bold">✓</span>
                      <span>Real aged high-karma profiles engagement</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-orange-500 font-bold">✓</span>
                      <span>Fully upgradable to standard campaign tiers</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Pricing Calculation Summary Box */}
            <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              
              <div className="space-y-1 text-left w-full sm:w-auto">
                <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest block">Combined Estimate</span>
                
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300 font-mono">
                      +{totalKarma}
                    </span>
                    <span className="text-[11px] text-white uppercase font-black font-sans">Total Karma</span>
                  </div>
                  
                  {totalKarma > 0 && (
                    <div className="text-[10px] text-white font-sans font-black flex items-center gap-1 bg-zinc-900 border border-zinc-800 rounded px-2 py-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span>
                        {commentKarmaValue > 0 ? `${commentKarmaValue} Comment CK` : ""}
                        {commentKarmaValue > 0 && postKarmaValue > 0 ? " + " : ""}
                        {postKarmaValue > 0 ? `${postKarmaValue} Post PK` : ""}
                      </span>
                    </div>
                  )}
                </div>

                <div className="text-[10px] text-zinc-400 font-medium">
                  Includes full safety audits, clean drip-feed mechanisms, and Stripe-backed refund insurances.
                </div>
              </div>

              {/* Price and CTA */}
              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto shrink-0 justify-end">
                <div className="text-center sm:text-right">
                  <span className="text-[10px] text-zinc-400 font-mono block uppercase">Real-Time Price</span>
                  <div className="flex items-baseline justify-center sm:justify-end gap-1 select-none">
                    <span className="text-3xl md:text-3xl font-black text-orange-400 font-mono tracking-tight text-right">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="w-full sm:w-auto">
                  {pricingMode === "vouch" ? (
                    <button
                      type="button"
                      id="claim-free-vouch-btn"
                      onClick={handleCustomCheckout}
                      className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white text-xs font-black rounded-lg transition-all duration-150 flex items-center justify-center gap-1.5 shadow-lg shadow-orange-500/20 cursor-pointer hover:scale-[1.01] animate-vouch-btn-pulse relative overflow-hidden"
                    >
                      {/* Shimmer sweep effect */}
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-vouch-shimmer pointer-events-none" />

                      <span className="vouch-gift-emoji-btn animate-vouch-emoji-wiggle">🎁</span> Claim Free Karma
                    </button>
                  ) : totalPrice > 0 ? (
                    <button
                      type="button"
                      id="boost-campaign-btn"
                      onClick={handleCustomCheckout}
                      className="w-full sm:w-auto px-6 py-3 bg-orange-600 hover:bg-orange-500 active:bg-orange-650 text-white text-xs font-black rounded-lg transition-all duration-150 flex items-center justify-center gap-1.5 shadow-lg shadow-orange-500/20 cursor-pointer hover:scale-[1.01]"
                    >
                      Submit
                    </button>
                  ) : (
                    <button
                      type="button"
                      disabled
                      className="w-full sm:w-auto px-6 py-3 bg-zinc-800 text-zinc-500 text-xs font-bold rounded-lg cursor-not-allowed border border-zinc-850"
                    >
                      Enter Valid Quantity
                    </button>
                  )}
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Secure Checkout Seal Card */}
        <div className="bg-zinc-900/40 border border-zinc-900 p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 max-w-2xl mx-auto">
          <div className="flex items-center gap-3.5 text-left">
            <div className="w-10 h-10 rounded-lg bg-orange-600/10 border border-orange-500/20 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white font-sans">100% Secure Campaign Transfer</h4>
              <p className="text-[11px] text-zinc-400 leading-relaxed mt-0.5">
                Proprietary organic drip timing matches Reddit standard behavior. No password is ever required. Secure PCI-compliant Stripe checkouts.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 font-mono text-[9px] text-zinc-500">
            <span className="px-1.5 py-0.5 rounded bg-zinc-950 border border-zinc-900">Stripe encrypted</span>
            <span className="px-1.5 py-0.5 rounded bg-zinc-950 border border-zinc-900">Safe delivery</span>
          </div>
        </div>

      </div>
    </section>
  );
}
