const express = require('express');
const cors = require('cors');
const SpotifyWebApi = require('spotify-web-api-node');


const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.post("/refresh", (req, res) => {
    const refreshToken = req.body.refreshToken;
    console.log("hi")
    const spotifyApi = new SpotifyWebApi({
        redirectUri: "http://localhost:3000",
        clientId: "d9edf32d7a294fdebec4b584059d5e3f",
        clientSecret: "fdd2321bbcce40fbb69a90710f481ea1",
        refreshToken,
    })

    spotifyApi.refreshAccessToken().then(
        (data) => {
            res.json({
                accessToken: data.body.accessToken,
                expiresIn:data.body.expiresIn
            });
            console.log(data.body);
            spotifyApi.setAccessToken(data.body['access_token']);
        }).catch((err) => {
            console.log(err);
            res.sendStatus(400);
        })
})

app.post("/login", (req, res) => {
    const code = req.body.code
    const spotifyApi = new SpotifyWebApi({
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
        console.error(err);
        res.sendStatus(400);
    })
})
app.listen(3001)