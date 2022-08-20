import axios from "axios"
import EndPoint from "./util/endpoint"

export default class ReservationService {
    reservationList = () => {
        let token = localStorage.getItem("token")
        return axios.get(EndPoint.reservation, {
            "headers": {
                "Authorization": "Bearer " + token
            }
        })
    }

    reservationCreate = (room_id, duration_in_day, check_in, check_out) => {
        let token = localStorage.getItem("token")
        return axios.post(
            EndPoint.reservationCreate, 
            {
                "room_id": room_id,
                "duration_in_day": duration_in_day,
                "check_in": check_in,
                "check_out": check_out
            }, 
            {
                "headers": {
                    "Authorization": "Bearer " + token
                }
            }
        )
    }

    reservationCancel = (reservation_id) => {
        let token = localStorage.getItem("token")
        return axios.post(
            EndPoint.reservationCancel,
            {
                "reservation_id": reservation_id
            },
            {
                "headers": {
                    "Authorization": "Bearer " + token
                }
            }
        )
    }

    reservationConfirmPayment = (reservation_id) => {
        let token = localStorage.getItem("token")
        return axios.post(
            EndPoint.reservationConfirmPayment,
            {
                "reservation_id": reservation_id
            },
            {
                "headers": {
                    "Authorization": "Bearer " + token
                }
            }
        )
    }
}