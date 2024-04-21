import React from "react";
import DOMPurify from "dompurify";
import style from "./DescriptionTab.module.scss";

const DescriptionTab = ({ extras }) => {
    const cleanDescription = extras
        ? DOMPurify.sanitize(extras.description_raw || extras.description)
        : "No description available.";

    return (
        <div className={style.description}>
            <p dangerouslySetInnerHTML={{ __html: cleanDescription }} />
        </div>
    );
};

export default DescriptionTab;
