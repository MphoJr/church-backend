const express = require("express");
const cors = require("cors");
const prisma = require("./config/db");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const sermonRoutes = require("./routes/sermons");
const eventRoutes = require("./routes/events");
const authenticateToken = require("./middleware/authenticateToken"); //

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.get("/health", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.json({
      status: "ok",
      database: "connected",
    });
  } catch (error) {
    res.status(503).json({
      status: "error",
      database: "disconnected",
      message: error.message,
    });
  }
});

app.use("/admin", require("./routes/admin")); // register/login routes
app.use("/events", authenticateToken, require("./routes/events")); // protected
app.use("/sermons", authenticateToken, require("./routes/sermons")); // protected

// Routes
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/sermons", sermonRoutes);
app.use("/events", eventRoutes);

app.use("/.well-known/appspecific/com.chrome.devtools.json", (req, res) => {
  res.status(200).json({ message: "DevTools config not implemented" });
});

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});
module.exports = app;
