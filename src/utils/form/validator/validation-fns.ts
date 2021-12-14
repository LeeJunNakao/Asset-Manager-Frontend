import { InputConfig } from "components/inputs/protocols";
import { ValidationPipeArg, ValidationType } from "./protocols";
import errorMessages from "./messages";



const getDefaultResult = () => ({ error: false, message: "" })

export const required = (item: InputConfig): ValidationPipeArg => {
    if (item.validation?.required) {
        const hasError = item.state === undefined || item.state === null || item.state === "";
        return {
            item,
            result: {
                error: hasError,
                message: hasError ? errorMessages.required : ""
            }

        }
    }

    return { item, result: getDefaultResult() }
}

export const callback = ({ item, result }: ValidationPipeArg): ValidationPipeArg => {
    if(result.error) return { item, result }

    if (item.validation?.callback) {
        return {
            item,
            result: item.validation.callback(item.state)
        }
    }

    return {
        item,
        result
    }
}

export const email = ({ item, result}: ValidationPipeArg): ValidationPipeArg => {
    if(result.error) return { item, result }
    
    const regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

    const isValid = regex.test(item.state);

    

    if(item.validation?.type === ValidationType.EMAIL) {
        return {
            item,
            result: {
                error: !isValid,
                message: isValid ? "" : errorMessages.email
            }
        }
    }

    return {
        item, result
    }

}

export const password = ({ item, result}: ValidationPipeArg): ValidationPipeArg => {
    if(result.error) return { item, result }
    
    const regex = /((?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])){8,12}/

    const isValid = regex.test(item.state);
    

    if(item.validation?.type === ValidationType.PASSWORD) {
        return {
            item,
            result: {
                error: !isValid,
                message: isValid ? "" : errorMessages.password
            }
        }
    }

    return {
        item, result
    }

}