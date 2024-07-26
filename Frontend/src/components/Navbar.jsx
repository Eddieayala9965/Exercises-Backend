import { Link } from "react-router-dom";

const Navbar = () => (
  <nav>
    <ul>
      <li>
        <Link to="/home">Home</Link>
      </li>
      <li>
        <Link to="/create_task">Create a Task</Link>
      </li>
    </ul>
  </nav>
);

export default Navbar;
