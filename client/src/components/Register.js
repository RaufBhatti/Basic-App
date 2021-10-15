import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Register = ({ userRole }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('Admin');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        const user = { username, email, password, role };

        if (password === confirmPassword) {
            axios.post('http://localhost:4000/register', user)
                .then((Response) => {
                    toast.success(Response.data.message);
                    setLoading(false);
                    if (userRole === 'Admin') {
                        setUsername('');
                        setEmail('');
                        setPassword('');
                        setConfirmPassword('');
                        setRole('Admin');
                    } else {
                        history.push('/login')
                    }
                })
        } else {
            toast.error("Passwords don't match!");
            setLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <form onSubmit={handleSubmit} className='container grid mt-4' style={{ width: '480px', border: '1px solid black', padding: '30px', borderRadius: '7px' }}>
                <h2 style={{ marginBottom: '15px', textAlign: 'center' }}>Register</h2>
                <div className="mb-3">
                    <label for="username" className="form-label">Username</label>
                    <input type="text" name='username' required className="form-control" id="username"
                        value={username} onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label for="email" className="form-label">Email</label>
                    <input type="email" name='email' required className="form-control" id="email" aria-describedby="emailHelp"
                        value={email} onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label for="password" className="form-label">Password</label>
                    <input type="password" name='password' required className="form-control" id="password"
                        value={password} onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label for="confirmPassword" className="form-label">Re-type Password</label>
                    <input type="password" name='confirmPassword' className="form-control" id="confirmPassword"
                        value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
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
                        {(userRole === 'Admin') &&
                            <>
                                <option value="Operator">Operator</option>
                                <option value="Manager">Manager</option>
                            </>
                        }
                    </select>
                </div>
                {!(userRole === 'Admin') && <p style={{ textAlign: 'right' }}><Link to='/login' style={{ textDecoration: 'none' }}>Already Registerd?</Link></p>}
                <div style={{ textAlign: 'center' }}>
                    {!loading && <button type="submit" className="btn btn-primary" style={{ width: '25%' }}>Signup</button>}
                    {loading && <button type="submit" className="btn btn-primary" style={{ width: '25%' }}>Adding...</button>}
                </div>
            </form>
        </>
    )
}

export default Register
