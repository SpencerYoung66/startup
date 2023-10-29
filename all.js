const categories = ["chocolate", "fruit", "other"];

let flavors = [
    { name: "Double Chocolate", category: "chocolate", owner: "Nathan Young" },
    { name: "Strawberry", category: "fruit", owner: "Grandpa" },
    { name: "Cherry Chocolate Chip", category: "other", owner: "Brad Young" },
    { name: "Cookie Dough", category: "other", owner: "Brad Young" },
]

function fillName(){
    if(localStorage.getItem("firstname")){
        document.querySelector("#loginLink").innerText = "Login (" + (localStorage.getItem("firstname")) + ")";
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
    for(flavor of flavors){
        if(flavor.category === category){
            let currentCategory = document.createElement("option");
            console.log(flavor.name);
            currentCategory.setAttribute("value", flavor.name);
            currentCategory.innerHTML = flavor.name;
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

function vote(){
    let chocolate = document.querySelector("#chocolate");
    let fruit = document.querySelector("#fruit");
    let other = document.querySelector("#other");
    let grandPrize = document.querySelector("#grand");
    localStorage.setItem("chocolate", chocolate.value);
    localStorage.setItem("fruit", fruit.value);
    localStorage.setItem("other", other.value);
    localStorage.setItem("grandPrize", grandPrize.value);
    window.location.href = "index.html";
}

function fillUserFlavors(){
    flavorList = document.querySelector("#flavors");
    eraseList(flavorList);
    if(localStorage.getItem("userFlavors")){
        let currentFlavorsArray = JSON.parse(localStorage.getItem("userFlavors"));
        for(flavor of currentFlavorsArray){
            let currentListFlavor = document.createElement("li");
            currentListFlavor.setAttribute("class", )
        }
    }
}

function addUserFlavor(){
    let newFlavor = document.querySelector("#flavorName").value;
    let newCategory = document.querySelector("#category").value;
    let currentFlavorsArray = [];
    if(localStorage.getItem("userFlavors")){
        currentFlavorsArray = JSON.parse(localStorage.getItem("userFlavors"));
    }
    currentFlavorsArray.push({name:newFlavor, category:newCategory});

    localStorage.setItem("userFlavors", JSON.stringify(currentFlavorsArray));
}

function eraseList(element){
    while(element.firstChild){
        element.removeChild(element.firstChild);
    }
}

