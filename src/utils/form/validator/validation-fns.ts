import { InputConfig } from "components/inputs/protocols";
import { ValidationPipeArg } from "./protocols";
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