import React from 'react';
import "./Button.scss";

interface ButtonProp {
    text: string,
    color?: string,
    onClick?: () => void
}

function Button(props: ButtonProp) {
    const getStyle = (color: string): string => {
        const colorStyle: { [k: string]: string} = {
            "gray-light": "gray-light-bg black-border",
            black: "black-bg black-border"
        }
        const className = colorStyle[color] || "";

        return className;
    }

    return (
        <div className="button-component-wrapper">
            <button className={getStyle(props.color || "")} onClick={props.onClick}>{props.text}</button>
        </div>
    )
}

export default Button;