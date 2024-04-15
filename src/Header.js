import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import IconImage from './Images/MT-Icon.png';
import TitleImage from './Images/MD_Title_T_BG.png';

export default function Header(){
    return(
        <div className="container-fluids">
            <nav className="navbar navbar-expand-md navbar-dark fixed-top" style={{cursor:'default', background: 'rgba(0, 0, 10, 0)' }}>
                <a className="navbar-brand fs-2 fw-bold font-arial " id="PageNameA" style={{ color:'rgba(0, 0, 117, 0.9)' }} onClick={() => {window.location.reload(false)}}>
                    &nbsp;&nbsp;&nbsp;
                    <img src={`${IconImage}`} id="AaroophanIMG" height="40px" width="40px" className="rounded-5" alt="MendTale" /> 
                    &nbsp;&nbsp;
                    <img src={`${TitleImage}`} id="AaroophanIMG" height="40px" width="150px" className="rounded-5" alt="MendTale" /> 
                </a>
            </nav>
        </div>
    );
}