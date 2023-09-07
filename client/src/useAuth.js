import { useState, useEffect } from 'react'
import fetch from 'node-fetch'
import axios from 'axios'

export default function useAuth(code) {
    const [accessToken, setAccessToken] = useState()
    const [refreshToken, setRefreshToken] = useState()
    const [expiresIn, setExpiresIn] = useState()
    useEffect(() => {
        axios.post("http://localhost:3001/login", {
           code,
        })
        .then(res => {
            console.log(res.data)
            window.history.pushState({}, null, "/")
        })
        .catch(error => {
            // window.location = "/"
            console.log(error.response)
        })
    }, [code])
// useEffect(() => {
//     fetch("http://localhost:3001/login", {
//         method : 'POST',
//         body : code
//     }).then(res => {
//         console.log(res.data)
//     }).catch(() => {
//         window.location = "/"
//     })
// }, [code])
}
