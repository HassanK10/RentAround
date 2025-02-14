import React, { useState } from "react";
import App from "./App";
import Home from "./Components/Home";
import Categories from "./Components/Categories";
import Promotion from "./Components/Promotion";
import Wishlist from "./Components/Wishlist";
import Cart from "./Components/Cart";
import Profile from "./Components/Profile";
import MyListing from "./Components/MyListing";
import AddToCart from "./Components/AddToCart";
import Dashboard from "./Components/Dashboard";
import SignInPage from "./Components/SignInPage";
import ReactDOM from "react-dom/client";
import AuthProvider from "./Context/AuthContext";
import ProtectedRoute from "./Components/ProtectedRoute";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "bootstrap/dist/css/bootstrap.min.css";
import EditProfile from "./Components/EditProfile";
import "./index.css";

const IndexApp = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <App />
        </>
      ),
    },
    {
      path: "/Home",
      element: (
        <>
          <Home />
        </>
      ),
    },
    {
      path: "/Categories",
      element: (
        <>
          <Categories />
        </>
      ),
    },
    {
      path: "/Wishlist",
      element: (
        <>
          <Wishlist />
        </>
      ),
    },
    {
      path: "/Promotion",
      element: (
        <>
          <Promotion />
        </>
      ),
    },
    {
      path: "/Cart",
      element: (
        <>
          <Cart />
        </>
      ),
    },
    {
      path: `/product/:title`,
      element: (
        <>
          <AddToCart />
        </>
      ),
    },
    {
      path: "/profile",
      element: <ProtectedRoute />,
      children: [{ path: "/profile", element: <Profile /> }],
    },
    {
      path: "/sign-in",
      element: (
        <SignInPage showSignIn={showSignIn} setShowSignIn={setShowSignIn} />
      ),
    },
    {
      path: "/edit-profile",
      element: <EditProfile />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
      path: "my-listing",
      element: <MyListing />,
    },
  ]);
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  );
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {},
  },
});
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<IndexApp />);
