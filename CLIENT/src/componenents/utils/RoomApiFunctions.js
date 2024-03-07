import axios from 'axios'

export const api =axios.create(
    {
        baseURL:"http://localhost:9000/rooms"
    })

//to add new room to data base
export async function addRoom(photo,roomType,roomPrice,roomNo,capacity,hotelId) {
    const formData=new FormData()
    formData.append('photo',photo)
    formData.append('roomType',roomType)    
    formData.append('roomPrice',roomPrice)
    formData.append('roomNo',roomNo)
    formData.append('capacity',capacity)
    formData.append('hotelId',hotelId)
    const response=await api.post('/add/room',formData)
    if (response.status===201) {
        return true
    }else{
        return false
    }
}

//to get all room types from the database
export async function getRoomTypes() {
    try {
        const response =await api.get('/types')
        return response.data
    } catch (error) {
        throw new Error("Error in fatching roomtypes")
    }
}


//to get all room details from database
export async function getAllRooms() {
    try{
        const response=await api.get('/all-rooms')
        return response.data
    }
    catch(error){
        throw new Error("Error in fetching rooms")
    }
}
 
export async function getAllRoomsById(hotelId) {
    try{
        const response=await api.get(`/all-rooms/${hotelId}`)
        return response.data
    }
    catch(error){
        throw new Error("Error in fetching rooms by hotelId")
    }
}


//delete room with id from database
export async function deleteRoom(roomId) {
    try {
        const response = await api.delete(`/delete/${roomId}`)
        return response.data
    } catch (error) {
        throw new Error(`Error deleting room ${error.message}`)
    }
}

//to update room details in database
export async function updateRoom(roomId,room) {
    const formData=new FormData()
    formData.append('photo',room.photo)
    formData.append('roomType',room.roomType)    
    formData.append('roomPrice',room.roomPrice)
    formData.append('roomNo',room.roomNo)
    formData.append('capacity',room.capacity)
    formData.append('id',roomId)
    formData.append('hotelId',room.hotelId)

    try {
        const response = await api.put(`/update/${roomId}`,formData)
        return response.data
    } catch (error) {
        throw new Error(`Error updating room ${error.message}`)
    }
}

//to get room details from database using id
export async function getRoomDetails(roomId) {
    try {
        const response = await api.get(`/details/${roomId}`)
        return response.data
    } catch (error) {
        throw new Error(`Error fetching room details ${error.message}`)
    }
}