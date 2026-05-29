import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory order storage
interface Order {
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

const orders: Record<string, Order> = {};

// Helper to get Stripe client lazily
let stripeClient: Stripe | null = null;
function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    return null;
  }
  if (!stripeClient) {
    stripeClient = new Stripe(key, { apiVersion: "2025-01-27" as any });
  }
  return stripeClient;
}

// REST API endpoints
const activeBrowserSessions = new Map<string, number>();

app.post("/api/heartbeat", (req, res) => {
  const { sessionId } = req.body;
  const now = Date.now();
  if (sessionId) {
    activeBrowserSessions.set(sessionId, now);
  }

  // Prune sessions older than 25 seconds (since clients ping every 10 seconds)
  for (const [id, lastSeen] of activeBrowserSessions.entries()) {
    if (now - lastSeen > 25000) {
      activeBrowserSessions.delete(id);
    }
  }

  // Exactly 100 fake users + the real genuine active browser sessions
  const fakeUsersCount = 100;
  res.json({ activeCount: fakeUsersCount + activeBrowserSessions.size });
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// Create Order (Simulated / Stripe Prepare)
app.post("/api/create-order", (req, res) => {
  try {
    const { redditUsername, packageName, packagePrice, redditKarmaCount, redditKarmaType } = req.body;

    if (!redditUsername || !packageName || !packagePrice || !redditKarmaCount) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    // Clean username
    const cleanUsername = redditUsername.trim().replace(/^u\//, "");

    const orderId = "RKB-" + Math.floor(100000 + Math.random() * 900000);
    const newOrder: Order = {
      id: orderId,
      redditUsername: cleanUsername,
      packageName,
      packagePrice: Number(packagePrice),
      redditKarmaCount: Number(redditKarmaCount),
      redditKarmaType: redditKarmaType || "mix",
      status: "checking_account",
      progress: 5,
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleString(), // 24 hours
    };

    orders[orderId] = newOrder;

    // Check if Stripe key exists
    const stripe = getStripe();
    if (stripe) {
      // In a real Stripe integration, create checkout session
      const appUrl = process.env.APP_URL || `http://localhost:${PORT}`;
      stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: `${packageName} (${redditKarmaCount} Karma) for u/${cleanUsername}`,
                description: `Reddit Karma Boost Service. Safe and organic growth campaign.`,
              },
              unit_amount: Math.round(Number(packagePrice) * 100),
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${appUrl}?status=success&orderId=${orderId}`,
        cancel_url: `${appUrl}?status=cancelled`,
        metadata: {
          orderId,
          redditUsername: cleanUsername,
        },
      }).then(session => {
        res.json({
          success: true,
          mode: "stripe",
          checkoutUrl: session.url,
          order: newOrder,
        });
      }).catch(err => {
        console.error("Stripe Checkout Creation Error: ", err);
        // Fallback to simulated checkout if Stripe fails
        res.json({
          success: true,
          mode: "demo",
          order: newOrder,
        });
      });
    } else {
      // Return simulated order
      res.json({
        success: true,
        mode: "demo",
        order: newOrder,
      });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Finalize Simulated Order
app.post("/api/finalize-demo-order", (req, res) => {
  const { orderId } = req.body;
  if (!orderId || !orders[orderId]) {
    res.status(404).json({ error: "Order not found" });
    return;
  }

  // Update order status to next phase post simulated payment
  const order = orders[orderId];
  order.status = "checking_account";
  order.progress = 15;
  res.json({ success: true, order });
});

// Get Order Details (supports realistic simulation state transitions)
app.get("/api/order/:orderId", (req, res) => {
  const { orderId } = req.params;
  const order = orders[orderId];

  if (!order) {
    res.status(404).json({ error: "Order not found" });
    return;
  }

  // Simulate progress step transition depending on duration elapsed since creation
  const elapsedMinutes = (Date.now() - new Date(order.createdAt).getTime()) / (1000 * 60);

  if (elapsedMinutes > 5) {
    order.status = "completed";
    order.progress = 100;
  } else if (elapsedMinutes > 3) {
    order.status = "processing_delivery";
    order.progress = Math.min(90, Math.floor(40 + elapsedMinutes * 10));
  } else if (elapsedMinutes > 1) {
    order.status = "initiating_safe_boost";
    order.progress = Math.min(35, Math.floor(15 + elapsedMinutes * 10));
  }

  res.json({ success: true, order });
});

// Support Ticket Handler
app.post("/api/support-ticket", (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    res.status(400).json({ error: "Please enter correct fields" });
    return;
  }
  const ticketId = "TKT-" + Math.floor(100000 + Math.random() * 900000);
  res.json({
    success: true,
    ticketId,
    message: "Thank you! Our Reddit growth team will get back to you within 2-4 hours, or you can contact us right away on WhatsApp!"
  });
});

// Start server function incorporating Vite middleware
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // SPA fallback
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
