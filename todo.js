let todolist = JSON.parse(localStorage.getItem('todolist')) || [];

displayTodo();

const addBtn = document.getElementById('jsBtn');
addBtn.addEventListener('click', (event) => {
    addTask(event);
});

//Function to display Todo
function displayTodo() {
    let todolistHTML = '';

    todolist.forEach((todolistObject, i) => {
        const name = todolistObject.name;
        const dueDate = todolistObject.dueDate;
        const isCompleted = todolistObject.isCompleted;

        const completedClass = isCompleted ? 'strikethrough' : '';
        const html = `
        <div class="tasks-display-container">

        <div class="task-container" id="task-container-${i}">
        <input class="checkbox ${isCompleted ? 'checked' : ''}" id="checkbox-${i}" type="checkbox"
          ${isCompleted ? 'checked' : ''}></input>
        <div class="task-name ${completedClass}" id="task-name-${i}">${name}</div>
        </div>

        <div class=" date-class ${completedClass}">${dueDate}</div>
        <button class="status-button">${isCompleted ? 'Done' : 'Todo'} </button>
        <button class="delete-button" id="deleteBtn-${i}">Delete</button>
       
        </div>`

        todolistHTML += html;
    });
    document.getElementById("tasksDisplay").innerHTML = todolistHTML;

    // Function to attach event listeners for each checkbox
    todolist.forEach((_, i) => {
        const checkboxTick = document.getElementById(`checkbox-${i}`);
        if (checkboxTick) {
            checkboxTick.addEventListener('change', () => {
                markAsCompleted(i, checkboxTick);
            });
        }
        
        // Function to add event listeners for delete button
        const deleteBtn = document.getElementById(`deleteBtn-${i}`);
        if (deleteBtn) {
            deleteBtn.addEventListener('click', () => {
                deleteTask(i); 
                updateTaskCount();
            });
        }
    });

    updateTaskCount();
}


//Function to update Task count
function updateTaskCount() {
    const pendingTaskNum = todolist.filter((todolistObject) => {
        return todolistObject.isCompleted == false;
    }).length;
    document.getElementById("taskCount").innerHTML = `Tasks left : ${pendingTaskNum}`;
}

//Function to delete tasks
function deleteTask(i) {
    todolist.splice(i, 1);
    localStorage.setItem('todolist', JSON.stringify(todolist));
    displayTodo();
}

//Function to mark as completed
function markAsCompleted(i, checkbox) {
    todolist[i].isCompleted = checkbox.checked;
    localStorage.setItem('todolist', JSON.stringify(todolist));
    displayTodo();
}

//Function to add task
function addTask(event) {
    event.preventDefault();

    const inputElement = document.getElementById("todoInput");
    const dateElement = document.getElementById("dateInput");
    const name = inputElement.value;
    const dueDate = dateElement.value;

    if(name === '') return;

    const isCompleted = false;

    todolist.push({name, dueDate, isCompleted});

    localStorage.setItem('todolist', JSON.stringify(todolist));

    inputElement.value = "";
    dateElement.value = "";

    displayTodo();
}
