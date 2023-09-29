import React, { useEffect, useState, useContext } from "react";
// import { ProductData } from "../Checkout/ProductData";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/Provider";
import "./Cart.css";

const Cart = () => {
  const { cartDispatch } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [ProductData, setProductData] = useState([]);
  const [total, setTotal] = useState(null);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;
    cartItems.map((p) => (total += parseFloat(p.variant.price)));
    setTotal(total);
    setProductData(cartItems);
  }, []);

  const removeCartItem = (id) => {
    let newCartItems = ProductData.filter((p) => p.id !== id);
    let total = 0;
    newCartItems.map((p) => (total += parseFloat(p.variant.price)));
    setTotal(total);
    setProductData(newCartItems);
    cartDispatch({
      type: "REMOVE_PRODUCT",
      payload: newCartItems.length,
    });
    localStorage.setItem("cart", JSON.stringify(newCartItems));
    // localStorage.clear();
    // localStorage.setItem("pkgName", JSON.stringify(pkgName));
    // localStorage.setItem("pkgNames", JSON.stringify(pkgNames));
    // localStorage.setItem("circleBtns", JSON.stringify(circleBtns));
    // localStorage.setItem("indexPrice", JSON.stringify(indexPrice));
  };

  return (
    <>
      <div className="cart-section">
        <div className="cart-details-container">
          <div className="cart-sumary-title">
            <p>Cart Details ({ProductData.length})</p>
            <p>${total}</p>
          </div>

          <div className="cart-container">
            {ProductData.map((product) => (
              <div className="cart-container-product" key={product.id}>
                <div className="cart-col-4">
                  <img src={product.image} alt={product.image} />
                </div>

                <div className="cart-col-4">
                  <p>
                    {product.title}, {product.variant.variant_type}
                  </p>
                </div>

                {/* <div className="cart-col-4">
                  <i className="fa-sharp fa-solid fa-plus incri-diri-btn"></i>
                  <br />
                  <i className="fa-sharp fa-solid fa-minus incri-diri-btn"></i>
                </div> */}

                <div className="cart-col-4 cart-prouct-amount">
                  <p>{product.variant.price} $</p>
                  <button onClick={() => removeCartItem(product.id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}{" "}
            <br />
            <div className="cart-amount-tex">
              <p>Sales Tex</p>
              <p>$0.00</p>
            </div>
            <div className="cart-amount-tex">
              <p>Total Amount</p>
              <p>${total}</p>
            </div>
            <button
              className="shipping-submit-btn"
              onClick={() => navigate("/checkout")}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
