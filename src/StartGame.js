import ReactDOM from 'react-dom';
import React, { useEffect, useRef, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import HomeLinks from './HomeLinks';
import CurrentUserNameSingleton from './UserSingleton';
import HomePage from './HomePage';
import PersonalisedFeedback from './PersonalisedFeedback';
import MachineLearningAnalysis from './MachineLearningAnalysis';
import JournalEntry from './JournalEntry';

async function UpdateInteraction(NewGameProgress){
    let UserData = CurrentUserNameSingleton.getUserName();
    await fetch(`http://localhost:3214/Server/UpdateGameProgress/${UserData.Username}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            GameProgress: NewGameProgress,
        }),
    })
    .catch((error) => {
        console.log('Errrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrror:', error);
    });

    await fetch(`http://localhost:3214/Server/UserProfile/${UserData.Username}`)
    .then(response => response.json())
    .then(Data => {
        CurrentUserNameSingleton.setUserName(Data);
    })
    .catch(error => console.error('Error:', error));

}

async function NewInteraction(NewUserResponseText){
    let GameProgressLength = CurrentUserNameSingleton.getUserName().GameProgress.length;
    let IDNum = parseInt(CurrentUserNameSingleton.getUserName().GameProgress[GameProgressLength-1].InteractionID.charAt(0))+1;

    const CurrentDate = new Date();
    let IDTime = (""+CurrentDate.getFullYear()+"_"+(CurrentDate.getMonth()+1)+"_"+CurrentDate.getDate()+"_"+CurrentDate.getHours()+"_"+CurrentDate.getMinutes()+"_"+CurrentDate.getSeconds());

    let NewJournalEntry = await JournalEntry(NewUserResponseText);
    let NewMachineLearningAnalysis = MachineLearningAnalysis(NewUserResponseText, NewJournalEntry);
    let NewPersonalisedFeedback = PersonalisedFeedback(NewUserResponseText, NewJournalEntry, NewMachineLearningAnalysis);
    alert(NewJournalEntry);

    const NewGameProgress = CurrentUserNameSingleton.getUserName().GameProgress;

        NewGameProgress.push({
            InteractionID: IDNum+"_"+CurrentUserNameSingleton.getUserName().Username+"_"+IDTime,
            UserResponse: NewUserResponseText,
            JournalEntry: NewJournalEntry,
            MachineLearningAnalysis: NewMachineLearningAnalysis,
            PersonalisedFeedback: NewPersonalisedFeedback
        });

    console.log(NewGameProgress);
    UpdateInteraction(NewGameProgress);
    ReactDOM.render(<StartGame />, document.getElementById('Box'));
}

function NewUserResponse(NewUserResponseText){
    let GameProgressLength = 1;
    if(CurrentUserNameSingleton.getUserName()){
        GameProgressLength = CurrentUserNameSingleton.getUserName().GameProgress.length;
    }
    NewInteraction(NewUserResponseText);
}

function PersonalisedFeedbackBox(props){
    let Text = "PersonalisedFeedback";
    if(props.First){
        Text = props.First;
    }
    if(CurrentUserNameSingleton.getUserName()){
        Text = CurrentUserNameSingleton.getUserName().GameProgress[(props.index)-1].PersonalisedFeedback;
    }
    return(
            <tr>
                <td><a className="btn btn-primary m-1" style={{width:"40px", cursor: 'auto'}}><i class="bi bi-soundwave"></i></a></td>
                <td><a className="btn btn-primary m-1" style={{cursor: 'auto'}}>{Text}</a></td>
            </tr>
    );
}

function UserResponseBox(props){
    let Text = "UserResponse";
    if(CurrentUserNameSingleton.getUserName()){
        Text = CurrentUserNameSingleton.getUserName().GameProgress[(props.index)-1].UserResponse;
    }
    if(props.NewUserResponseText){
        Text = props.NewUserResponseText;
    }
    return(
            <tr>
                <td><a className="btn btn-primary m-1" style={{width:"40px", cursor: 'auto'}}><i className="bi bi-person-fill"></i></a></td>
                <td><a className="btn btn-primary m-1" style={{cursor: 'auto'}}>{Text}</a></td>
            </tr>
    );
}

function ChatRows(){
    let GameProgressLength = 1;
    if(CurrentUserNameSingleton.getUserName()){
        GameProgressLength = CurrentUserNameSingleton.getUserName().GameProgress.length;
    }

    const Chats = [];

    for(let L = 1; L <= GameProgressLength; L++) {
        Chats.push(
            <tr key={L}>
                <UserResponseBox index={L}/>
                <PersonalisedFeedbackBox index={L}/>
            </tr>
        );
    }
    return(
        <div>{Chats}</div>
    );
}

export default function StartGame(){
    const RespondRef = useRef();

    const scrollRef = useRef();

    useEffect(() => {
        const scrollElement = scrollRef.current;
        if (scrollElement) {
            scrollElement.scrollTop = scrollElement.scrollHeight;
        }
    });
    return(
        <div>
            <div className="overflow-y-scroll" style={{height:'400px'}} ref={scrollRef}>
                <table className="text-start">
                    <tbody>
                        <tr><tr>
                            <td><a className="btn btn-primary m-1" style={{width:"40px", cursor: 'auto'}}><i class="bi bi-soundwave"></i></a></td>
                            <td><a className="btn btn-primary m-1" style={{cursor: 'auto'}}>First</a></td>
                        </tr></tr>
                        <ChatRows/>
                        <tr id="NewResponseBox">
                        </tr>
                    </tbody>
                </table>
            </div>
            <hr/>
            <div className="input-group mb-3">
                <span className="input-group-text bi bi-person-fill btn btn-primary" id="RespondText" style={{cursor: 'auto'}}></span>
                <input type="text" spellCheck="true" lang='en' className="form-control" placeholder="Respond" aria-label="Respond" aria-describedby="RespondText" ref={RespondRef}/>
                <button type="button" className="bi bi-arrow-return-right btn btn-primary fw-bold" onClick={() => {
                    if(RespondRef.current.value){
                        NewUserResponse(RespondRef.current.value);
                    }
                    RespondRef.current.value = '';
                }}></button>
            </div>
        </div>
    );
}