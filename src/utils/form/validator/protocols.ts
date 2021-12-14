import { InputConfig } from "components/inputs/protocols";

export enum ValidationType { 
    EMAIL = "email",
    PASSWORD = "password",
}

export interface ValidationConfig {
    required?: boolean;
    type?: ValidationType;
    callback?: (arg?: any) => any;
}

export interface ValidationResult {
    error: boolean;
    message: string;
}

export interface ValidationPipeArg {
    item: InputConfig;
    result: ValidationResult
}