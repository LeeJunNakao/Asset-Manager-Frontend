import { useEffect, useState } from "react";
import FormBuilder, { FormData } from "components/form/FormBuilder/FormBuilder";
import { InputConfig } from "components/inputs/protocols";
import { ValidationType } from "utils/form/validator/protocols";
import { recoverPassword } from "http-services/auth"
import { isFormvalid } from "utils/form/adapters";


function RecovePassword() {
    const [email, setEmail] = useState("");
    const [formErrors, setFormErrors] = useState({});
    const [shouldSubmit, setShouldSubmit] = useState(false);
    const [responseError, setResponseError] = useState("");
    const [awaitingResponse, setAwaitingResponse] = useState(false);

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
                    required: true,
                    type: ValidationType.EMAIL
                }
            },         
        ]
    }
    
    const submit = async () => {
        try {
            setAwaitingResponse(true);
            await recoverPassword({ email });
        } catch (error: any) {
            setResponseError(error.response.data.message)
        } finally {
            setAwaitingResponse(false);
        }
    }

    useEffect(() => {
        if(shouldSubmit && isFormvalid(formErrors)) submit();
    }, [formErrors])


    return (
        <div>
            <FormBuilder formData={formData} onSubmit={() => setShouldSubmit(true)}  setErrors={setFormErrors} formError={responseError} btnColor={"black"} loading={awaitingResponse} />
        </div>
    )
}

export default RecovePassword