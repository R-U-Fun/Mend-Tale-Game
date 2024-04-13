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
            <a className="btn btn-outline-dark" style={{cursor:'default', color: 'rgba(210, 226, 250, 1)'}} onClick={() => {
                ReactDOM.render(<MendText/>, document.getElementById('Box'));
            }}></a><br/>
        </div>
    );
}

function MendText(){
    return(
        <div style={{cursor:'default', textAlign: 'justify', color: 'rgba(210, 226, 250, 1)'}}>MendTale is a text-based adventure game website that analyses user's mood by utilizing machine learning and provides feedback through storytelling using Natural Language Processing to promote a sense of emotional-awareness among its users. The MendTale project aligns with the growing recognition of the positive impact of gaming on mental health, as highlighted in the article "Mind games: How gaming can play a positive role in mental health" by Deborah Bach. By combining gaming, personal journaling, machine learning, and storytelling, users are encouraged to interact with the platform regularly, turning this emotional-awareness promotion into an enjoyable and informative experience, because "MendTale" acknowledges that gaming can be used as a tool for learning and personal development. This project will be centered around a text-based adventure game website. During the game, users answer the questions related to moods which are integrated into the story. These responses will be collected and added into a journal through implementation of Natural Language Processing techniques. This journal will save entries with dates, allowing users to track their mood patterns over time, as they engage with the game's storyline. At the start, user’s mood state is considered as the baseline based on their initial set of responses to the game's story. The journal will be processed to analyze mood patterns using machine learning algorithms. The machine learning model will be designed to identify trends, changes, and from the journal entries. It can determine changes in user's mood patterns based on their responses. As the user progresses through the game, their responses are continuously analyzed to provide feedback within the game’s story narrative. Based on the analysis, the project's system will generate personalized feedback which will be provided in the form of Personalized Insights within the context of the ongoing game's storyline for the user through storytelling by the implementation of Natural Language Processing techniques again, helping users identify and understand their moods better, providing a better awareness of their mood patterns in the end.<br/>- Aaroophan</div>);
}