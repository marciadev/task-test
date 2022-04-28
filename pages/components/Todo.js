import { useState } from 'react'
import CheckCicleIcon from '@mui/icons-material/CheckCircle'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import style from '../../styles/index.module.css'


export default function Todo ({todo, toggleComplete, handleDelete, handleEdit}){

    const [newTask, setNewTask] = useState(todo.task)

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
        <div>
            <input
                className={style.input}
                  type="text"
                  value={todo.task === '' ? newTask : todo.task}
                  onChange={handleChange}
                />
                <div>
                <button onClick={()=>toggleComplete(todo)}><CheckCicleIcon id="i" /></button>
                <button onClick={()=>handleEdit(todo, newTask)}><EditIcon id="i" /></button>
                <button onClick={() => {handleDelete(todo.id)}}><DeleteIcon id="i" /></button>
                </div>
        </div>
    )
}