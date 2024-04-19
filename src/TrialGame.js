import ReactDOM from 'react-dom';
import React, { useEffect, useRef, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import HomeLinks from './HomeLinks';
import TrialSingleton from './TrialSingleton';
import HomePage from './HomePage';
import PersonalisedFeedback from './PersonalisedFeedback';
import MachineLearningAnalysis from './MachineLearningAnalysis';
import JournalEntry from './JournalEntry';
import Login from './Login';

import useWindowSize from 'react-use/lib/useWindowSize'

async function NewInteraction(NewUserResponseText){
    let GameProgressLength = TrialSingleton.getTrial().length;
    let IDNum = parseInt(TrialSingleton.getTrial()[GameProgressLength-1].InteractionID)+1;

    let NewJournalEntry = "NewJournalEntry"; //await JournalEntry(NewUserResponseText);

    let NewMachineLearningAnalysis = MachineLearningAnalysis(NewUserResponseText, NewJournalEntry);

    let NewPersonalisedFeedback = await PersonalisedFeedback(NewUserResponseText, NewJournalEntry, NewMachineLearningAnalysis);

    const NewGameProgress = TrialSingleton.getTrial();

        NewGameProgress.push({
            InteractionID: IDNum,
            UserResponse: NewUserResponseText,
            JournalEntry: NewJournalEntry,
            MachineLearningAnalysis: NewMachineLearningAnalysis,
            PersonalisedFeedback: NewPersonalisedFeedback
        });

    console.log(NewGameProgress);
    TrialSingleton.setTrial(NewGameProgress);

    if(TrialSingleton.getTrial() && (TrialSingleton.getTrial().length === 5)){
        ReactDOM.render(
            <>
                <td><a className="btn btn-danger m-1" style={{cursor: 'auto', textAlign: 'justify', background:'rgba(1, 1, 41, 0.4)', color: 'rgba(210, 226, 250, 1)'}}><i className="bi bi-exclamation-triangle"></i></a></td>
                <td><a className="btn btn-primary m-1" style={{cursor: 'auto', textAlign: 'justify'}} onClick={() => ReactDOM.render(<Login />, document.getElementById('Box'))}>Login to Play More</a></td>
            </>
        , document.getElementById('PlayMoreBox'));
    }
    else{
        ReactDOM.render(<TrialGame />, document.getElementById('Box'));
    }
}

function NewUserResponse(NewUserResponseText){
    let GameProgressLength = 1;
    if(TrialSingleton.getTrial()){
        GameProgressLength = TrialSingleton.getTrial().length;
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
            if(TrialSingleton.getTrial() && (TrialSingleton.getTrial().length === 5)){
                ReactDOM.render(
                    <>
                        <td><a className="btn btn-danger m-1" style={{cursor: 'auto', textAlign: 'justify', background:'rgba(1, 1, 41, 0.4)', color: 'rgba(210, 226, 250, 1)'}}><i className="bi bi-exclamation-triangle"></i></a></td>
                        <td><a className="btn btn-primary m-1" style={{cursor: 'auto', textAlign: 'justify'}} onClick={() => ReactDOM.render(<Login />, document.getElementById('Box'))}>Login to Play More</a></td>
                    </>
                , document.getElementById('PlayMoreBox'));
            }
            else{
                ReactDOM.render(<></>, document.getElementById('NewResponseBox'));
                ReactDOM.render(<></>, document.getElementById('NewFeedbackBox'));
                ReactDOM.render(<InputBar/>, document.getElementById('InputBar'));
            }
        }
    }, 1000);
    
    NewInteraction(NewUserResponseText);
}

function PersonalisedFeedbackBox(props){
    let Text = "PersonalisedFeedback";
    if(props.First){
        Text = props.First;
    }
    if(TrialSingleton.getTrial()){
        Text = TrialSingleton.getTrial()[(props.index)-1].PersonalisedFeedback;
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
    if(TrialSingleton.getTrial()){
        Text = TrialSingleton.getTrial()[(props.index)-1].UserResponse;
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
    if(TrialSingleton.getTrial()){
        GameProgressLength = TrialSingleton.getTrial().length;
    }

    const Chats = [];

    for(let L = 1; L <= GameProgressLength; L++) {
        Chats.push(
            <tr key={L}>
                {TrialSingleton.getTrial()[(L)-1].UserResponse != '' ? <UserResponseBox index={L}/>: null}
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
                        setInputLength(0);
                    }
                    else{
                        alert("Input value must be at least 50 characters long.");
                    }
                }}></button>
            </>
    );
}

export default function TrialGame(){
    let { width, height } = useWindowSize();

    if(!(TrialSingleton.getTrial())){
        let TrialData = [
                {
                    InteractionID: 0,
                    UserResponse: "",
                    JournalEntry: "",
                    MachineLearningAnalysis: "",
                    PersonalisedFeedback: "You are trapped in a room with six people: Halin, Leo, Ethi, Skott, Ariadni and Frikyn. Someone knocks on the door. It opens slowly. A shadowy figure stands there. A stranger enters the room. None of the people know each other. You have to escape the room by working together. What will you do?"
                }
        ]
        
        TrialSingleton.setTrial(TrialData);
    }

    console.log(TrialSingleton.getTrial());

    const scrollRef = useRef();
    useEffect(() => {
        const scrollElement = scrollRef.current;
        if (scrollElement) {
            scrollElement.scrollTop = scrollElement.scrollHeight;
        }
    });
    return(
        <div>
            <div className="overflow-y-scroll" style={{height:`${height-200}px`}} ref={scrollRef}>
                <table className="text-start">
                    <tbody>
                        <ChatRows/>
                        <tr id="NewResponseBox">
                        </tr>
                        <tr id="NewFeedbackBox">
                        </tr>
                        <tr id="PlayMoreBox">
                        </tr>
                    </tbody>
                </table>
            </div>
            <hr/>
            <div className="input-group mb-3" id="InputBar"><InputBar/></div>
        </div>
    );
}