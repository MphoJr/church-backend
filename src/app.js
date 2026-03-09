const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const sermonRoutes = require("./routes/sermons");
const eventRoutes = require("./routes/events");
const eventRoutes = require("./routes/events");
app.use("/events", eventRoutes);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/sermons", sermonRoutes);
app.use("/events", eventRoutes);

module.exports = app;
