import React from 'react'
import { useState } from 'react';
import { toast } from 'react-toastify'
import { Link } from "react-router-dom"
import { registerApi } from '../../apis/Api';

const Register = () => {
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [pass2, setPass2] = useState('');


    //error State
    const [fnameErr, setFnameErr] = useState('');
    const [lnameErr, setLnameErr] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const [passErr, setPassErr] = useState('');
    const [pass2Err, setPass2Err] = useState('');

    const validate = () => {
        let isvalid = true;

        if (fname === '') {
            setFnameErr('Please enter your firstname');
            isvalid = false;
        }
        if (lname === '') {
            setLnameErr('Please enter your lastname');
            isvalid = false;
        }
        if (email === '') {
            setEmailErr('Please enter your email');
            isvalid = false;
        }
        if (pass === '') {
            setPassErr('Please enter your password');
            isvalid = false;
        }
        if (pass2 === '') {
            setPass2Err('Please enter your confirm password');
            isvalid = false;
        }
        
        if (pass !== pass2) {
            setPass2Err('Password does not match');
            isvalid = false;
        }
        return isvalid;
    }

    const handleFname = (e) => {
        setFname(e.target.value);
    }

    const handleLname = (e) => {
        setLname(e.target.value);
    }

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePass = (e) => {
        setPass(e.target.value);
    }

    const handlePass2 = (e) => {
        setPass2(e.target.value);
    }
    //handel submit
    const handleSubmit = (e) => {
        
        e.preventDefault();
        if(!validate()){
            return;
        }
        e.preventDefault();
        // console.log(fname,lname,email,pass,pass2);
        // try{

        // axios.post("http://localhost:5000/api/user/register",{
        //     fname: fname,
        //     lname: lname,
        //     email: email,
        //     password: pass,
        //     password2: pass2,
        // }).then((res)=>{ 
        //     toast.success(res.data.msg);
        // }).catch((err) => {
        //     console.log(err);
        //     toast.error("User registration failed");
        // })

        try {
            registerApi({
                fname: fname,
                lname: lname,
                email: email,
                password: pass,
                password2: pass2
            }).then((res) => {
                toast.success(res.data.msg);
            }).catch(err => {
                toast.error(err.response.data.msg);
            })
        } catch (error) {
            toast.error("User Registration Failed")
        }
        // }
        // catch(error){
        //     toast.error("User Registration Failed");
        // }

    }



    return (
        <div className="container">
            <h3>Register</h3>
            <div className="col-md-5">
                <form action="">
                    <div className="form-group">
                        <label htmlFor="name">Firstname</label>
                        <input onChange={handleFname}
                            type="text"
                            name="name"
                            id="name"
                            className="form-control"
                        />
                        {fnameErr && <p className="text-danger">{fnameErr}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastname">Lastname</label>
                        <input
                            onChange={handleLname}
                            type="text"
                            name="lastname"
                            id="lastname"
                            className="form-control"
                        />
                        {lnameErr && <p className="text-danger">{lnameErr}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            onChange={handleEmail}
                            type="text"
                            name="email"
                            id="email"
                            className="form-control"
                        />
                        {emailErr && <p className="text-danger">{emailErr}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            onChange={handlePass}
                            type="password"
                            name="password"
                            id="password"
                            className="form-control"
                        />
                        {passErr && <p className="text-danger">{passErr}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirm">Confirm Password</label>
                        <input
                            onChange={handlePass2}
                            type="password"
                            name="confirm"
                            id="confirm"
                            className="form-control"
                        />
                        {pass2Err && <p className="text-danger">{pass2Err}</p>}
                    </div>
                    <div className="form-group">
                        <button onClick={handleSubmit} className='btn btn-primary'>Register</button>
                    </div>
                </form>
                <p>
                    Already have an account? <Link to='/login'>Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register