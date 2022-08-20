import DefaultLayout from "../../../component/layout/default"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import RoomService from "../../api/room_service"

export default function index() {

    const [roomList, setRoomList] = useState()
    const [messsage, setMesssage] = useState("")

    const [modalType, setModalType] = useState("add")
    const [showModal, setShowModal] = useState(false)
    const [modalTitle, setModalTitle] = useState("Tambah Kamar")

    const [formAddRoomName, setFormAddRoomName] = useState("")
    const [formAddRoomDesc, setFormAddRoomDesc] = useState("")
    const [formAddRoomPhoto, setFormAddRoomPhoto] = useState("")
    const [formAddRoomPrice, setFormAddRoomPrice] = useState("")
    const [formAddRoomId, setFormAddRoomId] = useState("")

    const router = useRouter()

    useEffect(() => {
        const role = localStorage.getItem("role")

        if (role == "customer") {
            router.push("/room")
        }

        const roomService = new RoomService()
        roomService
            .roomList()
            .then(res => setRoomList(res.data))
    }, [])

    useEffect(() => {
        if (!showModal) {
            setFormAddRoomDesc("")
            setFormAddRoomName("")
            setFormAddRoomPhoto("")
            setFormAddRoomPrice("")
            setFormAddRoomId("")
        }
    }, [showModal])

    const roomListView = (room) => {
        return room.map(
            i => <tr key={i.id}>
                <td>{room.indexOf(i) + 1}.</td>
                <td>
                    <img src={i.images.split(",")[0]} width="100px" />
                </td>
                <td>
                    {i.name}
                </td>
                <td>
                    Rp. {i.price}
                </td>
                <td>
                    <button className="btn btn-sm btn-outline-dark" style={{ marginRight: "10px" }} onClick={() => loadDataAndModal(i)}>Edit</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => deleteRoom(i.id)}>Hapus</button>
                </td>
            </tr>
        )
    }

    const loadDataAndModal = (data) => {
        setModalType("edit")
        setModalTitle("Edit Data")
        setShowModal(true)

        setFormAddRoomDesc(data.desc)
        setFormAddRoomName(data.name)
        setFormAddRoomPhoto(data.images)
        setFormAddRoomPrice(data.price)
        setFormAddRoomId(data.id)
    }

    const submitHandler = e => {
        e.preventDefault()

        const roomService = new RoomService()
        if (modalType === "add") {
            roomService
                .roomCreate(formAddRoomPhoto, formAddRoomName, formAddRoomDesc, formAddRoomPrice)
                .then(res => {
                    setMesssage("Berhasil disimpan")
                    setRoomList(res.data)
                })
                .catch(err => {
                    setMesssage("Sepertinya ada yang salah")
                })
                .finally((_) => {
                    setShowModal(false)
                })
        } else {
            roomService
                .roomUpdate(formAddRoomPhoto, formAddRoomName, formAddRoomDesc, formAddRoomPrice, formAddRoomId)
                .then(res => {
                    setMesssage("Berhasil diubah")
                    setRoomList(res.data)
                })
                .catch(err => {
                    setMesssage("Sepertinya ada yang salah")
                })
                .finally((_) => {
                    setShowModal(false)
                })
        }
    }

    const deleteRoom = (roomId) => {
        const roomService = new RoomService()
        roomService
            .roomDelete(roomId)
            .then(res => {
                setMesssage("Berhasil dihapus")
                setRoomList(res.data)
            })
    }

    return <DefaultLayout title="Hootel - Panel Admin">
        <div className={"modal fade " + (showModal ? "show" : "")} id="exampleModalLive" aria-labelledby="exampleModalLiveLabel" style={{ display: "block", zIndex: (showModal ? 100 : -1), backgroundColor: (showModal ? "rgb(0 0 0 / 48%)" : "#fff") }} aria-modal="true" role="dialog">
            <div className="modal-dialog">
                <div className="modal-content">
                    <form onSubmit={submitHandler}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLiveLabel">{modalTitle}</h5>
                            <button type="button" onClick={() => {setShowModal(false)}} className="btn-close" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">Nama Kamar</label>
                                    <input className='form-control' value={formAddRoomName} onChange={e => setFormAddRoomName(e.target.value)} type={"text"} required />
                                    <input className='form-control' value={formAddRoomId} readOnly type={"hidden"} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Link Foto</label>
                                    <input className='form-control' value={formAddRoomPhoto} onChange={e => setFormAddRoomPhoto(e.target.value)} type={"text"} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Deskripsi</label>
                                    <input className='form-control' value={formAddRoomDesc} onChange={e => setFormAddRoomDesc(e.target.value)} type={"text"} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Harga</label>
                                    <input className='form-control' value={formAddRoomPrice} onChange={e => setFormAddRoomPrice(e.target.value)} min={0} max={9999999} type={"number"} required />
                                </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => { setShowModal(false) }}>Batal</button>
                            <button type="submit" className="btn btn-primary">Simpan</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <strong>KELOLA KAMAR</strong>
        <hr />
            <button onClick={(e) => { 
                setModalType("add")
                setModalTitle("Tambah Kamar")
                setShowModal(!showModal) 
            }} className="btn btn-sm btn-outline-dark">+ Tambah Kamar</button>
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
                            <th>Foto</th>
                            <th>Nama Kamar</th>
                            <th>Harga Per Malam</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            roomList !== undefined && roomList.data.room.length > 0
                                ? roomListView(roomList.data.room)
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