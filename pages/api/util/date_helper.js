export default class DateHelper {
    formatDate = (datetime) => {
        let splitDatetime = datetime.split(" ")
        let date = splitDatetime[0]

        let splitDate = date.split("-")
        return [
            splitDate[2],
            splitDate[1],
            splitDate[0],
        ].join('-');
    }
}