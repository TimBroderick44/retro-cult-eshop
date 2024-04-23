import React, { useState } from "react";
import Tab from "./Tab/Tab.jsx";
import DescriptionTab from "./subcomponents/DescriptionTab/DescriptionTab.jsx";
import DetailsTab from "./subcomponents/DetailsTab/DetailsTab.jsx";
import ReccommendTab from "./subcomponents/ReccommendTab/ReccommendTab.jsx";
import ReviewsTab from "./subcomponents/ReviewsTab/ReviewTab.jsx";
import style from "./DetailedGame.module.scss";
import Carousel from "../../components/Carousel/Carousel.jsx";
import CartPopup from "../../components/CartPopup/CartPopup.jsx"
import { getStarRating } from "../../utility/utilityFunctions.js";
import { useNavigate } from "react-router-dom";
import PSX from "../../assets/images/PSX.png";
import hagrid from "../../assets/images/hagrid.jpeg";
import PSsquare from "../../assets/images/PSsquare.png";
import PStriangle from "../../assets/images/PStriangle.png"
import PScircle from "../../assets/images/PScircle.png";

const DetailedGame = ({
    game,
    extras,
    activeTab,
    setActiveTab,
    onLike,
    onShare,
}) => {
    if (!game) return null;

    const navigate = useNavigate();

    // When the user clicks the close button, navigate back to the previous page
    // i.e. in most cases the search results
    // Doesn't work if the user navigated directly to the detailed game page
    // TODO: Fix this
    const onClose = () => {
        navigate(-1);
    };

    // Get the lowest price of the game
    // Because the price is an array of objects, we need to find the object with the lowest amount
    const { price } = game;
    const lowestPrice = price.reduce(
        (min, p) => (p.amount < min.amount ? p : min),
        price[0]
    );

    const starRating = getStarRating(game.rating);

    const [showAddToCartPopup, setShowAddToCartPopup] = useState(false);

    const handleBuyClick = () => {
        setShowAddToCartPopup(true);
    };

    return (
        <div className={style.container}>
            <div className={style.detailedGame}>
                <div className={style.headingClose}>
                    <h4 className={style.path}>
                        Home - PS Games - {game.name}
                    </h4>
                    <img
                        className={style.close}
                        src={PSX}
                        alt=""
                        onClick={onClose}
                    />
                </div>
                {showAddToCartPopup && (
                    <CartPopup
                        game={game}
                        onClose={() => setShowAddToCartPopup(false)}
                    />
                )}
                <div className={style.headingContainer}>
                    <div className={style.summary}>
                        <h2 className={style.title}>{game.name}</h2>
                        <h4 className={style.rating}>Rating: {starRating}</h4>
                    </div>
                    <h2 className={style.price}>
                        <span>FROM</span> ${lowestPrice.amount}
                    </h2>
                </div>
                <div className={style.content}>
                    <div className={style.imgTabs}>
                        <img
                            src={game.background_image || hagrid}
                            alt={game.name}
                            className={style.image}
                        />
                        <div className={style.tabs}>
                            <Tab
                                extras={extras}
                                onClick={() => setActiveTab("description")}
                            >
                                Description
                            </Tab>
                            <Tab onClick={() => setActiveTab("details")}>
                                Product Details
                            </Tab>
                            <Tab
                                onClick={() => setActiveTab("recommendations")}
                            >
                                Similar
                            </Tab>
                            <Tab onClick={() => setActiveTab("reviews")}>
                                Reviews
                            </Tab>
                        </div>
                    </div>
                    <div className={style.carouselContent}>
                        <Carousel
                            slides={game.short_screenshots.map(
                                (screenshot) => ({
                                    url: screenshot,
                                    alt: "Game screenshot",
                                })
                            )}
                            autoplayDelay={5000}
                            navigationEnabled={true}
                            swiperStyle={{
                                marginTop: "20px",
                                borderRadius: "15px",
                                boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
                            }}
                            slideStyle={{
                                display: "flex",
                                justifyContent: "center",
                                boxSizing: "border-box",
                            }}
                        />
                        <div className={style.tabContent}>
                            {activeTab === "description" && (
                                <DescriptionTab extras={extras} />
                            )}
                            {activeTab === "details" && (
                                <DetailsTab game={game} />
                            )}
                            {activeTab === "reviews" && (
                                <ReviewsTab game={game} extras={extras} />
                            )}
                            {activeTab === "recommendations" && (
                                <ReccommendTab game={game} />
                            )}
                        </div>
                    </div>
                </div>
                <div className={style.buttonContainer}>
                    <button className={style.buy} onClick={handleBuyClick}>
                        Buy
                        <img src={PSsquare} alt="" />
                    </button>

                    <button className={style.like} onClick={onLike}>
                        Like
                        <img src={PStriangle} alt="" />
                    </button>
                    <button className={style.share} onClick={onShare}>
                        Share
                        <img src={PScircle} alt="" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DetailedGame;
