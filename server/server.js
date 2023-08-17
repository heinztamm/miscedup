const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const spotifyWebApi = require('spotify-web-api-node');


const app = express()
app.use(cors())
app.use(bodyParser.json())

app.post("/login", (req, res) => {
    const code = req.body.code
    const spotifyApi = new spotifyWebApi({
        redirectUri: "http://localhost:3000",
        clientId: "d9edf32d7a294fdebec4b584059d5e3f",
        clientSecret: "fdd2321bbcce40fbb69a90710f481ea1"
    })

    spotifyApi.authorizationCodeGrant(code)
    .then(data => {
        res.json({
            accessToken: data.body.accessToken,
            refreshToken: data.body.refreshToken,
            expiresIn: data.body.expiresIn,
        })
    }).catch(err => {
            console.log(err)
            res.sendStatus(400)
    })
})
app.listen(3001)
// 13:54 How to build a better spotify with react