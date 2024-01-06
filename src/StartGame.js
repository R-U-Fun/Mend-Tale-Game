import ReactDOM from 'react-dom';
import React, { useRef, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import HomeLinks from './HomeLinks';
import CurrentUserNameSingleton from './UserSingleton';
import HomePage from './HomePage';

function NewUserResponse(props){
    let GameProgressLength = 1;
    if(CurrentUserNameSingleton.getUserName()){
        GameProgressLength = CurrentUserNameSingleton.getUserName().GameProgress.length;
    }
    return(
        <UserResponseBox index={GameProgressLength} NewUserResponseText={props.NewUserResponseText}/>
    );
}

function PersonalisedFeedbackBox(props){
    let Text = "PersonalisedFeedback";
    if(props.First){
        Text = props.First;
    }
    if(CurrentUserNameSingleton.getUserName()){
        Text = CurrentUserNameSingleton.getUserName().GameProgress[(props.index)-1].PersonalisedFeedback;
    }
    return(
            <tr>
                <td><a className="btn btn-primary m-1" style={{width:"40px", cursor: 'auto'}}><i class="bi bi-soundwave"></i></a></td>
                <td><a className="btn btn-primary m-1" style={{cursor: 'auto'}}>{Text}</a></td>
            </tr>
    );
}

function UserResponseBox(props){
    let Text = "UserResponse";
    if(CurrentUserNameSingleton.getUserName()){
        Text = CurrentUserNameSingleton.getUserName().GameProgress[(props.index)-1].UserResponse;
    }
    if(props.NewUserResponseText){
        Text = props.NewUserResponseText;
    }
    return(
            <tr>
                <td><a className="btn btn-primary m-1" style={{width:"40px", cursor: 'auto'}}><i className="bi bi-person-fill"></i></a></td>
                <td><a className="btn btn-primary m-1" style={{cursor: 'auto'}}>{Text}</a></td>
            </tr>
    );
}

function ChatInteraction(props){
    return(
        <div>
            <UserResponseBox index={props.index}/>
            <PersonalisedFeedbackBox index={props.index}/>
        </div>
    );
}

function ChatRows(){
    let GameProgressLength = 1;
    if(CurrentUserNameSingleton.getUserName()){
        GameProgressLength = CurrentUserNameSingleton.getUserName().GameProgress.length;
        console.log("GameProgressLegnth  "+GameProgressLength);
    }

    const Chats = [];

    for(let L = 1; L <= GameProgressLength; L++) {
        Chats.push(
            <tr key={L}>
                <ChatInteraction index={L}/>
            </tr>
        );
    }
    return(
        <div>{Chats}</div>
    );
}

export default function StartGame(){
    const RespondRef = useRef();
    return(
        <div>
            <div className="overflow-y-scroll" style={{height:'400px'}}>
                <table className="text-start">
                    <tbody>
                        <tr><tr>
                            <td><a className="btn btn-primary m-1" style={{width:"40px", cursor: 'auto'}}><i class="bi bi-soundwave"></i></a></td>
                            <td><a className="btn btn-primary m-1" style={{cursor: 'auto'}}>First</a></td>
                        </tr></tr>
                        <ChatRows/>
                        <tr id="NewResponseBox">
                        </tr>
                    </tbody>
                </table>
            </div>
            <hr/>
            <div className="input-group mb-3">
                <span className="input-group-text bi bi-person-fill btn btn-primary" id="RespondText" style={{cursor: 'auto'}}></span>
                <input type="text" className="form-control" placeholder="Respond" aria-label="Respond" aria-describedby="RespondText" ref={RespondRef}/>
                <button type="button" className="bi bi-arrow-return-right btn btn-primary fw-bold" onClick={() => ReactDOM.render(<NewUserResponse NewUserResponseText={RespondRef.current.value}/> , document.getElementById('NewResponseBox'))}></button>
            </div>
        </div>
    );
}