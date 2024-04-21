import React, { useState, useContext, useEffect } from "react";
import { CartContext } from "../../context/CartContext";
import style from "./CartPopup.module.scss";
import { useNavigate } from "react-router-dom";

const AddToCartPopup = ({ game, onClose }) => {
    const { addToCart } = useContext(CartContext);
    const [condition, setCondition] = useState("loose");
    const [quantity, setQuantity] = useState(1);
    const [availableQuantity, setAvailableQuantity] = useState(0);
    const [unitPrice, setUnitPrice] = useState(0);

    const navigate = useNavigate();

    // Find the price and quantity available for the selected condition
    useEffect(() => {
        const priceEntry = game.price.find((p) => p.type === condition);
        const quantityEntry = game.quantity.find((q) => q.type === condition);
        setAvailableQuantity(quantityEntry ? quantityEntry.amount : 0);
        setUnitPrice(priceEntry ? priceEntry.amount : 0);
        setQuantity(1);
    }, [condition, game.price, game.quantity]);

const handleSubmit = () => {
    if (quantity <= availableQuantity) {
        addToCart({
            ...game,
            condition,
            quantity,
            price: unitPrice, 
        });
        handleClose();
    }
};
// if the user clicks the close button, navigate back to the previous page
    const handleClose = () => {
        if (onClose) onClose();
        navigate(-1); 
    };

    const totalPrice = unitPrice * quantity;

    // Display a message based on the availability of the product
    const availabilityMessage =
        availableQuantity === 0
            ? "We haven't any in stock. Please check again later."
            : availableQuantity === 1
            ? "Lucky you! That's the last one!!"
            : quantity === availableQuantity
            ? "Unfortunately, that's all we have in stock."
            : `Available: ${availableQuantity}`;

    return (
        <div className={style.popup}>
            <div className={style.popupInner}>
                <h3>Select condition and quantity:</h3>
                <select
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                >
                    <option value="loose">Loose Cartridge</option>
                    <option value="CIB">Complete in Box (CIB)</option>
                    <option value="new">New</option>
                </select>
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) =>
                        setQuantity(
                            Math.max(
                                1,
                                Math.min(
                                    parseInt(e.target.value, 10),
                                    availableQuantity
                                )
                            )
                        )
                    }
                    max={availableQuantity}
                    disabled={availableQuantity === 0}
                />
                <div className={style.availability}>{availabilityMessage}</div>
                <div className={style.totalPrice}>
                    Total Price: ${totalPrice.toFixed(2)}
                </div>
                <div className={style.button}>
                    <button
                        onClick={handleSubmit}
                        disabled={
                            availableQuantity === 0 ||
                            quantity > availableQuantity
                        }
                    >
                        Add to Cart
                    </button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default AddToCartPopup;
