import React from 'react';

import { Button } from 'react-bootstrap';

export function Register() {
    const [category, setCategory] = React.useState("chocolate");
    const [flavor, setFlavor] = React.useState([]);
    const [userFlavors, setUserFlavors] = React.useState([]);
    const [userFlavorsElems, setUserFlavorsElems] = React.useState([]);

    async function fillFlavors(){
        if(localStorage.getItem("firstname")){
            const tmpElems = userFlavorsElems.slice();
            tmpElems.push(<li className='list-group-item'>
                {flavor}
            </li>);
            setUserFlavorsElems(tmpElems);
        }
    }

    React.useEffect(() => {
        fetch("/api/flavors/" + new Date().getFullYear() + "/" + localStorage.getItem("firstname") + " " + localStorage.getItem("lastname"))
        .then((response) => response.json())
        .then((currentUserFlavors) => {
            const flavorElems= [];
                for (const [i, userFlavor] of currentUserFlavors.entries()) {
                    flavorElems.push(
                        <li className='list-group-item'>
                        {userFlavor.flavor}
                    </li>
                    );
                }
                setUserFlavorsElems(flavorElems);
        }); 

    }, []);

    

    async function register(){
        if(localStorage.getItem("firstname")){
            const flavorRequest = {"flavor": flavor, "category": category, "owner": localStorage.getItem("firstname") + " " + localStorage.getItem("lastname"), "year": new Date().getFullYear()}
            console.log(JSON.stringify(flavorRequest))
    
            const response = await fetch('/api/flavors', {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(flavorRequest),
            });
    
            let flavorsUpdated = await response.json();
    
            console.log(flavorsUpdated);
    
            console.log(JSON.stringify(flavorsUpdated));
            if(flavorsUpdated.msg == "Unauthorized"){
                alert("You are not logged in, please log in");
            }
            fillFlavors();
            alert("Flavor Registered");
            
        }
        else{
            alert("Please Log in");
        }
    }

    const onChangeCategory = (e) => {
        setCategory(e.target.value);
    }

    const onChangeFlavor = (e) => {
        setFlavor(e.target.value);
    }

  return (
    <main>
    <div>
        <h1>Register your Flavor!</h1>
        <span>Please input your flavor's name and category, then click register</span>
    </div>
    <nav className="navbar bg-light">
        <form className="container-fluid" method="POST">
        <label htmlFor="category">Category:</label>
        <div className="input-group">
            <select className="form-select" aria-label="Default select example" id="category" onChange={(e) => onChangeCategory(e)}>
                <option value="chocolate">Chocolate</option>
                <option value="fruit">Fruit</option>
                <option value="other">Other</option>
            </select>
        </div>
        <div className="input-group">
            <span className="input-group-text" id="basic-addon1">Flavor</span>
            <input id="flavorName" type="text" className="form-control" placeholder="Chocolate Chip" aria-label="Flavor" aria-describedby="basic-addon1" onChange={(e) => onChangeFlavor(e)}></input>
        </div>
        <Button variant='primary' onClick={() => register()}>
            Register
            </Button>
        {/* <button className="btn btn-outline-success me-2" type="button" onclick="addUserFlavor()">Register</button> */}
        </form>
    </nav>
    <div>
        <span>Your Flavors:</span>
        <ul className="list-group" id="flavors">
            {userFlavorsElems}
          </ul>
    </div>
    <div>
        <span id="numFlavors">Number of Flavors: 0</span>
    </div>
</main>
  );
}