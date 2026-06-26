let add = document.getElementById('add');

function loggedIn(){
    const email = localStorage.getItem('email');
    if(!email){
        window.location.href = '/';
    };
}

function addTask(){
    let taskInput = document.getElementById('taskInput');

    if(isInputEmpty()){
        let task = document.createElement('div');
        task.className = 'tasks';
        
        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'checkbox';

        let taskValue = document.createElement('span');
        taskValue.className = 'taskValue'
        taskValue.textContent = taskInput.value;

        let deleteIcon = document.createElement('img');
        deleteIcon.className = 'deleteIcon';
        deleteIcon.src = './images/deleteIcon.svg';

        checkbox.addEventListener('change', () => isChecked(checkbox, taskValue));
        deleteIcon.addEventListener('click', () => deleteTask(task));

        document.body.appendChild(task);
        task.appendChild(checkbox);
        task.appendChild(taskValue);
        task.appendChild(deleteIcon);

        taskInput.value = '';

    }else{
        return;
    }
}

function isInputEmpty(){
    let taskInput = document.getElementById('taskInput');
    if(taskInput.value === ''){
        taskInput.placeholder = 'You must input a task';
        taskInput.classList.add('error');
        return false;
    }else{
        return true;
    }
}

function isChecked(checkbox, taskValue){
    if(checkbox.checked){
        taskValue.style.textDecoration = 'line-through'; 
        taskValue.style.color = '#696969';
        taskValue.style.opacity = 0.9; 
    }else{
            taskValue.style.textDecoration = 'none';
            taskValue.style.color = 'white';
    }
}

function deleteTask(task){
    document.body.removeChild(task);
}

loggedIn();
add.addEventListener('click', addTask);