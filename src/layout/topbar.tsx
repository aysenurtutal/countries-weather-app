// layout component and the components of inside are only template. We can specialize according to reqirenments, login, new tabs etc.

import Styles from "./layout.module.css"
import {useNavigate} from 'react-router-dom';
import React from "react";

const TopBar: React.FC = () => {
    const navigate = useNavigate(); // useNavigate hook for navigation

    const handleIconClick = () => {
        navigate('/'); // Redirect to the home page ("/")
    };

    return (
        <div className={Styles.topbar}>
            <div className="w-100">
                <h1>Countries Dashboard</h1>
            </div>
            <div className="float-end">
                <i
                    className="pi pi-home"
                    onClick={handleIconClick}
                    style={{ cursor: 'pointer', fontSize: '24px' }}
                />
            </div>
        </div>
    );
};

export default TopBar;
