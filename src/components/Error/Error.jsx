import React from "react";
import style from "./Error.module.scss";

const Error = ({ error }) => {
    return <p className={style.error}>{error}</p>;
};

export default Error;
