import "./NavBar.css";
import { Link } from "react-router-dom";
import logo from './data/logo.png'
export default function NavBar() {
  return (
    <div className="navbar">
      <img className="logo" src={logo} />
      <div className="options">
        <Link to={"/"}>Home</Link>
        <Link to={"/aopd"}>AOPD</Link>
        <Link to={"/recipies"}>Recipies</Link>
        <Link to={"/iss"}>ISS</Link>
        <Link to={"/trans"}>Translation</Link>
      </div>
    </div>
  );
}
