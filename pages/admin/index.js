import DefaultLayout from "../../component/layout/default"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect } from "react"

export default function Index() {
    const router = useRouter()

    useEffect(() => {
        const role = localStorage.getItem("role")

        if (role == "customer") {
            router.push("/room")
        }
    }, [])

    return <DefaultLayout title="Hootel - Panel Admin">
        <strong>MENU UTAMA</strong>
        <hr/>

        <div className="row">
            <div className="col-md-3">
                <Link href={"/admin/room"}>
                    <a className="btn btn-outline-dark" style={{ width: "100%", height: "200px", paddingTop: "80px" }}>
                        Kelola Kamar
                    </a>
                </Link>
            </div>
            <div className="col-md-3">
                <Link href={"/admin/reservation"}>
                    <a className="btn btn-outline-dark" style={{ width: "100%", height: "200px", paddingTop: "80px" }}>
                        Kelola Reservasi
                    </a>
                </Link>
            </div>
            <div className="col-md-3">
                <Link href={"/admin/promotion"}>
                    <a className="btn btn-outline-dark" style={{ width: "100%", height: "200px", paddingTop: "80px" }}>
                        Kelola Promosi
                    </a>
                </Link>
            </div>
            <div className="col-md-3">
                <Link href={"/admin/newsfeed"}>
                    <a className="btn btn-outline-dark" style={{ width: "100%", height: "200px", paddingTop: "80px" }}>
                        Kelola Newsfeed
                    </a>
                </Link>
            </div>
        </div>
    </DefaultLayout>
}