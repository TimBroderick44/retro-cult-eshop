import React from "react";
import Carousel from "../../components/Carousel/Carousel";
import Navigators from "../../components/Navigators/Navigators";

// Array of objects containing the path and label for each link to use later in the Navigators component
const links = [
    { path: "/games", label: "ALL GAMES" },
    { path: "/games?filter=metacritic", label: "TOP 50" }, 
    { path: "/games?filter=genre", label: "GENRE" },
    { path: "/games?filter=sale", label: "ON SALE NOW" },
    { path: "/games?filter=favourites", label: "OUR FAVOURITES" },
];

const LandingPage = () => {

    return (
        <>
        {/* Carousel component with images and navigation */}
            <Carousel
                className="carousel"
                slides={[
                    {
                        url: "sephiroth.jpg",
                        alt: "Promotional Banner 0",
                    },
                    {
                        url: "chrono.jpg",
                        alt: "Promotional Banner 1",
                    },
                    {
                        url: "tomba.png",
                        alt: "Promotional Banner 2",
                    },
                    {
                        url: "crash.webp",
                        alt: "Promotional Banner 3",
                    },
                    {
                        url: "residentevil2.jpg",
                        alt: "Promotional Banner 4",
                    },
                    {
                        url: "ff9.avif",
                        alt: "Promotional Banner 5",
                    },
                    {
                        url: "medieval.jpg",
                        alt: "Promotional Banner 6",
                    },
                ]}
                autoplayDelay={5000} 
                navigationEnabled={true} 
                // Custom styles for the carousel
                swiperStyle={{ width: "80vw", height: "75vh", marginTop: "10px", borderRadius: "20px"}} 
                // Custom styles for the slides
                slideStyle={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                }}
            />
            <Navigators links={links} />
        </>
    );
};

export default LandingPage;
