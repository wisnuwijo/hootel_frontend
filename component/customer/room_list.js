import Link from "next/link"
import { useCallback, useEffect, useState } from "react"
import FeedService from "../../pages/api/feed_service"
import PromotionService from "../../pages/api/promotion_service"
import ReservationService from "../../pages/api/reservation_service"
import RoomService from "../../pages/api/room_service"
import DateHelper from "../../pages/api/util/date_helper"
import DefaultLayout from "../layout/default"

export default function RoomList() {

    const [roomList, setRoomList] = useState()
    const [promotionList, setPromotionList] = useState()
    const [feedList, setFeedList] = useState()
    const [transactionList, setTransactionList] = useState()

    useEffect(() => {
        const roomService = new RoomService()
        roomService
            .roomList()
            .then(res => setRoomList(res.data))

        const promotionService = new PromotionService()
        promotionService
            .promotionList()
            .then(res => setPromotionList(res.data))

        const feedService = new FeedService()
        feedService
            .feedList()
            .then(res => setFeedList(res.data))

        const transactionService = new ReservationService()
        transactionService
            .reservationList()
            .then(res => setTransactionList(res.data))
    }, [])

    const promotionListView = useCallback(() => <div>
        {
            promotionList.data.promotion.map(
                (i) => <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12" key={i.id}>
                    <div className="card" style={{ width: "100%", marginTop: "20px" }} key={i.id}>
                        <div className="card-body">
                            <h5 className="card-title">{i.title}</h5>
                            <p className="card-text">{i.subtitle}</p>
                        </div>
                    </div>
                </div>
            )
        }
    </div>, [promotionList])

    const roomListView = useCallback(() => <div className="row">
        {
            roomList.data.room.map(
                (i) => <div className="col-xs-1 col-sm-2 col-md-3 col-lg-4"  key={i.id}>
                    <div className="card" style={{ width: "100%", marginTop: "20px" }} key={i.id}>
                        <img src={i.images.split(",")[0]} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">{i.name}</h5>
                            <p className="card-text">{i.desc}</p>
                            <Link href={"/room/" + i.id}>
                                <a className="btn btn-primary">Detail</a>
                            </Link>
                        </div>
                    </div>
                </div>
            )
        }
    </div>, [roomList])

    const feedListView = useCallback(() => <div className="row">
        {
            feedList.data.newsfeed.map(
                (i) => <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12" key={i.id}>
                    <div className="card" style={{ width: "100%", marginBottom: "10px" }} key={i.id}>
                        <div className="card-body">
                            <h5 className="card-title">{i.title}</h5>
                            <p className="card-text">{i.content}</p>
                        </div>
                    </div>
                </div>
            )
        }
    </div>, [feedList])

    const transactionListView = useCallback(() => <div className="row">
        {
            transactionList.data.reservations.map(
                (i) => <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12" key={i.id}>
                    <div className="card" style={{ width: "100%", marginBottom: "10px" }} key={i.id}>
                        <div className="card-body">
                            <h5 className="card-title">{i.room_name}</h5>
                            <p className="card-text">
                                <button className="btn btn-sm btn-outline-dark">{i.is_paid == 1 ? "Sudah dibayar" : "Belum dibayar"}</button>
                                {
                                    i.is_cancelled == 1 
                                        ? <button className="btn btn-sm btn-outline-dark">Dibatalkan</button>
                                        : ""
                                }
                                
                                <br />
                                <br />
                                <strong>IN</strong> {new DateHelper().formatDate(i.check_in)} <strong>OUT</strong> {new DateHelper().formatDate(i.check_out)}
                            </p>
                        </div>
                    </div>
                </div>
            )
        }
    </div>, [transactionList])
    
    return <DefaultLayout title="Hootel - Daftar Kamar">

        <h3>Promo Menarik Hari Ini</h3>
        <hr />
        {
            promotionList != undefined
                ? promotionListView()
                : "Memuat ..."
        }

        <br />

        <h3>Histori Transaksi</h3>
        <hr />
        {
            transactionList != undefined
                ? transactionListView()
                : "Memuat ..."
        }

        <br />

        <h3>Daftar Kamar</h3>
        <hr />
        {
            roomList != undefined
                ? roomListView()
                : "Memuat ..."
        }

        <br />

        <h3>Feeds</h3>
        <hr />
        {
            feedList != undefined
                ? feedListView()
                : "Memuat"
        }
    </DefaultLayout>
}