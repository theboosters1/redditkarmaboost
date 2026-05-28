export interface KarmaPackage {
  id: string;
  name: string;
  karmaCount: number;
  price: number;
  savings?: string;
  features: string[];
  isPopular?: boolean;
  deliveryTime: string;
  karmaType: "post" | "comment" | "mix";
}

export interface Review {
  id: string;
  username: string;
  karmaRange: string;
  avatarSeed: string; // Used for customized visual representations
  rating: number;
  daysPassed: string;
  role: string;
  content: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  subAnswer?: string;
}

export interface Order {
  id: string;
  redditUsername: string;
  packageName: string;
  packagePrice: number;
  redditKarmaCount: number;
  redditKarmaType: "post" | "comment" | "mix";
  status: "checking_account" | "initiating_safe_boost" | "processing_delivery" | "completed";
  progress: number;
  createdAt: string;
  estimatedDelivery: string;
}
