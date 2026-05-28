import { useState } from "react";
import { Flame, Check, Sparkles, ShieldCheck, Sliders, Percent } from "lucide-react";
import { KARMA_PACKAGES, COMMENT_KARMA_PLANS, POST_KARMA_PLANS } from "../data";
import { KarmaPackage } from "../types";

interface PricingProps {
  onSelectPackage: (pkg: KarmaPackage) => void;
}

export default function Pricing({ onSelectPackage }: PricingProps) {
  // Indices corresponding to customizer selections:
  const [commentIndex, setCommentIndex] = useState(0); // Default to index 0 (10 Comment Karma)
  const [postIndex, setPostIndex] = useState(0); // Default to index 0 (15 Post Karma)
  const [redditUsername, setRedditUsername] = useState("");

  const selectedComment = COMMENT_KARMA_PLANS[commentIndex];
  const selectedPost = POST_KARMA_PLANS[postIndex];

  const totalKarma = selectedComment.karma + selectedPost.karma;
  const totalPrice = selectedComment.price + selectedPost.price;

  const handleCustomCheckout = () => {
    if (totalPrice === 0) return;

    const cleanUsername = redditUsername.trim().replace(/^u\//i, "");
    
    // Construct rich, professional order details to send to WhatsApp chat
    const message = `- *NEW CUSTOM REDDIT KARMA ORDER* -
----------------------------------------
- *Reddit Username:* ${cleanUsername ? `u/${cleanUsername}` : "_Not specified_"}
- *Comment Karma:* ${selectedComment.karma > 0 ? `+${selectedComment.karma} Karma ($${selectedComment.price})` : "None"}
- *Post Karma:* ${selectedPost.karma > 0 ? `+${selectedPost.karma} Karma ($${selectedPost.price})` : "None"}
- *Total Target Karma:* +${totalKarma} Points
- *Combined Price:* $${totalPrice.toFixed(2)}
----------------------------------------`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/923029626015?text=${encoded}`, "_blank");
  };

  return (
    <section className="bg-zinc-950 py-16 md:py-24 px-4 md:px-8 border-b border-zinc-900 scroll-mt-10" id="pricing">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-3.5 max-w-2xl mx-auto">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500 text-xs font-black uppercase tracking-widest font-mono">
            Service Campaigns
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight font-sans">
            Choose Your Karma Boost Package
          </h2>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Pick a safe campaign that fits your Reddit goal. Select comments, posts, or mixed ratios during checkout. Encrypted checkout managed securely by Stripe.
          </p>
        </div>

        {/* Interactive Custom Karma Campaign Builder Section */}
        <div className="bg-zinc-900/90 border border-orange-500/30 rounded-3xl p-6 md:p-8 max-w-4xl mx-auto shadow-2xl shadow-orange-500/5 relative overflow-hidden" id="custom-karma-builder-container">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative space-y-8">
            {/* Widget Title */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-805 pb-5">
              <div className="space-y-1 text-left">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-orange-500/10 text-orange-400 border border-orange-500/20 text-[10px] font-black uppercase tracking-wider font-mono">
                    Instant Customizer
                  </span>
                  <span className="flex items-center gap-1 text-zinc-300 text-xs font-bold">
                    <Sliders className="w-3.5 h-3.5 text-orange-550 animate-pulse" /> Real-Time Calculator
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-extrabold text-white font-sans tracking-tight">
                  Design Your Private Campaign
                </h3>
                <p className="text-zinc-200 text-xs font-medium">
                  Choose your Post and Comment Karma levels below. Click the levels on the visual bars or select from the dropdown guides.
                </p>
              </div>
              
              {/* Discount Tag */}
              <div className="bg-orange-600/15 border border-orange-500/35 rounded-xl px-4 py-3 flex items-center gap-2.5 shrink-0 self-start md:self-auto shadow-lg">
                <Percent className="w-4 h-4 text-orange-400" />
                <div className="text-left font-sans">
                  <span className="text-[10px] text-zinc-300 block font-mono uppercase font-black tracking-wider">Summed Promo</span>
                  <span className="text-xs text-white font-black font-sans">Flexible Ratio Checkout</span>
                </div>
              </div>
            </div>

            {/* Selector Bars Block */}
            <div className="space-y-6">
              {/* 1. Comment Karma Level Selector Bar */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-100 font-extrabold uppercase tracking-wider font-sans flex items-center gap-2 text-[13px]">
                    <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse"></span>
                    1. Comment Karma Selection Bar
                  </span>
                  <span className="text-orange-400 font-mono font-black text-sm bg-orange-500/10 border border-orange-500/20 rounded-lg px-3 py-1.5 shadow-sm">
                    {`+${selectedComment.karma} Karma ($${selectedComment.price})`}
                  </span>
                </div>
                
                {/* Horizontal segmented selection bar */}
                <div className="relative h-13 bg-zinc-950 border border-zinc-800 rounded-xl p-1 flex items-center gap-1">
                  <div 
                    className="absolute left-1 top-1 bottom-1 bg-gradient-to-r from-orange-600/30 to-amber-500/30 rounded-lg border border-orange-500/40 transition-all duration-300 shadow-inner"
                    style={{
                      width: `calc(${(commentIndex / (COMMENT_KARMA_PLANS.length - 1)) * 100}% - ${8 * (COMMENT_KARMA_PLANS.length - 1 - commentIndex) / COMMENT_KARMA_PLANS.length}px)`,
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
                        className={`flex-1 h-full rounded-lg text-xs font-bold transition-all duration-200 relative z-10 flex flex-col justify-center items-center py-1 ${
                          isSelected 
                            ? "text-white bg-zinc-900 border border-zinc-700 shadow-md font-black text-sm" 
                            : "text-zinc-300 hover:text-white hover:bg-zinc-900/30 font-medium"
                        }`}
                        id={`comment-level-btn-${index}`}
                      >
                        <span className="font-mono text-[12px] md:text-sm">{`+${plan.karma}`}</span>
                        <span className="text-[10px] opacity-100 font-mono mt-0.5 text-orange-400 font-bold">${plan.price}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Post Karma Level Selector Bar */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-100 font-extrabold uppercase tracking-wider font-sans flex items-center gap-2 text-[13px]">
                    <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse"></span>
                    2. Post Karma Selection Bar
                  </span>
                  <span className="text-orange-400 font-mono font-black text-sm bg-orange-500/10 border border-orange-500/20 rounded-lg px-3 py-1.5 shadow-sm">
                    {`+${selectedPost.karma} Karma ($${selectedPost.price})`}
                  </span>
                </div>
                
                {/* Horizontal segmented selection bar */}
                <div className="relative h-13 bg-zinc-950/90 border border-zinc-800 rounded-xl p-1 flex items-center gap-1">
                  <div 
                    className="absolute left-1 top-1 bottom-1 bg-gradient-to-r from-orange-600/30 to-amber-500/30 rounded-lg border border-orange-500/40 transition-all duration-300 shadow-inner"
                    style={{
                      width: `calc(${(postIndex / (POST_KARMA_PLANS.length - 1)) * 100}% - ${8 * (POST_KARMA_PLANS.length - 1 - postIndex) / POST_KARMA_PLANS.length}px)`,
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
                        className={`flex-1 h-full rounded-lg text-xs font-bold transition-all duration-200 relative z-10 flex flex-col justify-center items-center py-1 ${
                          isSelected 
                            ? "text-white bg-zinc-900 border border-zinc-700 shadow-md font-black text-sm" 
                            : "text-zinc-300 hover:text-white hover:bg-zinc-900/30 font-medium"
                        }`}
                        id={`post-level-btn-${index}`}
                      >
                        <span className="font-mono text-[11px] md:text-sm">{`+${plan.karma}`}</span>
                        <span className="text-[10px] opacity-100 font-mono mt-0.5 text-orange-400 font-bold">${plan.price}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Dropdown Menus for Customizing & Reddit Username Target */}
            <div className="space-y-4 bg-zinc-950/40 p-5 rounded-2xl border border-zinc-850">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 text-left">
                  <label className="block text-[12px] font-black text-zinc-100 uppercase tracking-widest font-mono">
                    Comment Karma Plan Dropdown
                  </label>
                  <select
                    value={commentIndex}
                    onChange={(e) => setCommentIndex(Number(e.target.value))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-500 font-sans cursor-pointer font-bold select-none"
                    id="comment-plan-dropdown"
                  >
                    {COMMENT_KARMA_PLANS.map((plan, idx) => (
                      <option key={idx} value={idx}>
                        {`${plan.karma} Comment Karma - $${plan.price.toFixed(2)}`}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="block text-[12px] font-black text-zinc-100 uppercase tracking-widest font-mono">
                    Post Karma Plan Dropdown
                  </label>
                  <select
                    value={postIndex}
                    onChange={(e) => setPostIndex(Number(e.target.value))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-500 font-sans cursor-pointer font-bold select-none"
                    id="post-plan-dropdown"
                  >
                    {POST_KARMA_PLANS.map((plan, idx) => (
                      <option key={idx} value={idx}>
                        {`${plan.karma} Post Karma - $${plan.price.toFixed(2)}`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Reddit Username target configuration of custom selection */}
              <div className="space-y-1.5 text-left border-t border-zinc-850/60 pt-4">
                <label className="block text-[12px] font-black text-zinc-100 uppercase tracking-widest font-mono">
                  Target Reddit Username (Highly Recommended)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 font-mono text-sm font-bold">u/</span>
                  <input
                    type="text"
                    placeholder="reddit_username"
                    value={redditUsername}
                    onChange={(e) => setRedditUsername(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800/85 rounded-xl pl-9 pr-4 py-3 text-sm text-white focus:outline-none focus:border-orange-500 font-mono font-bold"
                    id="custom-order-reddit-username"
                  />
                </div>
                <p className="text-[11px] text-zinc-300 font-medium">
                  Entering your Reddit handle allows our live WhatsApp agents to instantly verify account compatibility for comment auto-moderation threshold checks.
                </p>
              </div>
            </div>

            {/* Price Output & Checkout Container */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 md:p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
              
              {/* Real-time sum indicators */}
              <div className="space-y-2 text-left w-full md:w-auto">
                <span className="text-[11px] font-mono font-black text-zinc-300 uppercase tracking-widest block font-bold">Combined Estimate</span>
                
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300 font-mono">
                      +{totalKarma}
                    </span>
                    <span className="text-xs text-white uppercase font-black font-sans">Total Karma</span>
                  </div>
                  
                  {totalKarma > 0 && (
                    <div className="text-xs text-white font-sans font-black flex items-center gap-1.5 bg-zinc-900 border border-zinc-750 rounded-lg px-2.5 py-1 shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span>
                        {selectedComment.karma > 0 ? `${selectedComment.karma} Comment` : ""}
                        {selectedComment.karma > 0 && selectedPost.karma > 0 ? " + " : ""}
                        {selectedPost.karma > 0 ? `${selectedPost.karma} Post` : ""}
                      </span>
                    </div>
                  )}
                </div>

                <div className="text-xs text-zinc-300 font-semibold leading-relaxed">
                  Includes personalized system safety audits, safe drip timing mechanisms, and complete money back guarantees.
                </div>
              </div>

              {/* Price Tag and CTA Action buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto shrink-0 justify-end">
                <div className="text-center sm:text-right">
                  <span className="text-[11px] text-zinc-300 font-mono block uppercase font-black tracking-wider">Real-Time Price</span>
                  <div className="flex items-baseline justify-center sm:justify-end gap-1 select-none">
                    <span className="text-4xl md:text-5xl font-black text-orange-400 font-mono tracking-tight drop-shadow-sm">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="w-full sm:w-auto">
                  {totalPrice > 0 ? (
                    <button
                      type="button"
                      onClick={handleCustomCheckout}
                      className="w-full sm:w-auto px-8 py-4 bg-orange-600 hover:bg-orange-500 active:bg-orange-650 text-white text-sm font-extrabold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 cursor-pointer hover:scale-[1.01]"
                      id="custom-boost-btn"
                    >
                      Boost Custom Account
                    </button>
                  ) : (
                    <button
                      type="button"
                      disabled
                      className="w-full sm:w-auto px-8 py-4 bg-zinc-800 text-zinc-500 text-sm font-bold rounded-xl cursor-not-allowed border border-zinc-850"
                      id="custom-boost-btn-disabled"
                    >
                      Select At Least One Level
                    </button>
                  )}
                </div>

              </div>

            </div>

          </div>
        </div>

        {/* Pricing Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {KARMA_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative rounded-2xl flex flex-col transition-all duration-200 border bg-zinc-900/60 p-6 ${pkg.isPopular ? "border-orange-500 shadow-xl shadow-orange-500/5 bg-zinc-900" : "border-zinc-850 hover:border-zinc-805"}`}
              id={`package-card-${pkg.id}`}
            >
              {/* Highlight Badging for Sales */}
              {pkg.isPopular && (
                <div className="absolute top-0 right-6 -translate-y-1/2 bg-gradient-to-r from-orange-600 to-orange-500 px-3.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-white flex items-center gap-1 shadow-lg shadow-orange-500/20">
                  <Flame className="w-3 h-3 text-white fill-current" />
                  <span>Most Popular Boost</span>
                </div>
              )}

              {pkg.savings && !pkg.isPopular && (
                <div className="absolute top-0 right-6 -translate-y-1/2 bg-zinc-800 border border-zinc-700 px-3 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest text-orange-400">
                  {pkg.savings}
                </div>
              )}

              {/* Package Content */}
              <div className="space-y-4 mb-6">
                <div>
                  <h3 className="text-lg font-bold text-white font-sans">{pkg.name}</h3>
                  <span className="text-[10px] text-zinc-500 font-mono tracking-widest block uppercase mt-0.5">Campaign Type</span>
                </div>

                <div className="flex items-baseline gap-1 py-1.5 border-b border-zinc-850 pb-4">
                  <span className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400 font-mono">
                    +{pkg.karmaCount}
                  </span>
                  <span className="text-xs text-zinc-400 font-semibold uppercase tracking-wider font-sans">Karma</span>
                </div>

                <div className="flex items-baseline gap-1 select-none">
                  <span className="text-3xl font-black text-orange-500 font-mono">${pkg.price.toFixed(2)}</span>
                  <span className="text-zinc-500 text-xs font-mono">/ single campaign</span>
                </div>

                {/* Features Checklist */}
                <ul className="space-y-2.5 pt-2 text-xs text-zinc-330 text-left">
                  {pkg.features.map((feat, index) => (
                    <li key={index} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Purchase action */}
              <div className="mt-auto pt-6 border-t border-zinc-850/60">
                <button
                  onClick={() => onSelectPackage(pkg)}
                  className={`w-full py-3 rounded-xl text-xs font-extrabold transition duration-200 cursor-pointer text-center ${pkg.isPopular ? "bg-orange-600 hover:bg-orange-500 text-white shadow-lg" : "bg-zinc-800 hover:bg-zinc-750 text-zinc-200"}`}
                  id={`btn-purchase-${pkg.id}`}
                >
                  Boost Account Now
                </button>
                <div className="text-center mt-2.5 flex items-center justify-center gap-1.5 text-[9px] text-zinc-550 font-mono">
                  <ShieldCheck className="w-3 h-3 text-emerald-500" />
                  <span>SECURE STRIPE GATEWAY</span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Secure Checkout Seal Card */}
        <div className="bg-zinc-900/40 border border-zinc-850 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-xl bg-orange-600/10 border border-orange-500/20 flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white font-sans">100% Secure Cryptographic Transfer</h4>
              <p className="text-xs text-zinc-400 leading-relaxed mt-0.5">
                We use proprietary organic scheduling algorithm so Reddit systems can verify safe upvotes without account flags. Since 2021, we have successfully completed 12k+ order schedules.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 font-mono text-[10px] text-zinc-500">
            <span className="px-2 py-1 rounded bg-zinc-950 border border-zinc-850">Stripe Billing</span>
            <span className="px-2 py-1 rounded bg-zinc-950 border border-zinc-850">No Password Required</span>
          </div>
        </div>

      </div>
    </section>
  );
}
