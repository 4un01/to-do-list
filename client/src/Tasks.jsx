import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom'
import styles from './Tasks.module.css';
import deleteIcon from './assets/deleteIcon.svg'

function TaskBoxes({taskArr, onDelete, onCheck}){
    return taskArr.map((task, index) => (
        <div key={task.taskId} className={styles.tasks}>
            <input type="checkbox" className={styles.checkbox} onChange={() => onCheck(task.taskId, !task.isChecked)} checked={task.isChecked}/>
            <span className={!task.isChecked ? styles.taskValue : styles.taskValueCompleted}>{task.task}</span>
            <img src={deleteIcon} alt="Delete Icon" className={styles.deleteIcon} onClick={() => onDelete(task.taskId)}/>
        </div>
    ));
}

function Tasks(){
    const [taskInp, setTaskInp] = useState('');
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function getData(){
            try{
                const response = await fetch(`/api/tasks/getTasks`);

                if(!response.ok){
                    if(response.status === 401){
                        navigate('/') 
                        return;
                    };
                    const resErr = await response.json();
                    alert(resErr);
                    return;
                }

                const resJson = await response.json();
                setTasks(resJson);
                return;
            }catch(e){
                console.log(e.message)
            }
        }

        getData();
    }, []);
    
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
            setTasks((prev) => [...prev, {task: taskInp, taskId: taskId, isChecked: false}]);
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

    async function handleCheck(taskId, newVal){
        try{
            const response = await fetch('/api/tasks/checked', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({taskCompleted: newVal, taskId: taskId})
            });

            if(!response.ok){
                const resErr = await response.json();
                alert(resErr.message);
                return;
            }

            setTasks((prev) =>
                prev.map((t) => (t.taskId === taskId ? {...t, isChecked: newVal} : t))
            );

        }catch(e){
            console.log(e.message);
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

            <TaskBoxes taskArr={tasks} onDelete={handleDelete} onCheck={handleCheck}/>
        </div>
    );
};

export default Tasks;