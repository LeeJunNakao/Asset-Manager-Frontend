import React, { useState, Dispatch, SetStateAction, useEffect } from "react";

import Input from "components/inputs/Input/Input";
import { InputConfig } from "components/inputs/protocols";
import Button from "components/buttons/Button/Button";
import { generateFormErrors, updateFormErrors } from "utils/form/adapters";
import { validator } from "utils/form/validator";


export interface FormErrors {
    [field: string]: {
        error: boolean;
        message: string;
    }
}

export interface FormData {
    title: string;
    properties: InputConfig[];
}

interface FormProps {
    formData: FormData;
    onSubmit: (args?: any) => void;
    btnColor?: string;
    setErrors?:  Dispatch<SetStateAction<FormErrors>>
}

const inferInput = (property: InputConfig): any => {
    const inputTypes = {
        input: Input
    }

    return inputTypes[property.inputStyle] || Input;
}

function FormBuilder(props: FormProps) {
    const formData = props.formData;

    const [formErrors, setErrors] = useState(generateFormErrors(formData.properties.map(i => i.title)));

    useEffect(() => {
        if (props.setErrors) props.setErrors(formErrors)
    }, [formErrors])

    const buildedForm = formData.properties.map((p, idx) => {
        const Component = inferInput(p);
        const error = formErrors[p.title].error;
        const errorMessaqge = formErrors[p.title].message

        return (<Component config={p} setContent={p.setState} key={idx.toString()} label={p.label} error={error} errorMessage={errorMessaqge}></Component>)
    })

    const onSubmit = () => {
        const result = validator(formData.properties)
        updateFormErrors(result, setErrors)
        props.onSubmit();
    }

    const Form = (
        <div className="form-component-wrapper">
            <>{buildedForm}</>
            <div className="buttons-wrapper">
                <Button text="Submit" onClick={onSubmit} color={props.btnColor || "black"} />
            </div>
        </div>
    )

    return (<>{Form}</>)
}

export default FormBuilder;