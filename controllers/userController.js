const userSchema = require('../models/user');
const bcrypt = require('bcrypt');

exports.userRegister = async (req, res) => {
    const { username, password, email } = req.body;

    try {
        const encryptedPass = await bcrypt.hash(password, 10);
        const user = await userSchema({
            username: username,
            password: encryptedPass,
            email: email
        });
        await user.save();
        res.status(200).send({
            user,
            message: "user created successfully",
            success: true
        })
    } catch (error) {
        if (error.message == 'E11000 duplicate key error collection: walletwatch.users index: username_1 dup key: { username: "atharvyadav96k" }') {
            return res.status(400).send({
                message: "username already used",
                success: false
            });
        } else if (error.message == 'E11000 duplicate key error collection: walletwatch.users index: username_1 dup key: { username: \"sdfsdfsdf\" }') {
            return res.status(400).send({
                message: "email already used",
                success: false
            });
        }
        console.log(error.message)
        return res.status(400).send({
            message: error.message,
            success: true
        })
    }

}
exports.userLogin = (req, res) => {
    res.send("Login Successful")
}

const isValidUsername = (username) => {
    username = username.trim();
    if (username.length < 4) {
        return false;
    }
    if (username.includes(' ')) {
        return false;
    }
    return true;
}