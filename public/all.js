const categories = ["chocolate", "fruit", "other"];

localStorage.setItem("numFlavors", Number(0));
localStorage.setItem("numVotes", Number(0));

function fillName(){
    if(localStorage.getItem("firstname")){
        document.querySelector("#loginLink").innerText = "Login (" + (localStorage.getItem("firstname")) + ")";
    }
}

async function login(type){
    let firstname = document.querySelector("#firstname");
    let lastname = document.querySelector("#lastname");
    let password = document.querySelector("#password");
    if(firstname.value.length > 0 && lastname.value.length > 0 && password.value.length > 0){
        let request = {"firstname": firstname.value, "lastname": lastname.value, "password": password.value};
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
        if(loggedin.msg != "Unauthorized"){
            localStorage.setItem("firstname", firstname.value);
            localStorage.setItem("lastname", lastname.value);
        }
        // window.location.href = "index.html";
    }
    else{
        alert("Please fill out all the info");
    }
}


async function fillAllFlavors(){
    await fillFlavors("chocolate");
    await fillFlavors("fruit");
    await fillFlavors("other");
    await fillGrandPrize();
}

async function fillFlavors(category){
    let selectCategory = document.querySelector("#"+category);
    eraseList(selectCategory);
    flavorsResponse = await fetch("/api/flavors/2023");
    allFlavors = await flavorsResponse.json();
    for(flavor of allFlavors){
        if(flavor.category === category){
            let currentCategory = document.createElement("option");
            console.log(flavor.flavor);
            currentCategory.setAttribute("value", flavor.flavor);
            currentCategory.innerHTML = flavor.flavor;
            selectCategory.appendChild(currentCategory);
        }
    }
}

async function fillGrandPrize(){
    let grandPrize = document.querySelector("#grand");
    eraseList(grandPrize);
    for(category of categories){
        selectCategory = document.querySelector("#"+category);
        let currentFlavor = document.createElement("option");
        currentFlavor.setAttribute("value", selectCategory.value);
        currentFlavor.innerHTML = selectCategory.value;
        if(localStorage.getItem("grandPrize") == selectCategory.value){
            currentFlavor.setAttribute("selected", "selected");
        }
        grandPrize.appendChild(currentFlavor);
    }
}

function selectGrandPrize(){
    let grandPrize = document.querySelector("#grand");
    localStorage.setItem("grandPrize", grandPrize.value);
}

async function vote(){
    if(localStorage.getItem("firstname")){
        let chocolate = document.querySelector("#chocolate");
        let fruit = document.querySelector("#fruit");
        let other = document.querySelector("#other");
        let grandPrize = document.querySelector("#grand");
        voteRequest = {"user": localStorage.getItem("firstname") + " " + localStorage.getItem("lastname"), "chocolate": chocolate.value, "fruit": fruit.value, "other": other.value, "grandPrize":grandPrize.value};
        const response = await fetch('/api/vote', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(voteRequest),
        });

        let vote = await response.json();

        console.log(JSON.stringify(vote));
        localStorage.setItem("userVote", JSON.stringify(vote));

        // localStorage.setItem("chocolate", chocolate.value);
        // localStorage.setItem("fruit", fruit.value);
        // localStorage.setItem("other", other.value);
        // localStorage.setItem("grandPrize", grandPrize.value);

        //WebSocket
        let numVotes = document.querySelector('#numVotes');
        localStorage.setItem("numVotes", Number(localStorage.getItem("numVotes")) + 1);
        numVotes.innerHTML = "Number of Votes: " + Number(localStorage.getItem("numVotes"));

        window.location.href = "index.html";
    }
    else{
        alert("Please Log in");
        window.location.href = "login.html";
    }
}

async function fillUserFlavors(){
    if(localStorage.getItem("firstname")){
        flavorList = document.querySelector("#flavors");
        eraseList(flavorList);
        let response = await fetch("/api/flavors/" + new Date().getFullYear() + "/" + localStorage.getItem("firstname") + " " + localStorage.getItem("lastname"));
        console.log("/api/flavors/" + new Date().getFullYear() + "/" + localStorage.getItem("firstname") + " " + localStorage.getItem("lastname"));
        let currentFlavorsArray = await response.json();
        console.log(currentFlavorsArray);
        // if(localStorage.getItem("userFlavors")){
        // let currentFlavorsArray = JSON.parse(localStorage.getItem("userFlavors"));
        for(flavor of currentFlavorsArray){
            let currentListFlavor = document.createElement("li");
            currentListFlavor.setAttribute("class", "list-group-item");
            currentListFlavor.innerHTML = flavor.flavor; //+ " - " + flavor.category;
            flavorList.appendChild(currentListFlavor);
        }
    // }
    }
}

