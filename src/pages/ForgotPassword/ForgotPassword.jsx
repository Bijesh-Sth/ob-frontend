import { useState } from "react";
import { toast } from "react-toastify";
import { forgotPasswordApi } from "../../apis/Api";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const handelSubmit = (e) => {
        e.preventDefault();
        console.log(email);
        forgotPasswordApi({email} ).then((res) => {
            toast.success(res.data.msg);
             }).catch((err) => {
            toast.error(err.response.data.msg);
        });
    };
    


    return (
        <div className="container">
            <h1>Forget Password</h1>
            <form>
                <label htmlFor="email">Enter your email</label>
                <input type="email" className="form-control w-25" name="email" id="email" onChange={(e) => setEmail(e.target.value)} />
                <button type="submit" className="btn btn-primary " onClick={handelSubmit}>
                    Send Password Reset Link
                </button>
            </form>
        </div>
    );
};

export default ForgotPassword;