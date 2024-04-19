import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Login from './Login';
import StartGame from './StartGame';
import UserProfile from './UserProfile';
import HomePage from './HomePage';
import CurrentUserNameSingleton from './UserSingleton';
import PersonalJournal from './PersonalJournal'
import Progress from './Progress'

import Cookies from 'js-cookie';
import LinkedInBadge from './LiBadge';

export default function HomeLinks(){
    let UserData = CurrentUserNameSingleton.getUserName();
    return(
        <div>
            <br/><br/>
            <a className="btn btn-outline-primary btn-lg m-2 position-relative" onClick={() => ReactDOM.render(<UserProfile />, document.getElementById('Box'))} style={{width:"200px", color: 'rgba(210, 226, 250, 1)'}}>
                &nbsp;&nbsp;&nbsp;
                <p className="fw-bold"><i className="bi bi-person-fill"></i></p>
                <p className="fw-bold">{UserData.Username}</p>
                {(parseInt(UserData.GameProgress.length) >= 10) ?
                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill ">
                        <i class="bi bi-star-fill text-primary"></i>
                    </span>
                :null}
                {(parseInt(UserData.GameProgress.length) >= 50) ?
                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary">
                        <i class="bi bi-star-fill"></i>
                    </span>
                :null}
                {(parseInt(UserData.GameProgress.length) >= 100) ?
                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning">
                        <i class="bi bi-star-fill"></i>
                    </span>
                :null}
            </a><br/>
            <a className="btn btn-outline-primary btn-lg m-2 fw-bold" onClick={() => {
                ReactDOM.render(<StartGame />, document.getElementById('Box'));
            }} style={{width:"200px", color: 'rgba(210, 226, 250, 1)'}}><i className="bi bi-chat-dots"></i> Play</a><br/>
            <a className="btn btn-outline-primary btn-lg m-2 fw-bold" onClick={() => ReactDOM.render(<PersonalJournal />, document.getElementById('Box'))} style={{width:"200px", color: 'rgba(210, 226, 250, 1)'}}><i className="bi bi-journal-text"></i> Journal</a><br/>
            <a className="btn btn-outline-primary btn-lg m-2 fw-bold" onClick={() => ReactDOM.render(<Progress />, document.getElementById('Box'))} style={{width:"200px", color: 'rgba(210, 226, 250, 1)'}}><i className="bi bi-calendar3"></i> Progress</a><br/>
            <a className="btn btn-outline-primary btn-lg m-2 fw-bold" onClick={() => {
                CurrentUserNameSingleton.setUserName(null);
                Cookies.remove('MendTaleUser');
                ReactDOM.render(<HomePage />, document.getElementById('HomeHere'));
            }} style={{width:"200px", color: 'rgba(210, 226, 250, 1)'}}><i className="bi bi-door-closed"></i> Logout</a><br/>
            <a className="btn btn-outline-dark border-0" style={{cursor:'default', color: 'rgba(210, 226, 250, 1)'}} onClick={() => {
                ReactDOM.render(<MendText/>, document.getElementById('Box'));
            }}></a><br/><br/>
            <a className="btn btn-primary m-2 border-0" onClick={() => {
                ReactDOM.render(<></>, document.getElementById("PlayerHere"));
                ReactDOM.render(<LinkedInBadge/>,  document.getElementById('Box'));
            }} style={{width:"200px", cursor: 'auto', textAlign: 'center', background:'rgba(1, 1, 41, 0)', color: 'rgba(210, 226, 250, 0.4)'}}><i className="bi bi-info-circle"></i> <i><b>MendTale</b></i></a>
        </div>
    );
}

function MendText(){
    return(
        <div style={{cursor:'default', textAlign: 'justify', color: 'rgba(210, 226, 250, 1)'}}>The idea of MendTale is to develop a text-based adventure game website that analyses user's mood by utilizing machine learning and provide feedback through storytelling using Natural Language Processing to promote a sense of emotional-awareness among its users. By combining gaming, personal journaling, machine learning, and storytelling, users will be encouraged to interact with the platform regularly, turning this emotional-awareness promotion into an enjoyable and informative experience.<br/>- Aaroophan</div>);
}