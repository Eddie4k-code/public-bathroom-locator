import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Bathroom = ({ name, street, city, miles, comment, directions, directionStreet, setDirectionStreet, directionCity, setDirectionCity}) => {


    const [copied, setCopied] = useState(false);
    const navigate = useNavigate();

    const copyToClipboard = () => {
        navigator.clipboard.writeText(`${street}`);
        setCopied(true);
    };


    //Updates our direction to city, street and navgiates to direction page
    const handleGetDirections = (street, city) => {
        setDirectionStreet(street);
        setDirectionCity(city);
        navigate(`/bathrooms/${street}${city}`);
    }

    
    return (
        
        <div className="bg-white rounded-md shadow-md overflow-hidden">
           
            <div className="p-4">
                <h2 className="text-xl font-medium">{name}</h2>
                <div className="mt-2 text-gray-700">{street} {city}</div>
                {miles && <div className="mt-2 text-gray-700">{miles} miles away</div>}
                {comment && <div className="mt-2 text-gray-700">{comment}</div>}
                {directions && <div className="mt-2 text-gray-700">{directions}</div>}
                <button
                    className="mt-4 py-2 px-4 border border-gray-500 rounded-md text-gray-500 hover:text-white hover:bg-gray-500"
                    onClick={copyToClipboard}
                >
                    {copied ? 'Address Copied!' : 'Copy Address'}
                </button>

                <button
                    className="mt-4 py-2 px-4 border border-gray-500 rounded-md text-gray-500 hover:text-white hover:bg-gray-500"
                    onClick={() => handleGetDirections(street, city)}
                >
                    Get Directions
                </button>




            </div>
        </div>
        
        );


}