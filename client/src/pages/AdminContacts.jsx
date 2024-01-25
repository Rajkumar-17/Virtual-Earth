import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

const URL = "http://localhost:5000/api/admin/contacts";

export const AdminContacts = () => {
  const [contactData, setContactData] = useState([]);
  const { authorizationToken } = useAuth();

  const getContactsData = async () => {
    try {
      const response = await fetch(URL, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      
      const data = await response.json();
      setContactData(data);


    } catch (error) {
      next();
    }
  };

  const deleteContact = async (id) => {
    try {
      const response = await fetch(`${URL}/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (response.ok) {
        toast.error("Message Deleted")
      }

      const data = await response.json();
      getContactsData();

    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  useEffect(() => {
    getContactsData();
  }, []);

  return (
    <div className="admin-contacts-container">
      <h1>Contact Info</h1>
      <div className="admin-contacts-grid">
      {contactData.map((curContactData, index) => {
        const { username, email, message, _id } = curContactData;

        return (
          <div className="admin-contact-card" key={index}>
            <p>
              <strong>Username:</strong> {username}
            </p>
            <p>
              <strong>Email:</strong> {email}
            </p>
            <p>
              <strong>Message:</strong> {message}
            </p>
            <button className="delete-btn" onClick={() => deleteContact(_id)}>
              Delete
            </button>
          </div>
        );
      })}
      </div>
    </div>
  );
};
