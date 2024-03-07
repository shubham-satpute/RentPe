import React, { useState } from "react";
import { RiAddCircleFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const HotelFilter = ({data,setFilteredData}) => {
    const[filter,setFilter]=useState("")

    const handleSelectChange=(e)=>{
        const selectedHotelCity=e.target.value
        setFilter(selectedHotelCity)
        const filterdHotels=data.filter((hotel)=>hotel.city.toLowerCase().includes(selectedHotelCity.toLowerCase()))
        setFilteredData(filterdHotels)
    }

    const clearFilter =()=>{
        setFilter("")
        setFilteredData(data)
    }

    const hotelCitys =[...new Set(data.map((hotel)=>hotel.city))]

  return (
    <div className="input-group mb-3">
        <span className="input-group-text" id="hotel-type-filter">Filter Hotels By City</span>
        <select className="form-select" value={filter} onChange={handleSelectChange} >
            <option value={""}>select a hotel city to filter....</option>
            {
                hotelCitys.map((type,index)=>(
                    <option key={index} value={type}>{type}</option>
                ))
            }
        </select>
        <button className="btn btn-outline-secondary" type="button" onClick={clearFilter}>Clear Filter</button>
    </div>
    
  )
}

export default HotelFilter
