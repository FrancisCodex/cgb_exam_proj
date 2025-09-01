import './App.css';
import { useState, useEffect } from 'react';
import Modal from './components/modals';

function App() {
  const [userDetails, setUsersDetails] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState({
    id: null,
    name: '',
    contact: '',
    address: '',
  });

  // Function to Submit User Details (Create)
  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page reload
    const res = await fetch(`http://127.0.0.1:8000/api/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (res.ok) {
      await fetchData(); // refresh list
      setUserData({ id: null, name: '', contact: '', address: '' });
    }
  };

  // Read (show all users)
  const fetchData = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/users");
    const result = await response.json();
    setUsersDetails(result);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Read (show single user by ID)
  const handleShow = async () => {
    const res = await fetch(`http://127.0.0.1:8000/api/users/${userData.id}`);
    if (res.ok) {
      const data = await res.json();
      setUserData(data);
    }
  };

  // Update user
  const handleUpdate = async (e) => {
    e.preventDefault();

    const res = await fetch(`http://127.0.0.1:8000/api/users/update/${userData.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: userData.name,
        contact: userData.contact,
        address: userData.address
      }),
    });

    if (res.ok) {
      await fetchData(); //fetch data
      setIsModalOpen(false); // close modal after success
    }
  };

  // Delete user
  const handleDelete = async (id) => {
    const res = await fetch(`http://127.0.0.1:8000/api/users/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      await fetchData();
    }
  };



  const openModal = (user) => {
    setUserData({
      id: user.id,
      name: user.name,
      contact: user.contact,
      address: user.address,
    });
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="App">
      <header className="App-header">
        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className='formdata'>
            <label>Name:</label>
            <input
              type="text"
              value={userData.name}
              onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            />
            
            <label>Contact:</label>
            <input
              type="number"
              value={userData.contact}
              onChange={(e) => setUserData({ ...userData, contact: e.target.value })}
            />
            
            <label>Address:</label>
            <input
              type="text"
              value={userData.address}
              onChange={(e) => setUserData({ ...userData, address: e.target.value })}
            />
            
            <button type="submit">Submit</button>
          </div>
        </form>

        <br />
        <br />

        {/* Table */}
        <div className='table_container'>
        <table className="data_table">
          <thead className="table_head">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Contact</th>
              <th scope="col">Address</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody className="table_body">
            {userDetails.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.contact}</td>
                <td>{user.address}</td>
                <td>
                  <button onClick={() => openModal(user)}>Edit</button>
                  <button onClick={() => handleDelete(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>

      </header>

      <Modal show={isModalOpen} onClose={closeModal} title="Update Data">
        <form onSubmit={handleUpdate}>
          <div className='updateForm'>
            <label>Name:</label>
            <input
              type="text"
              value={userData.name}
              onChange={(e) => setUserData({ ...userData, name: e.target.value })}
              className='inputBox'
            />
            
            <label>Contact:</label>
            <input
              type="number"
              value={userData.contact}
              onChange={(e) => setUserData({ ...userData, contact: e.target.value })}
              className='inputBox'
            />
            
            <label>Address:</label>
            <input
              type="text"
              value={userData.address}
              onChange={(e) => setUserData({ ...userData, address: e.target.value })}
              className='inputBox'
            />
            
            <button type="submit">Submit</button>
          </div>
        </form>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
}

export default App;
