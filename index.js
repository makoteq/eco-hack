require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();
const path = require('path');
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const events = require("./models/events");
const bodyParser = require("body-parser");
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
    bodyParser.urlencoded({
        // to support URL-encoded bodies
        extended: true,
    })
);
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(
    cors({
        origin: "*",
    })
);
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("connected"))
    .catch((err) => console.log(err));
    app.get('/', (req,res) =>{
        res.sendFile(path.join(__dirname+'/client/build/index.html'));
    });
app.get("/api/getEvents", async (req, res) => {
    try {
        const event = await events.find();
        if (!event) throw Error("something went wrong");
        console.log(event);
        res.status(200).json(event);
    } catch (err) {
        res.status(400).json({ msg: err });
    }
});
app.post("/api/createEvent", (req, res) => {
    let data = {
        name: req.body.name,
        type: req.body.type,
        address: req.body.address,
        time: req.body.time,
        created: { time: Date.now() },
        lat: req.body.lat,
        lon: req.body.lon,
    };
    events.create(data, (err) => {
        if (err) return res.status(400).json({ msg: err });
        // saved!
        res.status(200).json("ok");
    });
});
app.use((req, res, next) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
})
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
