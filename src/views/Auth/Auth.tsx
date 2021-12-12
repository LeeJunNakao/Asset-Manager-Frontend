import { useState, useEffect } from "react";
import Login from "./Login/Login";
import Register from "./Register/Register";
import Button from "components/buttons/Button/Button";
import "./Auth.scss";

function Auth() {
    const [form, setForm] = useState("login")
    const [buttonText, setButtonText] = useState("Register")
    
    useEffect(() => {
        if(form === "login") {
            setButtonText("Register")
        }
        if(form === "register") {
            setButtonText("Login")
        }
    }, [form])

    const handleClick = () => {
        if(form === "login") {
            setForm("register")
        }
        if(form === "register") {
            setForm("login")
        }
    }
    
    return (
        <div id="auth-page">
            <div className="auth-form">
                <div className="logo">
                    <span>Asset Manager</span>
                </div>
                <main>  
                    {
                        form === "login" && <Login />
                    }
                    {
                        form === "register" && <Register />
                    }
                    <Button text={buttonText} color={"gray-light"} onClick={handleClick} />
                </main>
            </div>
        </div>
    );
}

export default Auth;