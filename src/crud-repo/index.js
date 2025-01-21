const { User, Todo } = require("../models");
const addUser = async (req, res) => {
    const { firstName, lastName, email } = req.body;
    if (!firstName || !lastName || !email) {
        return res.status(400).json({ error: "all fields are req." })
    }
    try {
        const user = await User.create({ firstName, lastName, email });
        res.status(201).json(user);
    } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            const explanation = error.errors.map((err) => `${err.message}: ${err.value}`);
            return res.status(400).json({ error: explanation });
        }
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(201).json(users);
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

const getUser = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: "Id is req." })
    }
    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

// https://sequelize.org/docs/v6/core-concepts/model-querying-basics/
const deleteUsers = async (req, res) => {
    try {
        await User.destroy({
            where: {}
        });
        res.status(201).json({ message: "Users Deleted" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: "Id is req." })
    }
    try {
        await User.destroy({
            where: {
                id
            }
        });
        res.status(201).json({ message: "User Deleted" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

const updateUser = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: "Id is req." })
    }
    try {
        const user = await User.update(req.body, {
            where: {
                id
            }
        });
        res.status(201).json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}


const createTodo = async (req, res) => {
    const { userId } = req.params;
    const { title } = req.body;
    console.log(title, userId);
    if (!title || !userId) {
        return res.status(400).json({ error: "Title and userId are req." });
    }

    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        const todo = await Todo.create({
            title,
            userId,
        });

        return res.status(201).json({
            message: "Todo created successfully.",
            todo,
        });
    } catch (error) {
        console.error("Error creating todo:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};


// https://sequelize.org/docs/v6/other-topics/scopes/#merging-includes
const getAllTodos = async (req, res) => {
    try {
        const todos = await Todo.findAll({
            include: {
                model: User,
                as: 'user',
                attributes: {
                    exclude: ['email'], // In order to Xclude only specific user fields
                },
            },
        });

        return res.status(200).json(todos);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getUserTodos = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: "id is req." });
    }
    try {
        const user = await User.findByPk(id, {
            include: {
                model: Todo,
                as: 'todos', // Alias defined in the association
                attributes: ['title'], // In order to include only specific todo fields
            },
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        return res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user with todos:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    addUser,
    getUsers,
    getUser,
    deleteUsers,
    deleteUser,
    updateUser,
    createTodo,
    getAllTodos,
    getUserTodos
}