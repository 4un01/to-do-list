import {useState} from 'react';
import styles from './Tasks.module.css';
import deleteIcon from './assets/deleteIcon.svg'

function TaskBoxes({taskArr}){
    return taskArr.map((task, index) => (
        <div key={index} className={styles.tasks}>
            <input type="checkbox" className={styles.checkbox}/>
            <span className={styles.taskValue}>{task}</span>
            <img src={deleteIcon} alt="Delete Icon" className={styles.deleteIcon}/>
        </div>
    ));
}

function Tasks(){
    const [taskInp, setTaskInp] = useState('');
    const [tasks, setTasks] = useState([]);
    
    const handleClick = () => {
        setTasks((prev) => [...prev, taskInp])
    }

    return(
        <div>
            <h1 className={styles.title}>TODO APP</h1>
            <button className={styles.logoutBtn}>Log out</button>

            <div className={styles.container}>
                <input type="text" placeholder="Write anything and hit enter to add" className={styles.taskInp} onChange={({target}) => setTaskInp(target.value)} value={taskInp}/>
                <button className={styles.addBtn} onClick={handleClick}>ADD</button>
            </div>

            <TaskBoxes taskArr={tasks}/>
        </div>
    );
};

export default Tasks;