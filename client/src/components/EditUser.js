import { useState, useEffect } from "react";
import { useParams, useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditUser = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [fields, setFields] = useState({});
    const [role, setRole] = useState();
    const [loading, setLoading] = useState(true);
    const history = useHistory();

    useEffect(() => {
        fetch(`http://localhost:4000/users/${id}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setUser(data);
                setLoading(false);
            }).catch(err => console.log('Error: ' + err.message));
    }, [id]);


    const handleSubmit = event => {
        event.preventDefault();
        console.log("state user", JSON.stringify(user));
        setLoading(true);

        fetch(`http://localhost:4000/users/${user._id}`, {
            method: "PUT",
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify(fields)
        })
            .then(response => {
                if (!response.ok) throw new Error("Network Res Err ", response);
                return response.json();
            })
            .then(data => {
                console.log("server data", data);
                toast.success("User Updated Successfully!");
                history.push('/users');
            })
            .catch(err => toast.error("Error: " + err.message))
            .finally(() => setLoading(false));
    };

    const onFieldChange = (event) => {
        const key = event.target.name;
        const value = key === 'role' ? event.target.selectedValue : event.target.value;
        setUser({ ...user, [key]: value })
        setFields({ ...fields, [key]: value })
    }

    if (loading) return (
        <div class="d-flex justify-content-center">
            <div class="spinner-border text-success" style={{ width: '8rem', height: '8rem', marginTop: '10%' }} role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>);

    if (!user || !Object.keys(user).length)
        return <h1> Not User found for Id {id}</h1>;



    return (
        <>
            <ToastContainer />
            <form onSubmit={handleSubmit} className='container grid mt-4' style={{ width: '480px', border: '1px solid black', padding: '30px', borderRadius: '7px' }}>
                <h2 style={{ marginBottom: '15px', textAlign: 'center' }}>Edit User</h2>
                <div className="mb-3">
                    <label for="username" className="form-label">Username
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        required
                        name='username'
                        value={user.username}
                        onChange={onFieldChange}
                    />
                </div>
                <div className="mb-3">
                    <label for="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        required
                        name='email'
                        value={user.email}
                        onChange={onFieldChange}
                    />
                </div>
                <div className="mb-3">
                    <label for="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        required
                        name='password'
                        value={user.password}
                        onChange={onFieldChange}
                    />
                </div>
                {/* <div className='mb-3'>

                    {role === 'Admin' &&
                        <>
                            <label for="role" className="form-label">Role</label>
                            <select class="form-select" aria-label="Default select example"
                                id="admin"
                                name='admin'
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option selected value="Admin">Admin</option>
                                <option value="User">User</option>
                                <option value="Operator">Operator</option>
                                <option value="Manager">Manager</option>
                            </select>
                        </>
                    }
                    {role === 'User' &&
                        <>
                            <label for="role" className="form-label">Role</label>
                            <select class="form-select" aria-label="Default select example"
                                id="user"
                                name='user'
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option selected value='User'>User</option>
                                <option value="Admin">Admin</option>
                                <option value="Operator">Operator</option>
                                <option value="Manager">Manager</option>
                            </select>
                        </>
                    }
                    {role === 'Operator' &&
                        <>
                            <label for="role" className="form-label">Role</label>
                            <select class="form-select" aria-label="Default select example"
                                id="operator"
                                name='operator'
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option selected value="Operator">Operator</option>
                                <option value="Admin">Admin</option>
                                <option value="User">User</option>
                                <option value="Manager">Manager</option>
                            </select>
                        </>
                    }
                    {role === 'Manager' &&
                        <>
                            <label for="role" className="form-label">Role</label>
                            <select class="form-select" aria-label="Default select example"
                                id="manager"
                                name='manager'
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option selected value="Manager">Manager</option>
                                <option value="Admin">Admin</option>
                                <option value="User">User</option>
                                <option value="Operator">Operator</option>
                            </select>
                        </>
                    }
                </div> */}
                {/* <div className='mb-3'>
                    <label for="role" className="form-label">Role</label>
                    <select class="form-select" aria-label="Default select example"
                        id="admin"
                        required
                        name='admin'
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option selected>Select Role</option>
                        <option value="Admin">Admin</option>
                        <option value="User">User</option>
                        <option value="Operator">Operator</option>
                        <option value="Manager">Manager</option>
                    </select>
                </div> */}
                <div style={{ textAlign: 'center' }}>
                    {!loading && <button type="submit" className="btn btn-primary" style={{ width: '25%' }} >Update</button>}
                    {loading && <button type="submit" className="btn btn-primary" style={{ width: '25%' }} >Updating</button>}
                </div>
            </form>
        </>
    );
}

export default EditUser;