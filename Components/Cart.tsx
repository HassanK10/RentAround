import React from "react";
import NavBar from "./NavBar";
import Page6 from "./Page6";
import "../Cart.css";
import toast, { Toaster } from "react-hot-toast";
import { SearchProvider } from "./SearchContext";
import { useCart } from "../Components/UseCart";

const notify = () => toast.success("Deleted from Cart!");
const notify2 = () => {
  toast.success("You Will Recieve you Item within 2 days");
};

const Cart = () => {
  const { getCart, removeItemFromCart } = useCart();
  const cartItems = getCart();

  const handleRemoveItem = (itemId: string) => {
    removeItemFromCart.mutate(itemId);
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + Number(item.price) * item.quantity,
      0
    );
  };

  return (
    <SearchProvider>
      <NavBar />
      <div className="cart-container">
        <div className="cart-header">
          <h2>My Cart</h2>
        </div>
        <div className="cart-body">
          {cartItems.length === 0 ? (
            <p className="empty-cart-message">cart is empty.</p>
          ) : (
            <>
              <ul className="cart-items-list">
                {cartItems.map((item) => (
                  <li key={item.id} className="cart-item">
                    <div className="cart-item-info">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="cart-item-image"
                      />
                      <div className="cart-item-details">
                        <h4>{item.title}</h4>
                        <p>
                          €{item.price} x {item.quantity}
                        </p>
                      </div>
                    </div>
                    <button
                      className="remove-item-btn"
                      onClick={() => {
                        handleRemoveItem(item.id);
                        notify();
                      }}
                    >
                      &#10005;
                    </button>
                    <Toaster position="bottom-center" />
                  </li>
                ))}
              </ul>

              <div className="cart-total">
                <p className="total-text">Total: €{getTotalPrice()}</p>
                <button className="checkout-btn" onClick={notify2}>
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <Page6 />
    </SearchProvider>
  );
};

export default Cart;
