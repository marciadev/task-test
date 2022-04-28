import { useState, useEffect } from 'react'
import styles from '../styles/main.module.css'
import style from '../styles/index.module.css'
import { db } from '.././firebase.js'
import { collection, query, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import AddTodo from '../components/AddTodo'
import Todo from '../components/Todo'

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

  const handleEdit = async (todo, newTask) => {
    console.log(newTask)
    await updateDoc(doc(db, "todos", todo.id), { task: newTask });
  };

  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), {
      completed: !todo.completed
    })
  }

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "todos", id))
  }
  

  return (
    <div className={styles.container}>
      <nav className={style.navbar}><h1 className={style.title}>TODO LIST</h1></nav>
      <main className={styles.main}>
        <div className={styles.container}>
          <h3 className={styles.container}>TODO LIST</h3>
          <div>
          <AddTodo/>
          </div>
          <div className={styles.todo_container}>
            {todos.map((todo)=> (
              <Todo 
                key={todo.id}
                todo={todo}
                toggleComplete={toggleComplete}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                todos={todos}
                setTodos={setTodos}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}