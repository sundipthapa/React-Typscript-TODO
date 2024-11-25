import { FormEvent, useState } from "react";
import { useTodos } from "../store/todos";



const AddToDo = () => {
    const [todo, setData]=useState("")
    const {handleAddtodo} =useTodos();
  

    const handleSubmit =(e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        handleAddtodo(todo)
        setData("")

    }
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={todo} onChange={(e)=>setData(e.target.value)} title='text'/>
      <button type="submit">Add</button>
    </form>
  )
}

export default AddToDo
