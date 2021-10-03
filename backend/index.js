const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const { MONGO_URI } = require("./config");
const mongoose = require("mongoose");
const events = require("./models/events");
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
  events.create({ name: "wydarzenie",type:2,time:Date.now(),created:{time:Date.now()}}, (err) => {
    if (err) return res.status(400).json({ msg: err });
    // saved!
    res.status(200).json("ok");
  });

});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
