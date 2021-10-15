import { useState, useEffect } from "react";
import { useParams, useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [fields, setFields] = useState({});
    const [loading, setLoading] = useState(true);
    const history = useHistory();

    useEffect(() => {
        fetch(`http://localhost:4000/products/${id}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setProduct(data);
                setLoading(false);
            }).catch(err => console.log('Error: ' + err.message));
    }, [id]);

    const handleSubmit = event => {
        event.preventDefault();
        console.log("state product", JSON.stringify(product));
        setLoading(true);

        fetch(`http://localhost:4000/products/${product._id}`, {
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
                toast.success("Product Updated Successfully!");
                history.push('/products');
            })
            .catch(err => toast.error("Error: " + err.message))
            .finally(() => setLoading(false));
    };

    const onFieldChange = (event) => {
        const key = event.target.name;
        const value = key === "status" ? event.target.checked : event.target.value;
        setProduct({ ...product, [key]: value })
        setFields({ ...fields, [key]: value })
    }

    if (loading) return (
        <div class="d-flex justify-content-center">
            <div class="spinner-border text-success" style={{ width: '8rem', height: '8rem', marginTop: '10%' }} role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>);

    if (!product || !Object.keys(product).length)
        return <h1> Not Product found for Id {id}</h1>;



    return (
        <>
            <ToastContainer />
            <form onSubmit={handleSubmit} className='container grid mt-4' style={{ width: '480px', border: '1px solid black', padding: '30px', borderRadius: '7px' }}>
                <h2 style={{ marginBottom: '15px', textAlign: 'center' }}>Edit Product</h2>
                <div className="mb-3">
                    <label for="title" className="form-label">Title
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        required
                        name='title'
                        value={product.title}
                        onChange={onFieldChange}
                    />
                </div>
                <div className="mb-3">
                    <label for="price" className="form-label">Price</label>
                    <input
                        type="number"
                        className="form-control"
                        id="price"
                        required
                        name='price'
                        value={product.price}
                        onChange={onFieldChange}
                    />
                </div>
                <div className="mb-3 form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="exampleCheck1"
                        name='status'
                        checked={product.status}
                        onChange={onFieldChange}
                    />
                    <label className="form-check-label" htmlFor="exampleCheck1">
                        Available
                    </label>
                </div>
                <div style={{ textAlign: 'center' }}>
                    {!loading && <button type="submit" className="btn btn-primary" style={{ width: '25%' }} >Update</button>}
                    {loading && <button type="submit" className="btn btn-primary" style={{ width: '25%' }} >Updating</button>}
                </div>
            </form>
        </>
    );
}

export default EditProduct;