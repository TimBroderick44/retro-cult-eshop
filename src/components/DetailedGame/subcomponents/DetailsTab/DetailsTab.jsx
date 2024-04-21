import React from "react";
import style from "./DetailsTab.module.scss";

const DetailsTab = ({ game }) => (
    <div className={style.detailsContainer}>
        <div className={style.stats}>
            <h4> ESRB Rating: {game.esrb_rating} </h4>
            <h4>
                Genre: {game.genres.map((genre, index) => (
                    <span key={index}>
                        {genre}
                        {index < game.genres.length - 1 ? ", " : ""}
                    </span>
                ))}
            </h4>
            <h4> Release: {game.released} </h4>
            <h4>Metacritic Score: {game.metacritic || "N/A"}</h4>
        </div>
        <div className={style.prices}>
            <h4>Prices:</h4>
            {game.price.map((price, index) => {
                const quantity = game.quantity.find(
                    (q) => q.type === price.type
                )?.amount;
                const availability =
                    quantity > 0 ? `${quantity} in stock` : "Sold out";
                return (
                    <div key={index}>
                        <h4>
                            {price.type}: ${price.amount} <span className={style.availability}>({availability})</span>
                        </h4>
                    </div>
                );
            })}
        </div>
    </div>
);

export default DetailsTab;
