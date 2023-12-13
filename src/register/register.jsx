import React from 'react';

export function Register() {
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
            <select className="form-select" aria-label="Default select example" id="category">
                <option value="chocolate">Chocolate</option>
                <option value="fruit">Fruit</option>
                <option value="other">Other</option>
            </select>
        </div>
        <div className="input-group">
            <span className="input-group-text" id="basic-addon1">Flavor</span>
            <input id="flavorName" type="text" className="form-control" placeholder="Chocolate Chip" aria-label="Flavor" aria-describedby="basic-addon1"></input>
        </div>
        {/* <button className="btn btn-outline-success me-2" type="button" onclick="addUserFlavor()">Register</button> */}
        </form>
    </nav>
    <div>
        <span>Your Flavors:</span>
        <ul className="list-group" id="flavors">
          </ul>
    </div>
    <div>
        <span id="numFlavors">Number of Flavors: 0</span>
    </div>
</main>
  );
}