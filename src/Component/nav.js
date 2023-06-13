import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Nav = () =>{
    const navTo = useNavigate();
    const logout = () =>{
        axios.post('https://api.zealnex.com/dev-connect/v1/auth/logout',{}).then((res)=>{
            navTo("/login");
        });
    }
    return(
        <nav>
            <h1>Zealnex Technologies</h1>
            <div>
                <button onClick={logout} className='f-right primary'>Logout</button>
                <button onClick={() => navTo('change_password')} className='f-right secoundary'>Change Password</button>
            </div>
            
        </nav>
    );
}

export default Nav;