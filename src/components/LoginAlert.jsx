import React from 'react';
import './LoginAlert.css'; 
import { useNavigate } from "react-router-dom";

const LoginAlert = () => {
    const navigate = useNavigate();

    const handleAlert = () => {
        navigate("/login");
    };

    return (
        <div className="alert-container">
        <h1 className="alert-title">To access the portal you need to login</h1>

        <button className="alert-button" onClick={handleAlert}>
            Login Here
        </button>
        </div>
    );
};

export default LoginAlert;
