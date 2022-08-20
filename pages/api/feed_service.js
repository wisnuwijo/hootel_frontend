import axios from "axios"
import EndPoint from "./util/endpoint"

export default class FeedService {
    feedList = () => {
        let token = localStorage.getItem("token")
        return axios.get(EndPoint.feed, {
            "headers": {
                "Authorization": "Bearer " + token
            }
        })
    }

    feedDetail = (feed_id) => {
        let token = localStorage.getItem("token")
        return axios.get(EndPoint.feedDetail + "?feed_id=" + feed_id, {
            "headers": {
                "Authorization": "Bearer " + token
            }
        })
    }

    feedCreate = (title, content) => {
        let token = localStorage.getItem("token")
        return axios.post(
            EndPoint.feedCreate,
            {
                "title": title,
                "content": content
            },
            {
                "headers": {
                    "Authorization": "Bearer " + token
                }
            }
        )
    }

    feedUpdate = (feed_id, title, content) => {
        let token = localStorage.getItem("token")
        return axios.post(
            EndPoint.feedUpdate,
            {
                "feed_id": feed_id,
                "title": title,
                "content": content
            },
            {
                "headers": {
                    "Authorization": "Bearer " + token
                }
            }
        )
    }

    feedDelete = (feed_id) => {
        let token = localStorage.getItem("token")
        return axios.post(
            EndPoint.feedDelete,
            {
                "feed_id": feed_id
            },
            {
                "headers": {
                    "Authorization": "Bearer " + token
                }
            }
        )
    }
}