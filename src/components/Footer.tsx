import { Flame, ShieldCheck, Heart, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";

interface FooterProps {
  onOpenTrustModal: (type: "about" | "privacy" | "terms") => void;
}

export default function Footer({ onOpenTrustModal }: FooterProps) {
  const [onlineCount, setOnlineCount] = useState(1);

  useEffect(() => {
    let sessionId = sessionStorage.getItem("rkb_session_id");
    if (!sessionId) {
      sessionId = "sess-" + Math.random().toString(36).substring(2) + Date.now().toString(36);
      sessionStorage.setItem("rkb_session_id", sessionId);
    }

    const sendHeartbeat = async () => {
      try {
        const response = await fetch("/api/heartbeat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sessionId }),
        });
        if (response.ok) {
          const data = await response.json();
          if (typeof data.activeCount === "number") {
            setOnlineCount(data.activeCount);
          }
        }
      } catch (err) {
        console.error("Failed to update active visitors state:", err);
      }
    };

    // Initial trigger
    sendHeartbeat();

    // Rapid heartbeat every 10s
    const interval = setInterval(sendHeartbeat, 10000);
    return () => clearInterval(interval);
  }, []);

  const scrollSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 text-zinc-400 text-xs py-12 px-4 md:px-8 font-sans" id="footer-panel">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-zinc-900 text-left">
        
        {/* Brand Information Column */}
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center">
              <Flame className="w-4 h-5 text-black fill-black" />
            </div>
            <span className="font-extrabold text-white text-sm tracking-tight font-sans">
              RedditKarma<span className="text-orange-500">Boost</span>
            </span>
          </div>
          <p className="text-zinc-500 text-xs leading-relaxed max-w-sm">
            RedditKarmaBoost.com is the ultimate, secure solution to level up your account authority safely. Empowering startup entrepreneurs, builders, and content marketers since 2021.
          </p>
          <div className="text-[10px] text-zinc-550 space-y-1">
            <span className="block">📞 WhatsApp Hot Line: <strong>+923029626015</strong></span>
            <span className="block">📧 Support Email: <strong className="text-zinc-400">support@redditkarmaboost.com</strong></span>
          </div>
          <div className="flex items-center gap-2 bg-emerald-500/10 dark:bg-emerald-950/20 border border-emerald-500/20 dark:border-emerald-900/30 px-3 py-1.5 rounded-lg w-fit mt-2 shadow-sm" id="footer-online-users">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-mono tracking-wide text-zinc-500 dark:text-zinc-400 uppercase font-black flex items-center gap-1">
              Live Status: <strong className="text-emerald-600 dark:text-emerald-450 font-black">{onlineCount}</strong> Users Active Online
            </span>
          </div>
        </div>

        {/* Quick Navigate Column (Shifted from Top Header) */}
        <div className="md:col-span-2 space-y-3.5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">Navigate</h4>
          <ul className="space-y-2 text-zinc-500 font-medium">
            <li>
              <button onClick={() => scrollSection("pricing")} className="hover:text-white transition-colors cursor-pointer text-left">
                Packages
              </button>
            </li>
            <li>
              <button onClick={() => scrollSection("reviews")} className="hover:text-white transition-colors cursor-pointer text-left">
                Client Reviews
              </button>
            </li>
            <li>
              <button onClick={() => scrollSection("faqs")} className="hover:text-white transition-colors cursor-pointer text-left">
                PAA FAQs
              </button>
            </li>
          </ul>
        </div>

        {/* Trust Pages Modal Activator Column */}
        <div className="md:col-span-2 space-y-3.5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">Trust & Policies</h4>
          <ul className="space-y-2 text-zinc-500 font-medium">
            <li>
              <button onClick={() => onOpenTrustModal("about")} className="hover:text-white transition-colors cursor-pointer text-left">
                About Us
              </button>
            </li>
            <li>
              <button onClick={() => onOpenTrustModal("privacy")} className="hover:text-white transition-colors cursor-pointer text-left">
                Privacy Policy
              </button>
            </li>
            <li>
              <button onClick={() => onOpenTrustModal("terms")} className="hover:text-white transition-colors cursor-pointer text-left">
                Terms of Service
              </button>
            </li>
          </ul>
        </div>

        {/* Pay security Column */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">Security Verified</h4>
          <div className="space-y-2 text-zinc-550 leading-relaxed text-[11px]">
            <p>
              We process all transactions securely through Stripe billing portals. No credit card credentials are stored on our servers.
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-850 text-orange-400 font-bold text-[9px] font-mono">STRIPE ENCRYPTED</span>
              <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-850 text-white font-bold text-[9px] font-mono">PCI COMPLIANT</span>
            </div>
          </div>
        </div>

      </div>

      {/* Disclaimers & Copyright section */}
      <div className="max-w-7xl mx-auto pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] text-zinc-600">
        <div className="space-y-2 text-left max-w-xl">
          <p className="leading-relaxed">
            © {new Date().getFullYear()} RedditKarmaBoost.com. All Rights Reserved. Managed by registered organic agency network.
          </p>
          <p className="text-[9px] leading-relaxed block text-zinc-700">
            <strong>Legal Disclaimer:</strong> RedditKarmaBoost.com is an independent social agency providing genuine high-reputation engagement strategy campaigns. We have no direct affiliation, sponsorship, endorsement, or approval from Reddit Inc., Reddit.com, or secondary Reddit corporate trademarks. All Reddit assets, logos, and terms used are owned strictly by Reddit Inc.
          </p>
        </div>

        <div className="flex items-center gap-1.5 shrink-0 bg-zinc-900/40 p-2 border border-zinc-900 rounded-xl">
          <ShieldCheck className="w-4 h-4 text-orange-500" />
          <span>Fully Secure SSL Encrypted Site (HTTPS)</span>
        </div>
      </div>
    </footer>
  );
}
