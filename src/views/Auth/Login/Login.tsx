import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { login } from "http-services/auth"
import FormBuilder, { FormData } from "components/form/FormBuilder/FormBuilder";
import { ValidationType } from "utils/form/validator/protocols";
import { InputConfig } from "components/inputs/protocols";
import { setLogin } from "store/auth";
import { isFormvalid } from "utils/form/adapters";
import "./Login.scss";
import { AxiosResponse } from "axios";

interface LoginProps {
    setForm: (formName: string) => void
}

function Login(props: LoginProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [formErrors, setErrors] = useState({});
    const [shouldSubmit, setShouldSubmit] = useState(false);
    const [responseError, setResponseError] = useState("");
    const [awaitingResponse, setAwaitingResponse] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const submit = async () => {
        try {
            setAwaitingResponse(true);
            const { token } = await login({ email, password });
            localStorage.setItem("access_token", token);

            dispatch(setLogin())
            navigate("/")
        } catch (error: any) {
            setResponseError(error.response.data.message)
        } finally {
            setAwaitingResponse(false);
        }
    }

    useEffect(() => {
        if(shouldSubmit && isFormvalid(formErrors)) submit()
    }, [formErrors])

    const formData: FormData = {
        title: "Login",
        properties: [
            {
                title: "email",
                label: "Email",
                type: "text",
                inputStyle: "input" as InputConfig["inputStyle"],
                state: email,
                setState: setEmail,
                validation: {
                    type: ValidationType.EMAIL,
                    required: true
                }
            },
            {
                title: "password",
                label: "Password",
                type: "password",
                inputStyle: "input" as InputConfig["inputStyle"],
                state: password,
                setState: setPassword,
                validation: {
                    type: ValidationType.PASSWORD,
                    required: true
                }
            }
        ]
    }


    return (
        <div id="login-form">
            <FormBuilder formData={formData} setErrors={setErrors} onSubmit={() => setShouldSubmit(true)} btnColor={"black"} formError={responseError} loading={awaitingResponse} />
            <div className="link-wrapper">
                <a href="#" onClick={() => props.setForm("recover")}>Recover password</a>
            </div>
        </div>
    );
}

export default Login;