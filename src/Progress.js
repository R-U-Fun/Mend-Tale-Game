import ReactDOM from 'react-dom';
import React, { useEffect, useRef, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import HomeLinks from './HomeLinks';
import CurrentUserNameSingleton from './UserSingleton';
import Calendars from './Calendar';
import CalendarUI from './CalendarUI';
import PieCharts from './PieChart';
import BarChart from './BarChart';
import RadarCharts from './RadarChart';

export default function Progress(){
    
    let data = [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
        { name: 'Group D', value: 200 },
        { name: 'Group E', value: 200 },
        { name: 'Group F', value: 200 },
    ];
    
    return(
            <div className="container text-center">
                <div className="row gx-3 text-center justify-content-center">
                    <div className="col-lg-2 rounded-4 btn btn-primary m-2" onClick={() => ReactDOM.render(<CalendarUI /> , document.getElementById('ProgressCharts'))}>Calendar</div>
                    <div className="col-lg-2 rounded-4 btn btn-primary m-2" onClick={() => ReactDOM.render(<PieCharts /> , document.getElementById('ProgressCharts'))}>Pie Chart</div>
                    <div className="col-lg-2 rounded-4 btn btn-primary m-2" onClick={() => ReactDOM.render(<BarChart /> , document.getElementById('ProgressCharts'))}>Bar Chart</div>
                    <div className="col-lg-2 rounded-4 btn btn-primary m-2" onClick={() => ReactDOM.render(<RadarCharts /> , document.getElementById('ProgressCharts'))}>Radar Chart</div>
                    <br/>
                    <div className="col-lg-5 rounded-4 border border-primary border-5 m-2" id="ProgressCharts"><CalendarUI data={data}/></div> 
                </div>
            </div>
    );
}