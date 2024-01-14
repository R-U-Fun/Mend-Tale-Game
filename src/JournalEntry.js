import ReactDOM from 'react-dom';
import React, { useEffect, useRef, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import HomeLinks from './HomeLinks';
import CurrentUserNameSingleton from './UserSingleton';
import HomePage from './HomePage';

export default async function JournalEntry(NewUserResponseText){
    
    let NewJournalEntry = await fetch('http://localhost:5000/sentiment_analysis')
    .then(response => response.json())
    .then(data => {
        console.log(data[0].label);
        return data[0].label + " - " +NewUserResponseText.split(" ").join(", ");
    });

    console.log(NewJournalEntry);
    return NewJournalEntry;
}