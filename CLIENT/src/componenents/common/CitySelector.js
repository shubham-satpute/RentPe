import { useEffect, useState } from "react";
import { getHotelCity} from "../utils/HotelApiFunctions";

const CitySelector = ({handleHotelInputChange,hotel}) => {
    const [hotelCity, setHotelCity] = useState([])

    useEffect(() => {
        getHotelCity().then((data) => {
                setHotelCity(data)
            })
    }, [])
    return (
        <>
                <div>
                    <input type="text" list="city" 
                    className="form-select"
                    name="city"
                    value={hotel.city}
                    onChange={handleHotelInputChange}
                    />
                    <datalist id="city">
                        {hotelCity.map((type) => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                    </datalist>
                    
                </div>
        </>
    )
}

export default CitySelector