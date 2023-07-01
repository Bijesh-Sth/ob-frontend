import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginApi } from "../../apis/Api";
import { useDispatch } from "react-redux";
import { addUser } from "../../store/userSlice";
import { customerApi } from "../../apis/Api";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };
    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const navigate = useNavigate();

    // NOTE: Login without redux
    const handleSubmit = (e) => {
        e.preventDefault();

        try {
            loginApi({
                email: email,
                password: password,
            })
                .then((res) => {
                    console.log(res);

                    localStorage.setItem("token", res.data.token);
                    localStorage.setItem("user", JSON.stringify(res.data.user));

                    toast.success(res.data.msg);

                    // NOTE: Navigate after Login
                    navigate("/");
                })
                .catch((err) => {
                    toast.error(err.response.data.msg);
                });
        } catch (error) {
            toast.error("Login Failed");
        }
    };

    // NOTE: Login with redux
    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     try {
    //         // console.log("##########################");
    //         // customerApi().then((res) => {
    //         //     console.log(res);
    //         // });
    //         loginApi({
    //             email: email,
    //             password: password,
    //         })
    //             .then((res) => {
    //                 console.log(res);

    //                 localStorage.setItem("token", res.data.token);
    //                 dispatch(addUser(res.data.user));

    //                 toast.success(res.data.msg);

    //                 // NOTE: Navigate after Login
    //                 navigate("/");
    //             })
    //             .catch((err) => {
    //                 toast.error(err.response.data.msg);
    //             });
    //     } catch (error) {
    //         toast.error("Login Failed");
    //     }
    // };

    return (
        <>
            <section className="vh-100 pt-5">
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-9 col-lg-6 col-xl-5">
                            <img src="assets/images/draw2.png" className="img-fluid" alt="Sample" />
                        </div>
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <form>
                                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                                    <p className="lead fw-normal mb-0 me-3">Sign in with</p>
                                    <button type="button" className="btn btn-primary btn-floating mx-1">
                                        <i className="fab fa-facebook-f"></i>
                                    </button>

                                    <button type="button" className="btn btn-primary btn-floating mx-1">
                                        <i className="fab fa-twitter"></i>
                                    </button>

                                    <button type="button" className="btn btn-primary btn-floating mx-1">
                                        <i className="fab fa-linkedin-in"></i>
                                    </button>
                                </div>

                                <div className="divider d-flex align-items-center my-4">
                                    <p className="text-center fw-bold mx-3 mb-0">Or</p>
                                </div>

                                {/* <div className="form-outline mb-4">
            <input htmlFor="text" className="form-control form-control-lg" placeholder="Enter a valid email address" />
            <label className="form-label">Email address</label>
          </div> */}

                                <div className="form-group  mb-4">
                                    <input htmlFor="text" id="name" name="name" onChange={handleEmail} className="form-control" placeholder="Enter a valid email address" />
                                </div>

                                <div className="form-group  mb-4">
                                    <input htmlFor="text" id="name" name="name" onChange={handlePassword} className="form-control" placeholder="Password" />
                                </div>

                                {/* <div className="form-outline mb-3">
            <input type="password" id="form3Example4" className="form-control form-control-lg" placeholder="Enter password" />
            <label className="form-label" for="form3Example4">Password</label>
          </div> */}

                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="form-check mb-0">
                                        <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                                        <label className="form-check-label" for="form2Example3">
                                            Remember me
                                        </label>
                                    </div>
                                    <Link to={"/forgot-password"} className="link-primary">
                                        Forgot password?
                                    </Link>
                                </div>

                                <div className="text-center text-lg-start mt-4 pt-2">
                                    <button type="button" onClick={handleSubmit} className="btn btn-primary btn-lg">
                                        Login
                                    </button>
                                    <p className="small fw-bold mt-2 pt-1 mb-0">
                                        Don't have an account?
                                        <Link to={"/Register"} className="link-danger">
                                            {" "}
                                            Register
                                        </Link>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Login;
