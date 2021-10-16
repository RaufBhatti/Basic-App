import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
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


    if (loading) return (
        <div className="d-flex justify-content-center">
            <div className="spinner-border text-success" style={{ width: '8rem', height: '8rem', marginTop: '10%' }} role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>);

    return (
        <>
            <div className='container mt-4'>
                <h2 style={{ marginBottom: '30px', textAlign: 'center' }}>World's Airways</h2>
                <div className='row'>
                    {airways.filter((airway, index, self) =>
                        index === self.findIndex((t) => (
                            t.place === airway.place && t.country === airway.country
                        ))
                    ).map(airway =>
                    (
                        <div className='col-3' >
                            <div class="card" style={{ width: '18rem', marginBottom: '5%' }}>
                                <img src={airway.id % 2 || airway.id % 5 == 0 ? 'images/Airway5.jpg' : 'images/Airway4.png'} style={{ width: '200px', height: '200px', alignSelf: 'center' }} class="card-img-top"
                                    alt='Image not Found' onError={(e) => { e.target.onerror = null; e.target.src = "images/Airway.jpg" }} />
                                <div class="card-body">
                                    <h5 class="card-title" style={{ textAlign: 'center', textTransform: 'uppercase' }}>{airway.country}</h5>
                                    {/* <p class="card-text">Country: <h6 style={{ color: 'red' }}> {airway.country}</h6></p>
                                    <h6 class="card-title">Slogan: <b>{airway.slogan}</b></h6>
                                    <h6 class="card-title">Head Quaters: <b>{airway.head_quaters}</b></h6>
                                    <h6 class="card-title">Website: <b>{airway.website}</b></h6>
                                    <h6 class="card-title">Established: <b>{airway.established}</b></h6> */}
                                    <div style={{ textAlign: 'center' }}>
                                        <Link to={`/Airways/${airway.country}`} class="btn btn-success mybtn">Details</Link>
                                    </div>
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

export default Dashboard
