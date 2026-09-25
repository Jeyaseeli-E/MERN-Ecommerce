import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/orders`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setOrders(response.data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);

        setError(
          error.response?.data?.message ||
          "Failed to load orders."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

if (loading) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <p className="text-xl font-semibold text-gray-600">
        Loading orders...
      </p>
    </div>
  );
}

if (error) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-red-600">
          {error}
        </h2>

        <Link
          to="/products"
          className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

return (
  <div className="min-h-screen bg-gray-50">

    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-12">

      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
          My Orders
        </h1>

        <p className="text-gray-500 mt-2">
          View your recent orders and their status.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl p-10 text-center">

          <h2 className="text-2xl font-bold text-gray-900">
            No Orders Yet
          </h2>

          <p className="text-gray-500 mt-2">
            You haven't placed any orders yet.
          </p>

          <Link
            to="/products"
            className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            Shop Now
          </Link>

        </div>
      ) : (
        <div className="space-y-6">

          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white border border-gray-200 rounded-xl p-5 sm:p-6"
            >

              {/* Order Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200 pb-5">

                <div>
                  <p className="text-sm text-gray-500">
                    Order ID
                  </p>

                  <p className="font-semibold text-gray-900 break-all">
                    {order._id}
                  </p>

                  <p className="text-sm text-gray-500 mt-2">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <span
                  className={`inline-block w-fit px-4 py-2 rounded-full text-sm font-semibold ${order.status === "Delivered"
                      ? "bg-green-100 text-green-700"
                      : order.status === "Cancelled"
                        ? "bg-red-100 text-red-700"
                        : order.status === "Shipped"
                          ? "bg-blue-100 text-blue-700"
                          : order.status === "Processing"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-100 text-gray-700"
                    }`}
                >
                  {order.status}
                </span>

              </div>

              {/* Order Items */}
              <div className="py-5 space-y-4">

                {order.items.map((item) => (
                  <div
                    key={item.productId}
                    className="flex items-center justify-between gap-4"
                  >

                    <div>
                      <p className="font-semibold text-gray-900">
                        {item.name}
                      </p>

                      <p className="text-sm text-gray-500 mt-1">
                        ₹{item.price} × {item.quantity}
                      </p>
                    </div>

                    <p className="font-semibold text-gray-900">
                      ₹{item.price * item.quantity}
                    </p>

                  </div>
                ))}

              </div>

              {/* Order Total */}
              <div className="border-t border-gray-200 pt-5 flex items-center justify-between">

                <span className="text-lg font-semibold text-gray-900">
                  Total
                </span>

                <span className="text-xl font-bold text-gray-900">
                  ₹{order.totalAmount}
                </span>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>

  </div>
);
}

export default Orders;