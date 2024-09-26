import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap Icons CSS
import { useNavigate } from 'react-router-dom';

function Display() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // Fetch data from the API when the component loads
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('api/users');
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, []);

  // Function to handle viewing user details
  const handleView = (id) => {
    navigate(`/user/${id}`); // Navigate to the ViewUser component with the user's ID
  };

  // Function to handle editing user details
  const handleEdit = (id) => {
    navigate(`/edit/${id}`); // Navigate to the EditUser component with the user's ID
  };

  // Function to handle deleting a user
  const handleDelete = async (id) => {
    try {
      // Make a DELETE request to the API endpoint with the user ID
      await axios.get(`api/deleteuser/${id}`);
      // Update the state to remove the deleted user from the list
      setUsers(users.filter((user) => user._id !== id));
      console.log(`User with ID: ${id} deleted`);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // Function to navigate to AddUser component
  const handleAddUser = () => {
    navigate('/adduser'); // Navigate to the AddUser component
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">User List</h2>

      {/* Add User Button */}
      <div className="mb-3 text-right">
        <button className="btn btn-success" onClick={handleAddUser}>
          Add User
        </button>
      </div>

      <table className="table table-striped table-hover">
        <thead className="thead-dark">
          <tr>
            <th scope="col">No.</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col" className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr key={user._id}>
                <th scope="row">{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td className="text-center">
                  {/* View Icon */}
                  <i
                    className="bi bi-eye text-primary"
                    style={{ cursor: 'pointer', marginRight: '10px' }}
                    onClick={() => handleView(user._id)}
                    title="View User"
                  ></i>
                  {/* Edit Icon */}
                  <i
                    className="bi bi-pencil-square text-warning"
                    style={{ cursor: 'pointer', marginRight: '10px' }}
                    onClick={() => handleEdit(user._id)}
                    title="Edit User"
                  ></i>
                  {/* Delete Icon */}
                  <i
                    className="bi bi-trash text-danger"
                    style={{ cursor: 'pointer', marginRight: '10px' }}
                    onClick={() => handleDelete(user._id)}
                    title="Delete User"
                  ></i>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Display;
