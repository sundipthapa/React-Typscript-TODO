
import AddToDo from './component/addtodo'
import Navbar from './component/navbar'
import Todosdisplay from './component/todosdisplay'
import "./App.css"

const App = () => {
  return (
   <main>
    <h1> TODO APP REACT + TYPSCRIPT</h1>
    <Navbar />
    <AddToDo />
    <Todosdisplay />
   </main>
  )
}

export default App
