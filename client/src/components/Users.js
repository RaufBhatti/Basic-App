import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const Users = () => {
    let [users, setUsers] = useState([]);
    let [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:4000/users')
            .then(response => response.json())
            .then(data => {
                setUsers(data);
                setLoading(false);
            })
    }, [])

    const handleDelete = (id) => {
        setLoading(true);
        fetch(`http://localhost:4000/users/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then(res => {
                if (!res.ok)
                    throw new Error('Network response was not ok');
                return res.json()
            })
            .then(data => {
                console.log(data);
                setUsers(users.filter(user => user._id !== id));
                toast.success("User Deleted!")
            }).catch(err => toast.error("Error: " + err.message))
            .finally(() => setLoading(false))
    }

    if (loading) return (
        <div className="d-flex justify-content-center">
            <div className="spinner-border text-success" style={{ width: '8rem', height: '8rem', marginTop: '10%' }} role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>);

    return (
        <>
            <ToastContainer />
            <div className='container mt-4'>
                <h2 style={{ marginBottom: '30px', textAlign: 'center' }}>Users</h2>
                <div className='row'>
                    {users.map(user =>
                    (
                        <div className='col-3' >
                            {console.log(user)}
                            <div class="card" style={{ width: '18rem', marginBottom: '5%' }}>
                                <img src={'images/User.png'} style={{ width: '200px', height: '200px', alignSelf: 'center' }} class="card-img-top" alt="..." />
                                <div class="card-body">
                                    <h5 class="card-title">{user.username}</h5>
                                    <p class="card-text"><h6 style={{ color: 'red' }}>Email: {user.email}</h6></p>
                                    <h6 class="card-title">Designation: <b>{user.role}</b></h6>
                                    <button class="btn btn-primary mybtn">View</button>
                                    <Link to={`/EditUser/${user._id}`} class="btn btn-success mybtn" > Edit</Link>
                                    <button class="btn btn-danger mybtn" onClick={() => { handleDelete(user._id) }} >Delete</button>
                                </div>
                            </div>
                        </div>
                    )
                    )}
                </div>
            </div >
        </>
    )
}

export default Users
