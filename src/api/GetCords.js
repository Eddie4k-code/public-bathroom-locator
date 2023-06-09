import axios from 'axios';
import { useState } from 'react';


const GetCords = () => {

    const [loading, setLoading] = useState(false);


    const cordsApi = async (street, city) => {


        const options = {
            method: 'GET',
            url: 'https://forward-reverse-geocoding.p.rapidapi.com/v1/forward',
            params: {
                street: `${street}`,
                city: `${city}`,
                country: 'USA',
                'accept-language': 'en',
                polygon_threshold: '0.0'
            },
            headers: {
                'X-RapidAPI-Key': process.env.REACT_APP_GEO_ID,
                'X-RapidAPI-Host': 'forward-reverse-geocoding.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            return response.data[0];
        } catch (error) {
            console.error(error);
        }

    }


    return {loading, cordsApi}


}

export default GetCords;