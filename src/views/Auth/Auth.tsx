import { useState, useEffect } from "react";
import Login from "./Login/Login";
import Register from "./Register/Register";
import RecoverPassword from "./RecoverPassword/RecoverPassword";
import Button from "components/buttons/Button/Button";
import "./Auth.scss";
import PageContent from "components/page-content/PageContent";

function Auth() {
    const [form, setForm] = useState("login")
    const [buttonText, setButtonText] = useState("Register")

    useEffect(() => {
        if (form === "login") {
            setButtonText("Register")
        }
        if (form === "register" || form === "recover") {
            setButtonText("Login")
        }
    }, [form])

    const handleClick = () => {
        if (form === "login") {
            setForm("register")
        }
        if (form === "register" || form === "recover") {
            setForm("login")
        }
    }

    return (
        <div id="auth-page">
            <PageContent text="Asset Manager">
                {
                    form === "login" && <Login setForm={setForm} />
                }
                {
                    form === "register" && <Register />
                }
                {
                    form === "recover" && <RecoverPassword />
                }
                <Button text={buttonText} color={"gray-light"} onClick={handleClick} />
            </PageContent>
        </div>
    );
}

export default Auth;