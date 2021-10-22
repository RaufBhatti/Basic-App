import React from 'react'

const Footer = () => {
    return (
        <> <br /> <br />
            <footer className="footer mt-auto py-3 bg-light"
                style={{ position: 'absolute', width: '100%', bottom: '0' }} >
                <div className="container-fluid">
                    <span className="text-muted mb-0 text-center w-100 d-block">
                        <strong>360Brains</strong> | Copyright ©2021
                    </span>
                </div>
            </footer>
        </>
    )
}

export default Footer
