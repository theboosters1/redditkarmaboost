import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Pricing from "./components/Pricing";
import Reviews from "./components/Reviews";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import TrustPages from "./components/TrustPages";
import CheckoutModal from "./components/CheckoutModal";
import WhatsAppSupport from "./components/WhatsAppSupport";
import { KarmaPackage, Order } from "./types";
import { ArrowRight } from "lucide-react";

export default function App() {
  const [selectedPackage, setSelectedPackage] = useState<KarmaPackage | null>(null);
  const [trustModalType, setTrustModalType] = useState<"about" | "privacy" | "terms" | null>(null);
  const [recentOrderAlert, setRecentOrderAlert] = useState<Order | null>(null);

  const handleSelectPackage = (pkg: KarmaPackage) => {
    setSelectedPackage(pkg);
  };

  const handleOrderCreated = (order: Order) => {
    setRecentOrderAlert(order);
  };

  const scrollSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans antialiased overflow-x-hidden" id="app-root-container">
      {/* Top Header Navigation */}
      <Navbar
        onOpenTrustModal={(type) => setTrustModalType(type)}
      />

      {/* Hero section */}
      <Hero onGetStartedClick={() => scrollSection("pricing")} />

      {/* Quick Trust Highlights Banner */}
      <div className="bg-zinc-900/55 border-b border-zinc-900 py-4 px-4 md:px-8 relative z-20 select-none">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2.5">
            <span className="flex items-center gap-1.5 p-1 px-2.5 rounded bg-zinc-950 border border-zinc-800 text-[10px] font-bold text-orange-400 font-mono tracking-widest uppercase">
              How it works
            </span>
            <span className="text-zinc-300 font-medium text-xs md:text-sm">
              Level up account reputation in 3 easy steps: Choose Kit → Confirm Reddit Account → Secure Drip-feed Begins.
            </span>
          </div>
          <button
            onClick={() => scrollSection("pricing")}
            className="text-xs text-orange-500 font-bold flex items-center justify-center gap-1 hover:text-orange-400 transition cursor-pointer"
            id="highlight-banner-cta"
          >
            <span>Learn More</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Sections */}
      <main className="flex-1">
        
        {/* Recent Checkout alert widget (Toast like feedback) */}
        {recentOrderAlert && (
          <div className="max-w-4xl mx-auto pt-4 px-4" id="recent-order-alert-panel">
            <div className="bg-orange-655/10 border border-orange-500/20 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left">
              <div>
                <strong className="text-orange-400 text-xs block font-mono uppercase tracking-widest">Active Campaign Launching</strong>
                <span className="text-sm text-white font-bold block mt-1">
                  Organic boost for u/{recentOrderAlert.redditUsername} ({recentOrderAlert.packageName}) initialized
                </span>
                <span className="text-xs text-zinc-400 block mt-0.5">
                  Secure Ticket ID: <code className="text-white font-mono font-bold bg-zinc-950 px-1.5 py-0.5 rounded border border-zinc-850">{recentOrderAlert.id}</code>
                </span>
              </div>
              <a
                href={`https://wa.me/923029626015?text=Hi%2C%20I%20just%20placed%20order%20${recentOrderAlert.id}%20for%20u%2F${recentOrderAlert.redditUsername}.%20Please%2520verify%2520compatibility!`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition duration-200 cursor-pointer text-center flex items-center justify-center gap-1.5"
                id="alert-scroll-tracker-btn"
              >
                Message Support on WhatsApp
              </a>
            </div>
          </div>
        )}

        {/* Pricing Tables section */}
        <Pricing onSelectPackage={handleSelectPackage} />

        {/* Client success stories section */}
        <Reviews />

        {/* People Also Asked FAQs section */}
        <FAQ />

      </main>

      {/* Trust modals overlays */}
      <TrustPages
        isOpen={trustModalType !== null}
        onClose={() => setTrustModalType(null)}
        type={trustModalType || "about"}
      />

      {/* Checkout Processing Overlay */}
      <CheckoutModal
        isOpen={selectedPackage !== null}
        onClose={() => setSelectedPackage(null)}
        selectedPackage={selectedPackage}
        onOrderCreated={handleOrderCreated}
      />

      {/* WhatsApp FAB Support Assistant widget */}
      <WhatsAppSupport />

      {/* Site Footer policy information */}
      <Footer
        onOpenTrustModal={(type) => setTrustModalType(type)}
      />
    </div>
  );
}
