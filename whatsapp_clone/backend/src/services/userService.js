const User = require('../models/User');

const createUser = async (userData) => {
    const user = new User(userData);
    return await user.save();
};

const getUserByUsername = async (username) => {
    return await User.findOne({ username });
};

module.exports = {
    createUser,
    getUserByUsername,
};
