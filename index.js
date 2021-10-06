require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const session = require("express-session");
const events = require("./models/events");
const passport = require("./passport/setup");
const auth = require("./routes/auth");
app.use(
    cors({
        origin: "*",
    })
);

const MongoStore = require("connect-mongo");
// Passport middleware
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then(console.log(`MongoDB connected ${process.env.MONGO_URI}`))
    .catch((err) => console.log(err));

// Bodyparser middleware, extended false does not allow nested payloads
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Express Session
app.use(
    session({
        secret: "very secret this is",
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.get("/api/isLogged", async (req, res) => {
    if (req.user) {
        res.status(200).json(req.user);
    } else {
        res.redirect('/login');
    }
});
// Routes
app.use("/api/auth", auth);

app.get("/api/logout", function (req, res) {
    req.logout();
    res.status(200).join({ successful: true });
    // res.redirect('/');
});

//deploy
app.use(express.static(path.join(__dirname, "client/build")));

//routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
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
        description: req.body.description,
        address: req.body.address,
        time: req.body.time,
        created: { time: Date.now() },
        lat: req.body.lat,
        lon: req.body.lon,
    };
    events.create(data, (err, data) => {
        if (err) return res.status(400).json({ msg: err });
        // saved!
        res.status(200).json(data);
    });
});

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
