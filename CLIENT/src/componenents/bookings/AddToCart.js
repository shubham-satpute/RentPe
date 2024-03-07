import React from "react";

const AddToCart = (pId, Room, days, hotelId) => {
    let cart = localStorage.getItem("cart")
    let rooms = []

    if (cart === null) {
        let room = { id: Room.id,roomNo:Room.roomNo, price: Room.roomPrice, days: days, hotelId: hotelId, pId: pId }
        rooms.push(room)
        localStorage.setItem('cart', JSON.stringify(rooms))
    } else {
        let rcart = JSON.parse(cart)
        let old = rcart.find((i) => i.id == Room.id)
        let hotel = rcart.find((i) => i.hotelId == hotelId)
        let plan = rcart.find((i) => i.pId = pId)
        if (plan) {
            if (hotel) {
                if (old) {
                    throw new Error('Room already added')
                }
                else {
                    let room = { id: Room.id,roomNo:Room.roomNo, price: Room.roomPrice, days: days, hotelId: hotelId, pId: pId }
                    rcart.push(room)
                    localStorage.setItem('cart', JSON.stringify(rcart))
                }
            }
            else {
                throw new Error('Selected room is of diffrent hotel')
            }
        } else {
            throw new Error('Select room for one plan only')
        }
    }
}

export default AddToCart;