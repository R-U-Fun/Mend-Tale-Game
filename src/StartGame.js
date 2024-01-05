import ReactDOM from 'react-dom';
import React, { useRef, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import HomeLinks from './HomeLinks';
import CurrentUserNameSingleton from './UserSingleton';
import HomePage from './HomePage';

function PersonalisedFeedbackBox(){
    if(CurrentUserNameSingleton.getUserName()){
        return(
            <p className="text-dark">{CurrentUserNameSingleton.getUserName().GameProgress[1].PersonalisedFeedback}</p>
        );
    }
    else{
        return(
            <p className="text-dark">PersonalisedFeedback</p>
        );
    }
}

function UserResponseBox(){
    if(CurrentUserNameSingleton.getUserName()){
        return(
            <p className="text-dark">{CurrentUserNameSingleton.getUserName().GameProgress[1].UserResponse}</p>
        );
    }
    else{
        return(
            <p className="text-dark">UserResponse</p>
        );
    }
}

export default function StartGame(){
    const RespondRef = useRef();
    return(
        <div>
            <div className="card text-white" style={{ background: 'rgba(0, 0, 0, 0)', border: 'none',display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <a className="btn btn-primary m-4 fs-2 fw-bold" style={{width:"225px"}} onClick={() => {
                    if(CurrentUserNameSingleton.getUserName()){
                        ReactDOM.render(<StartGame />, document.getElementById('Box'));
                        ReactDOM.render(<HomeLinks />, document.getElementById('PlayerHere'));
                    }
                    else{
                        ReactDOM.render(<HomePage/>, document.getElementById('HomeHere'));
                    }
                }}>Game</a>
            </div>
            <PersonalisedFeedbackBox/>
            <UserResponseBox/>
            <input type="text" className="form-control m-4" placeholder="Respond" ref={RespondRef}/>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        </div>
    );
}