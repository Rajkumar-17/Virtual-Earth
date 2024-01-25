import { useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

const URL = "http://localhost:5000/api/form/contact";

const defaultContactFormData = {
    username: "",
    email: "",
    message: "",
};

export const Contact = () => {

    const[contact, setContact] = useState(defaultContactFormData);

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setContact({
            ...contact,
            [name]: value,
        });
    }

    
    const [userData, setUserData ] = useState(true);
    
    const { user } = useAuth();
    if(userData && user){
        setContact({
            username: user.username,
            email: user.email,
            message: "",
        });
        
        setUserData(false);
    }
    
    // handle form getformSubmission Info
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response =await fetch(URL,{
               method: "POST",
               headers:{
                "Content-Type": "application/json"
               },
               body: JSON.stringify(contact),
            });
            const res_data = await response.json();

            if(response.ok){
                setContact(defaultContactFormData);
                toast.success("Message send successfuly");
            }else {
                toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
            }
        } catch (error) {
            toast.error("Message Not Delivered", error);
        }
    }

    return <>
    <section className="section-contact">
        <div className="contact-content container">
            <h1 className="main-heading"> Contact Us</h1>
            </div>
            {/* conatct main page */}
            <div className="container grid grid-two-cols">
                <div className="contact-img">
                    <img src="/images/contact2.svg" alt="conatct" />
                </div>

                {/* contact content actual */}
                <section className="section-form">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="username">username</label>
                            <input type="text" value={contact.username} onChange={handleInput} name="username" id="username" autoComplete="off" required />

                            <label htmlFor="email">email</label>
                            <input type="email" value={contact.email} onChange={handleInput} name="email" id="email" autoComplete="off" required />

                            <div>
                                <label htmlFor="message">message</label>
                                <textarea value={contact.message} onChange={handleInput} name="message" id="message" cols="30" rows="10" />
                            </div>

                            <div>
                                <button type="submit">Submit</button>
                            </div>

                        </div>
                    </form>
                </section>

            </div>
        </section>
    </>
}