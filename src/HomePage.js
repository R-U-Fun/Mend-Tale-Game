import ReactDOM from 'react-dom';
import React, { useRef } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Login from './Login';
import LoginHandle from './Login';
import CurrentUserNameSingleton from './UserSingleton';
import StartGame from './StartGame';
import TrialGame from './TrialGame';
import HomeLinks from './HomeLinks';

import ServerURL from './ServerURL';

import Cookies from 'js-cookie';
import TitleImage from './Images/MD_Title_T_BG.png';

function CookieFalse(){
    return(
            <div>
                <div className="container text-center">
                    <div className="row gx-3 text-center justify-content-center">
                        <div id="LoginHere" className="col-lg-1"></div>
                        <div className=" col-lg-9 ">
                            <div className="card  text-white" style={{ background: 'rgba(0, 0, 0, 0)', border: 'none',display: 'flex',  alignItems: 'center'}} id="Box">
                                <br/>
                                <img src={`${TitleImage}`} id="AaroophanIMG" height="80px" width="300px" className="rounded-5" alt="MendTale" /> 
                                <hr className="text-white"/><br/>
                                <div style={{cursor:'default', textAlign: 'justify', color: 'rgba(210, 226, 250, 1)'}}><a className="btn btn-primary m-1 border-0" style={{cursor: 'auto', textAlign: 'justify', background:'rgba(1, 1, 41, 0)', color: 'rgba(210, 226, 250, 1)'}}><i><b>MendTale</b></i> is a text-based adventure game website that analyses user's mood by utilizing machine learning and provide feedback through storytelling using Natural Language Processing to promote a sense of emotional-awareness among its users. By combining gaming, personal journaling, machine learning, and storytelling, users will be encouraged to interact with the platform regularly, turning this emotional-awareness promotion into an enjoyable and informative experience.<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Aaroophan</a></div>
                                <hr className="text-white"/><br/>

                                <TrialGame/>
                            </div>
                        </div>
                        <div id="PlayerHere" className="col-lg-1"><button className="btn btn-primary btn-lg m-2 fw-bold" onClick={() => ReactDOM.render(<Login />, document.getElementById('Box'))} style={{width:"200px"}}>Login</button></div>
                    </div>
                </div>
            </div>
        );
}

function CookieTrue(){
    return(
            <div>
                <div className="container text-center">
                    <div className="row gx-3 text-center justify-content-center">
                        <div id="LoginHere" className="col-lg-1"></div>
                        <div className=" col-lg-9 ">
                            <div className="card  text-white" style={{ background: 'rgba(0, 0, 0, 0)', border: 'none',display: 'flex',  alignItems: 'center'}} id="Box">
                                <StartGame/>
                            </div>
                        </div>
                        <div id="PlayerHere" className="col-lg-1"><HomeLinks /></div>
                    </div>
                </div>
            </div>
    );
}

function CookieHandle(CurrentUserName){ServerURL.MTServer1()
    fetch(ServerURL.MTServer1()+`/Server/UserProfile/${CurrentUserName}`)
        .then(response => response.json())
        .then(Data => {
            console.log("LOGIN CHECK");
            CurrentUserNameSingleton.setUserName(Data);
            ReactDOM.render(<CookieTrue />, document.getElementById('HomeHere'));
        })
        .catch(error => {
            console.error('Error:', error);
    });
}

export default function HomePage(){
    let MendtaleCookie = Cookies.get('MendTaleUser');

    let TrialGameRef = useRef(null);
    let scrollToTrialGame = () => {
        TrialGameRef.current.scrollIntoView({ behavior: 'smooth' });
    };
        
    if (MendtaleCookie){
        console.log(MendtaleCookie);
        CookieHandle(MendtaleCookie);
    }   
    else{
        return(
            <div>
                <div className="container text-center">
                    <div className="row gx-3 text-center justify-content-center">
                        <div id="LoginHere" className="col-lg-1"></div>
                        <div className=" col-lg-9 ">
                            <div className="card text-white" style={{ background: 'rgba(0, 0, 0, 0)', border: 'none',display: 'flex',  alignItems: 'center'}} id="Box">
                                <br/>
                                <img src={`${TitleImage}`} id="AaroophanIMG" height="80px" width="300px" className="rounded-5" alt="MendTale" /> 
                                <hr className="text-white"/><br/>
                                <div style={{cursor:'default', textAlign: 'justify', color: 'rgba(210, 226, 250, 1)'}}>
                                    <a className="btn btn-primary m-1 border-0" style={{cursor: 'auto', textAlign: 'justify', background:'rgba(1, 1, 41, 0)', color: 'rgba(210, 226, 250, 1)'}}><i><b>MendTale</b></i> is a text-based adventure game website that analyses user's mood by utilizing machine learning and provide feedback through storytelling using Natural Language Processing to promote a sense of emotional-awareness among its users. By combining gaming, personal journaling, machine learning, and storytelling, users will be encouraged to interact with the platform regularly, turning this emotional-awareness promotion into an enjoyable and informative experience.<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Aaroophan</a>
                                </div>
                                <a onClick={scrollToTrialGame} className="btn btn-primary m-1" style={{cursor: 'auto', textAlign: 'center', background:'rgba(1, 1, 41, 0)', color: 'rgba(210, 226, 250, 1)'}}>Try <i><b>MendTale</b></i></a>
                                <div ref={TrialGameRef}>
                                    <br/><hr className="text-white"/><br/>
                                    <TrialGame/>
                                </div>
                            </div>
                        </div>
                        <div id="PlayerHere" className="col-lg-1"><br/><button className="btn btn-primary btn-lg m-2 fw-bold" onClick={() => ReactDOM.render(<Login />, document.getElementById('Box'))} style={{width:"200px"}}>Login</button></div>
                    </div>
                </div>
            </div>
        );
    }
}