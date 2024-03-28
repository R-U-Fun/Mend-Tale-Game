import ReactDOM from 'react-dom';
import React, { useEffect, useRef, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import HomeLinks from './HomeLinks';
import CurrentUserNameSingleton from './UserSingleton';
import HomePage from './HomePage';

import ServerURL from './ServerURL';

export default async function PersonalisedFeedback(NewUserResponseText, NewJournalEntry, NewMachineLearningAnalysis){
    let NewPersonalisedFeedback = await fetch(ServerURL.MTServer2()+'/TextGeneration4', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            UserResponse: NewUserResponseText,
            Mood: NewMachineLearningAnalysis
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