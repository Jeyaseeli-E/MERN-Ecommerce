import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <section className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="max-w-2xl">

            <p className="text-blue-400 font-semibold mb-4">
              WELCOME TO SHOPEASE
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
              Shop Smart.
              <br />
              Live Better.
            </h1>

            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              Discover quality products at amazing prices.
              Find everything you need in one place.
            </p>

            <Link
              to="/products"
              className="inline-block bg-blue-600 hover:bg-blue-700 px-7 py-3 rounded-lg font-semibold transition"
            >
              Shop Now →
            </Link>

          </div>

        </div>
      </section>


      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">
            Why Choose ShopEase?
          </h2>

          <p className="text-gray-600 mt-2">
            Everything you need for a simple and secure shopping experience.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Feature 1 */}
          <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-200">
            <div className="text-3xl mb-4">
              🚚
            </div>

            <h3 className="text-xl font-semibold mb-2">
              Fast Delivery
            </h3>

            <p className="text-gray-600">
              Get your products delivered quickly and safely
              to your doorstep.
            </p>
          </div>


          {/* Feature 2 */}
          <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-200">
            <div className="text-3xl mb-4">
              🔒
            </div>

            <h3 className="text-xl font-semibold mb-2">
              Secure Payment
            </h3>

            <p className="text-gray-600">
              Your payment information is protected with
              secure technology.
            </p>
          </div>


          {/* Feature 3 */}
          <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-200">
            <div className="text-3xl mb-4">
              ⭐
            </div>

            <h3 className="text-xl font-semibold mb-2">
              Quality Products
            </h3>

            <p className="text-gray-600">
              Shop from our collection of carefully selected
              quality products.
            </p>
          </div>

        </div>

      </section>

    </div>
  );
}

export default Home;