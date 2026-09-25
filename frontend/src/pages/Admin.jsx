import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Admin() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/products`
      );

      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };
  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/orders/admin`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders(response.data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };
  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (!savedUser) {
      navigate("/login");
      return;
    }

    const user = JSON.parse(savedUser);

    if (user.role !== "admin") {
      navigate("/");
    }
  }, [navigate]);
  useEffect(() => {
    fetchProducts();
  }, []);
  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, status) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/orders/${orderId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchOrders();
    } catch (error) {
      console.error("Failed to update order status:", error);

      alert(
        error.response?.data?.message ||
        "Failed to update order status."
      );
    }
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      image: product.image,
      rating: product.rating,
      stock: product.stock,
    });

    setEditingId(product._id);
  };

  const handleDelete = async (productId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/products/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProducts((currentProducts) =>
        currentProducts.filter(
          (product) => product._id !== productId
        )
      );
    } catch (error) {
      console.error("Failed to delete product:", error);
      alert(
        error.response?.data?.message ||
        "Failed to delete product."
      );
    }
  };

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
    rating: "",
    stock: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    try {
      const token = localStorage.getItem("token");

      const productData = {
        ...formData,
        price: Number(formData.price),
        rating: Number(formData.rating),
        stock: Number(formData.stock),
      };

      if (editingId) {
        await axios.put(
          `http://localhost:5000/api/products/${editingId}`,
          productData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setMessage("Product updated successfully! 🎉");
      } else {
        await axios.post(
          "http://localhost:5000/api/products",
          productData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setMessage("Product added successfully! 🎉");
      }

      setFormData({
        name: "",
        description: "",
        price: "",
        category: "",
        image: "",
        rating: "",
        stock: "",
      });

      setEditingId(null);
      fetchProducts();
    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Failed to save product."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-6">
        <div className="bg-white border border-gray-200 rounded-2xl p-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Admin - Add Product
          </h1>

          <p className="text-gray-500 mt-2">
            Add a new product to ShopEase.
          </p>

          {message && (
            <p className="mt-5 bg-green-100 text-green-700 p-3 rounded-lg">
              {message}
            </p>
          )}

          {error && (
            <p className="mt-5 bg-red-100 text-red-700 p-3 rounded-lg">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Product Name"
              required
              className="w-full px-4 py-3 border rounded-lg"
            />

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Product Description"
              required
              rows="4"
              className="w-full px-4 py-3 border rounded-lg"
            />

            <input
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
              required
              className="w-full px-4 py-3 border rounded-lg"
            />

            <input
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Category"
              required
              className="w-full px-4 py-3 border rounded-lg"
            />

            <input
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Image URL"
              required
              className="w-full px-4 py-3 border rounded-lg"
            />

            <input
              name="rating"
              type="number"
              step="0.1"
              value={formData.rating}
              onChange={handleChange}
              placeholder="Rating"
              className="w-full px-4 py-3 border rounded-lg"
            />

            <input
              name="stock"
              type="number"
              value={formData.stock}
              onChange={handleChange}
              placeholder="Stock"
              required
              className="w-full px-4 py-3 border rounded-lg"
            />

            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition"
            >
              {editingId ? "Update Product" : "Add Product"}
            </button>
          </form>
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-5">
              Manage Products
            </h2>

            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-5">
                Manage Orders
              </h2>

              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order._id}
                    className="bg-gray-50 border border-gray-200 rounded-xl p-5"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-gray-900">
                          Order #{order._id}
                        </h3>

                        <p className="text-gray-500 mt-1">
                          Customer: {order.customer.name}
                        </p>

                        <p className="text-gray-500">
                          Total: ₹{order.totalAmount}
                        </p>
                      </div>

                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(order._id, e.target.value)
                        }
                        className="border border-gray-300 rounded-lg px-4 py-2 bg-white"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex items-center justify-between"
                >
                  <div>
                    <h3 className="font-bold text-gray-900">
                      {product.name}
                    </h3>

                    <p className="text-gray-500">
                      ₹{product.price} · {product.category}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(product._id)}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;