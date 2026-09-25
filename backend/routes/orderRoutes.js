const express = require("express");
const Order = require("../models/Order");
const Product = require("../models/Product");
const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const router = express.Router();

// Create new order
router.post("/", protect, async (req, res) => {
    try {
        for (const item of req.body.items) {
            const product = await Product.findById(item.productId);

            if (!product) {
                return res.status(404).json({
                    message: `Product not found: ${item.name}`,
                });
            }

            if (item.quantity > product.stock) {
                return res.status(400).json({
                    message: `${product.name} has only ${product.stock} item(s) in stock.`,
                });
            }
        }
        const order = new Order({
            ...req.body,
            userId: req.user.id,
        });

        for (const item of req.body.items) {
            await Product.findByIdAndUpdate(
                item.productId,
                {
                    $inc: {
                        stock: -item.quantity,
                    },
                }
            );
        }

        const savedOrder = await order.save();

        res.status(201).json(savedOrder);
    } catch (error) {
        console.error("Order creation failed:", error.message);
        res.status(500).json({ message: "Failed to create order" });
    }
});

router.put("/:id/status", protect, admin, async (req, res) => {
    try {
        const { status } = req.body;

        const allowedStatuses = [
            "Pending",
            "Processing",
            "Shipped",
            "Delivered",
            "Cancelled",
        ];

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                message: "Invalid order status",
            });
        }

        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            {
                new: true,
                runValidators: true,
            }
        );

        if (!order) {
            return res.status(404).json({
                message: "Order not found",
            });
        }

        res.json(order);
    } catch (error) {
        console.error("Order status update failed:", error.message);

        res.status(500).json({
            message: "Failed to update order status",
        });
    }
});

router.get("/admin", protect, admin, async (req, res) => {
    try {
        const orders = await Order.find()
            .sort({ createdAt: -1 });

        res.json(orders);
    } catch (error) {
        console.error("Fetching all orders failed:", error.message);

        res.status(500).json({
            message: "Failed to fetch all orders",
        });
    }
});

// Get all orders
router.get("/", protect, async (req, res) => {
    try {
        const orders = await Order.find({
            userId: req.user.id,
        }).sort({ createdAt: -1 });

        res.json(orders);
    } catch (error) {
        console.error("Fetching orders failed:", error.message);
        res.status(500).json({
            message: "Failed to fetch orders",
        });
    }
});

module.exports = router;