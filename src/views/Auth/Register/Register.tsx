import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { register } from "http-services/auth"
import FormBuilder, { FormData } from "components/form/FormBuilder/FormBuilder";
import { InputConfig } from "components/inputs/protocols";
import { setLogin } from "store/auth";
import { isFormvalid } from "utils/form/adapters";
import { ValidationType } from "utils/form/validator/protocols";


function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [shouldSubmit, setShouldSubmit] = useState(false);
    const [responseError, setResponseError] = useState("");
    const [awaitingResponse, setAwaitingResponse] = useState(false);
    
    const [formErrors, setErrors] = useState({});

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const formData: FormData = {
        title: "Login",
        properties: [
            {
                title: "name",
                label: "Name",
                type: "text",
                inputStyle: "input" as InputConfig["inputStyle"],
                state: name,
                setState: setName,
                validation: {
                    required: true
                }
            },
            {
                title: "email",
                label: "Email",
                type: "text",
                inputStyle: "input" as InputConfig["inputStyle"],
                state: email,
                setState: setEmail,
                validation: {
                    required: true,
                    type: ValidationType.EMAIL
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
                    required: true,
                    type: ValidationType.PASSWORD
                }
            },
            {
                title: "repeatPassword",
                label: "Repeat password",
                type: "password",
                inputStyle: "input" as InputConfig["inputStyle"],
                state: repeatPassword,
                setState: setRepeatPassword,
                validation: {
                    required: true,
                    callback: (repeatValue) => repeatValue === password ? { error: false, message: "" } : { error: true, message: "Must be equal to password"}
                }
            },
        ]
    }

    const submit = async () => {
        try {
            setAwaitingResponse(true);
            const { token } = await register({ name, email, password });
            localStorage.setItem("access_token", token);

            dispatch(setLogin())
            navigate("/")
        } catch (error: any) {
            setResponseError(error.response.data.message)
            setAwaitingResponse(false)
        }
    }

    useEffect(() => {
        if(shouldSubmit && isFormvalid(formErrors)) {
            submit();
        }
    }, [formErrors])

    return (
        <div>
            <FormBuilder formData={formData} btnColor={"black"} onSubmit={() => setShouldSubmit(true)} setErrors={setErrors} formError={responseError} loading={awaitingResponse} />
        </div>


    );
}

export default Register;