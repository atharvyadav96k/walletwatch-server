const { response } = require('express');
const userSchema = require('../models/user');
const bcrypt = require('bcrypt')

exports.userRegister = async (req, res) => {
    const { username, password, email } = req.body;
    console.log(username, password, email);

    if (username && password && email) {
        try {
            // Correctly hash the user-provided password
            const hashPassword = bcrypt.hashSync(password, 10);

            const user = new userSchema({
                username: username,
                password: hashPassword,
                email: email,
            });

            await user.save();
            return res.status(200).json({
                success: true,
                response: {
                    userId: user._id,
                },
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: `Error: ${error.message}`,
            });
        }
    } else {
        return res.status(400).json({
            success: false,
            message: "All fields are required",
        });
    }
};

exports.userLogin = async (req, res) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
  
    try {
      const user = await userSchema.findOne({ username: username });
  
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Invalid username or password",
        });
      }
  
      const match = await bcrypt.compare(password, user.password);
  
      if (!match) {
        return res.status(401).json({
          success: false,
          message: "Invalid username or password",
        });
      }
  
      return res.status(200).json({
        success: true,
        response: {
          userId: user._id,
        },
        message: "Login success",
      });
  
    } catch (error) {
      console.error("Error during user login:", error);
      return res.status(500).json({
        success: false,
        message: "Something went wrong, please try again later.",
      });
    }
  };