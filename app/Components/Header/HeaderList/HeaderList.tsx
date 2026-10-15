"use client";
import React from "react";
import style from "./index.module.scss";

interface HeaderListProps {
    text: string;
    link: string;
    isActive?: boolean;
    onClick?: () => void;
}

const HeaderList: React.FC<HeaderListProps> = ({ text, link, isActive, onClick }) => {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        onClick?.();
    };

    return (
        <li className={`${style.list} ${isActive ? style.active : ""}`}>
            <a href={link} onClick={handleClick}>
                {text}
            </a>
        </li>
    );
};

export default HeaderList;
