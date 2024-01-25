import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../store/auth";

export const Navbar = () => {
    const { isLoggedIn } = useAuth();
    return <>
        <header>
            <div className="container">
                <div className="logo-brand">
                    <NavLink to="/" className="logo">
                        <img src="https://www.svgrepo.com/show/470680/robot-face.svg" alt="logo" height="50px" width="50px"/>
                        <span>Virtual Earth</span></NavLink>
                </div>
                <nav>
                    <ul>
                        <li>
                            <NavLink to="/"> Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/about"> About</NavLink>
                        </li>
                        <li>
                            <NavLink to="/contact"> Contact</NavLink>
                        </li>
                        <li>
                            <NavLink to="/service"> Service</NavLink>
                        </li>

                        { isLoggedIn ?
                            <li>
                                <NavLink to="/logout"> Logout </NavLink>
                            </li>
                        : <>
                            <li>
                                <NavLink to="/register"> Register</NavLink>
                            </li>
                            <li>
                                <NavLink to="/Login"> Login</NavLink>
                            </li>
                        </> }

                    </ul>
                </nav>
            </div>
        </header>
    </>
}