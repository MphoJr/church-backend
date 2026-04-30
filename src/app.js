const express = require("express");
const cors = require("cors");
const prisma = require("./config/db");

const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const sermonRoutes = require("./routes/sermons");
const eventRoutes = require("./routes/events");
const contactRoutes = require("./routes/contact");
const membersRoutes = require("./routes/members");

const app = express();

// Middleware
app.use(cors({ origin: "https://naog-frontend.vercel.app" })); // Allow all origins for simplicity
app.use(express.json());

// Health check
app.get("/health", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: "ok", database: "connected" });
  } catch (error) {
    res.status(503).json({
      status: "error",
      database: "disconnected",
      message: error.message,
    });
  }
});

// Routes
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/sermons", sermonRoutes); // sermons routes handle their own protection
app.use("/events", eventRoutes); // events routes handle their own protection
app.use("/uploads", express.static("uploads"));
app.use("/contact", contactRoutes);
app.use("/members", membersRoutes);

// Catch‑all
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

module.exports = app;
