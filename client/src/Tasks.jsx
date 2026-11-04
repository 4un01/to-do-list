import {useState} from 'react';
import styles from './Tasks.module.css';
import deleteIcon from './assets/deleteIcon.svg'

function TaskBoxes({taskArr, onDelete}){
    return taskArr.map((task, index) => (
        <div key={index} className={styles.tasks}>
            <input type="checkbox" className={styles.checkbox}/>
            <span className={styles.taskValue}>{task.task}</span>
            <img src={deleteIcon} alt="Delete Icon" className={styles.deleteIcon} onClick={() => onDelete(task.taskId)}/>
        </div>
    ));
}

function Tasks(){
    const [taskInp, setTaskInp] = useState('');
    const [tasks, setTasks] = useState([]);
    
    async function handleClick(){
        const taskData = {
            task: taskInp,
            isChecked: false
        }

        try{
            const response = await fetch('/api/tasks/add', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(taskData)
            });
            if(!response.ok){
                const resErrJson = await response.json();
                alert(resErrJson.message);
                return;
            }
            const {taskId} = await response.json();
            setTasks((prev) => [...prev, {task: taskInp, taskId: taskId}]);
            setTaskInp('');
        }catch(e){
            console.log(e.message);
            alert('Could not reach the server')
        }
    }

    async function handleDelete(taskId){
        try{
            const response = await fetch(`/api/tasks/${taskId}`, {method: 'DELETE'});

            if(!response.ok){
                const resErr = await response.json();
                alert(resErr.message);
                return;
            }
            setTasks((prev) => prev.filter((t) => t.taskId !== taskId));

        }catch(e){
            console.log(e);
        }
    }

    return(
        <div>
            <h1 className={styles.title}>TODO APP</h1>
            <button className={styles.logoutBtn}>Log out</button>

            <div className={styles.container}>
                <input type="text" placeholder="Write anything and hit enter to add" className={styles.taskInp} onChange={({target}) => setTaskInp(target.value)} value={taskInp}/>
                <button className={styles.addBtn} onClick={handleClick}>ADD</button>
            </div>

            <TaskBoxes taskArr={tasks} onDelete={handleDelete}/>
        </div>
    );
};

export default Tasks;