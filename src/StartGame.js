import ReactDOM from 'react-dom';
import React, { useRef, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import HomeLinks from './HomeLinks';
import CurrentUserNameSingleton from './UserSingleton';

function PersonalisedFeedbackBox(){
    return(
        <a className="text-dark">PersonalisedFeedback</a>
    );
}

function UserResponseBox(){
    return(
        <a className="text-dark">UserResponse</a>
    );
}

export default function StartGame(){
    const inputRef = useRef();
    return(
        <div className="card text-white" style={{ background: 'rgba(0, 0, 0, 0)', border: 'none',display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <a className="btn btn-primary m-4 fs-2 fw-bold" style={{width:"225px"}} onClick={() => ReactDOM.render(<HomeLinks />, document.getElementById('Box'))}>Game</a>
            <PersonalisedFeedbackBox/>
            <UserResponseBox/>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        </div>
    );
}