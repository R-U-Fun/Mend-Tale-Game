import ReactDOM from 'react-dom';
import React, { useEffect, useRef, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import HomeLinks from './HomeLinks';
import CurrentUserNameSingleton from './UserSingleton';
import HomePage from './HomePage';

export default async function MachineLearningAnalysis(NewUserResponseText, NewJournalEntry){
    let Mood6 = ['Happy', 'Excite', 'Love', 'Sad', 'Angry', 'Fear'];

    let SentimentAnalysis = await fetch('http://localhost:5000/SentimentAnalysis2', {
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

    return SentimentAnalysis

    // if(SentimentAnalysis === "Positive"){
    //     let randomNumber = Math.floor(Math.random() * 3);
    //     return(Mood6[randomNumber]);
    // }
    // else if (SentimentAnalysis === "Negative"){
    //     let randomNumber = Math.floor(Math.random() * 3) + 3;
    //     return(Mood6[randomNumber]);
    // } 
}