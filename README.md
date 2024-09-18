# Bigbasket Clone

## About the Project

Bigbasket Clone is a full-stack e-commerce website built using the MERN stack. This project replicates the user experience of the bigbasket website, providing a seamless and interactive interface for users to browse, search, and purchase products. It includes both frontend and backend parts.

Project link: [Bigbasket Clone](https://mern-big-basket-clone.netlify.app/) 🚀

## Tech Stack 🛠️

- **Frontend**: React, Chakra UI
- **State Management**: Redux Toolkit
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: bcrypt, JWT

## Features 

- **Login and Signup**: Secure authentication with JWT and password hashing with bcrypt.
- **Cart Page**: Allows users to view and manage their selected items.
- **Sorting Options**: Helps users to sort products based on various criteria.
- **Filtering Options**: Allow users to filter based on brands
- **Single Product Page**: Provides detailed information about each product.
- **Proper Routing**: Implemented to ensure smooth navigation between pages.
- **Multiproduct Page**: Displays a list of products with filtering options.

## Frontend 

- Utilized **React** and **Chakra UI** to create a visually appealing and responsive user interface.
- Managed application states (login, cart) using **Redux**.
- User React-router-dom for routing

## Backend 

- Developed server-side logic using **Node.js** and **Express**.
- Used **bcrypt** for password hashing and **JWT** for token-based authentication.
- **MongoDB** serves as the database to store user details and product data.

## Images

### Homepage

![Homepage](https://raw.githubusercontent.com/RohitBasantYadav/Big_basket_clone/main/frontend/public/Home.png)

### Multiproduct Page

![Multiproduct Page](https://raw.githubusercontent.com/RohitBasantYadav/Big_basket_clone/main/frontend/public/MultiProductPage.png)

### Single Product Page

![Single Product Page](https://raw.githubusercontent.com/RohitBasantYadav/Big_basket_clone/main/frontend/public/SingleProductPage.png)

### Cart Page

![Cart Page](https://raw.githubusercontent.com/RohitBasantYadav/Big_basket_clone/main/frontend/public/CartPage.png)

### Login Page

![Login Page](https://raw.githubusercontent.com/RohitBasantYadav/Big_basket_clone/main/frontend/public/Login.png)

### Signup Page

![Signup Page](https://raw.githubusercontent.com/RohitBasantYadav/Big_basket_clone/main/frontend/public/SignUp.png)

## Installation 

To get started with this project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/RohitBasantYadav/Big_basket_clone.git

2. Navigate to the project directory:

   ```bash
    cd Big_basket_clone

3. Install the dependencies for both frontend and backend:

   ```bash
   cd frontend
   npm install
   cd backend
   npm install

4. Create a .env file in the backend directory and add the following environment variables:

   ```bash
    MONGODB_URI=<your-mongodb-url>
    PORT=<any-port-number>
    ACCESS_TOKEN_SECRET_KEY=<your-secret-key>
    REFRESH_TOKEN_SECRET_KEY=<your-secret-key>

5. Create a .env file in the frontend directory and add the following environment variables:

    ```bash
    VITE_API_URL=<your-api-url>

6. Start the backend server locally:

   ```bash
    npm run server

7. Start the frontend locally:

   ```bash
    npm run dev

    