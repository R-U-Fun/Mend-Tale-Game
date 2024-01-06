import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import UserProfile from './UserProfile';
import CurrentUserNameSingleton from './UserSingleton';

export default function Player(){
    let UserData = CurrentUserNameSingleton.getUserName();
    return(
            <a className="btn btn-primary btn-lg m-2" onClick={() => ReactDOM.render(<UserProfile />, document.getElementById('Box'))} style={{width:"200px"}}>
                &nbsp;&nbsp;&nbsp;
                <p className="fw-bold"><i className="bi bi-person-fill"></i></p>
                <p className="fw-bold">{UserData.Username}</p>
            </a>
    );
}