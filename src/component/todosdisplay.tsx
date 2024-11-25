import { useSearchParams } from 'react-router-dom';
import { useTodos } from '../store/todos';


const Todosdisplay = () => {
    const {todos, toggleTodoAsCompleted, handleDelete} = useTodos();
    const [searchParams] =useSearchParams(); 
    //the below "todo" is from navbar item to="/?todo"
    const todosData = searchParams.get("todo")
    //shortcut to print the auto console 
    console.log("🚀 ~ Todosdisplay ~ todosData:", todosData)


    let filterData = todos;
    if(todosData === "active"){
        filterData =filterData.filter((task) => !task.completed)
    }
    if(todosData === "complete"){
        filterData =filterData.filter((task)=> task.completed)
    }
  return (
   <ul className='main-task'>
        {
            filterData.map((todo) =>{
                return <li key={todo.id}>
                    <input type="checkbox"  id={`todo-${todo.id}`} checked={todo.completed} onChange={()=>toggleTodoAsCompleted(todo.id)} placeholder='task'/>
                    <label htmlFor="{`todo-${todo.id}`}"> {todo.task}</label>

                    {
                        todo.completed  && (
                            <button type="button" onClick={()=> handleDelete(todo.id)}>Delete</button>
                        )
                    }
                </li>

            })
        }
   </ul>
  )
}

export default Todosdisplay
