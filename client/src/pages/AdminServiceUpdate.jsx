import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';

const URL = 'http://localhost:5000/api/admin/service';

export const AdminServiceUpdate = () => {

    const [data, setData] = useState({
        service: "",
        description: "",
        price: "",
        provider: "",
    });

    const params = useParams();
    // console.log("params single user: ", params);
    const { authorizationToken } = useAuth();

    const getSingleServiceData = async () => {
        try {
            const response = await fetch(`${URL}/edit/${params.id}`,
            {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                },
            })

            const data = await response.json();
            setData(data);
            
        } catch (error) {
            // next(error); 
            console.error("errp" , error); 
        }
    }

    useEffect(() => {
        getSingleServiceData();
    }, []);

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setData({
            ...data,
            [name]: value,
        });
    };

// update user dynamically
    const handleSubmit = async(e) =>{
        e.preventDefault();
        console.log(e);

        try {
            const response = await fetch(`${URL}/update/${params.id}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authorizationToken,
                },
                body: JSON.stringify(data),
            }
            );
            if(response.ok){
                toast.success("User Updated");
            }else{
                toast.error("user not updated");
            }

        } catch (error) {
            console.log(error);
            
        }
    }



    return (
        <form  className="service-form" onSubmit={handleSubmit}>
  
        <div className="form-group">
          <label htmlFor="service">Service:</label>
          <input
            type="text"
            value={data.service}
            id="service"
            name="service"
            onChange={handleInput}
            className="text-input"
        />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            type="text"
            value={data.description}
            id="description"
            name="description"
            onChange={handleInput}
            className="textarea-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="Number"
            name="price"
            value={data.price}
            id="price"
            onChange={handleInput}
            className="text-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="provider">Provider:</label>
          <input
            type="text"
            name="provider"
            value={data.provider}
            id="provider"
            onChange={handleInput}
            className="text-input"
          />
        </div>

          <div className="form-group">
          <label htmlFor="image">Image:
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleInput}
            className="file-input"
          />
          </label>

        <button type="submit" className="submit-btn">
          Upload
        </button>
        </div>
      </form>
    )
}
