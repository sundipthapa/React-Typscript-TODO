import { Link, useSearchParams } from 'react-router-dom';
const Navbar = () => {
  const [searchParams] = useSearchParams();
  const todosData = searchParams.get("todo");
  return (
    <nav>
        <Link to="/" className={todosData ===null ? "active" : ""}>All </Link>
        <Link to="/?todo=active" className={todosData === "active" ? "active" : ""}>Active </Link>
        <Link to="/?todo=complete" className={todosData =="complete" ? "active" : ""}>Completed </Link>
    </nav>
  )
}

export default Navbar
