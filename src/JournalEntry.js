import ReactDOM from 'react-dom';
import React, { useEffect, useRef, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import HomeLinks from './HomeLinks';
import CurrentUserNameSingleton from './UserSingleton';
import HomePage from './HomePage';

export default function JournalEntry(NewUserResponseText){
    let NewJournalEntry = NewUserResponseText.split(" ").join(", ");
    return(NewJournalEntry);
}