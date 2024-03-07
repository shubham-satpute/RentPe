import { useEffect, useState } from "react";
import { getRoomTypes } from "../utils/RoomApiFunctions";

const RoomTypeSelector = ({handleRoomInputChange,newRoom}) => {
    const [roomTypes, setRoomTypes] = useState([""])
    const [showNewRoomTypeInput, setShowNewRoomTypeInput] = useState(false)
    const [newRoomType, setNewRoomType] = useState("")

    useEffect(() => {
        getRoomTypes().then((data) => {
                setRoomTypes(data)
            })
    }, [])

    const handleNewRoomInputTypeChange = (e) => {
        setNewRoomType(e.target.value);
    }

    const handleAddNewRoomType = () => {
        if (newRoomType !== "") {
            setRoomTypes([...roomTypes, newRoomType])
            setNewRoomType('')
            setShowNewRoomTypeInput(false)
        }
    }
    return (
        <>
            {roomTypes.length >= 0 && (
                <div>
                    <select id="roomType"
                        className="form-select dropdown"
                        name="roomType"
                        required
                        value={newRoom.roomType}
                        onChange={(e) => {
                            if (e.target.value === "Add New") {
                                setShowNewRoomTypeInput(true)
                            } else {
                                handleRoomInputChange(e)
                            }
                        }}>
                        <option value={''}>Select the room type</option>
                        <option value={"Add New"}>Add New</option>
                        {roomTypes.map((type) => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                    </select>
                    {showNewRoomTypeInput && (
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter the new room type"
                                onChange={handleNewRoomInputTypeChange}
                            />
                            <button className="btn btn-primary" type="button" onClick={handleAddNewRoomType}>Add</button>
                        </div>
                    )}
                </div>
            )}
        </>
    )
}

export default RoomTypeSelector