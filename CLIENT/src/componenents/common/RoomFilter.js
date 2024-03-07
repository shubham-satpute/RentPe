import React, { useState } from "react";
import { RiAddCircleFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const RoomFilter = ({data,setFilteredData}) => {
    const[filter,setFilter]=useState("")

    const handleSelectChange=(e)=>{
        const selectedRoomType=e.target.value
        setFilter(selectedRoomType)
        const filterdRooms=data.filter((room)=>room.roomType.toLowerCase().includes(selectedRoomType.toLowerCase()))
        setFilteredData(filterdRooms)
    }

    const clearFilter =()=>{
        setFilter("")
        setFilteredData(data)
    }

    const roomTypes =[...new Set(data.map((room)=>room.roomType))]

  return (
    <div className="input-group mb-3">
        <span className="input-group-text" id="room-type-filter">Filter Rooms By Type</span>
        <select className="form-select" value={filter} onChange={handleSelectChange} >
            <option value={""}>select a room type to filter....</option>
            {
                roomTypes.map((type,index)=>(
                    <option key={index} value={type}>{type}</option>
                ))
            }
        </select>
        <button className="btn btn-outline-secondary" type="button" onClick={clearFilter}>Clear Filter</button>
    </div>
    
  )
}

export default RoomFilter
