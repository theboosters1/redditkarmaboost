import React, { useState, useEffect } from "react";
import { Search, Loader2, ArrowRight, ShieldCheck, Flame, CheckCircle2, MessageSquare, AlertCircle } from "lucide-react";
import { Order } from "../types";

interface OrderTrackerProps {
  initialOrderId?: string;
}

export default function OrderTracker({ initialOrderId }: OrderTrackerProps) {
  const [orderId, setOrderId] = useState(initialOrderId || "");
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState("");

  const sampleOrders = ["RKB-748291", "RKB-192837"];

  useEffect(() => {
    if (initialOrderId) {
      setOrderId(initialOrderId);
      onTrack(initialOrderId);
    }
  }, [initialOrderId]);

  const onTrack = async (targetId: string) => {
    if (!targetId.trim()) {
      setError("Please key in your Order Ticket ID.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/order/${targetId.trim().toUpperCase()}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Order ticket not registered.");
      }

      setOrder(data.order);
    } catch (err: any) {
      setError(err?.message || "Error contacting campaign terminal. Please check spelling.");
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onTrack(orderId);
  };

  const getStatusLabelAndColor = (status: Order["status"]) => {
    switch (status) {
      case "checking_account":
        return {
          label: "Checking Account",
          desc: "Our systems are verifying account age, history, and shadowban state for healthy campaign seeding.",
          color: "text-amber-400 bg-amber-400/10 border-amber-500/20"
        };
      case "initiating_safe_boost":
        return {
          label: "Initiating Safe Campaign",
          desc: "Allocating high-authority, aged Reddit accounts inside our scheduling matrix to execute drip-feed upvotes safely.",
          color: "text-orange-400 bg-orange-400/10 border-orange-400/20"
        };
      case "processing_delivery":
        return {
          label: "Organic Drip-Feed Processing",
          desc: "Upvotes are currently being queued and cast at natural intervals. Keeping your account perfectly organic and risk-free.",
          color: "text-blue-400 bg-blue-400/10 border-blue-400/20"
        };
      case "completed":
        return {
          label: "Karma Boost Completed!",
          desc: "Success! High-quality Karma points have been fully delivered and stabilized on your profile.",
          color: "text-green-400 bg-green-400/10 border-green-500/20"
        };
    }
  };

  return (
    <section className="bg-zinc-950 py-16 md:py-24 px-4 md:px-8 border-b border-zinc-900 scroll-mt-10" id="track-order">
      <div className="max-w-3xl mx-auto space-y-10">
        
        {/* Header content */}
        <div className="text-center space-y-3 mx-auto max-w-xl">
          <span className="text-orange-500 text-xs font-black uppercase tracking-widest font-mono">
            Organic Telemetry
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight font-sans">
            Campaign Delivery Tracker
          </h2>
          <p className="text-zinc-400 text-xs md:text-sm">
            Watch your Reddit authority level up in real-time. Enter your unique order ticket ID starting with <code>RKB-</code>.
          </p>
        </div>

        {/* Input box */}
        <div className="bg-zinc-900 border border-zinc-850 p-6 md:p-8 rounded-2xl shadow-xl space-y-4">
          <form onSubmit={handleTrackSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Enter Ticket ID (e.g., RKB-748291)"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white placeholder-zinc-650 focus:outline-none focus:border-orange-500 transition-colors text-sm font-mono focus:ring-1 focus:ring-orange-500/25"
                id="tracker-search-input"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-orange-600 hover:bg-orange-500 active:bg-orange-550 text-white font-bold rounded-xl text-sm transitionduration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              id="tracker-search-submit"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <span>Track Delivery</span>
              )}
            </button>
          </form>

          {/* Quick Sandbox suggestions */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500 font-sans">
            <span>Don't have a code yet? Test order tracking using these ticket ids:</span>
            <div className="flex gap-2">
              {sampleOrders.map(sample => (
                <button
                  key={sample}
                  onClick={() => {
                    setOrderId(sample);
                    onTrack(sample);
                  }}
                  className="px-2.5 py-1 rounded bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-orange-400 font-mono text-[10px] cursor-pointer"
                  id={`btn-sample-${sample}`}
                >
                  {sample}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Error notification banner */}
        {error && (
          <div className="p-4 bg-red-950/20 border border-red-900/40 text-red-400 text-xs font-sans rounded-xl text-left flex items-start gap-2.5">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
            <div>
              <strong className="block text-red-250 font-bold mb-0.5">Campaign Lookup Failed</strong>
              <p className="leading-relaxed font-mono">{error}</p>
            </div>
          </div>
        )}

        {/* Order Details Output Dashboard */}
        {order && (
          <div className="bg-zinc-900 border border-zinc-850 rounded-2xl overflow-hidden p-6 text-left space-y-6 animate-fade-in" id="tracker-resolved-dashboard">
            {/* Header column tags */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-850 pb-5">
              <div className="space-y-1">
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">Order Verification</span>
                <h4 className="text-lg font-bold text-white font-sans flex items-center gap-2">
                  Campaign: <span className="text-orange-500 font-mono">{order.id}</span>
                </h4>
              </div>
              
              {/* Dynamic Badging */}
              {(() => {
                const badge = getStatusLabelAndColor(order.status);
                return (
                  <div className={`px-3.5 py-1.5 rounded-xl border text-xs font-bold leading-none ${badge?.color}`} id="tracker-status-badge">
                    {badge?.label}
                  </div>
                );
              })()}
            </div>

            {/* Progress Telemetry bars */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-500 font-mono">Delivery Progress</span>
                <span className="text-orange-400 font-bold font-mono">{order.progress}%</span>
              </div>
              <div className="w-full h-3.5 bg-zinc-950 border border-zinc-805 rounded-full overflow-hidden p-0.5">
                <div
                  className="h-full bg-gradient-to-r from-orange-600 via-orange-500 to-amber-400 rounded-full transition-all duration-1000 ease-out flex items-center justify-end pr-1 text-[8px] text-black font-extrabold"
                  style={{ width: `${order.progress}%` }}
                >
                  {order.progress > 15 && `${order.progress}%`}
                </div>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                {getStatusLabelAndColor(order.status)?.desc}
              </p>
            </div>

            {/* Tracking Variables Sheet */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-zinc-950 p-4 rounded-xl border border-zinc-850 text-xs font-sans">
              <div>
                <span className="text-zinc-500 block">Target Reddit Account</span>
                <strong className="text-white text-sm">u/{order.redditUsername}</strong>
              </div>
              <div>
                <span className="text-zinc-500 block font-sans">Assigned Campaign Kit</span>
                <strong className="text-white text-sm">{order.packageName} (+{order.redditKarmaCount} Karma)</strong>
              </div>
              <div>
                <span className="text-zinc-500 block">Campaign Strategy Mix</span>
                <strong className="text-white text-sm capitalize">{order.redditKarmaType} Focus</strong>
              </div>
              <div>
                <span className="text-zinc-500 block">Drip Deployment Velocity</span>
                <strong className="text-emerald-400 text-sm font-mono">Safe Organic Feeder</strong>
              </div>
              <div>
                <span className="text-zinc-500 block">Initiated Date</span>
                <strong className="text-white text-sm font-mono">{new Date(order.createdAt).toLocaleDateString()}</strong>
              </div>
              <div>
                <span className="text-zinc-500 block">Target Completion Speed</span>
                <strong className="text-white text-sm font-mono">{order.estimatedDelivery}</strong>
              </div>
            </div>

            {/* Quick action buttons for tracker */}
            <div className="pt-2 border-t border-zinc-850 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-[10px] text-zinc-550 font-mono uppercase">
                Campaign tracked live via RedditKarmaBoost algorithms
              </span>
              <a
                href={`https://wa.me/923029626015?text=Hello%20RedditKarmaBoost%20support%20team%21%20I%20am%20tracking%20order%20status%20for%20ID%20${order.id}.%20Can%20you%20please%20give%20me%20a%20detailed%20campaign%20report%3F`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-750 text-zinc-300 rounded-xl text-xs flex items-center gap-1.5 transition duration-200 cursor-pointer text-center"
                id="btn-tracker-whatsapp-contact"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                <span>Contact Lead on WhatsApp</span>
              </a>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
