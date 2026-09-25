import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/products/${id}`
        );

        setProduct(response.data);
      } catch (error) {
        console.error(error);
        setError("Failed to load product.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product || product.stock === 0) {
      return;
    }


    addToCart(product, quantity);


    setMessage("Product added to cart! 🛒");

    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  const handleBuyNow = () => {
    if (!product || product.stock === 0) {
      return;
    }

    localStorage.setItem(
      "buyNowProduct",
      JSON.stringify({
        product,
        quantity,
      })
    );

    window.location.href = "/checkout";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold text-gray-600">
          Loading product...
        </p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Product not found
        </h2>

        <p className="text-gray-500 mt-2">
          {error || "This product does not exist."}
        </p>

        <Link
          to="/products"
          className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-14">

        {/* Breadcrumb */}
        <Link
          to="/products"
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Back to Products
        </Link>

        {/* Product */}
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden mt-6">

          <div className="grid grid-cols-1 md:grid-cols-2">

            {/* Image */}
            <div className="bg-gray-100">
              <img
                src={product.image}
                alt={product.name}
                onError={(e) => {
                  e.currentTarget.src =
                    "https://via.placeholder.com/800x600?text=No+Image";
                }}
                className="w-full h-72 sm:h-96 md:h-full min-h-105 object-cover"
              />
            </div>

            {/* Details */}
            <div className="p-6 sm:p-8 md:p-10 flex flex-col">

              <p className="text-blue-600 font-semibold">
                {product.category}
              </p>

              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-3">
                {product.name}
              </h1>

              <div className="flex items-center gap-3 mt-4">
                <span className="text-yellow-600 font-medium">
                  ⭐ {product.rating}
                </span>

                {product.stock > 0 ? (
                  <span className="text-green-600 font-medium">
                    ✓ In Stock
                  </span>
                ) : (
                  <span className="text-red-600 font-medium">
                    Out of Stock
                  </span>
                )}
              </div>

              <p className="text-3xl font-bold text-gray-900 mt-6">
                ₹{product.price}
              </p>

              <p className="text-gray-600 leading-relaxed mt-6">
                {product.description}
              </p>

              {/* Stock Info */}
              <div className="mt-6">
                {product.stock === 0 ? (
                  <p className="text-red-600 font-medium">
                    This product is currently unavailable.
                  </p>
                ) : product.stock <= 5 ? (
                  <p className="text-orange-600 font-medium">
                    Only {product.stock} left in stock!
                  </p>
                ) : (
                  <p className="text-green-600 font-medium">
                    {product.stock} items available
                  </p>
                )}
              </div>

              {/* Quantity */}
              {product.stock > 0 && (
                <div className="mt-6">
                  <p className="font-semibold text-gray-900 mb-2">
                    Quantity
                  </p>

                  <div className="flex items-center border border-gray-300 rounded-lg w-fit overflow-hidden">

                    <button
                      onClick={() =>
                        setQuantity((current) =>
                          Math.max(1, current - 1)
                        )
                      }
                      className="px-4 py-2 text-xl hover:bg-gray-100"
                    >
                      −
                    </button>

                    <span className="px-5 py-2 font-semibold">
                      {quantity}
                    </span>

                    <button
                      onClick={() =>
                        setQuantity((current) =>
                          Math.min(product.stock, current + 1)
                        )
                      }
                      className="px-4 py-2 text-xl hover:bg-gray-100"
                    >
                      +
                    </button>

                  </div>
                </div>
              )}

              {/* Message */}
              {message && (
                <p className="mt-5 text-green-600 font-semibold">
                  {message}
                </p>
              )}

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-7">

                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className={`flex-1 py-3 rounded-lg font-semibold transition ${product.stock === 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                >
                  {product.stock === 0
                    ? "Out of Stock"
                    : "Add to Cart 🛒"}
                </button>

                <button
                  onClick={handleBuyNow}
                  disabled={product.stock === 0}
                  className={`flex-1 text-center border py-3 rounded-lg font-semibold transition ${product.stock === 0
                    ? "border-gray-300 text-gray-400 cursor-not-allowed"
                    : "border-gray-300 text-gray-900 hover:bg-gray-100"
                    }`}
                >
                  Buy Now
                </button>

              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ProductDetails;