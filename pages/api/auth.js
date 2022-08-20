import axios from "axios"
import EndPoint from "./util/endpoint"

export default class Auth {
    login = (username, password) => {
        let credential = username + ":" + password
        let credentialToBase64 = window.btoa(credential)

        return axios.post(EndPoint.authLogin, {}, {
            headers: {
                "Authorization": "Basic " + credentialToBase64
            }
        })
    }

    resetPassword = (email) => {
        return axios.post(EndPoint.authResetPassword, {
            "email" : email
        })
    }

    register = (name, email, password) => {
        return axios.post(EndPoint.authRegister, {
            "role_id": 2,
            "name": name,
            "email": email,
            "password": password
        })
    }
}