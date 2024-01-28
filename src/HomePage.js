import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Login from './Login';
import StartGame from './StartGame';
import HomeLinks from './HomeLinks';

export default function HomePage(){
    return(
        <div>
            <div className="container text-center">
                <div className="row gx-3 text-center justify-content-center">
                    <div id="LoginHere" className="col-lg-1"></div>
                    <div className=" col-lg-9 rounded-4 border border-primary border-5">
                        <div className="card  text-white" style={{ background: 'rgba(0, 0, 0, 0)', border: 'none',display: 'flex',  alignItems: 'center'}} id="Box">
                            <StartGame/>
                        </div>
                    </div>
                    <div id="PlayerHere" className="col-lg-1"><button className="btn btn-primary btn-lg m-2 fw-bold" onClick={() => ReactDOM.render(<Login />, document.getElementById('Box'))} style={{width:"200px"}}>Login</button></div>
                </div>
            </div>
            <br/><br/>
        </div>
    );
}