import { useEffect, useState } from "react"
import RoomListCustomer from "../../component/customer/room_list"
import { useRouter } from "next/router"

export default function room() {

    const [displayedComponent, setDisplayedComponent] = useState()
    const router = useRouter()

    useEffect(() => {
        const role = localStorage.getItem("role")

        if (role == "customer") {
            setDisplayedComponent("customer")
        } else {
            router.push("/admin")
        }
    }, [])

    return <div>
        {
            displayedComponent !== undefined
                ? displayedComponent == "customer"
                    ? <RoomListCustomer />
                    : "Memuat ..."
                : "Memuat ..."
        }
    </div>
}