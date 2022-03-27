const express = require("express");
const { nanoid } = require("nanoid");
const { MongoClient } = require("mongodb");

let db;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/:slug", function (req, res) {
  console.log(req.params.slug);
  db.collection("urlshortner")
    .findOne({ shortUrl: req.params.slug })
    .then(function (document) {
      res.redirect(document.longUrl);
    })
    .catch(function (error) {
      console.error(error);
      res.send("Could not find url");
    });
});

app.post("/api/URL", function (req, res) {
  const longUrl = req.body.longUrl;
  let shortUrl = nanoid(6);
  db.collection("urlshortner")
    .findOne({ longUrl: longUrl })
    .then(function (document) {
      if (document !== null) {
        shortUrl = document.shortUrl;
        res.json({ shortUrl });
      } else {
        db.collection("urlshortner")
          .insertOne({ longUrl, shortUrl })
          .then(function () {
            res.json({ shortUrl });
          });
      }
    });
});
const client = new MongoClient(
  "mongodb+srv://Absaar:password1548@cluster0.oaxoi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
);

client.connect().then(function (mClient) {
  db = mClient.db();
  console.log("Mongodb Connection is successful");
  app.listen(7000, function () {
    console.log("Server Started on port 7000");
  });
});
