import { useEffect, useState } from "react"
import ReservationService from "../../pages/api/reservation_service"
import RoomService from "../../pages/api/room_service"

export default function roomDetail(props) {
    const [roomDetail, setRoomDetail] = useState()
    const [errorMsg, setErrorMsg] = useState("")

    const [checkIn, setCheckIn] = useState("")
    const [checkOut, setCheckOut] = useState("")
    const [durationInDays, setDurationInDays] = useState(0)
    const [isProcessing, setIsProcessing] = useState(false)
    const [isDone, setIsDone] = useState(false)

    useEffect(() => {
        const roomService = new RoomService()
        roomService
            .roomDetail(props.roomId)
            .then(res => setRoomDetail(res.data.data.room))
            .catch(function (err) {
                if ("room_id" in err.response.data.errors && err.response.data.errors.room_id.length > 0) {
                    setErrorMsg(err.response.data.errors.room_id[0])
                } else {
                    setErrorMsg(err.message)
                }
            })
    }, [])

    useEffect(() => setDurationInDays(datediff(parseDate(checkIn), parseDate(checkOut))), [checkIn, checkOut])

    const roomDetailBody = (roomDetailParam) => <div className="card" style={{ marginTop: "20px", marginBottom: "20px" }}>
        <div className="card-body">
            <div className="row">
                <div className="col-md-6">
                    {
                        roomDetailParam.images.split(",").map(i => <img key={new Date().getTime()} src={i} style={{ width: "100%" }} />)
                    }
                </div>
                <div className="col-md-6">
                    <h3>{roomDetailParam.name}</h3>
                    <button className="btn btn-sm btn-outline-dark">Rp. {roomDetailParam.price}</button>
                    <p style={{ marginTop: "20px" }}>{roomDetailParam.desc}</p>
                </div>
            </div>
        </div>
    </div>

    const parseDate = (str) => {
        var mdy = str.split('-');
        return new Date(mdy[0], mdy[1] - 1, mdy[2]);
    }

    const datediff = (first, second) => {
        return Math.round((second - first) / (1000 * 60 * 60 * 24));
    }

    const submitHandler = e => {
        e.preventDefault()

        if (durationInDays <= 0) {
            alert("Mohon masukkan tanggal yang valid")
            return;
        }

        setIsProcessing(true)

        const reservationService = new ReservationService()
        reservationService
            .reservationCreate(props.roomId, durationInDays, checkIn, checkOut)
            .then(res => {
                console.log(res.data)
            })
            .finally(() => {
                setIsProcessing(false)
                setIsDone(true)
            })
    }

    const transactionSummary = <div>
        <h4>Pesanan Diproses</h4>
        <p>
            Kami mengirimkan invoice reservasi kamar ke alamat email Anda, silahkan ikuti instruksi pada email tersebut untuk menyelesaikan transaksi.
        </p>
    </div>

    const roomReservationForm = <div>
        <strong>Reservasi Kamar</strong>
        <hr />
        <form onSubmit={submitHandler}>
            <div className="mb-3">
                <label className="form-label">Check In</label>
                <input className='form-control' value={checkIn} onChange={e => setCheckIn(e.target.value)} min={new Date().toISOString().split('T')[0]} type={"date"} required />
            </div>
            <div className="mb-3">
                <label className="form-label">Check Out</label>
                <input className='form-control' value={checkOut} onChange={e => setCheckOut(e.target.value)} min={new Date().toISOString().split('T')[0]} type={"date"} required />
            </div>
            <div className="mb-3">
                <label className="form-label">Durasi (Hari)</label>
                <input className='form-control' value={durationInDays.toString()} type={"number"} disabled />
            </div>

            <input type="submit" className="btn btn-md btn-primary" disabled={isProcessing} value="Pesan" />
        </form>
    </div>

    return <div>
        <div className="alert alert-danger" role="alert" style={{ display: errorMsg == "" ? "none" : "block" }}>
            {errorMsg}
        </div>

        {
            roomDetail !== undefined
                ? roomDetailBody(roomDetail)
                : ""
        }

        {
            isDone
                ? transactionSummary
                : roomReservationForm
        }
    </div>
}