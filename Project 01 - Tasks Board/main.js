load();

// onload function to present the tasks that was saved in the localStorage before on the Screen and they have a valid date in the future
// 1: gets the key "tasks" from the localStorage (JSON format)
// 2: convert string (if it is not empty) to a valid JSON object (array object in our case )
// 3: filter the array and remove the tasks that expired
// 4: update localStorage to have only the valid tasks 
// 5: sends the updated array to viewOnScreen() function to complete the other work 
function load() {
    let tasks = localStorage.getItem("tasks");
    if (tasks) {
        let jsonTasks = JSON.parse(tasks);
        let updatedTasks = jsonTasks.filter((x) => !dateAndTimeIsGone(x.date, x.time));
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        viewOnScreen(updatedTasks);
    }
}

function dateAndTimeIsGone(date, time) {
    let currentDate = new Date();
    let day = currentDate.getDate();
    let month = currentDate.getMonth() + 1;
    month = (month < 10) ? `0${month}` : `${month}`;
    day = (day < 10) ? `0${day}` : `${day}`;
    let stringDate = `${currentDate.getFullYear()}-${month}-${day}`;
    if (stringDate.localeCompare(date) < 0) {
        return false;
    }
    else if (stringDate.localeCompare(date) === 0) {
        let stringTime = `${currentDate.getHours()}:${currentDate.getMinutes()}`;
        if (stringTime.localeCompare(time) < 0) {
            return false;
        }
    }
    return true;
}

// this function created a comfortable HTML tags to present the notes
// tasksArray is an array like this: [{task1 dictionary}, {task2}, {task3}, ...] and so on
// hence that the time property is not required so I put an empty HTML line in case the time not given, 
// I do this to make all the notes to be in the same level, otherwise some of them will not be presented properly
// and after that we put the HTML code generated in the HTML document
function viewOnScreen(tasksArray) {
    const listOnHTMLPage = document.getElementById("tasks-list");
    let list = ``;
    for (const task of tasksArray) {
        if (task.time === "") {
            task.time = "<br>";
        }
        let listItem = `<li id="${task.id}2">
                <div class="task-area">
                    <button class="close-icon fa fa-trash" id="${task.id}" onclick="(deleteTask(this.id))"></button>
                    <div class="task-inside-details">${task.details}</div>
                    <div class="task-inside-date-time">
                        <p>${task.date}</p>
                        <p>${task.time}</p>
                    </div>
                </div>
            </li>`
        list += listItem;
    }
    listOnHTMLPage.innerHTML = list;
}

// a function to check validations of the form:
// 1: task details and time are required, time isn't 
// 2: the task time must be in the future (the date and time)
function validate() {
    const form = document.getElementById("myForm");
    let date = new Date();
    if (form.taskDetails.value === "") {
        alert("You must add some details to the task");
        return;
    }
    if (form.taskDate.value === "") {
        alert("You must add a valid Date");
        return;
    }
    if (validateDate(form, date) === -1) {
        alert("This date we've passed alive (Thanks to GOD), \nEnter a valid 'Date' on the future");
        return;
    }
    if (validateDate(form, date) == 0) {
        if (form.taskTime.value !== "") {
            if (validateTime(form, date) <= 0) {
                alert("Enter a valid time, \nand be careful to the 'Time' you added");
                return;
            }
        }
    }
    addTaskToDo();
    // clearForm();
}

// I don't know why this doesn't work :( , I checked it in W3Schools, StackOverFlow, and other websites and it should work IDK..
function clearForm() {
    document.getElementById("myForm").reset();
}


// date validate function, check the date that is properly,
// getMonth() and getDate() functions returns a number so it can be one digit, 
// hence we compare strings so I added zero to be complete date format and give an accurate result after comparison
function validateDate(form, date) {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    month = (month < 10) ? `0${month}` : `${month}`;
    day = (day < 10) ? `0${day}` : `${day}`;
    let stringDate = `${date.getFullYear()}-${month}-${day}`;
    return (form.taskDate.value).localeCompare(stringDate);
}

// time validate function, in case the date given to the task is today we check that the time is in the future
function validateTime(form, date) {
    let stringTime = `${date.getHours()}:${date.getMinutes()}`;
    return (form.taskTime.value).localeCompare(stringTime);
}


// the main function of the website:
// 1: this function adds new task
// 2: updates the localStorage and saves the new task there for the next sessions
function addTaskToDo() {
    const myForm = document.getElementById("myForm");
    let tasks = localStorage.getItem("tasks");
    if (tasks === null || tasks === undefined) {
        tasks = "[]";
    }
    let jsonTasks = JSON.parse(tasks); // [{task1}, {task2}, ...]
    let newTask = {
        "id": new Date(),
        "details": myForm.taskDetails.value,
        "date": myForm.taskDate.value,
        "time": myForm.taskTime.value
    }
    jsonTasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(jsonTasks));
    // viewOnScreen(jsonTasks);
    addOneTask(newTask);
}


// this function adds one task, its very similarly to the viewOnScreen() function except a small/minor details..
function addOneTask(task) {
    let tasksElement = document.getElementById("tasks-list");
    if (task.time === "") {
        task.time = "<br>";
    }
    tasksElement.innerHTML += `<li id="${task.id}2">
                <div class="task-area">
                    <button class="close-icon fa fa-trash" id="${task.id}" onclick="(deleteTask(this.id))"></button>
                    <div class="task-inside-details">${task.details}</div>
                    <div class="task-inside-date-time">
                        <p>${task.date}</p>
                        <p>${task.time}</p>
                    </div>
                </div>
            </li>`
}


// deleteTask() functions:
// @param: id --> id of specific task to remove from the localStorage and our board
// we change the animation of the task on the board and remove it after 0.5 second
function deleteTask(id) {
    let element = document.getElementById(`${id}2`);
    let tasks = localStorage.getItem("tasks");
    let jsonTasks = JSON.parse(tasks);
    let updatedTasks = [];
    for (const task of jsonTasks) {
        if (task.id !== id) {
            updatedTasks.push(task);
        }
    }
    element.style.animation = "fadeOut 1s";
    setTimeout(() => element.remove(), 1000);
    if (updatedTasks.length !== 0) {
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
    else localStorage.removeItem("tasks");
}



// Add/remove/view tasks Algorithms:

// a. Add task:
//      1. get value (localStorage)
//      2. parse string to JSON array
//      3. push new task to array, each task format:
//         {
//             id: (full date when the task added),
//             details: task details,
//            date: valid date (legal, not empty date, future date, format yyyy-mm-dd )
//             time: empty string or a time (format hh:mm)
//         }
//      4: stringify array (valid JSON)
//      5: set the localStorage "notes" value to stringified array

// b. Remove task:
// to be continue and uploaded to GitHub :) ...