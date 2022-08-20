import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import RoomDetailCustomer from "../../component/customer/room_detail"
import DefaultLayout from "../../component/layout/default"

export default function RoomDetail() {

    const [displayedComponent, setDisplayedComponent] = useState()

    const router = useRouter()
    const { rid } = router.query

    useEffect(() => {
        const role = localStorage.getItem("role")

        if (role == "customer") {
            setDisplayedComponent("customer")
        } else {
            router.push("/admin")
        }
    }, [])

    return <DefaultLayout title="Hootel - Detail Ruangan">
        {
            displayedComponent !== undefined && rid !== undefined
                ? displayedComponent == "customer"
                    ? <RoomDetailCustomer roomId={rid} />
                    : "Memuat ..."
                : "Memuat ..."
        }
    </DefaultLayout>
}