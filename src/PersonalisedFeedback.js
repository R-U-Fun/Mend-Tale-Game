import ReactDOM from 'react-dom';
import React, { useEffect, useRef, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import HomeLinks from './HomeLinks';
import CurrentUserNameSingleton from './UserSingleton';
import HomePage from './HomePage';

export default async function PersonalisedFeedback(NewUserResponseText, NewJournalEntry, NewMachineLearningAnalysis){
    let NewPersonalisedFeedback = await fetch('http://localhost:5000/TextGeneration', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            UserResponse: NewUserResponseText
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        return data;
    });
    if(NewPersonalisedFeedback === null){
        NewPersonalisedFeedback = "NULL";
    }
    return(NewPersonalisedFeedback);
}