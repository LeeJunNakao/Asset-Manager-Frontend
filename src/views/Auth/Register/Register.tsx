import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { register } from "http-services/auth"
import FormBuilder, { FormData } from "components/form/FormBuilder/FormBuilder";
import { InputConfig } from "components/inputs/protocols";
import { setLogin } from "store/auth";
import { generateFormErrors, updateFormErrors } from "utils/form/adapters";
import { validator } from "utils/form/validator";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    
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
                    required: true
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

    const onClick = async () => {
        // try {
        //     const { token } = await register({ name, email, password });
        //     localStorage.setItem("access_token", token);

        //     dispatch(setLogin())
        //     navigate("/")
        // } catch (error) {
        //     console.log("fail to login")
        // }
    }

    return (
        <div>
            <FormBuilder formData={formData} onSubmit={onClick} btnColor={"black"} setErrors={setErrors} />
        </div>


    );
}

export default Register;