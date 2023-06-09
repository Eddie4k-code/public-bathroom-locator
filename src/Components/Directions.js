import { useEffect, useState} from "react";
import GetCords from "../api/GetCords";
import ShowRoute from "./ShowRoute";

const Directions = ({ directionStreet, directionCity, location }) => {
    //API to turn address into cords.
    const { loading, cordsApi } = GetCords();

    //Latitude
    const [lat, setLat] = useState('');

    //Longitude
    const [lon, setLon] = useState('');

    //Method to get to waypoint
    const [method, setMethod] = useState('walk');


    useEffect(() => {
        // Translate Address into Cordinates.
        const fetchData = async () => {
            const response = await cordsApi(directionStreet, directionCity);
            setLat(response.lat);
            setLon(response.lon);
        }

        fetchData();



    }, []);

    
    return (<div className="flex flex-col items-center">
        <div className="my-4">
            <label className="mr-2">
                <input
                    type="radio"
                    value="walk"
                    checked={method === "walk"}
                    onChange={(e) => setMethod(e.target.value)}
                    className="mr-1"
                />
                Walk
            </label>
            <label className="ml-2">
                <input
                    type="radio"
                    value="drive"
                    checked={method === "drive"}
                    onChange={(e) => setMethod(e.target.value)}
                    className="mr-1"
                />
                Drive
            </label>
        </div>

        {lat && lon && (
            <div className="w-full max-w-md">
                <ShowRoute
                    fromLat={location.latitude}
                    fromLon={location.longitude}
                    toLat={lat}
                    toLon={lon}
                    method={method}
                />
            </div>
        )}
    </div>);

}


export default Directions;