import { Flame, Check, Sparkles, ShieldCheck } from "lucide-react";
import { KARMA_PACKAGES } from "../data";
import { KarmaPackage } from "../types";

interface PricingProps {
  onSelectPackage: (pkg: KarmaPackage) => void;
}

export default function Pricing({ onSelectPackage }: PricingProps) {
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
