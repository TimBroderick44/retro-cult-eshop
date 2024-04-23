import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navigators.module.scss"; 
import { SearchContext } from "../../context/SearchContext";
import handCursorUrl from "../../assets/images/FF7Cursor.png";
import moveSoundUrl from "../../assets/sounds/FF7CursorMove.mp3";

function Navigators({ links }) {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [moveSound, setMoveSound] = useState(null);
    const { setSearchTerm } = useContext(SearchContext);

    useEffect(() => {
        const audio = new Audio(moveSoundUrl);
        setMoveSound(audio);
    }, []);

    const handleMouseEnter = (index) => {
        setHoveredIndex(index);
        moveSound?.play();
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };

    return (
        <div className={styles.navigation}>
            {/* For each link in the links array, create a div with a NavLink component */}
            {links.map((link, index) => (
                <div
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                    className={styles.navItem}
                    key={index}
                >
                    <NavLink
                        to={link.path}
                        className={({ isActive }) =>
                            isActive
                                ? `${styles.navLink} ${styles.navLinkActive}`
                                : styles.navLink
                        }
                        onClick={() => setSearchTerm("")}
                    >
                        {link.label}
                    </NavLink>
                    {hoveredIndex === index && (
                        <img
                            src={handCursorUrl}
                            className={styles.handCursor}
                            alt="Cursor"
                        />
                    )}
                </div>
            ))}
        </div>
    );
}

export default Navigators;
