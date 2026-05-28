import { KarmaPackage, Review, FAQItem } from "./types";

export const KARMA_PACKAGES: KarmaPackage[] = [
  {
    id: "pkg-starter",
    name: "Starter Boost",
    karmaCount: 200,
    price: 9.99,
    features: [
      "200 organic Karma points",
      "Spread on post & comment karma",
      "Safe organic drip-feed",
      "No password or login required",
      "Safe for accounts > 1 day old",
      "12-24 Hours Delivery"
    ],
    deliveryTime: "12-24 Hours",
    karmaType: "mix"
  },
  {
    id: "pkg-growth",
    name: "Growth Boost",
    karmaCount: 500,
    price: 19.99,
    savings: "Save 20%",
    isPopular: true,
    features: [
      "500 high-quality Karma points",
      "Choose Post or Comment focus",
      "Natural distribution algorithms",
      "Advanced shadowban safety",
      "Unlock post limits in major subreddits",
      "24-36 Hours Delivery",
      "24/7 WhatsApp Priority Support"
    ],
    deliveryTime: "24-36 Hours",
    karmaType: "mix"
  },
  {
    id: "pkg-elite",
    name: "Elite Creator Pro",
    karmaCount: 1500,
    price: 49.99,
    savings: "Save 30%",
    features: [
      "1,500 premium Karma points",
      "Custom mix ratio requested by user",
      "Upvoted by Aged aged-accounts with high authority",
      "Zero account ban risks",
      "100% Guaranteed delivery or refund",
      "36-48 Hours safe delivery period",
      "Lifetime VIP Support"
    ],
    deliveryTime: "36-48 Hours",
    karmaType: "mix"
  },
  {
    id: "pkg-reseller",
    name: "Ultimate Subreddit Dominator",
    karmaCount: 5000,
    price: 129.99,
    savings: "Save 45%",
    features: [
      "5,000 maximum authority Karma points",
      "Tailored campaign strategy",
      "Drip fed over 3-5 days for natural spikes",
      "Multi-subreddit interaction strategy",
      "Unlocks post permissions and instant credibility",
      "3-5 Days distribution period",
      "Dedicated account manager",
      "Stripe payment refund guarantee"
    ],
    deliveryTime: "3-5 Days",
    karmaType: "mix"
  }
];

export const CUSTOMER_REVIEWS: Review[] = [
  {
    id: "rev-1",
    username: "u/CryptoAlpha_99",
    karmaRange: "Gained 500 Karma",
    avatarSeed: "crypto",
    rating: 5,
    daysPassed: "2 days ago",
    role: "r/Cryptocurrency Contributor",
    content: "I needed 500 comment karma to join a trading group. Picked the Growth Boost package and it completed in 28 hours exactly. Super organic growth, very secure. Highly recommended if you hate commenting 100 times manually!"
  },
  {
    id: "rev-2",
    username: "u/SaaSDev_Sarah",
    karmaRange: "Gained 1,500 Karma",
    avatarSeed: "developer",
    rating: 5,
    daysPassed: "1 week ago",
    role: "Subreddit Moderator",
    content: "We launched a product and needed some baseline post authority to bypass the initial filter block. RedditKarmaBoost was flawless. We bypassed the automatic spam filters instantly and got our post onto the frontpage. Perfect service."
  },
  {
    id: "rev-3",
    username: "u/MemesAndDreams",
    karmaRange: "Gained 200 Karma",
    avatarSeed: "meme",
    rating: 5,
    daysPassed: "3 days ago",
    role: "General Member",
    content: "Super quick process and very easy steps. Kept tracking my progress on the dashboard order status and saw it go up gradually. Support is friendly too, and Stripe checkout was fast!"
  },
  {
    id: "rev-4",
    username: "u/MarketingManager_R",
    karmaRange: "Gained 5,000 Karma",
    avatarSeed: "marketing",
    rating: 5,
    daysPassed: "2 weeks ago",
    role: "Brand Agency Owner",
    content: "The Reseller package is essential for our media outreach. We safely scale up new Reddit personas to seed content organic-style. Never had an account flag or shadowban in over 6 campaigns."
  }
];

export const TRUST_FAQ_ITEMS: FAQItem[] = [
  {
    question: "Is Reddit Karma Boost safe for my account?",
    answer: "Absolutely. We pride ourselves on executing organic-like growth methodologies. We utilize real, age-appropriate, higher-authority accounts in an organic pattern (drip feed) to build your Karma. Your password is never requested, ensuring 100% security against compromise.",
    subAnswer: "Our algorithm spreads actions across appropriate intervals, making sure they comply fully with standard platform thresholds."
  },
  {
    question: "How does the Karma delivery process work?",
    answer: "During checkout, you provide your Reddit username and choose your preference (split between post karma, comment karma, or standard balanced mix). Our system then schedules your campaign. Within hours, your Karma rating will start to rise as real authority accounts engage safely.",
    subAnswer: "You can watch this growth happen step-by-step using our exclusive live Order Tracker."
  },
  {
    question: "Are there any requirements to order?",
    answer: "No specific requirements except that your Reddit account must not be locked or deactivated. For optimal safety, we recommend accounts that are at least 1 day old, although our Starter package handles brand new accounts with gentle care too.",
    subAnswer: "Always make sure the username matches exactly."
  },
  {
    question: "Does this involve a money-back guarantee?",
    answer: "Yes! If our safe delivery processes do not fetch the promised Karma count within the delivery schedule, we offer an immediate full refund through our Stripe checkout portal. No hassle, no complicated rules.",
    subAnswer: "You can request this at any time by messaging us on our live WhatsApp support channel."
  },
  {
    question: "Is my payment secure on RedditKarmaBoost.com?",
    answer: "We process all payments through Stripe, the global standard in billing. We never store or view your credit card credentials. Everything is encrypted via SSL (HTTPS) with bank-grade security protocols.",
    subAnswer: "You can pay safely using major Credit Cards, Apple Pay, or Google Pay."
  }
];
