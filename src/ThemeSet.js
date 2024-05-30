import ReactDOM from 'react-dom';
import React, { useEffect, useRef, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import DefaultBG from './Images/MT-BG-02.jpeg';
import GreenBG from './Images/Fantasy.jpg';
import RedBG from './Images/Scifi.jpg';
import GreyBG from './Images/Horror.jpg';

import ThemeSingleton from './ThemeSingleton';
import BackgroundSingleton from './BackgroundSingleton';
import App from './App';

export default function Theme(){

    return(
        <>
            <a class="btn btn-primary bi bi-paint-bucket" onClick={() => {ThemeSingleton.setTheme('primary'); BackgroundSingleton.setBackground(DefaultBG); ReactDOM.render(<App />, document.getElementById('root'));}} ></a>
            <a class="btn btn-secondary bi bi-paint-bucket" onClick={() => {ThemeSingleton.setTheme('secondary'); BackgroundSingleton.setBackground(GreyBG); ReactDOM.render(<App />, document.getElementById('root'));}} ></a>
            <a class="btn btn-success bi bi-paint-bucket" onClick={() => {ThemeSingleton.setTheme('success'); BackgroundSingleton.setBackground(GreenBG); ReactDOM.render(<App />, document.getElementById('root'));}} ></a>
            <a class="btn btn-info bi bi-paint-bucket" onClick={() => {ThemeSingleton.setTheme('info'); BackgroundSingleton.setBackground(DefaultBG); ReactDOM.render(<App />, document.getElementById('root'));}} ></a>
            <a class="btn btn-warning bi bi-paint-bucket" onClick={() => {ThemeSingleton.setTheme('warning'); BackgroundSingleton.setBackground(DefaultBG); ReactDOM.render(<App />, document.getElementById('root'));}} ></a>
            <a class="btn btn-danger bi bi-paint-bucket" onClick={() => {ThemeSingleton.setTheme('danger'); BackgroundSingleton.setBackground(RedBG); ReactDOM.render(<App />, document.getElementById('root'));}} ></a>
            <a class="btn btn-light bi bi-paint-bucket" onClick={() => {ThemeSingleton.setTheme('light'); BackgroundSingleton.setBackground(DefaultBG); ReactDOM.render(<App />, document.getElementById('root'));}} ></a>
            <a class="btn btn-dark bi bi-paint-bucket" onClick={() => {ThemeSingleton.setTheme('dark'); BackgroundSingleton.setBackground(DefaultBG); ReactDOM.render(<App />, document.getElementById('root'));}} ></a>
        </>
    );
}