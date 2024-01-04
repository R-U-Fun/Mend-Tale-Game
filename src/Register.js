import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useRef } from 'react';
import Login from './Login';

function RegisterHandle(NewUserName, NewEmail, NewPassword, NewConfirmPassword){
    if( NewUserName && NewPassword && NewConfirmPassword){
        if(NewPassword === NewConfirmPassword){
        fetch(`http://localhost:3214/Server/UserProfile/${NewUserName}`)
        .then(response => response.json())
        .then(Data => {
            if(!Data){
                fetch('http://localhost:3214/Server/Register', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            Username: NewUserName,
                            Password: NewPassword,
                            Email: NewEmail,
                            GameProgress: [
                                {
                                    InteractionID: null,
                                    UserResponse: null,
                                    JournalEntry: null,
                                    MachineLearningAnalysis: null,
                                    PersonalisedFeedback: null
                                }
                            ]
                        })
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
            }
        
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Can Not Connect At The Moment: Server Update On Progress.");
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
            <a className="btn btn-primary m-4 fs-2 fw-bold" style={{width:"225px"}} onClick={() => ReactDOM.render(<Login />, document.getElementById('Box'))}>Register</a>
            <br/><br/><br/>
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
            <button type="button" className="btn btn-primary btn-lg m-2 fw-bold" onClick={() => RegisterHandle(usernameRef.current.value, emailRef.current.value, passwordRef.current.value, ConfirmpasswordRef.current.value)}><i className="bi bi-pen"></i> Register</button>
            <br/><br/><br/><br/>
        </div>
    );
}