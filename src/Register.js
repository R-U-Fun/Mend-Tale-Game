import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useRef } from 'react';
import Login from './Login';


import ServerURL from './ServerURL';

import Cookies from 'js-cookie';
import Sound, { LoadedSound, LoadingSound } from './Sound';

function RegisterHandle(NewUserName, NewEmail, NewPassword, NewConfirmPassword){
    if( NewUserName && NewPassword && NewConfirmPassword){
        if(NewPassword === NewConfirmPassword){
        ReactDOM.render(
        <>
            <LoadingSound/>
            <br/><br/>
            <div className="spinner-border text-primary fs-3" role="status"></div>
            <br/><br/>
        </>
        , document.getElementById('RegisterLoading'));
        fetch(ServerURL.MTServer1()+`/Server/UserProfile/${NewUserName}`)
        .then(response => response.json())
        .then(Data => {
            if(!Data){
                const CurrentDate = new Date();
                let IDTime = (""+CurrentDate.getFullYear()+"_"+(CurrentDate.getMonth()+1)+"_"+CurrentDate.getDate()+"_"+CurrentDate.getHours()+"_"+CurrentDate.getMinutes()+"_"+CurrentDate.getSeconds());

                let NewUser = {
                    Username: NewUserName,
                    Password: NewPassword,
                    Email: NewEmail,
                    GameProgress: [
                        {
                            InteractionID: "0_"+NewUserName+"_"+IDTime ,
                            UserResponse: "",
                            JournalEntry: "",
                            MachineLearningAnalysis: "",
                            PersonalisedFeedback: "You are sitting in a coffee shop with six people named Halin, Leo, Ethi, Skott, Ariadni and Frikyn. A stranger enters the coffee shop. The Stranger comes and sits in your table. All the people in the coffee shop is looking at you. What will you do?"
                        }
                    ]
                }

                console.log(NewUser);

                fetch('https://mend-tale-server1.onrender.com/Server/Register', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(
                            NewUser
                        )
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log("REGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGg");
                        console.log(data);
                        ReactDOM.render(<Login />, document.getElementById('Box'));
                    })
                    .catch(error => {
                        console.error(error);
                        console.log("Errrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrror registering new user     "+error);
                    });
            }
            else{
                alert("Username Already Exists");
                ReactDOM.render(<Register />, document.getElementById('Box'));
            }
        
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Can Not Connect At The Moment: Server Update On Progress.");
            window.location.reload(false);
        });
        
        }
        else{
            alert("Password & Confirm Password doesn't match");
        }
    }
    else{
        alert("Please fill Username, Password & Confirm Password");
    }
}

export default function Register(){
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const ConfirmpasswordRef = useRef();

    return(
        <div>
            <LoadedSound/>
            <a className="btn btn-primary m-4 fs-2 fw-bold" style={{width:"225px"}} onClick={() => ReactDOM.render(<Login />, document.getElementById('Box'))}>Register</a>
            <br/><br/>
            <div className="input-group mb-3">
                <span className="input-group-text btn btn-primary" id="Username"><i className="bi bi-at"></i></span>
                <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="Username" ref={usernameRef}/>
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text btn btn-primary" id="Email"><i className="bi bi-at"></i></span>
                <input type="text" className="form-control" placeholder="Email" aria-label="Email" aria-describedby="Email" ref={emailRef}/>
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text btn btn-primary" id="Password"><i className="bi bi-asterisk"></i></span>
                <input type="password" className="form-control" placeholder="Password" aria-label="Password" aria-describedby="Password" ref={passwordRef}/>
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text btn btn-primary" id="ConfirmPassword"><i className="bi bi-asterisk"></i></span>
                <input type="password" className="form-control" placeholder="Confirm Password" aria-label="ConfirmPassword" aria-describedby="ConfirmPassword" ref={ConfirmpasswordRef}/>
            </div>
            <div className="input-group mb-3">
                <details className="input-group-text btn btn-outline-primary" >
                    <summary>Terms & Conditions of MendTale</summary>
                    <div>
                    <p>By clicking 'Register'<br/>you are agreeing to Terms & Conditions of MendTale</p>
                    </div>
                </details>
            </div>
            <div id="RegisterLoading">
            <button type="button" className="btn btn-primary btn-lg m-2 fw-bold" onClick={() => RegisterHandle(usernameRef.current.value, emailRef.current.value, passwordRef.current.value, ConfirmpasswordRef.current.value)}><i className="bi bi-pen"></i> Register</button>
            <br/>
            </div>
        </div>
    );
}