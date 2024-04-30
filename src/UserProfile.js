import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import HomeLinks from './HomeLinks';
import CurrentUserNameSingleton from './UserSingleton';
import StartGame from './StartGame';

import Confettii from './Confetti';
import Achievements from './Achievements';
import EditProfile from './EditProfile';
import DeleteProfile from './DeleteProfile';
import Sound, { LoadedSound, LoadingSound } from './Sound';

export default function UserProfile(){
    let UserData = CurrentUserNameSingleton.getUserName();

    let Achievement = () => {
        if(parseInt(UserData.GameProgress.length) > 50){
            return(
                <Confettii/>
            );
        }
    };

    return(
        <div><br/>
        <LoadedSound/>
        <a className="btn btn-primary m-4 fs-2 fw-bold" style={{width:"225px"}} onClick={() => {
            ReactDOM.render(<StartGame />, document.getElementById('Box'));
            ReactDOM.render(<HomeLinks />, document.getElementById('PlayerHere'));
        }}>Profile</a>
        <br/><br/>
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
                    </tr>
                    <tr>
                        <th><a className="btn btn-primary m-2 fw-bold" style={{width:"150px", cursor: 'auto'}}>Badge</a></th>
                        <td><a className="btn btn-primary m-2 fw-bold" style={{width:"170px", cursor: 'auto'}}>
                            {(parseInt(UserData.GameProgress.length) >= 100) ?
                                 <i class="bi bi-star-fill bg-warning"></i> 
                            : (parseInt(UserData.GameProgress.length) >= 50) ?
                                 <i class="bi bi-star-fill bg-secondary"></i> 
                            : (parseInt(UserData.GameProgress.length) >= 10) ?
                                 <i class="bi bi-star-fill text-primary"></i> 
                            :null}
                        </a></td>
                    <Achievement/>
                    </tr>
                </tbody>
            </table>
            <br/><br/>
            <Achievements/>
            <br/>
            <br/><hr/>
            <tr>
                <th><a className="btn btn-danger m-2 fw-bold" style={{width:"150px", cursor: 'auto'}} onClick={() => ReactDOM.render(<EditProfile />, document.getElementById('Box'))}>Edit</a></th>
                <td><a className="btn btn-danger m-2 fw-bold" style={{width:"170px", cursor: 'auto'}} onClick={() => ReactDOM.render(<DeleteProfile />, document.getElementById('Box'))}>Delete</a></td>
            </tr><br/><br/>
        </div>
    );
}