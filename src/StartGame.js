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
            <tr>
                <td><a className="btn btn-primary m-1" style={{width:"40px", cursor: 'auto'}}><i class="bi bi-soundwave"></i></a></td>
                <td><a className="btn btn-primary m-1">{CurrentUserNameSingleton.getUserName().GameProgress[1].PersonalisedFeedback}</a></td>
            </tr>
        );
    }
    else{
        return(
            <tr>
                <td><a className="btn btn-primary m-1" style={{width:"40px", cursor: 'auto'}}><i class="bi bi-soundwave"></i></a></td>
                <td><a className="btn btn-primary m-1">PersonalisedFeedback</a></td>
            </tr>
        );
    }
}

function UserResponseBox(){
    if(CurrentUserNameSingleton.getUserName()){
        return(
            <tr>
                <td><a className="btn btn-primary m-1" style={{width:"40px", cursor: 'auto'}}><i className="bi bi-person-fill"></i></a></td>
                <td><a className="btn btn-primary m-1">{CurrentUserNameSingleton.getUserName().GameProgress[1].UserResponse}</a></td>
            </tr>
        );
    }
    else{
        return(
            <tr>
                <td><a className="btn btn-primary m-1" style={{width:"40px", cursor: 'auto'}}><i className="bi bi-person-fill"></i></a></td>
                <td><a className="btn btn-primary m-1">UserResponse</a></td>
            </tr>
        );
    }
}

export default function StartGame(){
    const RespondRef = useRef();
    return(
        <div>
            <div className="overflow-y-scroll" style={{height:'400px'}}>
                <table className="text-start">
                    <tbody>
                        <tr>
                            <UserResponseBox/>
                        </tr>
                        <tr>
                            <PersonalisedFeedbackBox/>
                        </tr>
                        <tr>
                            <UserResponseBox/>
                        </tr>
                        <tr>
                            <PersonalisedFeedbackBox/>
                        </tr>
                        <tr>
                            <UserResponseBox/>
                        </tr>
                        <tr>
                            <PersonalisedFeedbackBox/>
                        </tr>
                        <tr>
                            <UserResponseBox/>
                        </tr>
                        <tr>
                            <PersonalisedFeedbackBox/>
                        </tr>
                    </tbody>
                </table>
            </div>
            <hr/>
            <input type="text" className="form-control m-1" placeholder="Respond" ref={RespondRef}/><br/>
        </div>
    );
}