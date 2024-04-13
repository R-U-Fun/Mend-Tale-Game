import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import React, {  useRef } from 'react';
import HomeLinks from './HomeLinks';
import CurrentUserNameSingleton from './UserSingleton';
import StartGame from './StartGame';

import Confettii from './Confetti';
import Achievements from './Achievements';
import Progress from './Progress';
import UserProfile from './UserProfile';

import ServerURL from './ServerURL';
import Cookies from 'js-cookie';
import useWindowSize from 'react-use/lib/useWindowSize'
import HomePage from './HomePage';

async function EditHandle(NewUserName, NewEmail, OldPassword, NewPassword, NewConfirmPassword){
    let UserData = CurrentUserNameSingleton.getUserName();
    if(!NewUserName){
        NewUserName = UserData.Username;
    }
    if(!NewEmail){
        NewEmail = UserData.Email;
    }
    if(!NewPassword){
        NewPassword = UserData.Password;
    }
    if(!NewConfirmPassword){
        NewConfirmPassword = UserData.Password;
    }

    console.log(NewUserName);
    console.log(NewEmail);
    if(OldPassword === UserData.Password){

    if( NewPassword && NewConfirmPassword){
        if(NewPassword === NewConfirmPassword){
            window.location.reload(false);
            await fetch(ServerURL.MTServer1()+`/Server/UpdateProfile/${UserData.Username}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Username: NewUserName,
                    Password: NewPassword,
                    Email: NewEmail
                }),
            })
            .catch((error) => {
                console.log('Errrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrror:', error);
            });

            Cookies.remove('MendTaleUser');
            CurrentUserNameSingleton.setUserName(null);
            ReactDOM.render(<HomePage />, document.getElementById('HomeHere'));
        }
        else{
            alert("Password & Confirm Password doesn't match");
            ReactDOM.render(<EditProfile />, document.getElementById('Box'));
        }
    }
    else{
        alert("Please fill Username, Password & Confirm Password");
        ReactDOM.render(<EditProfile />, document.getElementById('Box'));
    }
    }
    else{
        alert("Invalid Password");
    }
}

export default function EditProfile(){
    let { width, height } = useWindowSize();
    let UserData = CurrentUserNameSingleton.getUserName();
    const usernameRef = useRef();
    const emailRef = useRef();
    const oldpasswordRef = useRef();
    const passwordRef = useRef();
    const ConfirmpasswordRef = useRef();

    return(
        <div style={{height:`${height-150}px`}}>
        <a className="btn btn-primary m-4 fs-2 fw-bold" style={{width:"225px"}} onClick={() => {
            ReactDOM.render(<StartGame />, document.getElementById('Box'));
            ReactDOM.render(<HomeLinks />, document.getElementById('PlayerHere'));
        }}>Edit Profile</a>
        <br/>
            <table className="text-start">
                <tbody>
                    <tr>
                        <th><a className="btn btn-primary m-2 fw-bold" style={{width:"150px", cursor: 'auto'}}>Username</a></th>
                        <td><input type="text" className="form-control btn btn-light m-2 fw-bold text-dark" placeholder={`${UserData.Username}`} style={{width:"170px", cursor: 'auto'}} ref={usernameRef}/></td>
                    </tr>
                    <tr>
                        <th><a className="btn btn-primary m-2 fw-bold" style={{width:"150px", cursor: 'auto'}}>Email</a></th>
                        <td><input type="text" className="form-control btn btn-light m-2 fw-bold text-dark" placeholder={`${UserData.Email}`} style={{width:"170px", cursor: 'auto'}} ref={emailRef}/></td>
                    </tr>
                    <tr>
                        <th><a className="btn btn-primary m-2 fw-bold" style={{width:"150px", cursor: 'auto'}}>Old Password</a></th>
                        <td><input type="password" className="form-control btn btn-light m-2 fw-bold text-dark" placeholder="Old Password" style={{width:"170px", cursor: 'auto'}} ref={oldpasswordRef}/></td>
                    </tr>
                    <tr>
                        <th><a className="btn btn-primary m-2 fw-bold" style={{width:"150px", cursor: 'auto'}}>Password</a></th>
                        <td><input type="password" className="form-control btn btn-light m-2 fw-bold text-dark" placeholder="New Password" style={{width:"170px", cursor: 'auto'}} ref={passwordRef}/></td>
                    </tr>
                    <tr>
                        <th><a className="btn btn-primary m-2 fw-bold" style={{width:"150px", cursor: 'auto'}}>Confirm Password</a></th>
                        <td><input type="password" className="form-control btn btn-light m-2 fw-bold text-dark" placeholder="Confirm Password" style={{width:"170px", cursor: 'auto'}} ref={ConfirmpasswordRef}/></td>
                    </tr>
                </tbody>
            </table>
            <hr/>
            <tr>
                <th><a className="btn btn-success m-2 fw-bold" style={{width:"150px", cursor: 'auto'}} onClick={() => EditHandle(usernameRef.current.value, emailRef.current.value, oldpasswordRef.current.value, passwordRef.current.value, ConfirmpasswordRef.current.value)}>Save</a></th>
                <td><a className="btn btn-danger m-2 fw-bold" style={{width:"170px", cursor: 'auto'}} onClick={() => ReactDOM.render(<UserProfile />, document.getElementById('Box'))}>Cancel</a></td>
            </tr>
        </div>
    );
}