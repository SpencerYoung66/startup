import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return (
    <>
    <header>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid">
    <a className="navbar-brand" href="index.html">Labor Day Ice Cream</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
  
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <a className="nav-link active" href="index.html">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="login.html" id="loginLink">Login</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="vote.html">Vote</a>
        </li>
        <li className="nav-item">
            <a className="nav-link" href="register.html">Register</a>
        </li>
        <li className="nav-item">
            <a className="nav-link" href="history.html">History</a>
        </li>  
      </ul>
    </div>
    </div>
  </nav>
</header>

<main>
    <h1>Welcome to this year's Labor Day Ice Cream Competition</h1>
    <div>
        {/* <img src="https://upload.wikimedia.org/wikipedia/commons/2/2e/Ice_cream_with_whipped_cream%2C_chocolate_syrup%2C_and_a_wafer_%28cropped%29.jpg" width="300" height="400"> */}
    </div>
    <div>
        <span id="numFlavors">Number of Flavors: 0</span>
    </div>
</main>
<footer>
    <a href="https://github.com/SpencerYoung66/startup">GitHub</a>
    <span>Styling HTML, CSS, and JS provided by Bootstrap</span>
</footer>
</>
  );
}