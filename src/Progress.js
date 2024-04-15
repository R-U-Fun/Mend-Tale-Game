import ReactDOM from 'react-dom';
import React, { useEffect, useRef, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import HomeLinks from './HomeLinks';
import CurrentUserNameSingleton from './UserSingleton';
import CalendarUI from './CalendarUI';
import PieCharts from './PieChart';
import BarChart from './BarChart';
import RadarCharts from './RadarChart';
import useWindowSize from 'react-use/lib/useWindowSize'

function MoodCount(){
    let Text = [];
    let Color = 0;
    let GameProgressLength = CurrentUserNameSingleton.getUserName().GameProgress.length;
    for(let L=1; L <= GameProgressLength; L++){
        Text.push(CurrentUserNameSingleton.getUserName().GameProgress[L-1].MachineLearningAnalysis);
    }
    let Count = [0, 0, 0, 0, 0, 0, 0];
    let Moods = ['Neutral', 'Happy', 'Sad', 'Angry', 'Fear', 'Excite', 'Love'];
    for(let L=0; L < Text.length; L++){
        for(let M=0; M<7; M++){
            if(Text[L] === Moods[M]){
                Count[M] = Count[M] + 1;
            }
        }
    }

    // let sum = 0;
    // for (let i = 0; i < Count.length; i++ ) {
    //     sum += Count[i];
    //     console.log(Count[i]+" \t"+sum)
    // }

    // console.log(GameProgressLength)
    // console.log(sum)
    
    return Count;
}

export default function Progress(){

    let { width, height } = useWindowSize();

    let MoodData = MoodCount();

    console.log(MoodData);

	let data = [
		{ name: 'Neutral', 	value: MoodData[0] },
        { name: 'Happy', 	value: MoodData[1] },
		{ name: 'Excite', 	value: MoodData[2] },
		{ name: 'Love', 	value: MoodData[3] },
		{ name: 'Sad', 		value: MoodData[4] },
		{ name: 'Angry', 	value: MoodData[5] },
		{ name: 'Fear', 	value: MoodData[6] },
  	];
    
    return(
            <div className="container text-center">
                <div className="row gx-3 text-center justify-content-center">
                    <div className="col-lg-2 rounded-4 btn btn-primary m-2 fw-bold" onClick={() => ReactDOM.render(<CalendarUI /> , document.getElementById('ProgressCharts'))}>Calendar</div>
                    <div className="col-lg-2 rounded-4 btn btn-primary m-2 fw-bold" onClick={() => ReactDOM.render(<PieCharts data={data} /> , document.getElementById('ProgressCharts'))}>Pie Chart</div>
                    <div className="col-lg-2 rounded-4 btn btn-primary m-2 fw-bold" onClick={() => ReactDOM.render(<BarChart data={data} /> , document.getElementById('ProgressCharts'))}>Bar Chart</div>
                    <div className="col-lg-2 rounded-4 btn btn-primary m-2 fw-bold" onClick={() => ReactDOM.render(<RadarCharts data={data} /> , document.getElementById('ProgressCharts'))}>Radar Chart</div>
                    <br/>
                    <div className="col-lg-5 rounded-4 border border-primary border-5 m-2" id="ProgressCharts" >
                        <br/>
                        <CalendarUI />
                    </div> 
                </div>
            </div>
    );
}