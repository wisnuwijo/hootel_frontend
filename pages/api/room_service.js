import axios from "axios"
import EndPoint from "./util/endpoint"

export default class RoomService {
    roomList = () => {
        let token = localStorage.getItem("token")
        return axios.get(EndPoint.room, {
            "headers": {
                "Authorization": "Bearer " + token
            }
        })
    }

    roomDetail = (roomId) => {
        let token = localStorage.getItem("token")
        return axios.get(EndPoint.roomDetail + "?room_id=" + roomId, {
            "headers": {
                "Authorization": "Bearer " + token
            }
        })
    }

    roomCreate = (images, name, desc, price) => {
        let token = localStorage.getItem("token")
        return axios.post(
            EndPoint.roomCreate,
            {
                "images": images,
                "name": name,
                "desc": desc,
                "price": price
            },
            {
                "headers": {
                    "Authorization": "Bearer " + token
                }
            }
        )
    }

    roomUpdate = (images, name, desc, price, room_id) => {
        let token = localStorage.getItem("token")
        return axios.post(
            EndPoint.roomUpdate,
            {
                "images": images,
                "name": name,
                "desc": desc,
                "price": price,
                "room_id": room_id
            },
            {
                "headers": {
                    "Authorization": "Bearer " + token
                }
            }
        )
    }

    roomDelete = (room_id) => {
        let token = localStorage.getItem("token")
        return axios.post(
            EndPoint.roomDelete,
            {
                "room_id": room_id
            },
            {
                "headers": {
                    "Authorization": "Bearer " + token
                }
            }
        )
    }
}