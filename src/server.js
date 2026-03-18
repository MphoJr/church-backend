require("dotenv").config();
const express = require("express");

const app = require("./app");
const sermonsRoutes = require("./routes/sermons");

const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use("/uploads", express.static("uploads")); // serve audio files
app.use("/", sermonsRoutes); // exposes /sermons

app.listen(PORT, () => {
  console.log(`Church backend running on port ${PORT}`);
});
