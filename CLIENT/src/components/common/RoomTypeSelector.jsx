import React, { useEffect, useState } from 'react'
import { getRoomTypes } from '../utils/ApiFunctions'

const RoomTypeSelector = ({handleRoomInputChange, newRoom}) => {
    const [roomTypes,setRoomTypes] = useState([""])
    const[showNewRoomTypesInput,setShowNewRoomTypesInput] = useState(false)
    const[newRoomTypes,setNewRoomTypes] = useState("")

    useEffect(()=>{
        getRoomTypes().then((data)=>{
            setRoomTypes(data)
        })
    },[])

    const handleNewRoomTypeInputChange=(e)=>{
        setNewRoomTypes(e.target.value);
    }

    const handleAddNewRoomType = () =>{
        if(newRoomTypes !== ""){
            setRoomTypes([...roomTypes,newRoomTypes])
            setNewRoomTypes("")
            setShowNewRoomTypesInput(false)
        }
    }


  return (
    <>

    {roomTypes.length > 0 &&(
        <div>
            <select className="form-select"
            name="roomType"
            id="roomType"
            value={newRoom.roomTypes}
            onChange={(e)=>{
                if(e.target.value === "Add New"){
                    setShowNewRoomTypesInput(true)
                }else{
                    handleRoomInputChange(e)
                }
            }}>
                <option value={""}> Select a room type</option>
                <option value={"Add New"}> Add New</option>
               {roomTypes.map((type,index)=>(
                <option value={type} key={index}>
                    {type}
                </option>
               ))}
            </select>
            {showNewRoomTypesInput && (
                <div className='input-group'>
                    <input className='form-control' 
                    type="text"
                    placeholder='Enter a new room type' 
                    onChange={handleNewRoomTypeInputChange}/>

                    <button className='btn btn-hotel' type='button' onClick={handleAddNewRoomType}> 
                    Add
                    </button>
                </div>
            )}
        </div>
    )}
    </>
  )
}

export default RoomTypeSelector
