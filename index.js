require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const session = require("express-session");
const events = require("./models/events");
const users = require("./models/users");
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
        resave: true,
        saveUninitialized: true,
        cookie: {
            maxAge: 24 * 60 * 60 * 1000
        },
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
        res.status(404).json("not logged");
    }
});
// Routes
app.use("/api/auth", auth);

app.get("/api/logout", function (req, res) {
    req.logout();
    req.session.destroy();
    res.status(200).json("logged out");
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
app.post("/api/deleteEvent", async (req, res) => {
    try {
        const event = await events.remove({id: req.body.id});
        if (!event) throw Error("something went wrong");
        console.log(event);
        res.status(200).json(event);
    } catch (err) {
        res.status(400).json({ msg: err });
    }
});

app.post("/api/getUserEvents", async (req, res) => {

   // if (req.user) {
        try {
            console.log(req.body.email);
            const userEvents = await events.findOne({user:"test"});
            if (!userEvents) throw Error("something went wrong");
            console.log(userEvents);
            console.log("____");
            res.status(200).json(userEvents);
        } catch (err) {
            res.status(400).json({ msg: err });
        }
   /* } else {
        res.redirect('/login');
    }*/
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
/*app.post("/api/getSessioniId", async (req, res) => {
    try {
        const id = await events.findOne({_id:req.body.id});
        if (!id) throw Error("something went wrong");
        console.log(event);
        res.status(200).json(id);
    } catch (err) {
        res.status(400).json({ msg: err });
    }
    });*/

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
