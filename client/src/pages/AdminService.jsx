import { Link } from "react-router-dom";
import { useAuth } from "../store/auth"
import { useEffect, useState } from "react";

const URL = "http://localhost:5000/api/admin/services";

export const AdminService = () => {
    const[services, setServices] = useState([]);
    const { authorizationToken } = useAuth();

    const getAllServiceData = async() => {
        try {
            const response = await fetch(URL,{
                method: "GET",
                headers:{
                    Authorization: authorizationToken,
                },
            });
            
            const data = await response.json();
            setServices(data);
        } catch(error) {
            next(error);
        }
    }

    // Delete the Services on click
    const deleteService = async (id)=> {
        try{
        const response = await fetch(`${URL}/delete/${id}`,{
          method: "DELETE",
          headers:{
            Authorization: authorizationToken,
          },
        });
      
        const data = await response.json();
      
        if(response.ok){
          getAllServiceData();
        }
      
        }catch(error){
          console.log(error)
        }
      };
      

    useEffect(()=> {
        getAllServiceData();
    }, []);

    return (
        <>
        <section className="section-services">
            <div className="container">
                <h1 className="main-heading"> Services </h1>
            </div>

            <div className="container admin-users">
                    <table>
                        <thead>
                            <tr>
                                <th>Service</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Product</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(services) && services.length > 0 ? (
                                services.map((curSer, index) => (
                                    <tr key={index}>
                                        <td>{curSer.service}</td>
                                        <td>{curSer.description}</td>
                                        <td>{curSer.price}</td>
                                        <td>{curSer.provider}</td>
                                        <td>
                                            <button className="delete-btn" onClick={() => deleteService(curSer._id)}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5">No services available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    );

}