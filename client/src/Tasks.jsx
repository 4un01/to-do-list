import {useState} from 'react';
import styles from './Tasks.module.css';

/* function TaskBox({task}){
    return(
        <div>
            <input type="checkbox"/>
            <span>{task}</span>
        </div>
    );
} */

function Tasks(){
    const [taskInp, setTaskInp] = useState('');
    const [tasks, setTasks] = useState([]);
    
    const handleClick = () => {
        setTasks((prev) => {
            [...prev, taskInp];
        })
    }

    return(
        <div>
            <h1 className={styles.title}>TODO APP</h1>
            <button className={styles.logoutBtn}>Log out</button>

            <div className={styles.container}>
                <input type="text" placeholder="Write anything and hit enter to add" className={styles.taskInp} onChange={({target}) => setTaskInp(target.value)} value={taskInp}/>
                <button className={styles.addBtn} onClick={handleClick}>ADD</button>
            </div>
        </div>
    );
};

export default Tasks;