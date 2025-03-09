const inputbox = document.getElementById("inputbox");
const textbar = document.querySelector(".textbar");
const listcontainer = document.getElementById("listcontainer");

function addtask(){
    if(inputbox.value === '') {
        alert("Please add your task!");
        textbar.style.border = "2px solid red";
        return;
    } else if (inputbox.value.length < 3) {
        alert("Task must be at least 3 characters long!");
        textbar.style.border = "2px solid red";
        return;
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputbox.value;
        listcontainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);

    }
    inputbox.value = "";
    inputbox.style.border = "";
    saveData();
}

inputbox.addEventListener("input", function() {
    textbar.style.border = "";
});

listcontainer.addEventListener("click", function(e){
    if(e.target.tagName ==="LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData(){
    localStorage.setItem("data", listcontainer.innerHTML);
}

function showTask(){
    listcontainer.innerHTML = localStorage.getItem("data");
}

showTask();