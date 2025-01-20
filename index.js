const express = require("express");
const { addUser,getUsers, getUser } = require("./src/crud-repo");
const app = express();

app.use(express.json());
app.post("/user", addUser)
app.get("/user", getUsers)
app.get("/user/:id", getUser)
app.listen(3000, async () => {
    console.log("Server is running on port 3000");
});