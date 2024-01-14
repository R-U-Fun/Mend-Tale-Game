import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import CurrentUserNameSingleton from './UserSingleton';

function MachineLearningRecord(Year, Month, Day){
    let Text = [];
    let Color = 0;
    let GameProgressLength = CurrentUserNameSingleton.getUserName().GameProgress.length;
    if(CurrentUserNameSingleton.getUserName()){
        for(let L=1; L <= GameProgressLength; L++){
            let DateTime = CurrentUserNameSingleton.getUserName().GameProgress[L-1].InteractionID;
            let DateTimeArr = DateTime.split("_");
            if(Year === parseInt(DateTimeArr[2]) && Month === parseInt(DateTimeArr[3]) && Day === parseInt(DateTimeArr[4])){
                Text.push(CurrentUserNameSingleton.getUserName().GameProgress[L-1].MachineLearningAnalysis);
            }
        }
    }
    let Count = [0, 0, 0, 0, 0, 0];
    let Moods = ['Happy', 'Sad', 'Angry', 'Fear', 'Excite', 'Love'];
    for(let L=0; L < Text.length; L++){
        for(let M=0; M<6; M++){
            if(Text[L] === Moods[M]){
                Count[M] = Count[M] + 1;
            }
        }
    }
    let MaxCount = Math.max(...Count);
    let MaxMood = 'check';
    for(let L=0; L < 6; L++){
        if(MaxCount !== 0 && MaxCount === Count[L]){
            MaxMood = Moods[L];
        }
    }
    switch (MaxMood) {
        case 'Happy':
            return("warning");
        case 'Sad':
            return("primary");
        case 'Angry':
            return("danger");
        case 'Fear':
            return("secondary");
        case 'Excite':
            return("success");
        case 'Love':
            return("info");
        default:
            return("outline-primary");
    }
}

function CalendarReturn(props){
    let TodayDateProp = props.TodayDate;
    let FirstDate = new Date(`${TodayDateProp.getFullYear()}-${(TodayDateProp.getMonth())+1}-01`);
    let FirstDay = FirstDate.getDay();
    if(FirstDate.getDay() === 0){
        FirstDay = 7;
    }
    let CalDate = 1;
    let CalEnd;

    if((parseInt(TodayDateProp.getMonth())+1) === 2){
        if (TodayDateProp.getFullYear() % 4 === 0 && (TodayDateProp.getFullYear() % 100 !== 0 || TodayDateProp.getFullYear() % 400 === 0)) {
            CalEnd = 29;
        } else {
            CalEnd = 28;
        }
    }
    else if(((parseInt(TodayDateProp.getMonth())+1) === 4) || ((parseInt(TodayDateProp.getMonth())+1) === 6) || ((parseInt(TodayDateProp.getMonth())+1) === 9) || ((parseInt(TodayDateProp.getMonth())+1) === 11)){
        CalEnd = 30;
    }
    else{
        CalEnd = 31;
    }
    
    let CalRowWeeks = [];
    for(let W = 1; W <= 6; W++) {
        let CalRowDays = [];
        for(let D = 1; D <= 7; D++) {
            if(CalDate <= CalEnd){
                if(W === 1){
                    if(D >= FirstDay){
                        if(CalDate === TodayDateProp.getDate()){
                            let Colour = MachineLearningRecord(TodayDateProp.getFullYear(), ((TodayDateProp.getMonth())+1), TodayDateProp.getDate());
                            CalRowDays.push(
                                <th key={D}><a className="btn btn-info fw-bold text-white" style={{width:"45px" , cursor: 'auto'}}>{CalDate}</a><a className={`btn btn-${Colour}`} style={{ width:"45px" , cursor: 'auto'}}><i class="bi bi-emoji-smile"></i></a></th>
                            );
                            CalDate++;
                        }
                        else{
                            let Colour = MachineLearningRecord(TodayDateProp.getFullYear(), ((TodayDateProp.getMonth())+1), CalDate);
                            CalRowDays.push(
                                <th key={D}><a className="btn btn-primary fw-bold" style={{width:"45px" , cursor: 'auto'}}>{CalDate}</a><a className={`btn btn-${Colour}`} style={{ width:"45px" , cursor: 'auto'}}><i class="bi bi-emoji-smile"></i></a></th>
                            );
                            CalDate++;
                        }
                    }
                    else{
                        CalRowDays.push(
                            <th key={D}></th>
                        );
                    }
                }
                else{
                    if(CalDate === TodayDateProp.getDate()){
                        let Colour = MachineLearningRecord(TodayDateProp.getFullYear(), ((TodayDateProp.getMonth())+1), TodayDateProp.getDate());
                        CalRowDays.push(
                            <th key={D}><a className="btn btn-info fw-bold text-white" style={{width:"45px" , cursor: 'auto'}}>{CalDate}</a><a className={`btn btn-${Colour}`} style={{ width:"45px" , cursor: 'auto'}}><i class="bi bi-emoji-smile"></i></a></th>
                        );
                        CalDate++;
                    }
                    else{
                        let Colour = MachineLearningRecord(TodayDateProp.getFullYear(), ((TodayDateProp.getMonth())+1), CalDate);
                        CalRowDays.push(
                            <th key={D}><a className="btn btn-primary fw-bold" style={{width:"45px" , cursor: 'auto'}}>{CalDate}</a><a className={`btn btn-${Colour}`} style={{ width:"45px" , cursor: 'auto'}}><i class="bi bi-emoji-smile"></i></a></th>
                        );
                        CalDate++;
                    }
                }
            }
            else{
                CalRowDays.push(
                    <th key={D}></th>
                );
            }
        }
        CalRowWeeks.push(
            <tr key={W}>
                {CalRowDays}
            </tr>
        );
    }
    return (
        <div>
            {CalRowWeeks}
        </div>
    );
}

