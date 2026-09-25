import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
        <div className="text-center">

          <div className="text-6xl mb-5">
            🛒
          </div>

          <h1 className="text-3xl font-bold text-gray-900">
            Your Cart is Empty
          </h1>

          <p className="text-gray-500 mt-3">
            Add some products to your cart and come back here.
          </p>

          <Link
            to="/products"
            className="inline-block mt-6 bg-blue-600 text-white px-7 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
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

        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Shopping Cart
          </h1>

          <p className="text-gray-500 mt-2">
            {cart.length} product{cart.length !== 1 ? "s" : ""} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">

            {cart.map((item) => (
              <div
                key={item._id}
                className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5"
              >
                <div className="flex flex-col sm:flex-row gap-5">

                  {/* Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://via.placeholder.com/300x200?text=No+Image";
                    }}
                    className="w-full sm:w-32 h-40 sm:h-32 object-cover rounded-lg"
                  />

                  {/* Details */}
                  <div className="flex-1">

                    <div className="flex items-start justify-between gap-4">

                      <div>
                        <p className="text-sm text-blue-600 font-medium">
                          {item.category}
                        </p>

                        <h2 className="text-xl font-bold text-gray-900 mt-1">
                          {item.name}
                        </h2>
                      </div>

                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="text-red-600 hover:text-red-800 font-medium"
                      >
                        Remove
                      </button>

                    </div>

                    <p className="text-gray-500 mt-2">
                      ₹{item.price} each
                    </p>

                    {/* Quantity + Price */}
                    <div className="flex items-center justify-between mt-5">
                      <div>
                        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">

                          <button
                            onClick={() =>
                              decreaseQuantity(item._id)
                            }
                            className="px-4 py-2 text-xl hover:bg-gray-100"
                          >
                            −
                          </button>

                          <span className="px-5 py-2 font-semibold">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() => increaseQuantity(item._id)}
                            disabled={item.quantity >= item.stock}
                            className={`px-4 py-2 text-xl ${item.quantity >= item.stock
                              ? "text-gray-300 cursor-not-allowed"
                              : "hover:bg-gray-100"
                              }`}
                          >
                            +
                          </button>
                        </div>
                        {item.quantity >= item.stock && (
                          <p className="text-sm text-orange-600 font-medium mt-2">
                            Maximum available quantity reached.
                          </p>
                        )}


                      </div>

                      <p className="text-xl font-bold text-gray-900">
                        ₹{item.price * item.quantity}
                      </p>

                    </div>

                  </div>
                </div>
              </div>
            ))}

            <Link
              to="/products"
              className="inline-block text-blue-600 font-semibold hover:text-blue-800"
            >
              ← Continue Shopping
            </Link>

          </div>

          {/* Summary */}
          <div className="lg:col-span-1">

            <div className="bg-white border border-gray-200 rounded-xl p-6 lg:sticky lg:top-24">

              <h2 className="text-2xl font-bold text-gray-900">
                Order Summary
              </h2>

              <div className="border-t border-gray-200 mt-5 pt-5 space-y-4">

                <div className="flex justify-between text-gray-600">
                  <span>Items</span>
                  <span>{cart.length}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{totalAmount}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Delivery</span>
                  <span className="text-green-600">
                    Free
                  </span>
                </div>

              </div>

              <div className="border-t border-gray-200 mt-5 pt-5 flex justify-between">

                <span className="text-xl font-bold text-gray-900">
                  Total
                </span>

                <span className="text-2xl font-bold text-gray-900">
                  ₹{totalAmount}
                </span>

              </div>

              <Link
                to="/checkout"
                className="block text-center mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
              >
                Proceed to Checkout →
              </Link>

            </div>

          </div>

        </div>

      </div>
    </div >
  );
}

export default Cart;