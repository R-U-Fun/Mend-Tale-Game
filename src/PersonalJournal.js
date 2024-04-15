import ReactDOM from 'react-dom';
import React, { useEffect, useRef, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import HomeLinks from './HomeLinks';
import CurrentUserNameSingleton from './UserSingleton';
import HomePage from './HomePage';
import useWindowSize from 'react-use/lib/useWindowSize'

function DateBox(props){
    let Text = "DateBox";
    if(CurrentUserNameSingleton.getUserName()){
        let DateTime = CurrentUserNameSingleton.getUserName().GameProgress[(props.index)-1].InteractionID;
        let DateTimeArr = DateTime.split("_");
        Text = DateTimeArr[2]+"-"+DateTimeArr[3]+"-"+DateTimeArr[4]+" "+DateTimeArr[5]+":"+DateTimeArr[6]+":"+DateTimeArr[7];

    }
    return(
            <tr>
                <td><a className="btn btn-primary m-1" style={{cursor: 'auto', textAlign: 'justify', background:'rgba(1, 1, 41, 0.4)', color: 'rgba(210, 226, 250, 1)'}}><i class="bi bi-calendar3"></i></a></td>
                <td><a className="btn btn-primary m-1" style={{cursor: 'auto', textAlign: 'justify', background:'rgba(1, 1, 41, 0.4)', color: 'rgba(210, 226, 250, 1)'}}>{Text}</a></td>
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
                <td><a className={`btn btn-${props.Colour} m-1`} style={{cursor: 'auto', textAlign: 'justify', background:'rgba(1, 1, 41, 0.4)', color: 'rgba(210, 226, 250, 1)'}}><i class="bi bi-journal-text"></i></a></td>
                <td><a className={`btn btn-${props.Colour} m-1`} style={{cursor: 'auto', textAlign: 'justify', background:'rgba(1, 1, 41, 0.4)', color: 'rgba(210, 226, 250, 1)'}}>{Text}</a></td>
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
                <td><a className={`btn btn-${props.Colour} m-1`} style={{cursor: 'auto', textAlign: 'justify', background:'rgba(1, 1, 41, 0.4)', color: 'rgba(210, 226, 250, 1)'}}>
                    <i class={`bi bi-${props.Emoji}`}></i>
                </a></td>
                <td><a className={`btn btn-${props.Colour} m-1`} style={{cursor: 'auto', textAlign: 'justify', background:'rgba(1, 1, 41, 0.4)', color: 'rgba(210, 226, 250, 1)'}}>{Mood}</a></td>
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
                <td><a className={`btn btn-${props.Colour} m-1`} style={{cursor: 'auto', textAlign: 'justify', background:'rgba(1, 1, 41, 0.4)', color: 'rgba(210, 226, 250, 1)'}}><i className="bi bi-person-fill"></i></a></td>
                <td><a className={`btn btn-${props.Colour} m-1`} style={{cursor: 'auto', textAlign: 'justify', background:'rgba(1, 1, 41, 0.4)', color: 'rgba(210, 226, 250, 1)'}}>{Text}</a></td>
            </tr>
    );
}

function ChatRows(){
    let GameProgressLength = 1;
    if(CurrentUserNameSingleton.getUserName()){
        GameProgressLength = CurrentUserNameSingleton.getUserName().GameProgress.length;
    }

    const JournalEntry = [];

    for(let L = 1; L <= GameProgressLength; L++) {
    
        let Mood ='';
        if(CurrentUserNameSingleton.getUserName()){
            Mood = CurrentUserNameSingleton.getUserName().GameProgress[(L)-1].MachineLearningAnalysis;
        }
        let Emoji = '';
        let Colour = '';

        if(Mood == 'Neutral'){
            Colour = 'light';
            Emoji = 'emoji-neutral';
        }
        else if(Mood == 'Happy'){
            Colour = 'warning';
            Emoji = 'emoji-grin';
        }
        else if(Mood == 'Love'){
            Colour = 'info';
            Emoji = 'emoji-heart-eyes';
        }
        else if(Mood == 'Excite'){
            Colour = 'success';
            Emoji = 'emoji-sunglasses';
        }
        else if(Mood == 'Sad'){
            Colour = 'primary';
            Emoji = 'emoji-frown';
        }
        else if(Mood == 'Anger'){
            Colour = 'danger';
            Emoji = 'emoji-angry';
        }
        else if(Mood == 'Fear'){
            Colour = 'secondary';
            Emoji = 'emoji-tear';
        }
        else {
            Colour = 'dark';
            Emoji = 'circle';
        }

        if(CurrentUserNameSingleton.getUserName().GameProgress[(L)-1].MachineLearningAnalysis != ''){
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

export default function PersonalJournal(){
    let { width, height } = useWindowSize();

    const scrollRef = useRef();

    useEffect(() => {
        const scrollElement = scrollRef.current;
        if (scrollElement) {
            scrollElement.scrollTop = scrollElement.scrollHeight;
        }
    });
    return(
        <div>
            <div className="overflow-y-scroll" style={{height:`${height-100}px`}} ref={scrollRef}>
                <table className="text-start">
                    <tbody>
                        <ChatRows/>
                    </tbody>
                </table>
            </div>
            <br/>
        </div>
    );
}