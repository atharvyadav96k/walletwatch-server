const userSchema = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.userRegister = async (req, res) => {
    const { username, password, email } = req.body;
    if (!username && !password && !email) {
        return res.status(400).send({
            success: false,
            message: "all fields are required"
        })
    }
    try {
        const encryptedPass = await bcrypt.hash(password, 10);
        const user = new userSchema({
            username: username,
            password: encryptedPass,
            email: email
        });
        await user.save();
        const token = jwt.sign({
            username: username,
            password: password
        },
        process.env.JWT_SECRET);
        console.log("token",token)
            
        res.cookie('secret', token,
            {
                maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
                httpOnly: true,
                secure: true
            });
        res.status(200).send({
            user,
            message: "User created successfully",
            success: true
        });
    } catch (error) {
        if (error.code === 11000) {
            if (error.keyPattern.username) {
                return res.status(400).send({
                    message: "Username already used",
                    success: false
                });
            } else if (error.keyPattern.email) {
                return res.status(400).send({
                    message: "Email already used",
                    success: false
                });
            }
        }
        console.log(error.message);
        return res.status(400).send({
            message: error.message,
            success: false
        });
    }
};

exports.userLogin = async (req, res) => {
    const { username, password } = req.body;
    if (!username && !password) {
        return res.status(400).send({
            success: false,
            message: "all fields are required"
        })
    }
    const user = await userSchema.findOne({ username: username });
    console.log(user.password)
    if (user) {
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            const token = jwt.sign({
                username: username,
                password: password
            },
            process.env.JWT_SECRET);
            console.log("token", token)
            res.cookie('secret', token,
                {
                    maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
                    httpOnly: true,
                    secure: true
                });
            return res.status(200).send({
                message: "login successful",
                success: true
            });
        } else {
            return res.status(400).send({
                success: false,
                message: "invalid username or password"
            });
        }
    }
}