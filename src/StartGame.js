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

import ServerURL from './ServerURL';
import useWindowSize from 'react-use/lib/useWindowSize'

async function UpdateInteraction(NewGameProgress){
    let UserData = CurrentUserNameSingleton.getUserName();
    await fetch(ServerURL.MTServer1()+`/Server/UpdateGameProgress/${UserData.Username}`, {
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

    await fetch(ServerURL.MTServer1()+`/Server/UserProfile/${UserData.Username}`)
    .then(response => response.json())
    .then(Data => {
        CurrentUserNameSingleton.setUserName(Data);
    })
    .catch(error => console.error('Error:', error));

}

async function NewInteraction(NewUserResponseText){
    let GameProgressLength = CurrentUserNameSingleton.getUserName().GameProgress.length;
    let IDNum = parseInt(CurrentUserNameSingleton.getUserName().GameProgress[GameProgressLength-1].InteractionID.charAt(0))+1;

    let CurrentDate = new Date();
    let IDTime = (""+CurrentDate.getFullYear()+"_"+(CurrentDate.getMonth()+1)+"_"+CurrentDate.getDate()+"_"+CurrentDate.getHours()+"_"+CurrentDate.getMinutes()+"_"+CurrentDate.getSeconds());

    let NewJournalEntry = await JournalEntry(NewUserResponseText);

    let ChatHistory = [];
    
    for(let L=0; L<GameProgressLength; L++){
        ChatHistory.push("User: "+CurrentUserNameSingleton.getUserName().GameProgress[L].UserResponse);
        ChatHistory.push("System: "+CurrentUserNameSingleton.getUserName().GameProgress[L].PersonalisedFeedback);
    }
    ChatHistory.push("User: "+NewUserResponseText);

    let JoinHistory = ChatHistory.join("\n");

    let NewMachineLearningAnalysis = await MachineLearningAnalysis(NewUserResponseText, NewJournalEntry);

    let NewPersonalisedFeedback = await PersonalisedFeedback(JoinHistory, NewJournalEntry, NewMachineLearningAnalysis);

    let NewGameProgress = CurrentUserNameSingleton.getUserName().GameProgress;

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
    
    ReactDOM.render(
        <>
            <td><a className="btn btn-light m-1" style={{cursor: 'auto', textAlign: 'justify', background:'rgba(210, 226, 250, 0.1)', color: 'rgba(210, 226, 250, 1)'}}><i className="bi bi-person-fill"></i></a></td>
            <td><a className="btn btn-light m-1" style={{cursor: 'auto', textAlign: 'justify', background:'rgba(210, 226, 250, 0.1)', color: 'rgba(210, 226, 250, 1)'}}>{NewUserResponseText}</a></td>
        </>
        , document.getElementById('NewResponseBox'));

    ReactDOM.render(
        <>
            <td><a className="btn btn-primary m-1" style={{cursor: 'auto', textAlign: 'justify', background:'rgba(1, 1, 41, 0.4)', color: 'rgba(210, 226, 250, 1)'}}><i className="bi bi-soundwave"></i></a></td>
            <td><a className="btn btn-primary m-1" style={{cursor: 'auto', textAlign: 'justify', background:'rgba(1, 1, 41, 0.4)', color: 'rgba(210, 226, 250, 1)'}}><div className="spinner-border text-primary spinner-border-sm" role="status"></div></a></td>
        </>
        , document.getElementById('NewFeedbackBox'));

    ReactDOM.render(<></>, document.getElementById('InputBar'));

    let TimeLeft = 10;
    let OneSecPass = setInterval(() => {
        if(TimeLeft > 0) {
            TimeLeft = (TimeLeft - 1);
        } else {
            clearInterval(OneSecPass);
            ReactDOM.render(<></>, document.getElementById('NewResponseBox'));
            ReactDOM.render(<></>, document.getElementById('NewFeedbackBox'));
            ReactDOM.render(<InputBar/>, document.getElementById('InputBar'));
        }
    }, 1000);
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
            <>
                <td><a className="btn btn-primary m-1" style={{cursor: 'auto', textAlign: 'justify', background:'rgba(1, 1, 41, 0.4)', color: 'rgba(210, 226, 250, 1)'}}><i className="bi bi-soundwave"></i></a></td>
                <td><a className="btn btn-primary m-1" style={{cursor: 'auto', textAlign: 'justify', background:'rgba(1, 1, 41, 0.4)', color: 'rgba(210, 226, 250, 1)'}}>{Text}</a></td>
            </>
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
            <>
                <td><a className="btn btn-light m-1" style={{cursor: 'auto', textAlign: 'justify', background:'rgba(210, 226, 250, 0.1)', color: 'rgba(210, 226, 250, 1)'}}><i className="bi bi-person-fill"></i></a></td>
                <td><a className="btn btn-light m-1" style={{cursor: 'auto', textAlign: 'justify', background:'rgba(210, 226, 250, 0.1)', color: 'rgba(210, 226, 250, 1)'}}>{Text}</a></td>
            </>
    );
}

function ChatRows(){
    let GameProgressLength = 1;
    if(CurrentUserNameSingleton.getUserName()){
        GameProgressLength = CurrentUserNameSingleton.getUserName().GameProgress.length;
    }

    let Chats = [];
    let Chats2 = [];

    for(let L = 1; L <= GameProgressLength; L++) {
        Chats.push(
            <tr key={L}>
                {CurrentUserNameSingleton.getUserName().GameProgress[(L)-1].UserResponse != '' ? <UserResponseBox index={L}/>: null}
            </tr>
        );
        Chats.push(
            <tr key={GameProgressLength+L}>
                <PersonalisedFeedbackBox index={L}/>
            </tr>
        );
    }
    return(
        <>{Chats}</>
    );
}

function InputBar(){
    
    let RespondRef = useRef();
    
    let [inputLength, setInputLength] = useState(0);
    let handleInputChange = () => {
        setInputLength(RespondRef.current.value.length);
    };
    return(
            <>
                <span className="input-group-text bi bi-person-fill btn btn-primary" id="RespondText" style={{cursor: 'auto'}}></span>
                <input type="text" spellCheck="true" minLength="8" lang='en' className="form-control" placeholder="Respond" aria-label="Respond" aria-describedby="RespondText" ref={RespondRef} onChange={handleInputChange}/>
                <a className="btn btn-outline-primary fw-bold">{inputLength}/50</a>
                <button type="button" className="bi bi-arrow-return-right btn btn-primary fw-bold" onClick={() => {
                    if(RespondRef.current.value.length >= 50){
                        let NewRes = RespondRef.current.value;
                        RespondRef.current.value = '';
                        NewUserResponse(NewRes);
                        NewInteraction(NewRes);
                        setInputLength(0);
                    }
                    else{
                        alert("Input value must be at least 50 characters long.");
                    }
                }}></button>
            </>
    );
}

export default function StartGame(){
    let { width, height } = useWindowSize();

    let scrollRef = useRef();
    useEffect(() => {
        let scrollElement = scrollRef.current;
        if (scrollElement) {
            scrollElement.scrollTop = scrollElement.scrollHeight;
        }
    });

    return(
        <div >
            <div className="overflow-y-scroll" style={{height:`${height-200}px`}} ref={scrollRef}>
                <table className="text-start">
                    <tbody>
                        <ChatRows/>
                        <tr id="NewResponseBox">
                        </tr>
                        <tr id="NewFeedbackBox">
                        </tr>
                    </tbody>
                </table>
            </div>
            <hr/>
            <div className="input-group mb-3" id="InputBar"><InputBar/></div>
        </div>
    );
}