import React from "react";
import style from "./Game.module.scss";

const Game = ({ game, onClick }) => {
    const { name, price, background_image, rating } = game;

    // Find the lowest price of the game (i.e. Loose)
    const lowestPrice = price.reduce(
        (min, p) => (p.amount < min.amount ? p : min),
        price[0]
    );

    return (
        <div className={style.gameCard} onClick={onClick}>
            <img
                src={background_image || "/hagrid.jpeg"}
                alt={name}
                className={style.gameImage}
            />
            <div className={style.gameDetails}>
                <h3>{name}</h3>
                <div className={style.stats}>
                    <div> Rating:</div>
                    <div className={style.HP}>{rating} / 5</div>
                    <div> Price:</div>
                    <div className={style.MP}>${lowestPrice.amount}</div>
                </div>
            </div>
        </div>
    );
};

export default Game;

