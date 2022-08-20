import axios from "axios"
import EndPoint from "./util/endpoint"

export default class PromotionService {
    promotionList = () => {
        let token = localStorage.getItem("token")
        return axios.get(EndPoint.promotion, {
            "headers": {
                "Authorization": "Bearer " + token
            }
        })
    }

    promotionDetail = (promotion_id) => {
        let token = localStorage.getItem("token")
        return axios.get(EndPoint.promotionDetail + "?promotion_id=" + promotion_id, {
            "headers": {
                "Authorization": "Bearer " + token
            }
        })
    }

    promotionCreate = (title, subtitle) => {
        let token = localStorage.getItem("token")
        return axios.post(
            EndPoint.promotionCreate,
            {
                "title": title,
                "subtitle": subtitle
            },
            {
                "headers": {
                    "Authorization": "Bearer " + token
                }
            }
        )
    }

    promotionUpdate = (title, subtitle, promotion_id) => {
        let token = localStorage.getItem("token")
        return axios.post(
            EndPoint.promotionUpdate,
            {
                "title": title,
                "subtitle": subtitle,
                "promotion_id": promotion_id
            },
            {
                "headers": {
                    "Authorization": "Bearer " + token
                }
            }
        )
    }

    promotionDelete = (promotion_id) => {
        let token = localStorage.getItem("token")
        return axios.post(
            EndPoint.promotionDelete,
            {
                "promotion_id": promotion_id
            },
            {
                "headers": {
                    "Authorization": "Bearer " + token
                }
            }
        )
    }
}