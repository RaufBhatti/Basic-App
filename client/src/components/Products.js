import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Products = ({ userRole }) => {
    let [products, setProducts] = useState([]);
    let [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:4000/products')
            .then(response => response.json())
            .then(data => {
                setProducts(data);
                setLoading(false)
            })
    }, [])

    const handleDelete = (id) => {
        setLoading(true);
        fetch(`http://localhost:4000/products/${id}`, {
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
                setProducts(products.filter(p => p._id !== id));
                toast.success("Product Deleted Successfully!")
            }).catch(err => toast.error("Error: " + err.message))
            .finally(() => setLoading(false))
    }

    if (loading)
        return (
            <div className="d-flex justify-content-center">
                <div className="spinner-border text-success" style={{ width: '8rem', height: '8rem', marginTop: '10%' }} role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>);

    return (
        <>
            <ToastContainer />
            <div className='container mt-4'>
                <h2 style={{ marginBottom: '30px', textAlign: 'center' }}>Products</h2>
                <div className='row'>
                    {products.map(product =>
                    (
                        <div className='col-3' key={product._id} >
                            <div class="card" style={{ width: '18rem', marginBottom: '5%' }}>
                                <img src={'images/Product.png'} style={{ width: '200px', height: '200px', alignSelf: 'center' }} class="card-img-top" alt="..." />
                                <div class="card-body">
                                    <h5 class="card-title">{product.title}</h5>
                                    <p class="card-text"><h6 style={{ color: 'red' }}>Price: {product.price}</h6></p>
                                    <p class="card-text"><h6>{product.status ? 'Available' : 'Not Available'}</h6></p>
                                    {
                                        (userRole === 'Admin' || userRole === 'Operator' || userRole === 'Manager') &&
                                        <>
                                            {/* <Link to='/ProductDetails' class="btn btn-primary mybtn"
                                                data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                                                onClick={() => handleView(product.name, product.price)}
                                            >
                                                View
                                            </Link> */}
                                            <button class="btn btn-primary mybtn">View</button>
                                            <Link to={`/EditProduct/${product._id}`} class="btn btn-success mybtn">Edit</Link>
                                        </>
                                    }
                                    {
                                        (userRole === 'Admin' || userRole === 'Operator') &&
                                        <>
                                            <button a class="btn btn-danger mybtn" onClick={() => handleDelete(product._id)}>Delete</button>
                                        </>
                                    }

                                </div>
                            </div>
                        </div>
                    ))
                    }
                </div>
            </div >


        </>
    )
}

export default Products
