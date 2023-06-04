import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid d-flex justify-content-around">
        <Link className="navbar-brand" to="home">
          Home
        </Link>
        <Link className="navbar-brand" to="home/game">
          Game
        </Link>
        <Link className="navbar-brand" to="home/about">
          About
        </Link>
      </div>
    </nav>
  );
}

export default Nav;
