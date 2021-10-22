import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const AddProduct = () => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [status, setStatus] = useState(false);
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        const product = { title: title, price: price, status: status };

        axios.post('http://localhost:4000/products', product)
            .then((Response) => {
                if (Response.data.status === 200) {
                    toast.success(Response.data.message);
                    setLoading(false);
                    history.push('/products');
                } else if (Response.data.status === 401) {
                    toast.warning(Response.data.message);
                    setLoading(false);
                } else {
                    toast.error('Product Adding Failed');
                    setLoading(false);
                }
            })
    };

    return (
        <>
            <ToastContainer />
            <form onSubmit={handleSubmit} className='container grid mt-5' style={{ width: '480px', border: '1px solid black', padding: '30px', borderRadius: '7px' }}>
                <h2 style={{ marginBottom: '10%', textAlign: 'center' }}>Add Product</h2>
                <div className="mb-4">
                    <input type="text" placeholder="Title" name='title' required className="form-control" id="title"
                        value={title} onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <input type="number" placeholder="Price" name='price' required className="form-control" id="price" aria-describedby="emailHelp"
                        value={price} onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <div className="mb-3 form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="exampleCheck1"
                        name='status'
                        checked={status}
                        value={status}
                        onChange={(e) => setStatus(e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="exampleCheck1">
                        Available
                    </label>
                </div>
                <div style={{ textAlign: 'center' }}>
                    {!loading && <button type="submit" className="btn btn-primary" style={{ width: '25%' }}>Submit</button>}
                    {loading && <button type="submit" className="btn btn-primary" style={{ width: '25%' }}>Adding...</button>}
                </div>
            </form>
        </>
    )
}

export default AddProduct
