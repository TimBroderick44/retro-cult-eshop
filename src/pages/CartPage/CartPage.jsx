import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext.jsx";
import style from "./CartPage.module.scss";

const CartPage = () => {
    const { cartItems, removeFromCart, cartTotal } = useContext(CartContext);

    return (
        <div className={style.cartcontainer}>
            <h1>Your Cart</h1>
            <div className={style.cartGrid}>
                {/* If the cart is empty, display a message */}
                {cartItems.length === 0 && <div className={style.empty}>....Your cart is empty.</div>}
                {/* If the cart is not empty, display the items in the cart */}
                {cartItems.map((item, index) => (
                    <div key={index} className={style.cartitem}>
                        <div className={style.iteminfo}>
                            <img
                                src={item.background_image || "hagrid.jpeg"}
                                alt={item.name}
                                className={style.itemimage}
                            />
                            <div className={style.itemdetails}>
                                <div className={style.itemtitle}>
                                    {item.name}
                                </div>
                                <div className={style.itemcondition}>
                                    Condition: {item.condition}
                                </div>
                                <div className={style.itemprice}>
                                    ${item.price.toFixed(2)} x {item.quantity} =
                                    ${item.price * item.quantity}
                                </div>
                            </div>
                        </div>
                        <div className={style.itemactions}>
                            <button onClick={() => removeFromCart(item.id)}>
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {/* If the cart is not empty, display the total and a checkout button */}
            {cartItems.length > 0 && (
                <div className={style.cartTotal} >
                    <h2>
                        Total: $
                        {cartTotal.toFixed(2)}
                    </h2>
                    <button className={style.cartcheckout}>
                        Proceed to Checkout
                    </button>
                </div>
            )}
        </div>
    );
};

export default CartPage;
