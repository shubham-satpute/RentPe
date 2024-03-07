import axios from 'axios'

export const api =axios.create(
    {
        baseURL:"http://localhost:9000/package"
    })

//to add new room to data base
export async function addPackage(photo,name,price,days,city,state,description) {
    const formData=new FormData()
    formData.append('photo',photo)
    formData.append('name',name)    
    formData.append('price',price)
    formData.append('days',days)
    formData.append('city',city)
    formData.append('state',state)
    formData.append('description',description)
    const response=await api.post('/add/package',formData)
    if (response.status===201) {
        return true
    }else{
        return false
    }
}


//to get all room details from database
export async function getAllPackages() {
    try{
        const response=await api.get('/all-package')
        return response.data
    }
    catch(error){
        throw new Error("Error in fetching package")
    }
}

//delete room with id from database
export async function deletePackage(packageId) {
    try {
        const response = await api.delete(`/delete/${packageId}`)
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
export async function getPackageDetails(packageId) {
    try {
        const response = await api.get(`/details/${packageId}`)
        return response.data
    } catch (error) {
        throw new Error(`Error fetching package details ${error.message}`)
    }
}