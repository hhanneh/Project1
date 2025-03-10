const inputbox = document.getElementById("inputbox");
const textbar = document.querySelector(".textbar");
const listcontainer = document.getElementById("listcontainer");

let draggedItem = null;

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

        li.setAttribute("draggable", "true");
        li.addEventListener("dragstart", dragStart);
        li.addEventListener("dragover", dragOver);
        li.addEventListener("drop", drop);

        listcontainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);

    }
    inputbox.value = "";
    inputbox.style.border = "";
    saveData();
    updateCounter();
}

inputbox.addEventListener("input", function() {
    textbar.style.border = "";
});

listcontainer.addEventListener("click", function(e){
    if(e.target.tagName ==="LI") {
        e.target.classList.toggle("checked");
        saveData();
        updateCounter();
    } else if (e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
        updateCounter();
    }
}, false);

function saveData(){
    localStorage.setItem("data", listcontainer.innerHTML);
}

function showTask(){
    listcontainer.innerHTML = localStorage.getItem("data");

    document.querySelectorAll("#listcontainer li").forEach(li => {
        li.setAttribute("draggable", "true");
        li.addEventListener("dragstart", dragStart);
        li.addEventListener("dragover", dragOver);
        li.addEventListener("drop", drop);
    });

    updateCounter();
}



function updateCounter() {
    let tasks = document.querySelectorAll("#listcontainer li");
    let uncheckedTasks = [...tasks].filter(task => !task.classList.contains("checked")).length;
    document.getElementById("taskCounter").textContent = `Tasks left: ${uncheckedTasks}`;
}

function dragStart(event) {
    draggedItem = event.target;
    event.dataTransfer.effectAllowed = "move";
}

function dragOver(event) {
    event.preventDefault();
    const target = event.target;

    if (target.tagName === "LI" && target !== draggedItem) {
        const bounding = target.getBoundingClientRect();
        const offset = bounding.y + bounding.height / 2;

        if (event.clientY - offset > 0) {
            target.after(draggedItem);
        } else {
            target.before(draggedItem);
        }
    }
}

function drop(event) {
    event.preventDefault();
    saveData();
}

showTask();