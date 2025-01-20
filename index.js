const express = require("express");
const { addUser } = require("./src/crud-repo");
const app = express();

app.use(express.json());
app.post("/user", addUser)
app.listen(3000, async () => {
    console.log("Server is running on port 3000");
});