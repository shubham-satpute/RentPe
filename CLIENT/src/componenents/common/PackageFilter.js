import React, { useState } from "react";
import { RiAddCircleFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const PackageFilter = ({data,setFilteredData}) => {
    const[filter,setFilter]=useState("")

    const handleSelectChange=(e)=>{
        const selectedPackageCity=e.target.value
        setFilter(selectedPackageCity)
        const filterd=data.filter((p)=>p.city.toLowerCase().includes(selectedPackageCity.toLowerCase()))
        setFilteredData(filterd)
    }

    const clearFilter =()=>{
        setFilter("")
        setFilteredData(data)
    }

    const packageCity =[...new Set(data.map((p)=>p.city))]

  return (
    <div className="input-group mb-3">
        <span className="input-group-text" id="room-type-filter">Filter Plan By Citys</span>
        <select className="form-select" value={filter} onChange={handleSelectChange} >
            <option value={""}>select a city to filter....</option>
            {
                packageCity.map((type,index)=>(
                    <option key={index} value={type}>{type}</option>
                ))
            }
        </select>
        <button className="btn btn-outline-secondary" type="button" onClick={clearFilter}>Clear Filter</button>
    </div>
    
  )
}

export default PackageFilter
