const express = require("express");
const ejs = require("ejs");

const app = express();

const value = ejs.render("Hello <%=name%> Welcome to TA", {
  name: "Absaar Ali",
});

console.log(value);

app.get("/", function (req, res) {
  res.send("TA");
});

app.listen(7000, function () {
  console.log("Server running on port 7000");
});
