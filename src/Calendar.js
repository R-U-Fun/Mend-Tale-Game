import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function Calendars(){
    let [value, onChange] = useState(new Date());

    return (
        <div className="m-4">
            <Calendar 
                onChange={onChange} 
                value={value} 
            />
        </div>
    );
}