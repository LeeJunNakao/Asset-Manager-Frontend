import react from 'react';
import { InputConfig } from "components/inputs/protocols";
import { ValidationPipeArg } from "./protocols";
import {required, callback, email, password } from "./validation-fns";
import {pipe} from "utils/functions";

export const validator = (items: InputConfig[]): ValidationPipeArg[] => {
    return items.map(item => {
        return pipe(item, required, email, password, callback)
    })
}