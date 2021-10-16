import { useState, useEffect } from "react";
import { useParams } from "react-router";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Airways = () => {
    const { country } = useParams();
    console.log(country);
    let [airways, setAirways] = useState([]);
    let [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://api.instantwebtools.net/v1/airlines')
            .then(response => response.json())
            .then(data => {
                setAirways(data);
                setLoading(false);
            })
    }, []);

    const handleSubmit = (name, country, slogan, head_quaters, website, established) => {
        setLoading(true);
        const airwayData = { name, country, slogan, head_quaters, website, established };

        axios.post(`http://localhost:4000/airway/${country}`, airwayData)
            .then((Response) => {
                if (Response.data.status === 200) {
                    alert(Response.data.message);
                    setLoading(false);
                } else if (Response.data.status === 401) {
                    alert(Response.data.message);
                    setLoading(false);
                } else {
                    alert('Product Adding Failed');
                    setLoading(false);
                }
            })
    };



    if (loading) return (
        <div className="d-flex justify-content-center">
            <div className="spinner-border text-success" style={{ width: '8rem', height: '8rem', marginTop: '10%' }} role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>);

    return (
        <>
            {/* <ToastContainer /> */}
            <div className='container mt-4'>
                <h2 style={{ marginBottom: '30px', textAlign: 'center', textTransform: 'capitalize' }}>{country}'s Airways</h2>
                <div className='row'>
                    {airways.filter((airway, index, self) => (airway.country === country) &&
                        index === self.findIndex((t) => (
                            t.place === airway.place && t.name === airway.name
                        )))
                        .map(airway =>
                        (
                            <div className='col-3' >
                                <div class="card" key={airway.id} style={{ width: '18rem', marginBottom: '5%' }}>
                                    <img src={airway.logo} style={{ width: '200px', height: '200px', alignSelf: 'center' }} class="card-img-top"
                                        alt='Image not Found!' onError={(e) => { e.target.onerror = null; e.target.src = "images/Airway.jpg" }} />
                                    <div class="card-body">
                                        <h5 class="card-title" style={{ textTransform: 'uppercase' }}>{airway.name}</h5>
                                        <h6 class="card-title">Country: <b>{airway.country}</b></h6>
                                        <h6 class="card-title">Slogan: <b>{airway.slogan}</b></h6>
                                        <h6 class="card-title">Head Quaters: <b>{airway.head_quaters}</b></h6>
                                        <h6 class="card-title">Website: <b>{airway.website}</b></h6>
                                        <h6 class="card-title">Established: <b>{airway.established}</b></h6>
                                        <button class="btn btn-dark mybtn" onClick={() =>
                                            handleSubmit(airway.name, airway.country,
                                                airway.slogan, airway.head_quaters, airway.website, airway.established)}>Book Now</button>
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

export default Airways
