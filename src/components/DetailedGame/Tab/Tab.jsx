import React, { useState, useEffect } from "react";
import style from "./Tab.module.scss";

// Sound and image assets
const handCursorUrl =
    "https://www.dropbox.com/s/1pq4d1ksjv3tuoz/FF7Cursor.png?raw=1";
const moveSoundUrl =
    "https://www.dropbox.com/s/fiyx4q2mdwynraj/FF7CursorMove.mp3?raw=1";

const Tab = ({ onClick, children }) => {
    const [hovered, setHovered] = useState(false);
    const [moveSound, setMoveSound] = useState(null);

    useEffect(() => {
        const audio = new Audio(moveSoundUrl);
        setMoveSound(audio);
    }, []);

    const handleMouseEnter = () => {
        setHovered(true);
        moveSound?.play();
    };

    const handleMouseLeave = () => {
        setHovered(false);
    };

    return (
        <div
            className={style.tab}
            onClick={onClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {children}
            {hovered && (
                <img
                    src={handCursorUrl}
                    className={style.handCursor}
                    alt="Cursor"
                />
            )}
        </div>
    );
};

export default Tab;
