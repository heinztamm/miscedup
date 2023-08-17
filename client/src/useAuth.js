import { useState, useEffect } from 'react'
import fetch from 'node-fetch'

export default function useAuth(code) {
    const [accessToken, setAccessToken] = useState()
    const [refreshToken, setRefreshToken] = useState()
    const [expiresIn, setExpiresIn] = useState()

useEffect(() => {
    fetch("http://localhost:3001/login", {
        method : 'POST',
        body : code
    }).then(res => {
        console.log(res.data)
    }).catch(() => {
        window.location = "/"
    })
}, [code])
}
