import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GetRoute from "../api/GetRoute";

const ShowRoute = ({ fromLat, fromLon, toLat, toLon, method }) => {
    //API to get directions between cordinates.
    const { loading, routeApi } = GetRoute();

    const navigate = useNavigate();
    //Each step of directions will be held here.
    const [directions, setDirections] = useState([]);

    //Action for go back button
    const handleGoBack = () => {
        navigate(-1); // Go back to the previous page
    };


    useEffect(() => {
        const fetchData = async () => {
            const response = await routeApi(fromLat, fromLon, toLat, toLon, method);
            console.log(response);
            setDirections(response.features[0].properties.legs[0].steps)
        }

        fetchData();

    }, [method]);

    //Will change based on loading state
    let content;


    if (loading) {
        content = <div><p>Loading Route...</p></div>
    } else {
        content = <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold mb-4">Route Steps</h1>
            <ul className="space-y-4">
                {directions.map((step, index) => (
                    <li key={index}>
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <span className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center">{index + 1}</span>
                            </div>
                            <div className="ml-4">
                                <h2 className="text-lg font-bold">Step {index + 1}: {step.instruction.text}</h2>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            <button
                className="mt-4 py-2 px-4 border border-gray-500 rounded-md text-gray-500 hover:text-white hover:bg-gray-500"
                onClick={handleGoBack}
            >
                Go Back
            </button>

        </div>

    }


         

    return (<div>

        {content}


    </div>);

}

export default ShowRoute;