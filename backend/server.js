const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const dns = require("dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const app = express();
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

const userRoutes = require("./routes/userRoutes");

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
);

app.use(express.json({ limit: "10kb" }));

app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("ShopEase Backend is Running 🚀");
});

mongoose
  .connect(process.env.MONGO_URI, { family: 4, })
  .then(() => {
    console.log("MongoDB Connected Successfully ✅");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB Connection Failed ❌");
    console.error(error.message);
  });