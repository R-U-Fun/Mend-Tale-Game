import ReactDOM from 'react-dom';
import React, { useEffect, useRef, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import HomeLinks from './HomeLinks';
import CurrentUserNameSingleton from './UserSingleton';
import HomePage from './HomePage';





function DateBox(props){
    let Text = "DateBox";
    if(CurrentUserNameSingleton.getUserName()){
        let DateTime = CurrentUserNameSingleton.getUserName().GameProgress[(props.index)-1].InteractionID;
        let DateTimeArr = DateTime.split("_");
        Text = DateTimeArr[2]+"-"+DateTimeArr[3]+"-"+DateTimeArr[4]+" "+DateTimeArr[5]+":"+DateTimeArr[6]+":"+DateTimeArr[7];

    }
    return(
            <tr>
                <td><a className="btn btn-primary m-1" style={{width:"40px", cursor: 'auto'}}><i class="bi bi-calendar3"></i></a></td>
                <td><a className="btn btn-primary m-1" style={{cursor: 'auto'}}>{Text}</a></td>
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
                <td><a className="btn btn-primary m-1" style={{width:"40px", cursor: 'auto'}}><i class="bi bi-journal-text"></i></a></td>
                <td><a className="btn btn-primary m-1" style={{cursor: 'auto'}}>{Text}</a></td>
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

    const JournalEntry = [];

    for(let L = 1; L <= GameProgressLength; L++) {
        JournalEntry.push(
            <div><DateBox index={L}/><div className="rounded-4 border border-primary border-5 me-5 ms-5 mt-2 ">
            <tr key={L}>
                <br/>
                    <UserResponseBox index={L}/>
                    <JournalEntryBox index={L}/>
                <br/>
            </tr>
            </div><hr/></div>
        );
    }
    return(
        <div>{JournalEntry}</div>
    );
}

export default function Progress(){

    const scrollRef = useRef();

    useEffect(() => {
        const scrollElement = scrollRef.current;
        if (scrollElement) {
            scrollElement.scrollTop = scrollElement.scrollHeight;
        }
    });
    return(
        <div>
            <div className="container text-center">
                <div className="row gx-3 text-center justify-content-center">
                    <div className="col-lg-3 rounded-4 border border-primary border-5 m-2">AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA</div>
                    <div className="col-lg-3 rounded-4 border border-primary border-5 m-2">BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB</div>
                    <div className="col-lg-3 rounded-4 border border-primary border-5 m-2">CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC</div>
                </div>
            </div>
        </div>
    );
}