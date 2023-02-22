import { Bathroom } from "./Bathroom";
import axios from 'axios';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

export const BathroomsList = ({ location }) => {

    const navigate = useNavigate();
    const [bathrooms, setBathrooms] = useState([]);
    
    /* Gets Bathrooms by using users location */
    const getBathrooms = async (long, lat) => {
        const options = {
            method: 'GET',
            url: 'https://public-bathrooms.p.rapidapi.com/location',
            params: {
                lat: lat,
                lng: long,
            },
            headers: {
                'X-RapidAPI-Key': process.env.REACT_APP_CLIENT_ID,
                'X-RapidAPI-Host': 'public-bathrooms.p.rapidapi.com'
            }
        };

        axios.request(options).then(function (response) {
            setBathrooms(response.data);
        }).catch(function (error) {
            console.error(error);
        });
    }
    /* Checks if user had location verified otherwise they cannot access this component */
    useEffect(() => {

        if (localStorage.getItem("location")) {
            getBathrooms(location.longitude, location.latitude);
        } else if (!localStorage.getItem("location")) {
            navigate("/");
        }

    }, []);


    


   

    /* We return this component if the bathrooms array is filled otherwise we return a loading screen*/
    if (bathrooms.length > 0) {

        return (




            <div className="bg-gray-100 p-4">
                <div className="container mx-auto py-8">
                    <h1 className="text-3xl font-bold text-center mb-6">Bathrooms Near You</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {bathrooms.map((bathroom) => (
                            <Bathroom
                                key={bathroom.id}
                                name={bathroom.name}
                                street={bathroom.street}
                                city={bathroom.city}
                                miles={Math.floor(bathroom.distance)}
                                comment={bathroom.comment}
                                directions={bathroom.directions}
                            />
                        ))}
                    </div>
                </div>
            </div>





        );

    } else {
        return (<div>Fetching Bathrooms....</div>)
    }
     
}