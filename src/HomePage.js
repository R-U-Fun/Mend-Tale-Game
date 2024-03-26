import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Login from './Login';
import LoginHandle from './Login';
import CurrentUserNameSingleton from './UserSingleton';
import StartGame from './StartGame';
import StartGame2 from './TrialGame';
import HomeLinks from './HomeLinks';

import Cookies from 'js-cookie';

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
                <br/><br/>
            </div>
    );
}

function CookieHandle(CurrentUserName){
    fetch(`https://mend-tale-server1.onrender.com/Server/UserProfile/${CurrentUserName}`)
        .then(response => response.json())
        .then(Data => {
            console.log("LOGIN CHECK");
            CurrentUserNameSingleton.setUserName(Data);
            ReactDOM.render(<CookieTrue />, document.getElementById('HomeHere'));
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Can Not Connect At The Moment: Server Update On Progress.");
    });
}

export default function HomePage(){
    let MendtaleCookie = Cookies.get('MendTaleUser');
        
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
                            <div className="card  text-white" style={{ background: 'rgba(0, 0, 0, 0)', border: 'none',display: 'flex',  alignItems: 'center'}} id="Box">
                                <StartGame2/>
                            </div>
                        </div>
                        <div id="PlayerHere" className="col-lg-1"><button className="btn btn-primary btn-lg m-2 fw-bold" onClick={() => ReactDOM.render(<Login />, document.getElementById('Box'))} style={{width:"200px"}}>Login</button></div>
                    </div>
                </div>
                <br/><br/>
            </div>
        );
    }
}