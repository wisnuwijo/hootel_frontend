export default class EndPoint {

    static mainEndpoint = "http://localhost/kuliah/hootel_services/public/api"
    static authLogin = this.mainEndpoint + "/login"
    static authResetPassword = this.mainEndpoint + "/reset_password"
    static authRegister = this.mainEndpoint + "/register"

    static room = this.mainEndpoint + "/room"
    static roomCreate = this.room + "/create"
    static roomUpdate = this.room + "/update"
    static roomDelete = this.room + "/delete"
    static roomDetail = this.room + "/detail"

    static reservation = this.mainEndpoint + "/reservation"
    static reservationCreate = this.reservation + "/book"
    static reservationCancel = this.reservation + "/cancel"
    static reservationConfirmPayment = this.reservation + "/confirm_payment"

    static promotion = this.mainEndpoint + "/promotion"
    static promotionCreate = this.promotion + "/create"
    static promotionUpdate = this.promotion + "/update"
    static promotionDelete = this.promotion + "/delete"
    static promotionDetail = this.promotion + "/detail"

    static feed = this.mainEndpoint + "/feed"
    static feedCreate = this.feed + "/create"
    static feedUpdate = this.feed + "/update"
    static feedDelete = this.feed + "/delete"
    static feedDetail = this.feed + "/detail"
}