import React, { useState, useEffect } from "react";
import { X, Check, ShieldAlert, CreditCard, ArrowRight, Clipboard, MessageSquare, Flame } from "lucide-react";
import { KarmaPackage, Order } from "../types";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPackage: KarmaPackage | null;
  onOrderCreated: (order: Order) => void;
}

export default function CheckoutModal({ isOpen, onClose, selectedPackage, onOrderCreated }: CheckoutModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [redditUsername, setRedditUsername] = useState("");
  const [targetType, setTargetType] = useState<"mix" | "post" | "comment">("mix");
  const [copied, setCopied] = useState(false);

  // Stripe form fields
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardName, setCardName] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setError("");
      // Reset details when reopening
      setCardNumber("");
      setExpiry("");
      setCvv("");
      setCardName("");
      if (selectedPackage) {
        setTargetType(selectedPackage.karmaType);
      }
    }
  }, [isOpen, selectedPackage]);

  if (!isOpen || !selectedPackage) return null;

  // Handler for custom card number spacing
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    const formatted = value.replace(/(\d{4})(?=\d)/g, "$1 ").substring(0, 19);
    setCardNumber(formatted);
  };

  // Handler for expiry spacing (MM/YY)
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    const formatted = value.substring(0, 4);
    if (formatted.length > 2) {
      setExpiry(`${formatted.substring(0, 2)}/${formatted.substring(2)}`);
    } else {
      setExpiry(formatted);
    }
  };

  const handleUsernameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!redditUsername.trim()) {
      setError("Please key in your Reddit Username.");
      return;
    }
    const cleanUser = redditUsername.trim().replace(/^u\//, "");
    if (cleanUser.length < 3) {
      setError("Reddit usernames must contain at least 3 characters.");
      return;
    }
    setError("");
    setStep(2);
  };

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Simulate standard card verification before API request
    if (cardNumber.replace(/\s/g, "").length < 15) {
      setError("Invalid credit card length. Please check digits.");
      setLoading(false);
      return;
    }
    if (expiry.length < 5) {
      setError("Please specify card expiration as MM/YY.");
      setLoading(false);
      return;
    }
    if (cvv.length < 3) {
      setError("Invalid CVV format.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          redditUsername,
          packageName: selectedPackage.name,
          packagePrice: selectedPackage.price,
          redditKarmaCount: selectedPackage.karmaCount,
          redditKarmaType: targetType
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Execution failed.");
      }

      if (data.mode === "stripe" && data.checkoutUrl) {
        // Redirection to genuine Stripe hosted portal
        window.location.href = data.checkoutUrl;
        return;
      }

      // If we are operating in high-fidelity sandbox / demo fallback mode:
      const finalizeRes = await fetch("/api/finalize-demo-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: data.order.id })
      });

      const finalizeData = await finalizeRes.json();
      if (finalizeRes.ok) {
        const orderInfo = finalizeData.order;
        setCreatedOrder(orderInfo);
        onOrderCreated(orderInfo);
        setStep(3);
      } else {
        throw new Error(finalizeData.error || "Order finalization collapsed");
      }
    } catch (err: any) {
      setError(err?.message || "Payment gateway connection issue. Please retry.");
    } finally {
      setLoading(false);
    }
  };

  const copyOrderId = () => {
    if (createdOrder) {
      navigator.clipboard.writeText(createdOrder.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fade-in" id="checkout-modal-backdrop">
      <div className="relative w-full max-w-lg bg-zinc-900 border border-zinc-850 rounded-2xl shadow-2xl overflow-hidden text-left max-h-[90vh] flex flex-col">
        {/* Header section status indicator */}
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between bg-zinc-950/40 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-600/10 flex items-center justify-center border border-orange-500/20">
              <Flame className="w-5 h-5 text-orange-500 animate-pulse" />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg font-sans">Secure Checkout</h3>
              <p className="text-zinc-400 text-xs mt-0.5">RedditKarmaBoost.com • Secured & Guaranteed</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
            id="btn-close-checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Selected Package Spotlight Info */}
        <div className="bg-zinc-950 px-6 py-3 border-b border-zinc-850 flex items-center justify-between text-xs text-zinc-400 shrink-0">
          <span>Targeting Package: <strong className="text-white font-medium">{selectedPackage.name}</strong></span>
          <span className="text-orange-400 font-bold font-mono text-sm">${selectedPackage.price.toFixed(2)}</span>
        </div>

        {/* Step Indicator Panel */}
        <div className="px-6 py-3 bg-zinc-900/50 border-b border-zinc-850 flex items-center justify-between text-xs font-mono select-none shrink-0">
          <span className={`flex items-center gap-2 ${step >= 1 ? "text-orange-500 font-bold" : "text-zinc-500"}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step > 1 ? "bg-orange-500 text-black font-extrabold" : "border border-orange-500/50"}`}>
              {step > 1 ? "✓" : "1"}
            </span> Account
          </span>
          <div className="h-px bg-zinc-800 flex-1 mx-4"></div>
          <span className={`flex items-center gap-2 ${step >= 2 ? "text-orange-500 font-bold" : "text-zinc-400"}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step > 2 ? "bg-orange-500 text-black font-extrabold" : "border " + (step >= 2 ? "border-orange-500/50" : "border-zinc-700")}`}>
              {step > 2 ? "✓" : "2"}
            </span> Secure Pay
          </span>
          <div className="h-px bg-zinc-800 flex-1 mx-4"></div>
          <span className={`flex items-center gap-2 ${step === 3 ? "text-orange-500 font-bold" : "text-zinc-550"}`}>
            <span className="w-5 h-5 rounded-full border border-zinc-700 flex items-center justify-center text-[10px]">
              3
            </span> Launch
          </span>
        </div>

        {/* Main interactive form container */}
        <div className="p-6 overflow-y-auto flex-1 bg-gradient-to-b from-zinc-900 to-zinc-950">
          {error && (
            <div className="p-4 mb-4 bg-red-950/30 border border-red-900/50 text-red-400 rounded-xl text-sm flex items-start gap-2 animate-shake" id="checkout-badge-error">
              <ShieldAlert className="w-5 h-5 shrink-0 text-red-500" />
              <div className="leading-tight">{error}</div>
            </div>
          )}

          {/* STEP 1: Account setup form */}
          {step === 1 && (
            <form onSubmit={handleUsernameSubmit} className="space-y-5" id="form-step-1">
              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2 font-mono">
                  Reddit Username
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 font-bold font-sans">
                    u/
                  </span>
                  <input
                    type="text"
                    required
                    maxLength={30}
                    placeholder="SuperRedditUser"
                    value={redditUsername}
                    onChange={(e) => setRedditUsername(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 transition-colors py-3.5 focus:ring-1 focus:ring-orange-500/25"
                    id="input-reddit-username"
                  />
                </div>
                <p className="text-[11px] text-zinc-500 mt-2 leading-relaxed">
                  Provide your username correctly. No account password or authorization keys are required. Keep your account safe!
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2.5 font-mono">
                  Preferred Target Karma Mix
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setTargetType("mix")}
                    className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all text-center ${targetType === "mix" ? "bg-orange-600/10 border-orange-500 text-white shadow-lg" : "bg-zinc-950 border-zinc-850 text-zinc-400 hover:border-zinc-800"}`}
                  >
                    <span className="font-bold">Balanced Mix</span>
                    <span className="text-[9px] text-zinc-500 font-normal">Best for credibility</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setTargetType("post")}
                    className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all text-center ${targetType === "post" ? "bg-orange-600/10 border-orange-500 text-white shadow-lg" : "bg-zinc-950 border-zinc-850 text-zinc-400 hover:border-zinc-800"}`}
                  >
                    <span className="font-bold">Post Focus</span>
                    <span className="text-[9px] text-zinc-500 font-normal">Ideal for posters</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setTargetType("comment")}
                    className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all text-center ${targetType === "comment" ? "bg-orange-600/10 border-orange-500 text-white shadow-lg" : "bg-zinc-950 border-zinc-850 text-zinc-400 hover:border-zinc-800"}`}
                  >
                    <span className="font-bold">Comment Focus</span>
                    <span className="text-[9px] text-zinc-500 font-normal">Evade posting limits</span>
                  </button>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-orange-600 hover:bg-orange-500 active:bg-orange-550 text-white font-bold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-orange-500/10 cursor-pointer"
                  id="btn-next-step1"
                >
                  Proceed to Secure Checkout <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: Credit Card Payment Mimic Form */}
          {step === 2 && (
            <form onSubmit={handleCheckoutSubmit} className="space-y-4" id="form-step-2">
              <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-orange-400" />
                  <div>
                    <span className="text-xs text-zinc-400 block font-mono uppercase tracking-widest">Selected Campaign</span>
                    <span className="text-sm text-white font-bold">{selectedPackage.name} ({selectedPackage.karmaCount} Karma)</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-zinc-400 block uppercase font-mono">Invoice</span>
                  <span className="text-sm text-white font-bold font-mono">${selectedPackage.price.toFixed(2)}</span>
                </div>
              </div>

              <div className="text-zinc-500 text-xs font-sans mb-3 text-center">
                🛡️ Processed via encrypted SSL using bank-grade secure protocols.
              </div>

              <div className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-zinc-450 uppercase tracking-widest mb-1.5 font-mono">Card Holder Name</label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-white placeholder-zinc-700 font-sans text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20"
                    id="payment-card-name"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-450 uppercase tracking-widest mb-1.5 font-mono">Card Number</label>
                  <input
                    type="text"
                    required
                    placeholder="4111 2222 3333 4444"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-white placeholder-zinc-700 font-mono text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20"
                    id="payment-card-number"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-450 uppercase tracking-widest mb-1.5 font-mono">Expiry Code</label>
                    <input
                      type="text"
                      required
                      placeholder="MM/YY"
                      value={expiry}
                      onChange={handleExpiryChange}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-white placeholder-zinc-700 font-mono text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 text-center"
                      id="payment-card-expiry"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-450 uppercase tracking-widest mb-1.5 font-mono">CVV Security</label>
                    <input
                      type="password"
                      required
                      maxLength={4}
                      placeholder="123"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-white placeholder-zinc-700 font-mono text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 text-center"
                      id="payment-card-cvv"
                    />
                  </div>
                </div>
              </div>

              {/* Payment badging */}
              <div className="pt-2 flex items-center justify-between border-t border-zinc-850 mt-4 text-[10px] text-zinc-500 font-mono">
                <span>SSL Encrypted</span>
                <span className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 rounded bg-zinc-800 text-white font-sans text-[8px] tracking-wider uppercase font-semibold">Stripe Secure</span>
                  <span className="px-1.5 py-0.5 rounded bg-zinc-800 text-white font-sans text-[8px] tracking-wider uppercase font-semibold">Visa</span>
                  <span className="px-1.5 py-0.5 rounded bg-zinc-800 text-white font-sans text-[8px] tracking-wider uppercase font-semibold">MasterCard</span>
                </span>
              </div>

              {/* Action buttons */}
              <div className="pt-4 grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="py-3 bg-zinc-800 hover:bg-zinc-750 text-white font-semibold rounded-xl text-xs text-center transition-colors cursor-pointer"
                  id="checkout-btn-back"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="col-span-2 py-3 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 active:from-orange-600 active:to-orange-500 text-white font-bold rounded-xl text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-orange-500/10 cursor-pointer disabled:opacity-50"
                  id="checkout-btn-auth-payment"
                >
                  {loading ? (
                    <span className="flex items-center gap-1.5">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                      Encrypting...
                    </span>
                  ) : (
                    <span>Authorize Secure Pay</span>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Successful order completion callback showcase */}
          {step === 3 && createdOrder && (
            <div className="space-y-6 text-center py-4" id="checkout-completed-panel">
              <div className="w-16 h-16 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto animate-bounce animate-duration-1000">
                <Check className="w-8 h-8 text-green-450" />
              </div>

              <div>
                <h4 className="text-xl font-bold text-white font-sans">Payment Authorized!</h4>
                <p className="text-zinc-400 text-sm mt-1 leading-relaxed">
                  Your organic Karma boost campaign has entered our secure server queue.
                </p>
              </div>

              {/* Order ID Spotlight card */}
              <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 text-left space-y-3 font-sans">
                <div className="flex items-center justify-between border-b border-zinc-850 pb-2 text-xs">
                  <span className="text-zinc-500">Secure Order Ticket</span>
                  <span className="text-orange-400 font-bold font-mono">{createdOrder.id}</span>
                </div>

                <div className="grid grid-cols-2 gap-y-2.5 text-xs text-zinc-300">
                  <div>
                    <span className="text-zinc-500 block">Target Username</span>
                    <strong className="text-white">u/{createdOrder.redditUsername}</strong>
                  </div>
                  <div>
                    <span className="text-zinc-500 block">Assumed Total Karma</span>
                    <strong className="text-white flex items-center gap-1">
                      +{createdOrder.redditKarmaCount} Karma
                    </strong>
                  </div>
                  <div>
                    <span className="text-zinc-500 block">Karma Focus Type</span>
                    <strong className="text-white capitalize">{createdOrder.redditKarmaType} Boost</strong>
                  </div>
                  <div>
                    <span className="text-zinc-500 block">Delivery Speed</span>
                    <strong className="text-white text-emerald-400 font-mono">Organic (Drip-feeding)</strong>
                  </div>
                </div>
              </div>

              {/* Support context links & copy shortcut */}
              <div className="pt-2 flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={copyOrderId}
                  className="w-full py-2.5 bg-zinc-850 hover:bg-zinc-800 text-zinc-300 font-semibold rounded-xl text-xs flex items-center justify-center gap-2 transition duration-200 cursor-pointer"
                  id="checkout-copy-order-btn"
                >
                  <Clipboard className="w-4 h-4 text-orange-500" />
                  {copied ? "Copied Ticket ID!" : "Copy Order Ticket ID"}
                </button>

                <a
                  href={`https://wa.me/923029626015?text=Hello%20RedditKarmaBoost%20support%2C%20I%20have%20placed%20an%20order%20with%20ID%20${createdOrder.id}.%20Can%20you%20please%20verify%20delivery%3F`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-550 active:bg-emerald-650 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition duration-200 cursor-pointer"
                  id="checkout-whatsapp-btn"
                >
                  <MessageSquare className="w-4 h-4" /> Message Support WhatsApp
                </a>
              </div>

              <div className="pt-4 border-t border-zinc-850">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2 bg-zinc-900 border border-zinc-805 text-zinc-400 hover:text-white rounded-xl text-xs transition duration-200 cursor-pointer"
                  id="btn-completion-close"
                >
                  Close & Watch Live Delivery
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
