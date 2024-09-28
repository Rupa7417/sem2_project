const userService = require('../services/userService');

const createUser = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error creating user' });
    }
};

const loginUser = async (req, res) => {
    const { username, password } = req.body;
    const user = await userService.getUserByUsername(username);

    if (user && user.password === password) {
        res.status(200).json({ message: 'Login successful', user });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
};

module.exports = {
    createUser,
    loginUser,
};
