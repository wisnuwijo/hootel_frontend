import DefaultLayout from "../../../component/layout/default"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import ReservationService from "../../api/reservation_service"
import DateHelper from "../../api/util/date_helper"

export default function Index() {

    const [reservationList, setReservationList] = useState()
    const [messsage, setMesssage] = useState("")

    const [showModal, setShowModal] = useState(false)

    const [formReservationGuestName, setFormReservationGuestName] = useState("")
    const [formReservationDuration, setFormReservationDuration] = useState("")
    const [formReservationRoomName, setFormReservationRoomName] = useState("")
    const [formReservationGrandTotal, setFormReservationGrandTotal] = useState("")
    const [formReservationId, setFormReservationId] = useState("")
    const [formReservationCheckIn, setFormReservationCheckIn] = useState("")
    const [formReservationCheckOut, setFormReservationCheckOut] = useState("")

    const router = useRouter()

    useEffect(() => {
        const role = localStorage.getItem("role")

        if (role == "customer") {
            router.push("/room")
        }

        const reservationService = new ReservationService()
        reservationService
            .reservationList()
            .then(res => setReservationList(res.data))
    }, [])

    useEffect(() => {
        if (!showModal) {
            setFormReservationDuration("")
            setFormReservationGuestName("")
            setFormReservationRoomName("")
            setFormReservationGrandTotal("")
            setFormReservationId("")
        }
    }, [showModal])

    const reservationListView = (reservationData) => {
        return reservationData.map(
            i => <tr key={i.id}>
                <td>{reservationData.indexOf(i) + 1}.</td>
                <td>
                    {i.guest_name}
                </td>
                <td>
                    {i.room_name}
                </td>
                <td>
                    {i.is_paid ? "Lunas" : "Belum bayar" }
                </td>
                <td>
                    {i.duration_in_day} hari
                </td>
                <td>
                    Rp. {i.grand_total}
                </td>
                <td>
                    {new DateHelper().formatDate(i.check_in)}
                </td>
                <td>
                    {new DateHelper().formatDate(i.check_out)}
                </td>
                <td>
                    <button className="btn btn-sm btn-outline-dark" style={{ marginRight: "10px" }} onClick={() => loadDataAndModal(i)}>Konfirmasi Pembayaran</button>
                </td>
            </tr>
        )
    }

    const loadDataAndModal = (data) => {
        setShowModal(true)

        setFormReservationDuration(data.duration_in_day)
        setFormReservationGuestName(data.guest_name)
        setFormReservationRoomName(data.room_name)
        setFormReservationGrandTotal(data.grand_total)
        setFormReservationId(data.id)
        setFormReservationCheckIn(new DateHelper().formatDate(data.check_in))
        setFormReservationCheckOut(new DateHelper().formatDate(data.check_out))
    }

    const submitHandler = e => {
        e.preventDefault()

        const reservationService = new ReservationService()
        reservationService
            .reservationConfirmPayment(formReservationId)
            .then(res => {
                setMesssage("Berhasil dikonfirmasi")
                setReservationList(res.data)
            })
            .catch(err => {
                setMesssage("Sepertinya ada yang salah")
            })
            .finally((_) => {
                setShowModal(false)
            })
    }

    return <DefaultLayout title="Hootel - Panel Admin">
        <div className={"modal fade " + (showModal ? "show" : "")} id="exampleModalLive" aria-labelledby="exampleModalLiveLabel" style={{ display: "block", zIndex: (showModal ? 100 : -1), backgroundColor: (showModal ? "rgb(0 0 0 / 48%)" : "#fff") }} aria-modal="true" role="dialog">
            <div className="modal-dialog">
                <div className="modal-content">
                    <form onSubmit={submitHandler}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLiveLabel">Konfirmasi Pembayaran</h5>
                            <button type="button" onClick={() => { setShowModal(false) }} className="btn-close" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Setelah tamu transfer dana sesuai dengan kamar yang dipesan, lakukan konfirmasi bahwa dana sudah diterima
                            <hr/>
                            <div className="mb-3">
                                <label className="form-label">Nama Tamu</label>
                                <input className='form-control' value={formReservationGuestName} readOnly type={"text"} required />
                                <input className='form-control' value={formReservationId} readOnly type={"hidden"} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Kamar</label>
                                <input className='form-control' value={formReservationRoomName} readOnly type={"text"} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Durasi (Hari)</label>
                                <input className='form-control' value={formReservationDuration} readOnly type={"text"} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Grand Total</label>
                                <input className='form-control' value={formReservationGrandTotal} readOnly type={"number"} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Check In</label>
                                <input className='form-control' value={formReservationCheckIn} readOnly type={"text"} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Check Out</label>
                                <input className='form-control' value={formReservationCheckOut} readOnly type={"text"} required />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => { setShowModal(false) }}>Batal</button>
                            <button type="submit" className="btn btn-primary">Konfirmasi</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <strong>KELOLA RESERVASI</strong>
        <hr />
        <Link href="/admin">
            <a className="btn btn-sm btn-dark" style={{ marginLeft: "10px" }}>Kembali</a>
        </Link>
        <hr />

        <div className="row">
            <div className="col-md-12">
                <div className="alert alert-success" role="alert" style={{ display: messsage == "" ? "none" : "block" }}>
                    {messsage}
                </div>

                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama Tamu</th>
                            <th>Kamar</th>
                            <th>Status Pembayaran</th>
                            <th>Durasi (Hari)</th>
                            <th>Grand Total</th>
                            <th>Check In</th>
                            <th>Check Out</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            reservationList !== undefined && reservationList.data.reservations.length > 0
                                ? reservationListView(reservationList.data.reservations)
                                : <tr>
                                    <td colSpan={5}>Tidak ada data</td>
                                </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    </DefaultLayout>
}