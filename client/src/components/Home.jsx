import React, { useState, useEffect } from "react";
import { LOGOUT } from '../constants/actionTypes';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Home = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const checkUser = () => { if(user === null) navigate('/auth') };
        setUser(JSON.parse(localStorage.getItem('profile')));
        checkUser();
    }, []);

    const handleLogout = () => {
        dispatch({ type: LOGOUT });
        navigate("/auth");
    };

    return (
        <>
            { user && <h2>{user.result.name}</h2> }
            <button onClick={handleLogout}>Logout</button>
        </>
    );
};

export default Home;