import React, { useEffect, useState} from 'react'
import { BathroomsList } from './BathroomList';
import { useNavigate } from 'react-router-dom';

export const Enter = ({location, setLocation}) => {
    /* The page where the user will get a request to get their location through the browser*/
   
    const navigate = useNavigate()
    const [error, setError] = useState('');



    /* On page render the browser will request their location */
    useEffect(() => {

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation(position.coords);
                localStorage.setItem("coords", JSON.stringify(position.coords));
                navigate("/bathrooms")

            },

            (error) => {
                console.error(error);

            }

        )

    }, []);





    return (<div className="flex h-screen items-center justify-center flex-col">
        <img src="https://www.pngkit.com/png/detail/17-171730_toilet-png.png" alt="Location Access" className="w-100 h-15 mb-9" />

        {error && <div className="text-red-500">{error}, change site permissions in your browser to try again.</div>}

        {error && <button type="button" onClick={() => window.location.reload()} class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
            Refresh

        </button>}


        <div className="text-blue-500">
            Waiting for user to allow location access...
        </div>








    </div>);

    



}