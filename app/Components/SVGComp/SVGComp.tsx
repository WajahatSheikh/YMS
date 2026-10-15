import React from "react";
import SVG from "react-inlinesvg";

type svgProps = {
    src: string;
    className?: string;
};

const SvgComp = ({ src, className }: svgProps) => {
    return <SVG src={src} className={className} />;
};

export default SvgComp;
