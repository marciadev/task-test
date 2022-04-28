import { useState } from 'react'
import { db } from '../firebase'
import { collection, addDoc } from 'firebase/firestore'
import style from '../../styles/index.module.css'

export default function (){
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
        <div>
            <form onSubmit={handleSubmit} className={style.form}>
            <input
                className={style.input}
              type="text"
              value={task}
              placeholder="New Todo"
              onChange={(e)=> setTask(e.target.value)}
            />
            <button className={style.btn}>ADD</button>
          </form>
        </div>
    )
}