async function addUserFlavor(){
    if(localStorage.getItem("firstname")){
        let newFlavor = document.querySelector("#flavorName").value;
        let newCategory = document.querySelector("#category").value;
        flavorRequest = {"flavor": newFlavor, "category": newCategory, "owner": localStorage.getItem("firstname") + " " + localStorage.getItem("lastname"), "year": new Date().getFullYear()}
        console.log(JSON.stringify(flavorRequest))
        // let currentFlavorsArray = [];
        // if(localStorage.getItem("userFlavors")){
        //     currentFlavorsArray = JSON.parse(localStorage.getItem("userFlavors"));
        // }
        // currentFlavorsArray.push({name:newFlavor, category:newCategory});

        // localStorage.setItem("userFlavors", JSON.stringify(currentFlavorsArray));
        // flavors.push({name:newFlavor, category:newCategory, owner:localStorage.getItem("firstname") + " " + localStorage.getItem("lastname")});

        const response = await fetch('/api/flavors', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(flavorRequest),
        });

        let flavorsUpdated = await response.json();

        console.log(JSON.stringify(flavorsUpdated));
        localStorage.setItem("userFlavors", JSON.stringify(flavorsUpdated));

        fillUserFlavors();


        //WebSocket
        let numFlavors = document.querySelector('#numFlavors');
        localStorage.setItem("numFlavors", Number(localStorage.getItem("numFlavors")) + 1);
        numFlavors.innerHTML = "Number of Flavors: " + Number(localStorage.getItem("numFlavors"));
    }
    else{
        alert("Please Log in");
        window.location.href = "login.html";
    }
}

async function fillYearData(){
    let currentYear = document.querySelector("#year");
    let currentYearList = [];
    flavorList = document.querySelector("#flavors");
    eraseList(flavorList);
    historyResponse = await fetch("/api/flavors/" + currentYear.value);   
    currentYearList = await historyResponse.json();
    for(flavor of currentYearList){
        let currentListFlavor = document.createElement("li");
        currentListFlavor.setAttribute("class", "list-group-item");
        currentListFlavor.innerHTML = flavor.flavor + " - " + flavor.category;
        flavorList.appendChild(currentListFlavor);
    }

}

async function getRandomQuote(){
    // let appId = Math.round(Math.random() * (2550000 - 1000000) + 1000000);
    // let url = "https://store.steampowered.com/api/appdetails?appids=" + appId;
    // let response = await fetch(url);
    // let app = await response.json();
    // while(app.appId.success == false || app.appId.data.required_age == "18"){
    //     appId = Math.round(Math.random() * (2550000 - 1000000));
    //     url = "https://store.steampowered.com/api/appdetails?appids=" + appId;
    //     response = await fetch(url);
    //     app = await response.json();
    // }
    // console.log(app);

    let url = 'https://api.quotable.io/random';
    let response = await fetch(url);
    let quoteData = await response.json();
    let quote = document.querySelector("#quote");
    quote.innerHTML = quoteData.content;
    let author = document.querySelector("#author");
    author.innerHTML = quoteData.author;

}

function eraseList(element){
    while(element.firstChild){
        element.removeChild(element.firstChild);
    }
}

setInterval(() => {
    if(document.querySelector('#numFlavors')){
        let numFlavors = document.querySelector('#numFlavors');
        localStorage.setItem("numFlavors", Number(localStorage.getItem("numFlavors")) + 1);
        numFlavors.innerHTML = "Number of Flavors: " + Number(localStorage.getItem("numFlavors"));
    }
  }, 4000);

  setInterval(() => {
    if(document.querySelector('#numVotes')){
        let numVotes = document.querySelector('#numVotes');
        localStorage.setItem("numVotes", Number(localStorage.getItem("numVotes")) + 1);
        numVotes.innerHTML = "Number of Votes: " + Number(localStorage.getItem("numVotes"));
    }
  }, 1000);
