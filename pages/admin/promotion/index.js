import DefaultLayout from "../../../component/layout/default"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import PromotionService from "../../api/promotion_service"

export default function Index() {

    const [promotionList, setPromotionList] = useState()
    const [messsage, setMesssage] = useState("")

    const [modalType, setModalType] = useState("add")
    const [showModal, setShowModal] = useState(false)
    const [modalTitle, setModalTitle] = useState("Tambah Promosi")

    const [formPromotionId, setFormPromotionId] = useState("")
    const [formPromotionTitle, setFormPromotionTitle] = useState("")
    const [formPromotionSubtitle, setFormPromotionSubtitle] = useState("")

    const router = useRouter()

    useEffect(() => {
        const role = localStorage.getItem("role")

        if (role == "customer") {
            router.push("/room")
        }

        const promotionService = new PromotionService()
        promotionService
            .promotionList()
            .then(res => setPromotionList(res.data))
    }, [])

    useEffect(() => {
        if (!showModal) {
            setFormPromotionTitle("")
            setFormPromotionSubtitle("")
            setFormPromotionId("")
        }
    }, [showModal])

    const promotionListView = (promotionData) => {
        return promotionData.map(
            i => <tr key={i.id}>
                <td>{promotionData.indexOf(i) + 1}.</td>
                <td>
                    {i.title}
                </td>
                <td>
                    {i.subtitle}
                </td>
                <td>
                    <button className="btn btn-sm btn-outline-dark" style={{ marginRight: "10px" }} onClick={() => loadDataAndModal(i)}>Edit</button>
                    <button className="btn btn-sm btn-outline-danger" style={{ marginRight: "10px" }} onClick={() => deletePromotion(i.id)}>Hapus</button>
                </td>
            </tr>
        )
    }

    const loadDataAndModal = (data) => {
        setShowModal(true)
        setModalType("edit")

        setFormPromotionId(data.id)
        setFormPromotionTitle(data.title)
        setFormPromotionSubtitle(data.subtitle)
    }

    const deletePromotion = (id) => {
        const promotionService = new PromotionService()
        promotionService
            .promotionDelete(id)
            .then(res => {
                setMesssage("Berhasil dihapus")
                setPromotionList(res.data)
            })
            .catch(err => {
                setMesssage("Sepertinya ada yang salah")
            })
            .finally((_) => {
                setShowModal(false)
            })
    }

    const submitHandler = e => {
        e.preventDefault()

        const promotionService = new PromotionService()
        if (modalType === "add") {
            promotionService
                .promotionCreate(formPromotionTitle, formPromotionSubtitle)
                .then(res => {
                    setMesssage("Berhasil ditambahkan")
                    setPromotionList(res.data)
                })
                .catch(err => {
                    setMesssage("Sepertinya ada yang salah")
                })
                .finally((_) => {
                    setShowModal(false)
                })
        } else {
            // edit
            promotionService
                .promotionUpdate(formPromotionTitle, formPromotionSubtitle, formPromotionId)
                .then(res => {
                    setMesssage("Berhasil diubah")
                    setPromotionList(res.data)
                })
                .catch(err => {
                    setMesssage("Sepertinya ada yang salah")
                })
                .finally((_) => {
                    setShowModal(false)
                })
        }
    }

    return <DefaultLayout title="Hootel - Panel Admin">
        <div className={"modal fade " + (showModal ? "show" : "")} id="exampleModalLive" aria-labelledby="exampleModalLiveLabel" style={{ display: "block", zIndex: (showModal ? 100 : -1), backgroundColor: (showModal ? "rgb(0 0 0 / 48%)" : "#fff") }} aria-modal="true" role="dialog">
            <div className="modal-dialog">
                <div className="modal-content">
                    <form onSubmit={submitHandler}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLiveLabel">{modalTitle}</h5>
                            <button type="button" onClick={() => { setShowModal(false) }} className="btn-close" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label className="form-label">Judul</label>
                                <input className='form-control' value={formPromotionTitle} onChange={e => setFormPromotionTitle(e.target.value)} type={"text"} required />
                                <input className='form-control' value={formPromotionId} readOnly type={"hidden"} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Konten</label>
                                <input className='form-control' value={formPromotionSubtitle} onChange={e => setFormPromotionSubtitle(e.target.value)} type={"text"} required />
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

        <strong>KELOLA PROMOSI</strong>
        <hr />
        <button onClick={(e) => {
            setModalType("add")
            setModalTitle("Tambah Promosi")
            setShowModal(!showModal)
        }} className="btn btn-sm btn-outline-dark">+ Tambah Promosi</button>
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
                            <th>Judul</th>
                            <th>Konten</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            promotionList !== undefined && promotionList.data.promotion.length > 0
                                ? promotionListView(promotionList.data.promotion)
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