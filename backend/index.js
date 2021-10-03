const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const { MONGO_URI } = require("./config");
const mongoose = require("mongoose");
const events = require("./models/events");
const bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.use(
  cors({
    origin: "*",
  })
);
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected"))
  .catch((err) => console.log(err));
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
        name:req.body.name,
        type:req.body.type,
        time:req.body.time,
        created:{time:Date.now()},
        lat:req.body.lat,
        lot:req.body.lat
    }
  events.create(data, (err) => {
    if (err) return res.status(400).json({ msg: err });
    // saved!
    res.status(200).json("ok");
  });

});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
