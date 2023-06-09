import axios from 'axios';
import { useState } from 'react';

const GetRoute = () => {
    const [loading, setLoading] = useState(false);


    const routeApi = async (fromLat, fromLon, toLat, toLon, method) => {
        setLoading(true);

        const options = {
            method: 'GET',
            url: 'https://route-and-directions.p.rapidapi.com/v1/routing',
            params: {
                waypoints: `${fromLat},${fromLon}|${toLat},${toLon}`,
                mode: method
            },
            headers: {
                'X-RapidAPI-Key': process.env.REACT_APP_NAVIGATE_ID,
                'X-RapidAPI-Host': 'route-and-directions.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            console.log(response.data);
            setLoading(false);
            return response.data
        } catch (error) {
            setLoading(false);
            console.error(error);
        }



        
    }

    return { loading, routeApi };
    
}

export default GetRoute;