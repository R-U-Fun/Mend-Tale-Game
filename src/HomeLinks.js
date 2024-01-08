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

export default function HomeLinks(){
    let UserData = CurrentUserNameSingleton.getUserName();
    return(
        <div>
            <a className="btn btn-primary btn-lg m-2" onClick={() => ReactDOM.render(<UserProfile />, document.getElementById('Box'))} style={{width:"200px"}}>
                &nbsp;&nbsp;&nbsp;
                <p className="fw-bold"><i className="bi bi-person-fill"></i></p>
                <p className="fw-bold">{UserData.Username}</p>
            </a><br/>
            <button className="btn btn-primary btn-lg m-2 fw-bold" onClick={() => {
                ReactDOM.render(<StartGame />, document.getElementById('Box'));
            }} style={{width:"200px"}}>Play</button><br/>
            <button className="btn btn-primary btn-lg m-2 fw-bold" onClick={() => ReactDOM.render(<PersonalJournal />, document.getElementById('Box'))} style={{width:"200px"}}>Personal Journal</button><br/>
            <button className="btn btn-primary btn-lg m-2 fw-bold" onClick={() => ReactDOM.render(<Progress />, document.getElementById('Box'))} style={{width:"200px"}}>Progress</button><br/>
            <button className="btn btn-primary btn-lg m-2 fw-bold" onClick={() => {
                CurrentUserNameSingleton.setUserName(null);
                ReactDOM.render(<HomePage/>, document.getElementById('HomeHere'));
            }} style={{width:"200px"}}>Logout</button><br/>
        </div>
    );
}