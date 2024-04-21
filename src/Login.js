import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import React, {  useRef } from 'react';
import Register from './Register';
import HomeLinks from './HomeLinks';
import CurrentUserNameSingleton from './UserSingleton';
import StartGame from './StartGame';
import HomePage from './HomePage';

import ServerURL from './ServerURL';

import Cookies from 'js-cookie';

import useWindowSize from 'react-use/lib/useWindowSize'

function LoginHandle(CurrentUserName, CurrentPassword){
    if(CurrentUserName && CurrentPassword){
        fetch(ServerURL.MTServer1()+`/Server/UserProfile/${CurrentUserName}`)
        .then(response => response.json())
        .then(Data => {
            if(CurrentPassword === Data.Password){
                console.log("LOGIN CHECK");
                CurrentUserNameSingleton.setUserName(Data);

                let CookieName = Data.Username.toString();

                Cookies.set('MendTaleUser', CookieName, { expires: 7 });
                
                ReactDOM.render(<StartGame />, document.getElementById('Box'));
                ReactDOM.render(<HomeLinks />, document.getElementById('PlayerHere'));
            }
            else{
                alert("Invalid Username & Password");
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Invalid Username & Password");
        });
    }
    else{
        alert("Please fill Username & Password");
    }
}

export default function Login(){
    let { width, height } = useWindowSize();
    
    ReactDOM.render(<div></div>, document.getElementById('PlayerHere'));
    const usernameRef = useRef();
    const passwordRef = useRef();
    return(
        <div style={{height:`${height-175}px`}}>
            <a className="btn btn-primary m-4 fs-2 fw-bold" style={{width:"225px", cursor: 'auto'}} onClick={() => {
                ReactDOM.render(<HomePage/>, document.getElementById('HomeHere'));
            }}>Login</a>
            <br/><br/><br/><br/>
            <div className="input-group mb-3">
                <span className="input-group-text btn btn-primary" id="basic-addon1"><i className="bi bi-at"></i></span>
                <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" ref={usernameRef}/>
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text btn btn-primary" id="basic-addon1"><i className="bi bi-asterisk"></i></span>
                <input type="password" className="form-control" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1" ref={passwordRef}/>
            </div>
            <button type="button" className="btn btn-primary btn-lg m-2 fw-bold" onClick={() => LoginHandle(usernameRef.current.value, passwordRef.current.value)} style={{width:"200px"}}><i className="bi bi-door-closed"></i> Login</button>
            <br/>
            <button type="button" className="btn btn-primary btn-lg m-2 fw-bold" onClick={() => ReactDOM.render(<Register />, document.getElementById('Box'))}><i className="bi bi-pen"></i> Register</button>
            <br/><br/><br/><br/>
        </div>
    );
}