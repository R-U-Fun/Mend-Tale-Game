import ReactDOM from 'react-dom';
import React, { useEffect, useRef, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import HomeLinks from './HomeLinks';
import CurrentUserNameSingleton from './UserSingleton';
import HomePage from './HomePage';

export default async function JournalEntry(NewUserResponseText){
    
    let NewJournalEntry = await fetch('http://localhost:5000/SentimentAnalysis', {
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
        //return data + " - " + NewUserResponseText.split(" ").join(", ");
        return data;
    });

    let NamedEntityRecognition = await fetch('http://localhost:5000/NamedEntityRecognition', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            NamedEntityRecognition: NewUserResponseText
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log("++++++++++++++++++++++++++++++++");
        console.log(data);
        console.log("++++++++++++++++++++++++++++++++");
        return data;
    });

    return (NewJournalEntry+" -- "+ NamedEntityRecognition);
}