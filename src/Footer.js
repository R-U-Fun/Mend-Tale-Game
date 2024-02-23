import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function Footer(){
  return(
    <footer className="footer text-light py-1 bottom" style={{ background: 'rgba(210, 226, 250, 0)' }}>
      <div className="container">
        <hr />
        <div className="text-center">
          <a href="http://aaroophan-com.stackstaging.com" style={{ cursor:'default', color:'rgba(210, 226, 250, 0.9)', textDecoration:'none' }}>&copy; 2024 | Aaroophan | 2323492</a>
          <br/>
          <ul className="list-inline">
            <li className="list-inline-item"><a href="https://www.instagram.com/aaroophan/?theme=dark" style={{ cursor:'default', fontsize: '20px', color:'rgba(210, 226, 250, 0.9)' }}><i className="bi bi-instagram"></i></a></li>
            <li className="list-inline-item"><a href="https://www.linkedin.com/in/aaroophan" style={{ cursor:'default', fontsize: '20px', color:'rgba(210, 226, 250, 0.9)' }}><i className="bi bi-linkedin"></i></a></li>
            <li className="list-inline-item"><a href="https://github.com/R-U-Fun" style={{ cursor:'default', fontsize: '20px', color:'rgba(210, 226, 250, 0.9)' }}><i className="bi bi-github"></i></a></li>
            <li className="list-inline-item"><a href="https://twitter.com/Aaroophan" style={{ cursor:'default', fontsize: '20px', color:'rgba(210, 226, 250, 0.9)' }}><i className="bi bi-twitter-x"></i></a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}