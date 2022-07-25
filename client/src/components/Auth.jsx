import React, { useState, useEffect } from "react";

import * as api from '../api';
import { AUTH } from '../constants/actionTypes';

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const initialState = {firstName: "", lastName: "", email: "", password: "", confirmPassword: ""};

const Auth = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [formData, setFormData] = useState(initialState);
    const [isSignup, setIsSignup] = useState(false);
    const [userMsgErr, setUserMsgErr] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const checkUser = () => { if(user !== null) return navigate("/") };
        setUser(JSON.parse(localStorage.getItem('profile')));
        checkUser();
    }, []);

    // Submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // check if sign in / sign up
            if(isSignup) {
                const { data } = await api.signup(formData);
                dispatch({ type: AUTH, payload: data });
            } else {
                const { data } = await api.signin(formData);
                dispatch({ type: AUTH, payload: data });
            }

            // redirect to home page
            navigate("/");
        } catch (err) {
            setUserMsgErr(err.response.data);
        }        
    };

    // Set current value of each input field to the formData
    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });;

    // Switch mode for user sign up / sign in
    const switchMode = (e) => {
        setIsSignup(prev => !prev);
        setUserMsgErr("");
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                {isSignup ? <>
                                <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required /><br />
                                <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required /><br />
                            </>
                : null}
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required /><br />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required /><br />
                {isSignup ? <>
                                <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required /><br />
                            </>
                : null}
                <button type="submit">{isSignup ? "Sign Up" : "Sign In"}</button>
            </form>
            <button onClick={switchMode}>{isSignup ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}</button>
            {userMsgErr && <h2>{userMsgErr?.message}</h2>}
        </>
    );
};

export default Auth;