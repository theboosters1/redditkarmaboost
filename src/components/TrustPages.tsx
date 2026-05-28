import { X } from "lucide-react";

interface TrustModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "about" | "privacy" | "terms";
}

export default function TrustPages({ isOpen, onClose, type }: TrustModalProps) {
  if (!isOpen) return null;

  const content = {
    about: {
      title: "About Reddit Karma Boost",
      subtitle: "The pioneers of safe, organic social authority campaigns",
      body: (
        <div className="space-y-4 text-gray-300">
          <p>
            Welcome to <strong>RedditKarmaBoost.com</strong>, your professional partner in establishing a trusted, high-authority presence on Reddit. We serve developers, SaaS founders, marketing agencies, and everyday users who need to build initial credibility and bypass aggressive spam thresholds.
          </p>
          <p>
            Historically, new accounts or those with lower Karma face strict posting limits. Important communities like <code>r/Cryptocurrency</code>, <code>r/SaaS</code>, and <code>r/AskReddit</code> automatically remove submissions from low-authority posters. Our safe, organic distribution system provides you with authentic comment and post interactions to lift your limits seamlessly.
          </p>
          <div className="border-l-4 border-orange-500 pl-4 py-1 my-4 bg-orange-950/20 rounded-r">
            <h4 className="text-orange-400 font-semibold mb-1">Our Anti-Spam Commitment</h4>
            <p className="text-sm">
              We never participate in robotic Sybil attacks or automatic bot spam campaigns. Everything we do relies on authentic account interactions, real session telemetry, and organically spaced drip-feeding to safeguard your Reddit standing.
            </p>
          </div>
          <p>
            With secure payments processed by Stripe and instant customer support over WhatsApp, we ensure your purchase is safe, predictable, and fully guaranteed.
          </p>
        </div>
      )
    },
    privacy: {
      title: "Privacy Policy",
      subtitle: "Last Updated: May 2026",
      body: (
        <div className="space-y-4 text-gray-300 text-sm">
          <p>
            At RedditKarmaBoost.com, we respect your privacy and process all your information with high secrecy guidelines.
          </p>
          <h4 className="text-white font-semibold text-base mt-4">1. Information We Collect</h4>
          <p>
            Unlike other social services, <strong>we never ask for your Reddit account password, email address, or API access keys</strong>. The only Reddit information we require is your active Reddit username (e.g., <code>u/UserName</code>) so our system knows where safe engagement campaigns should target.
          </p>
          <h4 className="text-white font-semibold text-base mt-4">2. Cookies & Analytics</h4>
          <p>
            We use light security cookies to keep your interactive Stripe checkout state stable and save your order tracking details locally in your browser. We do not sell or trade your site interactions to third-party advertising companies.
          </p>
          <h4 className="text-white font-semibold text-base mt-4">3. Stripe Secure Payments</h4>
          <p>
            When you checkout, your card details are processed directly by Stripe inside their secure sandboxes. RedditKarmaBoost never stores, observes, or caches your sensitive biological, cryptographic, or payment details.
          </p>
          <h4 className="text-white font-semibold text-base mt-4">4. WhatsApp Live Support</h4>
          <p>
            When matching your support ticket via the +923029626015 line, we only use your phone number to assist with order status checks. No marketing prompts or SMS campaigns will ever target you.
          </p>
        </div>
      )
    },
    terms: {
      title: "Terms of Service",
      subtitle: "Last Updated: May 2026",
      body: (
        <div className="space-y-4 text-gray-300 text-sm">
          <p>
            By purchasing service packages from RedditKarmaBoost.com, you agree to the following terms and guidelines:
          </p>
          <h4 className="text-white font-semibold text-base mt-4">1. Scope of Service</h4>
          <p>
            RedditKarmaBoost.com provides customizable organic growth campaigns intended to safely deliver upvote engagement points (Karma) corresponding to the purchased package.
          </p>
          <h4 className="text-white font-semibold text-base mt-4">2. Delivery Commitments & Safe Drip</h4>
          <p>
            Delivery speed is specified for each package (ranging from 12 hours up to 5 days for larger packages). Because sudden massive spikes look unnatural to Reddit anti-abuse mechanics, we dynamically queue, distribute, and drip-feed actions. Slight organic delays are intended to guarantee safe, long-term stability.
          </p>
          <h4 className="text-white font-semibold text-base mt-4">3. Refund Warranties</h4>
          <p>
            We issue full refunds processed via Stripe transactions if we are unable to start or complete your ordered growth campaign within a reasonable window of the estimated delivery duration.
          </p>
          <h4 className="text-white font-semibold text-base mt-4">4. Customer Conduct & Proper Username</h4>
          <p>
            The buyer is solely responsible for specifying the correct, valid Reddit username. We cannot transfer Karma points once a safe campaign launches under a misspelled target account.
          </p>
        </div>
      )
    }
  };

  const activeContent = content[type];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in" id={`modal-${type}`}>
      <div className="relative w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl shadow-orange-500/5 max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-600/10 to-zinc-900 p-6 border-b border-zinc-800 flex items-start justify-between sticky top-0 bg-opacity-95 backdrop-blur-md">
          <div>
            <h3 className="text-xl font-bold text-white font-sans">{activeContent.title}</h3>
            <p className="text-sm text-zinc-400 mt-1">{activeContent.subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
            id={`close-modal-${type}`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {activeContent.body}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-800 bg-zinc-950/50 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm font-semibold text-white bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-650 rounded-xl transition duration-200"
            id={`modal-button-close-${type}`}
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
}
