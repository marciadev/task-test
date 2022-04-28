import { useState } from 'react'
import CheckCicleIcon from '@mui/icons-material/CheckCircle'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import styles from '.././styles/main.module.css'


export default function Todo ({todo, toggleComplete, handleDelete, handleEdit, todos, setTodos}){

    const [newTask, setNewTask] = useState(todo.task)
    const [todoEditing, setTodoEditing] = useState(false);

    const handleChange = (e) => {
        e.preventDefault();
        if(todo.complete === true){
          setNewTask(todo.task)
        } else {
          todo.task = ""
          setNewTask(e.target.value)
        }
      };
    return (
        <div className={styles.todo}>
            <input
                  style={{textDecoration: todo.completed && "line-through"}}
                  className={styles.list}
                  type="text"
                  value={todo.task === '' ? newTask : todo.task}
                  onChange={handleChange}
                />
                <div>
                <button onClick={()=>toggleComplete(todo)}><CheckCicleIcon id="i" /></button>
                {todoEditing ? (<button onClick={() =>{handleEdit(todo, newTask), setTodoEditing(false)}} className={styles.btn_save}>SAVE</button>) : (<button onClick={() => {setTodoEditing(true)}}><EditIcon id="i" /></button>)}
                <button onClick={() =>handleDelete(todo.id)}><DeleteIcon id="i" /></button>
                </div>
        </div>
    )
}