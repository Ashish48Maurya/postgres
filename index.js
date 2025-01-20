import express from "express"
import Connection from "./db.js";
const app = express();
app.listen(3000, async () => {
    await Connection();
  console.log("Server is running on port 3000");
});