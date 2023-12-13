import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { History } from './history/history';
import { Register } from './register/register';
import { Vote } from './vote/vote';
import { Home } from './home/home';
import { Button } from 'react-bootstrap';

export default function App() {
  return (
    <>
    <BrowserRouter>
    <header>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid">
    <NavLink className="navbar-brand" to="home">Labor Day Ice Cream</NavLink>
    {/* <NavBar collapseOnSelect fixed='top' expand='sm' bg='dark' variant='dark'>
        <Container>
            <NavBar.Toggle aria-controls='responsive-navbar-nav'/>
            <NavBar.Collapse> */}
    {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button> */}
  
    {/* <div className="collapse navbar-collapse" id="navbarSupportedContent"> */}
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <NavLink className="nav-link active" to="home">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="login" id="loginLink">Login</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="vote">Vote</NavLink>
        </li>
        <li className="nav-item">
            <NavLink className="nav-link" to="register">Register</NavLink>
        </li>
        <li className="nav-item">
            <NavLink className="nav-link" to="history">History</NavLink>
        </li>  
      </ul>
    {/* </div> */}
    {/* </NavBar.Collapse>
    </Container>
    </NavBar> */}
    </div>
  </nav>
</header>

<Routes>
  <Route path='/' element={<Login />} exact />
  <Route path='/home' element={<Home />} />
  <Route path='/history' element={<History />} />
  <Route path='/register' element={<Register />} />
  <Route path='/vote' element={<Vote />} />
  <Route path='/login' element={<Login />} />
  <Route path='*' element={<NotFound />} />
</Routes>

<footer>
    <a href="https://github.com/SpencerYoung66/startup">GitHub</a>
    <span>Styling HTML, CSS, and JS provided by Bootstrap</span>
</footer>
</BrowserRouter>
</>
  );
}

function NotFound() {
    return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
  }