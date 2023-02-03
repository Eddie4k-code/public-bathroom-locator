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




            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-gray-200 rounded-lg shadow-lg">
                {bathrooms.map((bathroom) => (
                    <div className="p-6 bg-white rounded-lg shadow-lg">
                        <Bathroom
                            name={bathroom.name}
                            street={bathroom.street}
                            city={bathroom.city}
                            miles={Math.floor(bathroom.distance)}
                            comment={bathroom.comment}
                            directions={bathroom.directions}
                        />
                    </div>
                ))}
            </div>





        );

    } else {
        return (<div>Fetching Bathrooms....</div>)
    }
     
}