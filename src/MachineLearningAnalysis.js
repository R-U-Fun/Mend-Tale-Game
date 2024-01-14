import ReactDOM from 'react-dom';
import React, { useEffect, useRef, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import HomeLinks from './HomeLinks';
import CurrentUserNameSingleton from './UserSingleton';
import HomePage from './HomePage';

export default function MachineLearningAnalysis(NewUserResponseText, NewJournalEntry){
    let Mood6 = ['Happy', 'Sad', 'Angry', 'Fear', 'Excite', 'Love'];
    let randomNumber = Math.floor(Math.random() * 6);
    return(Mood6[randomNumber]);
}