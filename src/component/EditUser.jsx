// EditUser.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditUser() {
    const { id } = useParams(); // Get the user ID from the URL
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    // Fetch the existing user data when the component loads
    useEffect(() => {
        axios.get(`api/user/${id}`)
            .then((response) => {
                setName(response.data.name);
                setEmail(response.data.email);

            })
            .catch((error) => {
                console.log(error)
            })
    }, [id]);

    // Handle form submission to update the user data
    const UpdateData = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                `api/edituser/${id}`,
                {name,email }
        );
        toast.success(data.message);
        setName("");
        setEmail("");
        navigate("/")
} catch (error) {
    toast.error(error.response.data.message);
    console.log(error)
}
   }


return (
    <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="card p-4 shadow-lg" style={{ width: '400px' }}>
            <h2 className="mb-4 text-center">Edit User</h2>
            <form onSubmit={UpdateData}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary btn-block mt-4">
                    Update
                </button>
            </form>
        </div>
        <ToastContainer />
    </div>
);
}

export default EditUser;
