import React from "react";
import App from "./App";
import Home from "./Components/Home";
import Categories from "./Components/Categories";
import Promotion from "./Components/Promotion";
import Wishlist from "./Components/Wishlist";
import Cart from "./Components/Cart";
import AddToCart from "./Components/AddToCart";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

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
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {},
  },
});
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
  </QueryClientProvider>
);
