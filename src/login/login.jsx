import React from 'react';

import { Button } from 'react-bootstrap';

export function Login() {
    const [firstname, setFirstName] = React.useState([]);
    const [lastname, setLastName] = React.useState([]);
    const [password, setPassWord] = React.useState([]);

    async function loginUser(){
        login('login');
    }
    
    async function createUser(){
        login('register');
    }
    
    
    async function login(type){
        // let firstname = document.querySelector("#firstname");
        // let lastname = document.querySelector("#lastname");
        // let password = document.querySelector("#password");
        if(firstname.length > 0 && lastname.length > 0 && password.length > 0){
            let request = {"firstname": firstname, "lastname": lastname, "password": password};
            let url = "";
            if(type=="login"){
                url = '/api/auth/login';
            }
            else{
                url = '/api/auth/register';
            }
            const response = await fetch(url, {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(request),
            });
            let loggedin = await response.json();
            console.log(loggedin);
            if(loggedin.msg == "Unauthorized"){
                alert("Name or Password not correct, please try again");
            }
            else if(loggedin.msg == "Existing user"){
                alert("User already exists");
            }
            else{
                alert("Login Succeeded");
                localStorage.setItem("firstname", firstname);
                localStorage.setItem("lastname", lastname);
                // window.location.href = "vote.html";
            }
        }
        else{
            alert("Please fill out all the info");
        }
    }


  return (
    <main>
    <h1>Login Here:</h1>
    <div>
        <nav className="navbar bg-light">
            <form className="container-fluid">
            <div className="input-group">
                <span className="input-group-text" id="basic-addon1">First Name</span>
                <input id="firstname" type="text" className="form-control" placeholder="First Name" aria-label="First Name" aria-describedby="basic-addon1" onChange={(e) => setFirstName(e.target.value)}></input>
            </div>
            <div className="input-group">
                <span className="input-group-text" id="basic-addon1">Last Name</span>
                <input id="lastname" type="text" className="form-control" placeholder="Last Name" aria-label="Last Name" aria-describedby="basic-addon1" onChange={(e) => setLastName(e.target.value)}></input>
            </div>
            <div className="input-group">
                <span className="input-group-text" id="basic-addon1">Password</span>
                <input id="password" type="password" className="form-control" placeholder="Password" aria-label="Last Name" aria-describedby="basic-addon1" onChange={(e) => setPassWord(e.target.value)}></input>
            </div>
            <Button variant='primary' onClick={() => loginUser()}>
            Login
            </Button>
            <Button variant='secondary' onClick={() => createUser()}>
            Register
            </Button>
            {/* <button className="btn btn-outline-success me-2" type="button" onclick="login('login')">Login</button>
            <button className="btn btn-outline-success me-2" type="button" onclick="login('register')">Register</button> */}
            </form>
        </nav>
    </div>
</main>
  );
}