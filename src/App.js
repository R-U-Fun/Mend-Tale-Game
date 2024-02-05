import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import backgroundImage from './Images/MT-BG-02.jpeg';

import Header from './Header';
import Footer from './Footer';
import HomePage from './HomePage.js';

export default function App() {
    return (
        <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover'}}>
        {/* //<div style={{ background: '#d2e2fa'}}> */}
            <br/><br/><br/>  
            <Header/>
            <div id="HomeHere">
                <HomePage/>
            </div>
            <Footer/>
        </div>
    );
}