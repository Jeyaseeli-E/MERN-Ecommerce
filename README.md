# ShopEase - MERN Stack E-Commerce Website

ShopEase is a full-stack e-commerce web application built using the MERN stack. It provides a responsive and user-friendly shopping experience with product browsing, search and filtering, shopping cart management, authentication, checkout, order history, and admin product/order management.

## 🚀 Features

### 👤 User Features

- User registration and login
- JWT-based authentication
- Browse products
- Search products
- Filter products by category
- Sort products by price
- View product details
- Stock availability display
- Add products to cart
- Increase/decrease cart quantity
- Remove products from cart
- Cart persistence using localStorage
- Buy Now functionality
- Checkout with delivery information
- Place orders
- View order history
- Track order status
- Responsive mobile-friendly design

### 🛠️ Admin Features

- Admin authentication and authorization
- Admin-only dashboard access
- Add new products
- Edit existing products
- Delete products
- View all customer orders
- Update order status
- Stock management
- Role-based access control

## 🧰 Tech Stack

### Frontend

- React.js
- React Router
- Axios
- Tailwind CSS
- Vite

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- CORS
- dotenv

## 📁 Project Structure

```text
MERN-Ecommerce/
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── backend/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
└── README.md
