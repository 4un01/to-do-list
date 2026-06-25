let add = document.getElementById('add');

function addOrRemoveTask(){
    let taskInput = document.getElementById('taskInput');
    if(taskInput.value === ''){
        taskInput.placeholder = 'You must input a task';
        taskInput.classList.add('error');
        return;
    }
    else{
        taskInput.placeholder = 'Write anything and hit enter to add';
        taskInput.classList.remove('error');

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

        checkbox.addEventListener('change', () => {
            if(checkbox.checked){
            taskValue.style.textDecoration = 'line-through'; 
            taskValue.style.color = '#696969';
            taskValue.style.opacity = 0.9; 
            }
            else{
                taskValue.style.textDecoration = 'none';
                taskValue.style.color = 'white';
            }
        });

        document.body.appendChild(task);
        task.appendChild(checkbox);
        task.appendChild(taskValue);
        task.appendChild(deleteIcon);

        deleteIcon.addEventListener('click', () => {
            document.body.removeChild(task);
        });

        taskInput.value = '';
    }
    
};

add.addEventListener('click', addOrRemoveTask);