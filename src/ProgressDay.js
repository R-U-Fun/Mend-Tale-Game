import ReactDOM from 'react-dom';
import React, { useEffect, useRef, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import HomeLinks from './HomeLinks';
import CurrentUserNameSingleton from './UserSingleton';
import HomePage from './HomePage';
import useWindowSize from 'react-use/lib/useWindowSize'
import StartGame from './StartGame';

function DateBox(props){
    let Text = "DateBox";
    let DT = [];
    if(CurrentUserNameSingleton.getUserName()){
        let DateTime = CurrentUserNameSingleton.getUserName().GameProgress[(props.index)-1].InteractionID;
        let DateTimeArr = DateTime.split("_");
        Text = DateTimeArr[2]+"-"+DateTimeArr[3]+"-"+DateTimeArr[4]+" "+DateTimeArr[5]+":"+DateTimeArr[6]+":"+DateTimeArr[7];
        DT = Text.split(" ");
    }
    return(
            <tr>
                <td><a className="btn btn-primary m-1" style={{cursor: 'auto', textAlign: 'justify'}}><i class="bi bi-clock"></i></a></td>
                <td><a className="btn btn-primary m-1" style={{cursor: 'auto', textAlign: 'justify'}}>{DT[1]}</a></td>
            </tr>
    );
}

function JournalEntryBox(props){
    let Text = "PersonalisedFeedback";
    if(CurrentUserNameSingleton.getUserName()){
        Text = CurrentUserNameSingleton.getUserName().GameProgress[(props.index)-1].JournalEntry;
    }
    return(
            <tr>
                <td><a className={`btn btn-${props.Colour} m-1`} style={{cursor: 'auto', textAlign: 'justify'}}><i class="bi bi-journal-text"></i></a></td>
                <td><a className={`btn btn-${props.Colour} m-1`} style={{cursor: 'auto', textAlign: 'justify'}}>{Text}</a></td>
            </tr>
    );
}

function MoodEntryBox(props){
    let Mood = "MachineLearningAnalysis";
    if(CurrentUserNameSingleton.getUserName()){
        Mood = CurrentUserNameSingleton.getUserName().GameProgress[(props.index)-1].MachineLearningAnalysis;
    }

    return(
            <tr>
                <td><a className={`btn btn-${props.Colour} m-1`} style={{cursor: 'auto', textAlign: 'justify'}}>
                    <i class={`bi bi-emoji-${props.Emoji}`}></i>
                </a></td>
                <td><a className={`btn btn-${props.Colour} m-1`} style={{cursor: 'auto', textAlign: 'justify'}}>{Mood}</a></td>
            </tr>
    );
}

function UserResponseBox(props){
    let Text = "UserResponse";
    if(CurrentUserNameSingleton.getUserName()){
        Text = CurrentUserNameSingleton.getUserName().GameProgress[(props.index)-1].UserResponse;
    }
    return(
            <tr>
                <td><a className={`btn btn-${props.Colour} m-1`} style={{cursor: 'auto', textAlign: 'justify'}}><i className="bi bi-person-fill"></i></a></td>
                <td><a className={`btn btn-${props.Colour} m-1`} style={{cursor: 'auto', textAlign: 'justify'}}>{Text}</a></td>
            </tr>
    );
}

function ChatRows(props){
    
    let GameProgressLength = 1;
    if(CurrentUserNameSingleton.getUserName()){
        GameProgressLength = CurrentUserNameSingleton.getUserName().GameProgress.length;
        
    }

    const JournalEntry = [];

    for(let L = 1; L <= GameProgressLength; L++) {
        let DateTime = CurrentUserNameSingleton.getUserName().GameProgress[L-1].InteractionID;
        let DateTimeArr = DateTime.split("_");
        let DBDate = DateTimeArr[2]+"-"+DateTimeArr[3]+"-"+DateTimeArr[4];
        let SPDate = props.Year+"-"+props.Month+"-"+props.Day;
        console.log(DBDate);
        console.log(SPDate);
    
        if(DBDate===SPDate){
            console.log(props.Year+"///////////////"+props.Month+"////////////"+props.Day);

        let Mood = CurrentUserNameSingleton.getUserName().GameProgress[(L)-1].MachineLearningAnalysis;

        let Emoji = '';
        let Colour = '';

        if(Mood === 'Neutral'){
            Colour = 'light';
            Emoji = 'neutral';
        }
        else if(Mood === 'Happy'){
            Colour = 'warning';
            Emoji = 'grin';
        }
        else if(Mood === 'Love'){
            Colour = 'info';
            Emoji = 'heart-eyes';
        }
        else if(Mood === 'Excite'){
            Colour = 'success';
            Emoji = 'sunglasses';
        }
        else if(Mood === 'Sad'){
            Colour = 'primary';
            Emoji = 'frown';
        }
        else if(Mood === 'Anger'){
            Colour = 'danger';
            Emoji = 'angry';
        }
        else if(Mood === 'Fear'){
            Colour = 'secondary';
            Emoji = 'tear';
        }
        else {
            Colour = 'dark';
            Emoji = 'neutral';
        }

        JournalEntry.push(
            <div><DateBox index={L} Emoji={Emoji} Colour={Colour}/><div className="me-5 ms-5 mt-2 ">
            <tr key={L}>
                <br/>
                    <UserResponseBox index={L} Emoji={Emoji} Colour={Colour}/>
                    <MoodEntryBox    index={L} Emoji={Emoji} Colour={Colour}/>
                    <JournalEntryBox index={L} Emoji={Emoji} Colour={Colour}/>
                <br/>
            </tr>
            </div><hr/></div>
        );
        
        }
    }
    return(
        <div>{JournalEntry}</div>
    );
}

export default function ProgressDay(props){
    let { width, height } = useWindowSize();

    let PDate = props.Year+"-"+props.Month+"-"+props.Day;
    console.log(props.Year+"-"+props.Month+"-"+props.Day);
    const scrollRef = useRef();

    useEffect(() => {
        const scrollElement = scrollRef.current;
        if (scrollElement) {
            scrollElement.scrollTop = scrollElement.scrollHeight;
        }
    });
    return(
        <div>
            <a className="btn btn-primary m-4 fs-5 fw-bold" onClick={() => ReactDOM.render(<StartGame />, document.getElementById('Box'))}>{PDate}</a>
            <div className="overflow-y-scroll"  style={{height:`${height-200}px`}} ref={scrollRef}>
                <table className="text-start">
                    <tbody>
                        <ChatRows Year={props.Year} Month={props.Month} Day={props.Day} />
                    </tbody>
                </table>
            </div>
            <hr/>
        </div>
    );
}