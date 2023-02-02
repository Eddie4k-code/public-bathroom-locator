export const Bathroom = ({ name, street, city, miles, comment, directions }) => {

    return (
        
     <div className="p-4 border-t border-gray-200 flex flex-col md:flex-row md:justify-between">
  <div>
    <p className="text-lg font-medium">{name}</p>
    {miles && <p className="text-gray-500 font-medium">{miles} miles away</p>}
  </div>
  <div className="md:pl-4">
    {street && <p className="text-gray-500 font-medium">Street: {street}</p>}
    {city && <p className="text-gray-500 font-medium">City: {city}</p>}
    {comment && <p className="text-gray-500 font-medium">Comment: {comment}</p>}
    {directions && <p className="text-gray-500 font-medium">Directions: {directions}</p>}
  </div>
</div>
        
        );


}