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

async function NewInteraction(NewUserResponseText){
    let GameProgressLength = TrialSingleton.getTrial().length;
    let IDNum = parseInt(TrialSingleton.getTrial()[GameProgressLength-1].InteractionID)+1;

    let NewJournalEntry = "NewJournalEntry"; //await JournalEntry(NewUserResponseText);

    let NewMachineLearningAnalysis = "NewMachineLearningAnalysis";//await MachineLearningAnalysis(NewUserResponseText, NewJournalEntry);

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
    ReactDOM.render(<StartGame2 />, document.getElementById('Box'));
}

function NewUserResponse(NewUserResponseText){
    let GameProgressLength = 1;
    if(TrialSingleton.getTrial()){
        GameProgressLength = TrialSingleton.getTrial().length;
    }
    ReactDOM.render(<UserResponseBox NewUserResponseText={NewUserResponseText} index={GameProgressLength} />, document.getElementById('NewResponseBox'));

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
    const Chats2 = [];

    for(let L = 1; L <= GameProgressLength; L++) {
        Chats.push(
            <tr key={L}>
                <UserResponseBox index={L}/>
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

export default function StartGame2(){

    if(!(TrialSingleton.getTrial())){
        let TrialData = [
                {
                    InteractionID: 0,
                    UserResponse: "TrialInitialUserResponse",
                    JournalEntry: "TrialInitial",
                    MachineLearningAnalysis: "TrialInitial",
                    PersonalisedFeedback: "TrialInitialPersonalisedFeedback"
                }
        ]
        
        TrialSingleton.setTrial(TrialData);
    }

    console.log(TrialSingleton.getTrial());

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
            <div className="overflow-y-scroll" style={{height:'500px'}} ref={scrollRef}>
                <table className="text-start">
                    <tbody>
                        <ChatRows/>
                        <tr id="NewResponseBox">
                        </tr>
                    </tbody>
                </table>
            </div>
            <hr/>
            <div className="input-group mb-3" >
                <span className="input-group-text bi bi-person-fill btn btn-primary" id="RespondText" style={{cursor: 'auto'}}></span>
                <input type="text" spellCheck="true" lang='en' className="form-control" placeholder="Respond" aria-label="Respond" aria-describedby="RespondText" ref={RespondRef} />
                <button type="button" className="bi bi-arrow-return-right btn btn-primary fw-bold" onClick={() => {
                    if(RespondRef.current.value){
                        NewUserResponse(RespondRef.current.value);
                        RespondRef.current.value = '';
                    }
                }}></button>
            </div>
        </div>
    );
}