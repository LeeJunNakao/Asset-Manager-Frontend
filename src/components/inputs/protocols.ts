import { Dispatch, SetStateAction} from "react";
import { ValidationConfig } from "utils/form/validator/protocols";

export interface InputConfig {
    title: string;
    label: string;
    type: string;
    inputStyle: "input";
    properties?: this;
    state: any;
    setState: Dispatch<SetStateAction<any>>;
    validation?: ValidationConfig
}