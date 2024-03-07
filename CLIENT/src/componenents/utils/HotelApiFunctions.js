import axios from 'axios'

export const api =axios.create(
    {
        baseURL:"http://localhost:9000/hotels"
    })

//to add new room to data base
export async function addHotel(image,name,contactNo,email,street,city,state,password) {
    const formData=new FormData()
    formData.append('image',image)
    formData.append('contactNo',contactNo)    
    formData.append('name',name)
    formData.append('email',email)
    formData.append('street',street)
    formData.append('city',city)
    formData.append('state',state)
    formData.append('password',password)
    const response=await api.post('/add/hotel',formData)
    if (response.status===201) {
        return true
    }else{
        return false
    }
}

//to get all room types from the database
export async function getHotelCity() {
    try {
        const response =await api.get('/citys')
        return response.data
    } catch (error) {
        throw new Error("Error in fatching hotelcitys")
    }
}


//to get all room details from database
export async function getAllHotels() {
    try{
        const response=await api.get('/all-hotels')
        return response.data
    }
    catch(error){
        throw new Error("Error in fetching hotels")
    }
}

//delete room with id from database
export async function deleteHotel(hotelId) {
    try {
        const response = await api.delete(`/delete/${hotelId}`)
        return response.data
    } catch (error) {
        throw new Error(`Error deleting room ${error.message}`)
    }
}

//to update room details in database
export async function updateHotel(hotelId,hotel) {
    const formData=new FormData()
    formData.append('image',hotel.image)
    formData.append('contactNo',hotel.contactNo)    
    formData.append('name',hotel.name)
    formData.append('email',hotel.email)
    formData.append('street',hotel.street)
    formData.append('city',hotel.city)
    formData.append('state',hotel.state)
    formData.append('password',hotel.password)

    try {
        const response = await api.put(`/update/${hotelId}`,formData)
        return response.data
    } catch (error) {
        throw new Error(`Error updating hotel ${error.message}`)
    }
}

//to get room details from database using id
export async function getHotelDetails(hotelId) {
    try {
        const response = await api.get(`/details/${hotelId}`)
        return response.data
    } catch (error) {
        throw new Error(`Error fetching room details ${error.message}`)
    }
}