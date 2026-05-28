import { KarmaPackage, Review, FAQItem } from "./types";

export const KARMA_PACKAGES: KarmaPackage[] = [
  {
    id: "pkg-comment-starter",
    name: "Comment Starter",
    karmaCount: 10,
    price: 5.00,
    features: [
      "10 High-Quality Comment Karma",
      "Perfect for bypassing initial commenting limits",
      "Naturally posted on top subreddits",
      "No password or OAuth required",
      "Safest delivery mechanism",
      "6-12 Hours Delivery"
    ],
    deliveryTime: "6-12 Hours",
    karmaType: "comment"
  },
  {
    id: "pkg-post-starter",
    name: "Post Starter",
    karmaCount: 50,
    price: 5.00,
    features: [
      "50 Premium Post Karma points",
      "Bypass auto-moderator filters instantly",
      "High-authority upvotes by real users",
      "Safe for brand new accounts",
      "100% Secure & natural drip-feed",
      "12-24 Hours Delivery"
    ],
    deliveryTime: "12-24 Hours",
    karmaType: "post"
  },
  {
    id: "pkg-growth",
    name: "Professional Growth Boost",
    karmaCount: 250,
    price: 15.00,
    savings: "Save 25%",
    isPopular: true,
    features: [
      "250 Balanced Karma points (Post/Comment)",
      "Fully customized distribution ratio",
      "Advanced anti-shadowban safety protocols",
      "Unlocks posting rights in major subreddits",
      "24 Hours Safe drip timeline",
      "24/7 WhatsApp Priority Support"
    ],
    deliveryTime: "24 Hours",
    karmaType: "mix"
  },
  {
    id: "pkg-elite",
    name: "Elite Creator Pro",
    karmaCount: 1000,
    price: 39.00,
    savings: "Save 40%",
    features: [
      "1,000 Premium Authority Karma points",
      "Highly aged high-karma profiles engagement",
      "Zero account ban risk guaranteed",
      "Refund insurance backed by Stripe",
      "36-48 Hours safe campaign delivery",
      "Personal Campaign Manager over WhatsApp"
    ],
    deliveryTime: "36-48 Hours",
    karmaType: "mix"
  }
];

export interface CustomPlanOption {
  karma: number;
  label: string;
  price: number;
}

export const COMMENT_KARMA_PLANS: CustomPlanOption[] = [
  { karma: 0, label: "No Comment Karma", price: 0 },
  { karma: 10, label: "10 Comment Karma ($5)", price: 5 },
  { karma: 15, label: "15 Comment Karma ($10)", price: 10 },
  { karma: 50, label: "50 Comment Karma ($50)", price: 50 },
  { karma: 100, label: "100 Comment Karma ($99)", price: 99 },
];

export const POST_KARMA_PLANS: CustomPlanOption[] = [
  { karma: 0, label: "No Post Karma", price: 0 },
  { karma: 15, label: "15 Post Karma ($5)", price: 5 },
  { karma: 50, label: "50 Post Karma ($10)", price: 10 },
  { karma: 300, label: "300 Post Karma ($30)", price: 30 },
  { karma: 1000, label: "1000+ Post Karma ($60)", price: 60 },
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
