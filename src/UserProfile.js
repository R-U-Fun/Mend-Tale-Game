import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import HomeLinks from './HomeLinks';
import CurrentUserNameSingleton from './UserSingleton';
import StartGame from './StartGame';

export default function UserProfile(){
    let UserData = CurrentUserNameSingleton.getUserName();

    return(
        <div>
        <a className="btn btn-primary m-4 fs-2 fw-bold" style={{width:"225px"}} onClick={() => {
            ReactDOM.render(<StartGame />, document.getElementById('Box'));
            ReactDOM.render(<HomeLinks />, document.getElementById('PlayerHere'));
        }}>Profile</a>
        <br/>
            <table className="text-start">
                <tbody>
                    <tr>
                        <th><a className="btn btn-primary m-2 fw-bold" style={{width:"150px", cursor: 'auto'}}>Username</a></th>
                        <td><a className="btn btn-primary m-2 fw-bold" style={{width:"150px", cursor: 'auto'}}>{UserData.Username}</a></td>
                    </tr>
                    <tr>
                        <th><a className="btn btn-primary m-2 fw-bold" style={{width:"150px", cursor: 'auto'}}>Email</a></th>
                        <td><a className="btn btn-primary m-2 fw-bold" style={{width:"150px", cursor: 'auto'}}>{UserData.Email}</a></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}