import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';

const URL = 'http://localhost:5000/api/admin/users';

export const AdminUpdate = () => {

    const [data, setData] = useState({
        username: "",
        email: "",
        phone: "",
    });

    const params = useParams();
    const { authorizationToken } = useAuth();

    const getSingleUserData = async () => {
        try {
            const response = await fetch(`${URL}/${params.id}`,
            {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                },
            })

            const data = await response.json();
            setData(data);
            
        } catch (error) {
            next(error);
        }
    }

    useEffect(() => {
        getSingleUserData();
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
        <section className='section-contact'>
            <div className='contact-content container'>
                <h1 className='main-heading'>Update User Data</h1>
            </div>

            <div className='container grid grid-two-cols'>
                <section className='section-form'>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="username">username</label>
                            <input type="text" name="username" id="username" autoComplete='off' value={data.username} onChange={handleInput} required/>
                        </div>
                        <div>
                            <label htmlFor="email">email</label>
                            <input type="email" name="email" id="email" autoComplete='off' value={data.email} onChange={handleInput} required/>
                        </div>
                        <div>
                            <label htmlFor="phone">phone</label>
                            <input type="number" name="phone" id="phone" autoComplete='off' value={data.phone} onChange={handleInput} required/>
                        </div>
                        <div className='btn-two grid'>
                        <button type="submit" className="btn">
                            Update
                        </button>
                        <button type="submit"  className="edit-btn">
                        <Link className='edit' to = '/admin/users'> Admin Panel </Link>
                        </button>
                        </div>
                    </form>
                </section>
            </div>
        </section>
    )
}
