import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import backgroundImage1 from './Images/MT-BG-ASV-01.jpeg';
import backgroundImage3 from './Images/MT-BG.png';

import DefaultBG from './Images/MT-BG-02.jpeg';
import Header from './Header';
import Footer from './Footer';
import HomePage from './HomePage.js';

import ThemeSingleton from './ThemeSingleton';
import BackgroundSingleton from './BackgroundSingleton';

export default function App() {
    if(!ThemeSingleton.getTheme()){
        ThemeSingleton.setTheme('primary');
        BackgroundSingleton.setBackground(DefaultBG);
    }

    return (
        <div style={{ backgroundImage: `url(${BackgroundSingleton.getBackground()})`, backgroundSize: 'cover', fontFamily: 'Comic Sans MS'}}>
            <br/><br/><br/>  
            <Header/>
            <div id="HomeHere">
                <HomePage/>
            </div>
            <Footer/>
        </div>
    );
}