import { Star, MessageSquare } from "lucide-react";
import { CUSTOMER_REVIEWS } from "../data";

const getAvatarUrl = (seed: string) => {
  switch (seed) {
    case "crypto":
      return "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80";
    case "developer":
      return "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?auto=format&fit=crop&w=120&h=120&q=80";
    case "meme":
      return "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&h=120&q=80";
    case "marketing":
      return "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&h=120&q=80";
    default:
      return `https://picsum.photos/seed/${seed}/120/120`;
  }
};

export default function Reviews() {
  return (
    <section className="bg-zinc-950 py-16 md:py-24 px-4 md:px-8 border-b border-zinc-900 scroll-mt-10" id="reviews">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header section */}
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <span className="text-orange-500 text-xs font-black uppercase tracking-widest font-mono">
            Social Credentials
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight font-sans">
            Client Success Stories
          </h2>
          <p className="text-zinc-400 text-xs md:text-sm">
            Read how other Reddit marketers and startup developer teams used our boost campaigns to publish securely.
          </p>
        </div>

        {/* Reviews Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CUSTOMER_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-zinc-900 border border-zinc-850 p-6 rounded-2xl flex flex-col justify-between hover:border-zinc-800 transition duration-200"
              id={`review-card-${rev.id}`}
            >
              <div className="space-y-4">
                {/* Score Stars */}
                <span className="flex text-orange-500">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-orange-500" />
                  ))}
                </span>

                {/* Testimonial Message Body */}
                <p className="text-zinc-300 text-xs md:text-sm leading-relaxed text-left font-sans font-light">
                  "{rev.content}"
                </p>
              </div>

              {/* User Profiling Panel */}
              <div className="flex items-center gap-3 pt-5 border-t border-zinc-850 mt-5 text-left">
                <img
                  src={getAvatarUrl(rev.avatarSeed)}
                  alt={rev.username}
                  className="w-9 h-9 rounded-full object-cover shrink-0 border border-zinc-805 shadow-sm"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="text-xs font-bold text-white font-sans flex items-center gap-1.5 leading-snug">
                    <span>{rev.username}</span>
                  </h4>
                  <span className="text-[10px] text-orange-400 font-medium block font-sans leading-none mt-1">
                    {rev.role}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
