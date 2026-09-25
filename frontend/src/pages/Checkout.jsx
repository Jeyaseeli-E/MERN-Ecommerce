import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import axios from "axios";

function Checkout() {
  const { cart } = useCart();

  const [buyNowItem, setBuyNowItem] = useState(null);
  const [buyNowQuantity, setBuyNowQuantity] = useState(1);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [message, setMessage] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    const savedBuyNow = localStorage.getItem("buyNowProduct");

    if (savedBuyNow) {
      try {
        const data = JSON.parse(savedBuyNow);

        setBuyNowItem(data.product);
        setBuyNowQuantity(data.quantity || 1);
      } catch (error) {
        console.error("Failed to load Buy Now product:", error);
        localStorage.removeItem("buyNowProduct");
      }
    }
  }, []);

  const checkoutItems = buyNowItem
    ? [
      {
        ...buyNowItem,
        quantity: buyNowQuantity,
      },
    ]
    : cart;

  const totalPrice = checkoutItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const increaseBuyNowQuantity = () => {
    if (buyNowItem && buyNowQuantity < buyNowItem.stock) {
      setBuyNowQuantity((current) => current + 1);
    }
  };

  const decreaseBuyNowQuantity = () => {
    setBuyNowQuantity((current) => Math.max(1, current - 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const orderData = {
        customer: formData,

        items: checkoutItems.map((item) => ({
          productId: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),

        totalAmount: totalPrice,
      };

      const token = localStorage.getItem("token");

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/orders`,
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrderPlaced(true);

      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
      });

      if (buyNowItem) {
        localStorage.removeItem("buyNowProduct");
      }
    } catch (error) {
      console.error("Order creation failed:", error);

      setMessage(
        error.response?.data?.message ||
        "Failed to place order. Please try again."
      );
    }
  };

  if (checkoutItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
        <div className="text-center">

          <h1 className="text-3xl font-bold text-gray-900">
            Your Cart is Empty
          </h1>

          <p className="text-gray-500 mt-3">
            Add products before proceeding to checkout.
          </p>

          <Link
            to="/products"
            className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Continue Shopping
          </Link>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-6xl mx-auto px-6 py-12">

        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Checkout Form */}
          <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-6">

            {orderPlaced ? (
              <div className="min-h-96 flex flex-col items-center justify-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-green-600 text-center">
                  Order Placed Successfully! 🎉
                </h2>

                <Link
                  to="/products"
                  className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
                >
                  Continue Shopping
                </Link>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Delivery Information
                </h2>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >

                  {/* Name */}
                  <div>
                    <label className="block font-medium text-gray-700 mb-2">
                      Full Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block font-medium text-gray-700 mb-2">
                      Email Address
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>

                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="Enter your phone number"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block font-medium text-gray-700 mb-2">
                      Address
                    </label>

                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      rows="4"
                      placeholder="Enter your delivery address"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* City + State */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                    <div>
                      <label className="block font-medium text-gray-700 mb-2">
                        City
                      </label>

                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        placeholder="City"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block font-medium text-gray-700 mb-2">
                        State
                      </label>

                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                        placeholder="State"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                  </div>

                  {/* Pincode */}
                  <div>
                    <label className="block font-medium text-gray-700 mb-2">
                      Pincode
                    </label>

                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      required
                      placeholder="Enter pincode"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg font-semibold transition"
                  >
                    Place Order
                  </button>

                </form>

                {message && (
                  <div className="mt-5 bg-red-100 text-red-700 p-4 rounded-lg">
                    {message}
                  </div>
                )}
              </>
            )}

          </div>

          {/* Order Summary */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 h-fit">

            <h2 className="text-2xl font-bold text-gray-900">
              Order Summary
            </h2>

            <div className="mt-6 space-y-5">

              {checkoutItems.map((item) => (
                <div
                  key={item._id}
                  className="border-b border-gray-200 pb-5"
                >

                  <div className="flex justify-between gap-4">

                    <div>
                      <p className="font-medium text-gray-900">
                        {item.name}
                      </p>

                      <p className="text-sm text-gray-500 mt-1">
                        ₹{item.price} each
                      </p>
                    </div>

                    <p className="font-semibold">
                      ₹{item.price * item.quantity}
                    </p>

                  </div>

                  {/* Buy Now Quantity */}
                  {buyNowItem && !orderPlaced && (
                    <div className="flex items-center justify-between mt-4">

                      <span className="text-sm font-medium text-gray-700">
                        Quantity
                      </span>

                      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">

                        <button
                          type="button"
                          onClick={decreaseBuyNowQuantity}
                          className="px-3 py-1.5 text-lg hover:bg-gray-100"
                        >
                          −
                        </button>

                        <span className="px-4 py-1.5 font-semibold">
                          {buyNowQuantity}
                        </span>

                        <button
                          type="button"
                          onClick={increaseBuyNowQuantity}
                          className="px-3 py-1.5 text-lg hover:bg-gray-100"
                        >
                          +
                        </button>

                      </div>

                    </div>
                  )}

                </div>
              ))}

            </div>

            <div className="border-t mt-6 pt-5">

              <div className="flex justify-between text-gray-600">
                <span>Delivery</span>
                <span>Free</span>
              </div>

              <div className="flex justify-between mt-4">
                <span className="text-xl font-bold">
                  Total
                </span>

                <span className="text-xl font-bold">
                  ₹{totalPrice}
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Checkout;