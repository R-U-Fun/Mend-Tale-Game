import ReactDOM from 'react-dom';
import React, { useEffect, useRef, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import HomeLinks from './HomeLinks';
import CurrentUserNameSingleton from './UserSingleton';
import HomePage from './HomePage';

import ServerURL from './ServerURL';

export default async function JournalEntry(NewUserResponseText){
    
    // let SentimentAnalysis = await fetch(ServerURL.MTServer2()+'/SentimentAnalysis4', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         UserResponse: NewUserResponseText
    //     })
    // })
    // .then(response => response.json())
    // .then(data => {
    //     console.log(data);
    //     return data;
    // });

    let Tokens = await fetch(ServerURL.MTServer2()+'/Tokenizer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            TokenizerText: NewUserResponseText
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        return data;
    });

    // let NamedEntityRecognition = await fetch(ServerURL.MTServer2()+'/NamedEntityRecognition2', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         NamedEntityRecognition: NewUserResponseText
    //     })
    // })
    // .then(response => response.json())
    // .then(data => {
    //     console.log("++++++++++++++++++++++++++++++++");
    //     console.log(data);
    //     console.log("++++++++++++++++++++++++++++++++");
    //     return data;
    // });

    // if(NamedEntityRecognition){
    //     return (SentimentAnalysis+" - "+ Tokens+" - "+ NamedEntityRecognition);
    // }
    // else{
    //     return (Tokens);
    //}
    return (Tokens);
}