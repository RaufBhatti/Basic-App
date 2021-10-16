import React from 'react'
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({ setLoginUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Admin');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        const user = { email, password, role };

        axios.post('http://localhost:4000/login', user)
            .then((res) => {
                if (res.data.status === 200) {
                    toast.success(res.data.message);
                    setLoginUser(res.data.user);
                    setLoading(false);
                    history.push(user.role === 'Admin' ? '/' : '/home');
                } else if (res.data.status === 401) {
                    toast.warning(res.data.message);
                    setLoading(false);
                } else {
                    toast.error(res.data.message);
                    setLoading(false);
                }
            })
    };


    return (
        <>
            <ToastContainer />
            <form onSubmit={handleSubmit} className='container grid mt-4' style={{ width: '480px', border: '1px solid black', padding: '30px', borderRadius: '7px' }}>
                <h2 style={{ marginBottom: '15px', textAlign: 'center' }}>Login</h2>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email
                    </label>
                    <input type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className='mb-3'>
                    <label for="role" className="form-label">Role</label>
                    <select class="form-select" aria-label="Default select example"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option selected value="Admin">Admin</option>
                        <option value="User">User</option>
                        <option value="Operator">Operator</option>
                        <option value="Manager">Manager</option>
                    </select>
                </div>
                <div className="mb-3">
                    <p style={{ textAlign: 'right' }}><Link to='/register' style={{ textDecoration: 'none' }}>Not Registered Yet?</Link></p>
                </div>
                <div style={{ textAlign: 'center' }}>
                    {!loading && <button type="submit" className="btn btn-primary" style={{ width: '25%' }} >Login</button>}
                    {loading && <button type="submit" className="btn btn-primary" style={{ width: '25%' }} >Loging In</button>}
                </div>
            </form>
        </>
    )
}

export default Login
