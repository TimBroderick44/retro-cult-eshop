import React from "react";
import Carousel from "../../components/Carousel/Carousel";
import Navigators from "../../components/Navigators/Navigators";
import sephiroth from "../../assets/images/sephiroth.jpg";
import chrono from "../../assets/images/chrono.jpg";
import tomba from "../../assets/images/tomba.png";
import crash from "../../assets/images/crash.webp";
import residentevil2 from "../../assets/images/residentevil2.jpg";
import ff9 from "../../assets/images/ff9.avif";
import medieval from "../../assets/images/medieval.jpg";
import cloud from "../../assets/images/cloud.avif";
import ff8Castle from "../../assets/images/ff8Castle.avif";
import mixed from "../../assets/images/mixed.avif";
import mmg from "../../assets/images/mmg.avif";
import PSMagazine from "../../assets/images/PSMagazine.webp";
import PSMontage from "../../assets/images/PSMontage.jpg";


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
                    { src: sephiroth, alt: "Sephiroth" },
                    { src: chrono, alt: "Chrono" },
                    { src: tomba, alt: "Tomba" },
                    { src: crash, alt: "Crash" },
                    { src: residentevil2, alt: "Resident Evil 2" },
                    { src: ff9, alt: "Final Fantasy 9" },
                    { src: medieval, alt: "Medieval" },
                    { src: cloud, alt: "Cloud" },
                    { src: ff8Castle, alt: "FF8 Castle" },
                    { src: mixed, alt: "Mixed" },
                    { src: mmg, alt: "MMG" },
                    { src: PSMagazine, alt: "PS Magazine" },
                    { src: PSMontage, alt: "PS Montage" },
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
