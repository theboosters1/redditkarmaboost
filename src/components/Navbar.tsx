import { Flame, Sun, Moon } from "lucide-react";

interface NavbarProps {
  onOpenTrustModal: (type: "about" | "privacy" | "terms") => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onSelectFreeVouch: () => void;
}

export default function Navbar({ onOpenTrustModal, isDarkMode, onToggleTheme, onSelectFreeVouch }: NavbarProps) {
  const scrollSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-zinc-950/90 backdrop-blur-md border-b border-zinc-900 px-4 md:px-8 py-3.5 flex items-center justify-between" id="navbar-header">
      {/* Brand logo */}
      <div className="flex items-center gap-2 cursor-pointer select-none" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-orange-600 to-orange-400 flex items-center justify-center shadow-lg shadow-orange-500/10">
          <Flame className="w-5 h-5 text-zinc-950 font-black fill-zinc-950" />
        </div>
        <div>
          <span className="font-extrabold text-sm md:text-base text-white tracking-tight flex items-center gap-1 font-sans">
            RedditKarma<span className="text-orange-500">Boost</span>
          </span>
          <span className="text-[9px] text-zinc-500 block font-mono -mt-1 tracking-wider uppercase">RedditKarmaBoost.com</span>
        </div>
      </div>

      {/* Shifted top menu to the footer */}

      {/* Primary Actions */}
      <div className="flex items-center gap-2.5">
        <button
          onClick={onToggleTheme}
          className="p-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-center border border-zinc-800"
          id="theme-toggle"
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDarkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-indigo-400" />}
        </button>

        <button
          onClick={onSelectFreeVouch}
          className="px-3.5 py-1.5 md:px-4 md:py-2 bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white font-extrabold rounded-xl text-[11px] md:text-xs shadow-lg cursor-pointer relative overflow-hidden animate-get-karma-btn-glow"
          id="nav-btn-buy"
        >
          {/* Radiant sweep shimmer */}
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-vouch-shimmer pointer-events-none" />
          
          <span className="relative z-10 flex items-center gap-1">
            🔥 Get Free Karma
          </span>
        </button>
      </div>
    </header>
  );
}
