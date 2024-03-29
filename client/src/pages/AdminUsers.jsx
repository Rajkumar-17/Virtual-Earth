import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { Link } from 'react-router-dom';


const URL = "http://localhost:5000/api/admin/users";

export const AdminUsers = () => {
  const[users, setUsers] = useState([]);

  const { authorizationToken } = useAuth();

  const getAllUsersData = async() => {
    try {
      const response = await fetch(URL,{
        method: "GET",
        headers:{
          Authorization: authorizationToken,
        },
      });

      const data = await response.json();
      setUsers(data);

    } catch (error) {
      next(error)
    }

  }

// Delete the user on click
const deleteUser = async (id)=> {
  try{
  const response = await fetch(`${URL}/delete/${id}`,{
    method: "DELETE",
    headers:{
      Authorization: authorizationToken,
    },
  });

  const data = await response.json();
  console.log(`Users After delete ${data}`);

  if(response.ok){
    getAllUsersData();
  }

  }catch(error){
    console.log(error)
  }
};

  useEffect(()=> {
    getAllUsersData();
  }, []);


// Update the data of an User dynamicaly



  return(
  <>
  <section className="admin-users-section">
    <div className="container">
      <h1> Admin Users Data</h1>
    </div>
    <div className="container admin-users">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((curUser,index) => {
            return (
              <tr key={index}>
                <td>{curUser.username}</td>
                <td>{curUser.email}</td>
                <td>{curUser.phone}</td>
                <td>
                  <button className="edit-btn">
                  <Link className="edit" to={`/admin/users/edit/${curUser._id}`}> Edit </Link>
                  </button>
                </td>
                <td><button  className="delet-btn" onClick={() => deleteUser(curUser._id)}>Delete</button></td>
              </tr>
            )
          })}

        </tbody>
      </table>
    </div>
  </section>
  </>
  );
}
