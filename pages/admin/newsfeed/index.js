import DefaultLayout from "../../../component/layout/default"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import FeedService from "../../api/feed_service"

export default function index() {

    const [feedList, setFeedList] = useState()
    const [messsage, setMesssage] = useState("")

    const [modalType, setModalType] = useState("add")
    const [showModal, setShowModal] = useState(false)
    const [modalTitle, setModalTitle] = useState("Tambah Newsfeed")

    const [formFeedId, setFormFeedId] = useState("")
    const [formFeedTitle, setFormFeedTitle] = useState("")
    const [formFeedContent, setFormFeedContent] = useState("")

    const router = useRouter()

    useEffect(() => {
        const role = localStorage.getItem("role")

        if (role == "customer") {
            router.push("/room")
        }

        const newsfeedService = new FeedService()
        newsfeedService
            .feedList()
            .then(res => setFeedList(res.data))
    }, [])

    useEffect(() => {
        if (!showModal) {
            setFormFeedTitle("")
            setFormFeedContent("")
            setFormFeedId("")
        }
    }, [showModal])

    const newsfeedListView = (newsfeedData) => {
        return newsfeedData.map(
            i => <tr key={i.id}>
                <td>{newsfeedData.indexOf(i) + 1}.</td>
                <td>
                    {i.title}
                </td>
                <td>
                    {i.content}
                </td>
                <td>
                    <button className="btn btn-sm btn-outline-dark" style={{ marginRight: "10px" }} onClick={() => loadDataAndModal(i)}>Edit</button>
                    <button className="btn btn-sm btn-outline-danger" style={{ marginRight: "10px" }} onClick={() => deleteFeed(i.id)}>Hapus</button>
                </td>
            </tr>
        )
    }

    const loadDataAndModal = (data) => {
        setShowModal(true)
        setModalType("edit")

        setFormFeedId(data.id)
        setFormFeedTitle(data.title)
        setFormFeedContent(data.content)
    }

    const deleteFeed = (id) => {
        const newsfeedService = new FeedService()
        newsfeedService
            .feedDelete(id)
            .then(res => {
                setMesssage("Berhasil dihapus")
                setFeedList(res.data)
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

        const newsfeedService = new FeedService()
        if (modalType === "add") {
            newsfeedService
                .feedCreate(formFeedTitle, formFeedContent)
                .then(res => {
                    setMesssage("Berhasil ditambahkan")
                    setFeedList(res.data)
                })
                .catch(err => {
                    setMesssage("Sepertinya ada yang salah")
                })
                .finally((_) => {
                    setShowModal(false)
                })
        } else {
            // edit
            newsfeedService
                .feedUpdate(formFeedId, formFeedTitle, formFeedContent)
                .then(res => {
                    setMesssage("Berhasil diubah")
                    setFeedList(res.data)
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
                                <input className='form-control' value={formFeedTitle} onChange={e => setFormFeedTitle(e.target.value)} type={"text"} required />
                                <input className='form-control' value={formFeedId} readOnly type={"hidden"} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Konten</label>
                                <input className='form-control' value={formFeedContent} onChange={e => setFormFeedContent(e.target.value)} type={"text"} required />
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

        <strong>KELOLA NEWSFEED</strong>
        <hr />
        <button onClick={(e) => {
            setModalType("add")
            setModalTitle("Tambah Newsfeed")
            setShowModal(!showModal)
        }} className="btn btn-sm btn-outline-dark">+ Tambah Newsfeed</button>
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
                            feedList !== undefined && feedList.data.newsfeed.length > 0
                                ? newsfeedListView(feedList.data.newsfeed)
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