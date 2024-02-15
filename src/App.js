import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import backgroundImage1 from './Images/MT-BG-ASV-01.jpeg';
import backgroundImage2 from './Images/MT-BG-02.jpeg';
import backgroundImage3 from './Images/MT-BG.png';

import Header from './Header';
import Footer from './Footer';
import HomePage from './HomePage.js';

export default function App() {
    return (
        <div style={{ backgroundImage: `url(${backgroundImage2})`, backgroundSize: 'cover', fontFamily: 'Comic Sans MS'}}>
            <br/><br/><br/>  
            <Header/>
            <div id="HomeHere">
                <HomePage/>
            </div>
            <Footer/>
        </div>
    );
}