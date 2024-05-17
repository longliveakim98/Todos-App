document.addEventListener('DOMContentLoaded', () => {
    const inputBox = document.getElementById('input-box');
    const listContainer = document.getElementById('list-container');

    async function fetchTodos() {
        const resp = await fetch('https://jsonplaceholder.typicode.com/todos');
        const data = await resp.json();        
        data.forEach(todo => {
            addTaskToDOM(todo.title,todo.completed)
        });           
    }

    // Add new task
    window.addTask = function () {
        if (inputBox.value === '') {
            alert("Empty Task");
        } else {
            addTaskToDOM(inputBox.value, false);
            inputBox.value = '';
            saveData();
        }
    };

    // Add task to the DOM
    function addTaskToDOM(task, completed) {
        let li = document.createElement("li");
        li.innerHTML = task;
        if (completed) {
            li.classList.add("checked");
        }
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }

    // Handle task click events
    listContainer.addEventListener("click", function (e) {
        if (e.target.tagName === "LI") {
            e.target.classList.toggle("checked");
            saveData();
        } else if (e.target.tagName === "SPAN") {
            e.target.parentElement.remove();
            saveData();
        }
    }, false);

    // Save data to local storage
    function saveData() {
        localStorage.setItem("data", listContainer.innerHTML);
    }

    // Show tasks from local storage
    function showTask() {
        listContainer.innerHTML = localStorage.getItem("data");
    }

    window.resetList = function() {
        fetchTodos();
        saveData(); // Optionally save the state if needed
    }

    window.removeAllTasks = function() {
        listContainer.innerHTML = ''; // Clear the list
        localStorage.removeItem('data'); // Clear local storage
    }

    window.removeDone = function(){
        const done = document.getElementsByClassName('checked');
        while (done.length > 0) {
            done[0].remove(); // Remove the first element in the list
        }
        saveData();
    }

    showTask();
});
