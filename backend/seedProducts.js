const mongoose = require("mongoose");
const dns = require("dns");
require("dotenv").config();

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const Product = require("./models/Product");

const products = [
  {
    name: "Wireless Headphones",
    description: "High-quality wireless headphones with clear sound and comfortable design.",
    price: 1499,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    rating: 4.5,
    stock: 20,
  },
  {
    name: "Smart Watch",
    description: "Modern smart watch with fitness tracking and useful daily features.",
    price: 2499,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    rating: 4.3,
    stock: 15,
  },
  {
    name: "Running Shoes",
    description: "Comfortable running shoes designed for everyday use.",
    price: 1999,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    rating: 4.4,
    stock: 25,
  },
  {
    name: "Classic Backpack",
    description: "Stylish and spacious backpack suitable for college and everyday travel.",
    price: 999,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
    rating: 4.2,
    stock: 30,
  },
  {
    name: "Coffee Maker",
    description: "Easy-to-use coffee maker for preparing fresh coffee at home.",
    price: 3499,
    category: "Home",
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6",
    rating: 4.6,
    stock: 10,
  },
  {
    name: "Desk Lamp",
    description: "Minimal desk lamp perfect for study and work spaces.",
    price: 799,
    category: "Home",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c",
    rating: 4.1,
    stock: 40,
  },
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      family: 4,
    });

    await Product.deleteMany();

    await Product.insertMany(products);

    console.log("Products inserted successfully ✅");

    await mongoose.connection.close();
  } catch (error) {
    console.error("Error inserting products ❌");
    console.error(error.message);
  }
};

seedProducts();