export default function CalendarUI(){
    let [TodayDate, setTodayDate] = useState(new Date());
    let CurrMonth;

    switch (TodayDate.getMonth()+1) {
        case 1:
            CurrMonth = "January";
            break;
        case 2:
            CurrMonth = "February";
            break;
        case 3:
            CurrMonth = "March";
            break;
        case 4:
            CurrMonth = "April";
            break;
        case 5:
            CurrMonth = "May";
            break;
        case 6:
            CurrMonth = "June";
            break;
        case 7:
            CurrMonth = "July";
            break;
        case 8:
            CurrMonth = "August";
            break;
        case 9:
            CurrMonth = "September";
            break;
        case 10:
            CurrMonth = "October";
            break;
        case 11:
            CurrMonth = "November";
            break;
        case 12:
            CurrMonth = "December";
            break;
        default:
            CurrMonth = "INVALID";
    }

    return (
        <div>
            <div className="m-2">
                <a className="btn btn-primary fw-bold" style={{width:"45px" , cursor: 'auto'}} onClick={() => {
                    if(((TodayDate.getMonth())+1) === 1){
                        setTodayDate(new Date(`${TodayDate.getFullYear()-1}-12-${TodayDate.getDate()}`));
                        ReactDOM.render(<CalendarReturn TodayDate={new Date(`${TodayDate.getFullYear()-1}-12-${TodayDate.getDate()}`)} />, document.getElementById('CalendarHere'));
                    }
                    else{
                        setTodayDate(new Date(`${TodayDate.getFullYear()}-${((TodayDate.getMonth())+1)-1}-${TodayDate.getDate()}`));
                        ReactDOM.render(<CalendarReturn TodayDate={new Date(`${TodayDate.getFullYear()}-${((TodayDate.getMonth())+1)-1}-${TodayDate.getDate()}`)} />, document.getElementById('CalendarHere'));
                    }
                }}><i class="bi bi-arrow-left"></i></a>
                &nbsp;
                <a className="btn btn-primary fw-bold" style={{ cursor: 'auto'}}>{TodayDate.getFullYear()}</a>&nbsp;
                <a className="btn btn-primary fw-bold" style={{ cursor: 'auto'}}>{CurrMonth}</a>
                &nbsp;
                <a className="btn btn-primary fw-bold" style={{width:"45px" , cursor: 'auto'}} onClick={() => {
                    if(((TodayDate.getMonth())+1) === 12){
                        setTodayDate(new Date(`${TodayDate.getFullYear()+1}-01-${TodayDate.getDate()}`));
                        ReactDOM.render(<CalendarReturn TodayDate={new Date(`${TodayDate.getFullYear()+1}-01-${TodayDate.getDate()}`)} />, document.getElementById('CalendarHere'));
                    }
                    else{
                        setTodayDate(new Date(`${TodayDate.getFullYear()}-${((TodayDate.getMonth())+1)+1}-${TodayDate.getDate()}`));
                        ReactDOM.render(<CalendarReturn TodayDate={new Date(`${TodayDate.getFullYear()}-${((TodayDate.getMonth())+1)+1}-${TodayDate.getDate()}`)} />, document.getElementById('CalendarHere'));
                    }
                }}><i class="bi bi-arrow-right"></i></a>
            </div>
            <table className="text-start m-1">
                <tbody>
                    <hr/>
                    <tr><tr>
                        <th><a className="btn btn-primary fw-bold" style={{width:"45px" , cursor: 'auto'}}>M</a><a className="btn btn-primary fw-bold" style={{width:"45px" , cursor: 'auto'}}></a></th>
                        <th><a className="btn btn-primary fw-bold" style={{width:"45px" , cursor: 'auto'}}>T</a><a className="btn btn-primary fw-bold" style={{width:"45px" , cursor: 'auto'}}></a></th>
                        <th><a className="btn btn-primary fw-bold" style={{width:"45px" , cursor: 'auto'}}>W</a><a className="btn btn-primary fw-bold" style={{width:"45px" , cursor: 'auto'}}></a></th>
                        <th><a className="btn btn-primary fw-bold" style={{width:"45px" , cursor: 'auto'}}>T</a><a className="btn btn-primary fw-bold" style={{width:"45px" , cursor: 'auto'}}></a></th>
                        <th><a className="btn btn-primary fw-bold" style={{width:"45px" , cursor: 'auto'}}>F</a><a className="btn btn-primary fw-bold" style={{width:"45px" , cursor: 'auto'}}></a></th>
                        <th><a className="btn btn-primary fw-bold" style={{width:"45px" , cursor: 'auto'}}>S</a><a className="btn btn-primary fw-bold" style={{width:"45px" , cursor: 'auto'}}></a></th>
                        <th><a className="btn btn-primary fw-bold" style={{width:"45px" , cursor: 'auto'}}>S</a><a className="btn btn-primary fw-bold" style={{width:"45px" , cursor: 'auto'}}></a></th>
                    </tr></tr>
                    <hr/>
                    <tr id="CalendarHere">
                        <CalendarReturn TodayDate={TodayDate}/>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}