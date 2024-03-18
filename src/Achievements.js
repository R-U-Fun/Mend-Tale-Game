import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import HomeLinks from './HomeLinks';
import CurrentUserNameSingleton from './UserSingleton';
import StartGame from './StartGame';

import Confettii from './Confetti';

export default function Achievements(){
    let UserData = CurrentUserNameSingleton.getUserName();

    let Achievement = [];

    if(parseInt(UserData.GameProgress.length) > 50){
        Achievement.push(
            <tr>
                <th><a className="btn btn-outline-primary m-2 fw-bold" style={{width:"150px", cursor: 'auto'}}><i className="bi bi-trophy-fill"></i></a></th>
                <td><a className="btn btn-outline-primary m-2 fw-bold" style={{width:"170px", cursor: 'auto'}}>10 Interactions</a></td>
            </tr>
        );
        Achievement.push(
            <tr>
                <th><a className="btn btn-outline-secondary m-2 fw-bold" style={{width:"150px", cursor: 'auto'}}><i className="bi bi-trophy-fill"></i></a></th>
                <td><a className="btn btn-outline-secondary m-2 fw-bold" style={{width:"170px", cursor: 'auto'}}>50 Interactions</a></td>
            </tr>
        );
    }
    else if(parseInt(UserData.GameProgress.length) > 10){
        Achievement.push(
            <tr>
                <th><a className="btn btn-outline-primary m-2 fw-bold" style={{width:"150px", cursor: 'auto'}}><i className="bi bi-trophy-fill"></i></a></th>
                <td><a className="btn btn-outline-primary m-2 fw-bold" style={{width:"170px", cursor: 'auto'}}>10 Interactions</a></td>
            </tr>
        );
    }

    return(
        <table className="text-start">
            <tbody>
                <tr>
                    <th><a className="btn btn-outline-primary m-2 fw-bold" style={{width:"150px", cursor: 'auto'}}> </a></th>
                    <td><a className="btn btn-outline-primary m-2 fw-bold" style={{width:"170px", cursor: 'auto'}}> </a></td>
                </tr>
                {Achievement}
            </tbody>
        </table>
    );
}