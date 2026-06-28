let add = document.getElementById('add');
const email = localStorage.getItem('email');

function loggedIn(){
    if(!email){
        window.location.href = '/';
    };
}

async function getTasks(){
    if(loggedIn()){
        try{
            const response = await fetch(`/tasks/:${email}`);
            if(response.ok){
                const taskList = await response.json();
                await displayTask(taskList);
            }
        }catch(e){
            console.log(e);
        }
    }else{
        return;
    }
}

function displayTask(taskList){
    taskList.forEach(taskItem => {
        let task = document.createElement('div');
        task.className = 'tasks';
        
        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'checkbox';

        let taskValue = document.createElement('span');
        taskValue.className = 'taskValue'
        taskValue.textContent = taskItem;

        let deleteIcon = document.createElement('img');
        deleteIcon.className = 'deleteIcon';
        deleteIcon.src = './images/deleteIcon.svg';

        checkbox.addEventListener('change', () => isChecked(checkbox, taskValue));
        deleteIcon.addEventListener('click', () => deleteTask(task));

        document.body.appendChild(task);
        task.appendChild(checkbox);
        task.appendChild(taskValue);
        task.appendChild(deleteIcon);
    });
}

async function addTask(){
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

        await addTaskToDb(taskInput.value);

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

async function addTaskToDb(taskInput){

    const taskData = {
        email: email,
        task: taskInput,
    }
    try{
        const response = await fetch('/tasks/save', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(taskData)
        });
        if(response.ok){
            const responseText = await response.text();
            console.log(responseText);
        }else{
            throw new Error('Something went wrong')
        }
    }catch(e){
        console.log(e);
    }
}

loggedIn();
add.addEventListener('click', addTask);