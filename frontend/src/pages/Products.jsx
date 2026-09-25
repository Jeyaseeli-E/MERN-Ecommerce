import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/products`
        );

        setProducts(response.data);
      } catch (error) {
        setError("Failed to load products.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || product.category === category;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sort === "low") {
        return a.price - b.price;
      }

      if (sort === "high") {
        return b.price - a.price;
      }

      return 0;
    });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold text-gray-600">
          Loading products...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold text-red-600">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-12">

        {/* Page Heading */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Our Products
          </h1>

          <p className="text-gray-500 mt-3">
            Explore our collection of quality products.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* Search */}
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Category */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="default">Sort by Price</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>

        </div>

        {/* Product Count */}
        <p className="text-gray-500 mb-5">
          Showing {filteredProducts.length} product
          {filteredProducts.length !== 1 ? "s" : ""}
        </p>

        {/* Products */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-gray-900">
              No products found
            </h2>

            <p className="text-gray-500 mt-2">
              Try another search or category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">

            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition flex flex-col"
              >

                {/* Product Image */}
                <img
                  src={product.image}
                  alt={product.name}
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://via.placeholder.com/600x400?text=No+Image";
                  }}
                  className="w-full h-52 sm:h-56 object-cover"
                />

                {/* Product Content */}
                <div className="p-4 sm:p-5 flex flex-col flex-1">

                  <p className="text-sm text-blue-600 font-medium">
                    {product.category}
                  </p>

                  <h2 className="text-xl font-bold text-gray-900 mt-2">
                    {product.name}
                  </h2>

                  <p className="text-gray-500 mt-2 line-clamp-2 min-h-12">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between mt-5">

                    <span className="text-2xl font-bold text-gray-900">
                      ₹{product.price}
                    </span>

                    <span className="text-sm text-yellow-600">
                      ⭐ {product.rating}
                    </span>

                  </div>

                  {/* Stock */}
                  <div className="mt-3">

                    {product.stock === 0 ? (
                      <p className="text-sm text-red-600 font-medium">
                        Out of stock
                      </p>
                    ) : product.stock <= 5 ? (
                      <p className="text-sm text-orange-600 font-medium">
                        Only {product.stock} left
                      </p>
                    ) : (
                      <p className="text-sm text-green-600 font-medium">
                        ✓ {product.stock} in stock
                      </p>
                    )}

                  </div>

                  {/* Button */}
                  <Link
                    to={`/product/${product._id}`}
                    className="block text-center mt-auto pt-5"
                  >
                    <span className="block bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition">
                      View Details
                    </span>
                  </Link>

                </div>
              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}

export default Products;