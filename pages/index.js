import { useState, useEffect } from 'react'
import styles from '../styles/main.module.css'
import style from '../styles/index.module.css'
import { db } from './firebase'
import { collection, query, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import AddTodo from './components/AddTodo'
import Todo from './components/Todo'

export default function Home() {

  const [todos, setTodos] = useState([]);

  useEffect(()=>{
    const q = query(collection(db, "todos"))
    const unsub = onSnapshot(q, (querySnapshot)=>{
      let todosArray =[]
      querySnapshot.forEach((doc)=>{
        todosArray.push({...doc.data(), id: doc.id})
      })
      setTodos(todosArray)
    })
    return ()=> unsub()
  }, [])

  const handleEdit = async(todo, task) =>{
    await updateDoc(doc(db, "todos", todo.id), {task: task})
  }

  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), {
      completed: !todo.completed
    })
  }

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "todos", id))
  }
  

  return (
    <div>
      <nav className={style.navbar}><h1 className={style.title}>TODO LIST</h1></nav>
      <main className={styles.main}>
        <div className={style.container}>
          <h3>TODO LIST</h3>
          <div>
          <AddTodo/>
          </div>
          <div>
            {todos.map((todo)=> (
              <Todo 
                key={todo.id}
                todo={todo}
                toggleComplete={toggleComplete}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}