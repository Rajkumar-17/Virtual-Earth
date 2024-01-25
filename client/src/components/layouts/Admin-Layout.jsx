import { NavLink, Navigate, Outlet } from "react-router-dom";
import { FaUser, FaRegListAlt, FaHome, FaUpload } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { useAuth } from "../../store/auth";


export const AdminLayout = () => {

    const { user, isLoading } = useAuth();
    // console.log("Admin Layout", user);

    if(isLoading){
        return <h1> Loading ...</h1>;
    }
    if(!user.isAdmin){
        return <Navigate to='/' />;
    }

  return (
    <>
        <header>
            <div className="container">
                <nav>
                    <ul>
                        <li>
                            <NavLink className="admin-navbar" to="/admin/users"><FaUser /> users</NavLink>
                        </li>
                        <li>
                            <NavLink className="admin-navbar" to="/admin/contacts"><FaMessage/> contacts</NavLink>
                        </li>
                        <li>
                        <NavLink className="admin-navbar" to="/admin/services"><FaRegListAlt/> services</NavLink>
                        </li>
                        <li>
                        <NavLink className="admin-navbar" to="/admin/uploads"><FaUpload/> Add New</NavLink>
                        </li>
                        <li>
                        <NavLink className="admin-navbar" to="/"><FaHome/> home</NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
        <Outlet />
    </>
  )
}
