import { Dispatch, SetStateAction } from "react";
import { FormErrors } from "components/form/FormBuilder/FormBuilder";
import { ValidationPipeArg } from "utils/form/validator/protocols";
import { FormData } from "components/form/FormBuilder/FormBuilder";


export const generateFormErrors = (names: string[]): FormErrors => {
    const entries = names.map(n => [n, { error: false, message: "" }]);

    return Object.fromEntries(entries);
}

export const updateFormErrors = (validationResult: ValidationPipeArg[], setFormError: Dispatch<SetStateAction<FormErrors>>) => {
    const formDataEntries = validationResult.map(result => [result.item.title, result.result]);
    const formData: FormErrors = Object.fromEntries(formDataEntries);
    setFormError(formData);
};