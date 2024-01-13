import React, { useState } from 'react';
import ReactDOM from 'react-dom';

function CalendarReturn(props){
    let TodayDateProp = props.TodayDate;
    console.log(TodayDateProp);
    let FirstDate = new Date(`${TodayDateProp.getFullYear()}-${(TodayDateProp.getMonth())+1}-01`);
    console.log(FirstDate);
    console.log("----------");
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
                            CalRowDays.push(
                                <th key={D}><a className="btn btn-info fw-bold text-white" style={{width:"45px" , cursor: 'auto'}}>{CalDate}</a><a className="btn btn-primary fw-info" style={{width:"45px" , cursor: 'auto'}}><i class="bi bi-emoji-smile"></i></a></th>
                            );
                            CalDate++;
                        }
                        else{
                            CalRowDays.push(
                                <th key={D}><a className="btn btn-primary fw-bold" style={{width:"45px" , cursor: 'auto'}}>{CalDate}</a><a className="btn btn-primary fw-bold" style={{width:"45px" , cursor: 'auto'}}><i class="bi bi-emoji-smile"></i></a></th>
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
                        CalRowDays.push(
                            <th key={D}><a className="btn btn-info fw-bold text-white" style={{width:"45px" , cursor: 'auto'}}>{CalDate}</a><a className="btn btn-primary fw-info" style={{width:"45px" , cursor: 'auto'}}><i class="bi bi-emoji-smile"></i></a></th>
                        );
                        CalDate++;
                    }
                    else{
                        CalRowDays.push(
                            <th key={D}><a className="btn btn-primary fw-bold" style={{width:"45px" , cursor: 'auto'}}>{CalDate}</a><a className="btn btn-primary fw-bold" style={{width:"45px" , cursor: 'auto'}}><i class="bi bi-emoji-smile"></i></a></th>
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
    let [TodayDate, setTodayDate] = useState(new Date("2023-03-04"));
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
                <a className="btn btn-primary fw-bold">{TodayDate.getFullYear()}</a>&nbsp;
                <a className="btn btn-primary fw-bold">{(TodayDate.getMonth())+1}</a>
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