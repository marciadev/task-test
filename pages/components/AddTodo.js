import { useState } from 'react'
import { db } from '../firebase'
import { collection, addDoc } from 'firebase/firestore'
import style from '../../styles/index.module.css'
import styles from '../../styles/main.module.css'

export default function AddTodo(){
    const [task, setTask] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(task != "") {
          await addDoc(collection(db, "todos"), {
            task,
            completed: false
          });
          setTask("");
        }
      };

    return (
        <div className={styles.form}>
            <form onSubmit={handleSubmit}>
              <div>
              <input
                className={styles.input_container}
              type="text"
              value={task}
              placeholder="New Todo"
              onChange={(e)=> setTask(e.target.value)}
            />
            <button className={style.btn}>ADD</button>
              </div>
          </form>
        </div>
    )
}