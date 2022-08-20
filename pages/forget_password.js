import Head from 'next/head'
import Link from 'next/link'
import { useState } from "react"
import Auth from './api/auth'

export default function forgetPassword() {

    const [email, setEmail] = useState("")
    const [errorMsg, setErrorMsg] = useState("")
    
    const [isProcessing, setIsProcessing] = useState(false)
    const [isDoneAndSuccess, setIsDoneAndSuccess] = useState(false)

    const submitHandler = async (e) => {
        e.preventDefault()

        setErrorMsg("")
        setIsProcessing(true)

        const api = new Auth()
        await api.resetPassword(email).then(res => {
                if ("code" in res.data) {
                    let code = res.data.code
                    if (code === 200) {
                        setIsDoneAndSuccess(true)
                    } else {
                        setErrorMsg("Hmm, sepertinya ada yang salah")
                    }
                } else {
                    setErrorMsg("Hmm, sepertinya ada yang salah")
                }
            })
            .catch(function (err) {
                if ("email" in err.response.data.errors && err.response.data.errors.email.length > 0)  {
                    setErrorMsg(err.response.data.errors.email[0])
                } else {
                    setErrorMsg(err.message)
                }
            })

        setIsProcessing(false)
    }

    const successMessage = <div className="card" style={{ marginTop: "20px", marginBottom: "20px" }}>
        <div className="card-body">
            <h3>Email reset password berhasil dikirim ke email Anda, silahkan ikuti instruksi pada email tersebut untuk mengembalikan akses akun Anda</h3>
            <Link href="/">
                <a style={{ textDecoration: "none" }}>Kembali ke Halaman Utama</a>
            </Link>
        </div>
    </div>

    const resetPasswordForm = <div className="card" style={{ marginTop: "20px", marginBottom: "20px" }}>
        <div className="card-body">
            <h3>Lupa Sandi</h3>
            <p>Masukkan email untuk mengatur ulang sandi</p>

            <div className="alert alert-danger" role="alert" style={{ display: errorMsg == "" ? "none" : "block" }}>
                {errorMsg}
            </div>

            <form onSubmit={submitHandler}>
                <div className="mb-3">
                    <label className="form-label">Alamat Email</label>
                    <input className='form-control' type={"email"} value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <input type="submit" className="btn btn-md btn-primary" disabled={isProcessing} value="Reset Sandi" />
            </form>

        </div>
    </div>

    return <div>
        <Head>
            <title>Hootel - Lupa Sandi</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="container">
            <div className='row'>
                <div className='col-md-1'></div>
                <div className='col-md-10' style={{ paddingTop: "20px" }}>
                    
                    {
                        isDoneAndSuccess
                            ? successMessage
                            : resetPasswordForm
                    }

                </div>
                <div className='col-md-1'></div>
            </div>
        </div>
    </div>
}