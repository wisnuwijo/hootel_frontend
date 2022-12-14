import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function DefaultLayout(props) {

    const [name, setName] = useState("")

    useEffect(() => {
        try {
            const user = JSON.parse(localStorage.getItem("user"))
            setName(user.name)
        } catch (error) {
            window.location.href = window.location.origin
        }
    }, [])

    const logout = () => {
        localStorage.clear()

        window.location.href = window.location.origin
    }

    return <div>
        <Head>
            <title>{props.title}</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <nav className="navbar navbar-expand-lg bg-dark" style={{ color: "white" }} >
            <div className="container-fluid">
                <Link href={"/room"}>
                    <a className="navbar-brand" style={{ color: "white" }} >Hootel</a>
                </Link>
                {name}
            </div>

            <div className="collapse navbar-collapse" >
                <button className='btn btn-md btn-dark' onClick={logout} style={{ marginRight: "10px" }}>Keluar</button>
            </div>
        </nav>

        <div className='container'>
            <div className='row'>
                <div className='col-md-1'></div>
                <div className='col-md-10' style={{ paddingTop: "20px" }}>

                    {props.children}
                </div>
                <div className='col-md-1'></div>
            </div>
        </div>
    </div>
}