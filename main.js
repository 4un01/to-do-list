let add = document.getElementById('add');

function addOrRemoveTask(){
    let taskInput = document.getElementById('taskInput').value;
    
    let task = document.createElement('div');
    task.className = 'tasks';
    
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'checkbox';

    let taskValue = document.createElement('span');
    taskValue.className = 'taskValue'
    taskValue.textContent = taskInput;

    let deleteIcon = document.createElement('img');
    deleteIcon.className = 'deleteIcon';
    deleteIcon.src = './images/deleteIcon.svg';

    document.body.appendChild(task);
    task.appendChild(checkbox);
    task.appendChild(taskValue);
    task.appendChild(deleteIcon);

    deleteIcon.addEventListener('click', () => {
        document.body.removeChild(task);
    });
};

add.addEventListener('click', addOrRemoveTask);