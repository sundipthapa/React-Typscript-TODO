import { createContext, ReactNode, useContext, useState } from "react";

//Step 1: Creating the context to store the data

//futher declaring the type of todos
export type Todo ={
    id: string;
    task: string;
    completed: boolean;
    createdAt: Date;
}
//declaring the type of todosContext
export type TodosContext ={
    todos:Todo [];
    handleAddtodo:(task: string )=>void;
    toggleTodoAsCompleted: (id:string) =>void;
    handleDelete: (id:string) =>void;
}
export const todosContext = createContext<TodosContext | null>(null)


//Step 2: Creating the provider 
//declaring the type of children : props of todosprovider
export type TodosProviderProps ={
    children: ReactNode
}
export const TodosProvider = ({children}: TodosProviderProps) =>{

    // const [todos, setTodos]= useState<Todo[]>([])

    const [todos, setTodos]= useState<Todo[]>(()=>{
        try {
            const newTodos = localStorage.getItem("todos") || "[]";
            return JSON.parse(newTodos) as Todo[];
        } catch (error) {
            console.log(error)
            return []
        }
    })
    const handleAddtodo= (task: string)=>{
        setTodos((prev)=>{
            const newTodos: Todo[]= [
                {
                    id: Math.random().toString(),
                    task: task,
                    completed: false,
                    createdAt: new Date()

                }, ...prev
            ]
            // console.log("previous data: " + prev)
            // console.log(newTodos)
            localStorage.setItem("todos", JSON.stringify(newTodos))
            return newTodos
        })

    }

    //toggle function 
    const toggleTodoAsCompleted = (id: string )=>{
        setTodos((prev)=>{
            const newTodos = prev.map((todos)=>{
                if(todos.id === id){
                    return {
                        ...todos, completed:!todos.completed
                    }
                }
                return todos;
            })
            localStorage.setItem("todos", JSON.stringify(newTodos))
            return newTodos;

        })
    }

    //handle delte function
    const  handleDelete =(id: string)=>{
        setTodos((prev)=>{
            const newTodos = prev.filter((filterData)=>filterData.id !== id );
            localStorage.setItem("todos", JSON.stringify(newTodos))
            return newTodos;
        })
    }
    return <todosContext.Provider value={{todos, handleAddtodo, toggleTodoAsCompleted, handleDelete}}>
        {children}
    </todosContext.Provider>
}

//Step 3: Creating consumer: useContext

export const useTodos =()=>{
    const todosConsumer = useContext(todosContext);
    if(!todosConsumer){
        throw new Error ("useTodos is used outside of Provider")
    }
    return todosConsumer;
}