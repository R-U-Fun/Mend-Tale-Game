import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import React, {  useRef } from 'react';
import HomeLinks from './HomeLinks';
import CurrentUserNameSingleton from './UserSingleton';
import StartGame from './StartGame';
import UserProfile from './UserProfile';

import ServerURL from './ServerURL';
import Cookies from 'js-cookie';
import useWindowSize from 'react-use/lib/useWindowSize';
import Sound, { LoadedSound, LoadingSound } from './Sound';

async function DeleteHandle(OldPassword){
    let UserData = CurrentUserNameSingleton.getUserName();

    if(OldPassword === UserData.Password){
        if(window.confirm("Are you sure you want to delete your profile?\nDo you wish to continue?")) {
            await fetch(ServerURL.MTServer1()+`/Server/DeleteProfile/${UserData.Username}`, {
                method: 'DELETE',
            })
            .then(response => response.json())
            .catch((error) => {
                console.log('Error:', error);
            });

            Cookies.remove('MendTaleUser');
            window.location.reload(false);
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
    const oldpasswordRef = useRef();

    return(
        <div style={{height:`${height-150}px`}}>
        <LoadedSound/>
        <a className="btn btn-primary m-4 fs-2 fw-bold" style={{width:"225px"}} onClick={() => {
            ReactDOM.render(<StartGame />, document.getElementById('Box'));
            ReactDOM.render(<HomeLinks />, document.getElementById('PlayerHere'));
        }}>Delete Profile</a>
        <br/>
            <table className="text-start">
                <tbody>
                    <tr>
                        <th><a className="btn btn-primary m-2 fw-bold" style={{width:"150px", cursor: 'auto'}}>Username</a></th>
                        <td><a className="btn btn-primary m-2 fw-bold" style={{width:"170px", cursor: 'auto'}}>{UserData.Username}</a></td>
                    </tr>
                    <tr>
                        <th><a className="btn btn-primary m-2 fw-bold" style={{width:"150px", cursor: 'auto'}}>Password</a></th>
                        <td><input type="password" className="form-control btn btn-light m-2 fw-bold text-dark" placeholder="Password" style={{width:"170px", cursor: 'auto'}} ref={oldpasswordRef}/></td>
                    </tr>
                </tbody>
            </table>
            <hr/>
            <tr>
                <th><a className="btn btn-success m-2 fw-bold" style={{width:"150px", cursor: 'auto'}} onClick={() => DeleteHandle(oldpasswordRef.current.value)}>Delete</a></th>
                <td><a className="btn btn-danger m-2 fw-bold" style={{width:"170px", cursor: 'auto'}} onClick={() => ReactDOM.render(<UserProfile />, document.getElementById('Box'))}>Cancel</a></td>
            </tr>
        </div>
    );
}
