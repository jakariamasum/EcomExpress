## E-commerce Application

This repository contains an e-commerce application built using Express.js, TypeScript, MongoDB, and Zod for robust data validation. The application includes essential features for managing products and orders, ensuring a seamless e-commerce experience.

### Features

- **Product Management:**
  - Create, read, update, and delete products.
  - Manage product details including name, description, price, category, tags, variants, and inventory status.

- **Order Management:**
  - Create new orders.
  - Retrieve all orders.
  - Retrieve orders based on user email.

- **Data Validation:**
  - Comprehensive data validation using Zod to ensure data integrity and consistency.

- **Error Handling:**
  - Structured error responses for better client-side handling.

### Tech Stack

- **Backend Framework:** Express.js
- **Programming Language:** TypeScript
- **Database:** MongoDB
- **Data Modeling:** Mongoose
- **Validation:** Zod

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/jakariamasum/EcomExpress
   cd ecommerce-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start MongoDB server.

4. Run the application:
   ```bash
   npm run build
   ```

### API Endpoints

#### Product Management

- **Create a New Product**
  - `POST /api/products`
- **Retrieve All Products**
  - `GET /api/products`
- **Retrieve All Products by search**
  - `GET /api/products?searchTerm=<searchTerm>`
- **Retrieve a Specific Product by ID**
  - `GET /api/products/:productId`
- **Update Product Information**
  - `PUT /api/products/:productId`
- **Delete a Product**
  - `DELETE /api/products/:productId`

#### Order Management

- **Create a New Order**
  - `POST /api/orders`
- **Retrieve All Orders**
  - `GET /api/orders`
- **Retrieve Orders by User Email**
  - `GET /api/orders/search?email=<email>`

### Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any features, bug fixes, or improvements.
