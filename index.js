const { MongoClient } = require("mongodb");

const client = new MongoClient(
  "mongodb+srv://Absaar:wFrmn7J9hruB5L8m@cluster0.oaxoi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
);

client.connect().then((mClient) => {
  const db = mClient.db();

  db.collection("book")
    .insertOne({
      name: "The Lord of the Rings",
      author: "JRRT",
      publisher: "some publisher",
    })
    .then(() => {
      console.log("New Book Added");
    });
});
