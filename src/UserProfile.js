import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import HomeLinks from './HomeLinks';
import CurrentUserNameSingleton from './UserSingleton';
import StartGame from './StartGame';

import Confettii from './Confetti';
import Achievements from './Achievements';

export default function UserProfile(){
    let UserData = CurrentUserNameSingleton.getUserName();

    let Achievement = () => {
        console.log("HELLO");
        if(parseInt(UserData.GameProgress.length) > 10){
            console.log("HELLO2");
            return(
                <Confettii />
            );
        }
    };

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
                        <td><a className="btn btn-primary m-2 fw-bold" style={{width:"170px", cursor: 'auto'}}>{UserData.Username}</a></td>
                    </tr>
                    <tr>
                        <th><a className="btn btn-primary m-2 fw-bold" style={{width:"150px", cursor: 'auto'}}>Email</a></th>
                        <td><a className="btn btn-primary m-2 fw-bold" style={{width:"170px", cursor: 'auto'}}>{UserData.Email}</a></td>
                    </tr>
                    <tr>
                        <th><a className="btn btn-primary m-2 fw-bold" style={{width:"150px", cursor: 'auto'}}>Interactions</a></th>
                        <td><a className="btn btn-primary m-2 fw-bold" style={{width:"170px", cursor: 'auto'}}>{UserData.GameProgress.length}</a></td>
                    <Achievement/>
                    </tr>
                    <tr>
                        <th><a className="btn btn-primary m-2 fw-bold" style={{width:"150px", cursor: 'auto'}}>Badge</a></th>
                        <td><a className="btn btn-primary m-2 fw-bold" style={{width:"170px", cursor: 'auto'}}>
                            {(parseInt(UserData.GameProgress.length) > 100) ?
                                <i class="bi bi-star-fill bg-warning"></i>
                            :null}
                            {(parseInt(UserData.GameProgress.length) > 50) ?
                                <i class="bi bi-star-fill bg-secondary"></i>
                            :null}
                            {(parseInt(UserData.GameProgress.length) > 10) ?
                                <i class="bi bi-star-fill text-primary"></i>
                            :null}
                        </a></td>
                    <Achievement/>
                    </tr>
                </tbody>
            </table>
            <Achievements/>
        </div>
    );
}