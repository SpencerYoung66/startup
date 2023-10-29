function login(){
    let firstname = document.querySelector("#firstname");
    let lastname = document.querySelector("#lastname");
    if(firstname.value.length > 0 && lastname.value.length > 0){
        localStorage.setItem("firstname", firstname.value);
        localStorage.setItem("lastname", lastname.value)
        window.location.href = "index.html";
    }
    else{
        alert("Please enter a first and last name");
    }
}