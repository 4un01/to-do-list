import {useState} from 'react';
import styles from './Tasks.module.css';

function Tasks(){
    return(
        <div>
            <h1 className={styles.title}>TODO APP</h1>
            <button className={styles.logoutBtn}>Log out</button>

            <div className={styles.container}>
                <input type="text" placeholder="Write anything and hit enter to add" className={styles.taskInp}/>
                <button className={styles.addBtn}>ADD</button>
            </div>
        </div>
    );
};

export default Tasks;