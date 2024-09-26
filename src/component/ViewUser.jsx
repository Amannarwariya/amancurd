// ViewUser.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function ViewUser() {
  const { id } = useParams(); // Get the user ID from the URL
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the user details when the component loads
    const fetchUserDetails = async () => {
      try {
        const { data } = await axios.get(`api/user/${id}`);
        setUser(data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [id]);

  if (!user) {
    return <div className="text-center mt-5">Loading user details...</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">User Details</h2>
      <div className="card p-4 shadow-lg">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        {/* Add more user details if needed */}
        <button
          className="btn btn-secondary mt-3"
          onClick={() => navigate(-1)} // Navigate back to the previous page
        >
          Back to User List
        </button>
      </div>
    </div>
  );
}

export default ViewUser;
