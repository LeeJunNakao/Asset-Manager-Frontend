import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { login } from "http-services/auth"
import FormBuilder from "components/form/FormBuilder/FormBuilder";
import { InputConfig } from "components/inputs/protocols";
import { setLogin } from "store/auth";


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onClick = async () => {
        try {
            const { token } = await login({ email, password });
            localStorage.setItem("access_token", token);

            dispatch(setLogin())
            navigate("/")
        } catch (error) {
            console.log("fail to login")
        }
    }

    const formData = {
        title: "Login",
        properties: [
            {
                title: "email",
                label: "Email",
                type: "text",
                inputStyle: "input" as InputConfig["inputStyle"],
                state: email,
                setState: setEmail,
            },
            {
                title: "password",
                label: "Password",
                type: "password",
                inputStyle: "input" as InputConfig["inputStyle"],
                state: password,
                setState: setPassword
            }
        ]
    }


    return (
        <div>
            <FormBuilder formData={formData} onSubmit={onClick} btnColor={"black"} />
        </div>


    );
}

export default Login;