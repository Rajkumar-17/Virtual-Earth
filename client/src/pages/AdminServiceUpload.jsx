import { useState } from 'react';
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';
import { AdminLayout } from '../components/layouts/Admin-Layout';

const URL = "http://localhost:5000/api/data/service";
export const AdminServiceUploade = () => {

  const [servicedata, setServiceData] = useState({
    service: "",
    description: "",
    price: "",
    provider: "",
});

  const { authorizationToken } = useAuth();


// handling the input
const handleInput = (e) => {
  let name = e.target.name;
  let value = e.target.value;

  setServiceData({
      ...servicedata,
      [name]: value,
  });
};

  // update user dynamically
  const handleSubmit = async(e) =>{
    e.preventDefault();

    try {
        const response = await fetch(URL,
        {
            method: "POST",
            headers: {
              Authorization: authorizationToken,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(servicedata),
        }
        );
        const res_data = await response.json();

        if(response.ok){
          setServiceData({service: "",
          description: "",
          price: "",
          provider: ""})
          toast.success("Service Updated");
        }else{
          toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
        }
        
      } catch (error) {
        toast.error("Uploading error" , error);
        
    }
};
  
    return (
      <>
      <AdminLayout />
      <div className="admin-panel">
        <h1 color="#dfdfdf">Admin Panel</h1>
        <form  className="service-form" onSubmit={handleSubmit}>
  
          <div className="form-group">
            <label htmlFor="service">Service:</label>
            <input
              type="text"
              value={servicedata.service}
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
              value={servicedata.description}
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
              value={servicedata.price}
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
              value={servicedata.provider}
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
      </div>
    </>
    );
};
