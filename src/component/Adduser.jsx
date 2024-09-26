import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function AddUser() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate(); // Initialize useNavigate

    const submitData = async (e) => {
        e.preventDefault();
        console.log({ name, email });
        try {
            const { data } = await axios.post("api/add-aman", { name, email });
            console.log(data);
            toast.success("Data inserted successfully!");
            setName("");
            setEmail("");
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred!");
            console.log(error);
        }
    };

    const redirectToDisplay = () => {
        navigate('/display'); // Navigate to the Display component
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow-lg" style={{ width: '400px' }}>
                <h2 className="mb-4 text-center">Aman Form</h2>
                <form onSubmit={submitData}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
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
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block mt-4 mx-4">
                        Submit
                    </button>
                    <button
                        type="button"
                        className="btn btn-secondary btn-block mt-4 mx-5"
                        onClick={redirectToDisplay}>
                        Go to Display
                    </button>
                </form>
            </div>

            <ToastContainer />
        </div>
    );
}

export default AddUser;
