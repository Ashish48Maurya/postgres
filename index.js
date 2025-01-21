const express = require("express");
const { addUser,getUsers, getUser, deleteUsers, deleteUser, updateUser, createTodo, getAllTodos, getUserTodos } = require("./src/crud-repo");
const app = express();

app.use(express.json());

app.post("/user", addUser)
app.get("/user", getUsers)
app.get("/user/:id", getUser)
app.delete("/user", deleteUsers)
app.delete("/user/:id", deleteUser)
app.patch("/user/:id", updateUser)
app.post("/todo/:userId", createTodo)
app.get("/todo/:id", getUserTodos)
app.get("/todo", getAllTodos)

app.listen(3000, async () => {
    console.log("Server is running on port 3000");
});