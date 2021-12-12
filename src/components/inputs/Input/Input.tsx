import React, { useState } from 'react';
import "./Input.scss";
import { InputConfig } from "../protocols";

interface InputProp {
    label: string;
    type?: string;
    setContent: (value: string) => void;
    config?: InputConfig;
    error?: boolean;
    errorMessage?: string;
}

function Input(props: InputProp) {  
    return (
        <div className="input-component-wrapper">
            <span> {props.label} </span>
            <input className="input-component" type={props.type || props.config?.type} onChange={e => props.setContent(e.target.value)} />
            <span className="message-error">{props.errorMessage}</span>
        </div>
    )
}

export default Input;