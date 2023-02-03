import React, { useEffect, useState} from 'react'
import { BathroomsList } from './BathroomList';
import { useNavigate } from 'react-router-dom';

export const Enter = ({ location, setLocation }) => {
    /* The page where the user will get a request to get their location through the browser*/

    const navigate = useNavigate()
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');



    /* On page render the browser will request their location, if they block it then the user cannot proceeed. */
    useEffect(() => {

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation(position.coords);
                localStorage.setItem("location", true);
                setSuccess('Location Verified');
            },

            (error) => {
                if (localStorage.getItem("location")) {
                    localStorage.removeItem("location");
                }
                setError(error.message);

            }

        )

    }, []);





    return (<div className="flex h-screen items-center justify-center flex-col">
        <img src="https://www.pngkit.com/png/detail/17-171730_toilet-png.png" alt="Location Access" className="w-100 h-15 mb-9" />

        {error && <div className="text-red-500">{error}, change site permissions in your browser to try again.</div>}
        {success && <div className="text-green-500">{success}</div>}

        {success && <button type="button" onClick={() => navigate("/bathrooms")} class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
            Get Bathrooms Near Me!

        </button>}


        {error && <button type="button" onClick={() => window.location.reload()} class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
            Refresh

        </button>}


        {!success && <div className="text-blue-500">
        Waiting for user to allow location access...
    </div>}








    </div>);

    



}