# ShopEase - MERN Stack E-Commerce Website

ShopEase is a full-stack e-commerce web application built using the MERN stack. It provides a complete online shopping experience including product browsing, search and filtering, shopping cart management, user authentication, checkout, order management, and admin controls.

## Features

### User Features

- User registration and login
- JWT-based authentication
- Browse products
- Search products
- Filter products by category
- Sort products by price
- View product details
- Add products to cart
- Update cart quantities
- Stock availability management
- Buy Now functionality
- Checkout and delivery information
- Place orders
- View order history
- Order status tracking
- Responsive design for mobile, tablet, and desktop

### Admin Features

- Admin authentication and authorization
- Add products
- Edit products
- Delete products
- Manage product stock
- View all customer orders
- Update order status

## Tech Stack

### Frontend

- React.js
- React Router
- Tailwind CSS
- Axios
- Vite

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs

## Project Structure

```text
MERN-Ecommerce/
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── README.md
