import Navbar from '../components/Navbar'
import React, { useState, useEffect } from "react";
import axios from "axios";

const getAuthHeader = () => {
    const token = localStorage.getItem("access_token");
    return { Authorization: `Bearer ${token}` };
};

function SamePassword() {
    const [credentials, setCredentials] = useState("");


    useEffect(() => {
        axios.get('/api/same-password/', { headers: getAuthHeader() })
            .then((response) => {
                console.log(response.data);
                setCredentials(response.data);
            })
            .catch(error => console.log(error.response.data));
    }, []);
    if (credentials.length < 1) {
        return <div><h3>You are safe my man</h3></div>;
    }
    return (
        <div>
            <Navbar />
            <div className="container-md mt-5">
                <h1 className="display-6">Why use one password for mutiple sites 🥴?</h1>
                <p className="lead">Change it please!</p>

                {credentials && credentials.map(credential => {
                    return (
                        <div>
                            <div className="border rounded-3 align-items-center row p-3 my-4">
                                <h6 className="col-lg-9 col-md-9 col-sm-8"><span className="text-secondary">password:</span> <b><i>{credential.password}</i></b></h6>
                                <a className="btn btn-primary col-lg-1 col-md-1 col-sm-2" data-bs-toggle="collapse"
                                    href={`#c${credential.password}`} role="button" aria-expanded="false" aria-controls={`c${credential.password}`}>view
                                </a>

                                {credential.websites && credential.websites.map(website => (
                                    <div className="collapse mt-3" id={`c${credential.password}`}>
                                        <div className="card card-body">
                                            <p>username : <b><i>{website.username}</i></b></p>
                                            <p>website : <b><i>{website.url}</i></b></p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default SamePassword;