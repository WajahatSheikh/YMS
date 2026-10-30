"use client";
import React from "react";
import Link from "next/link";
import style from "./index.module.scss";

interface HeaderListProps {
    text: string;
    link: string;
    isActive?: boolean;
    /** In-page scroll on the home page. Without it the item is a normal page link. */
    onClick?: () => void;
}

const HeaderList: React.FC<HeaderListProps> = ({ text, link, isActive, onClick }) => {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        onClick?.();
    };

    return (
        <li className={`${style.list} ${isActive ? style.active : ""}`}>
            {onClick ? (
                <a href={link} onClick={handleClick}>
                    {text}
                </a>
            ) : (
                <Link href={link} aria-current={isActive ? "page" : undefined}>
                    {text}
                </Link>
            )}
        </li>
    );
};

export default HeaderList;
