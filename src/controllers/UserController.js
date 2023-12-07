const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { createToken } = require("../helpers/token");

// =============userSignup===========
exports.userSignup = async (req, res) => {
    try {
        let { name, email, password, address } = req.body;

        // Check if user already exists in the database
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(200).json({
                errors: [
                    {
                        email: existingUser.email,
                        msg: "The user already exists",
                    },
                ],
            });
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user in the database
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            address,
        });

        await newUser.save();

        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// ============= User Login ============
exports.userLogin = async (req, res) => {
    try {
        let { email, password } = req.body;

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "Invalid Email and Password",
            });
        }

        // Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid Email and Password",
            });
        }

        // Generate a JWT token
        const token = createToken(user);

        // Set the token in the Authorization header
        res.set('Authorization', token);

        return res.status(200).json({
            message: "Login successful",
            token: token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


// ============= User Profile ============

exports.userProfile = async (req, res) => {

    try {
        const user = req.user;
    res.json({ message: 'Authenticated route', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
// ============= LogOut ============

exports.userLogOut = async (req, res) => {

    try {
       
            // Clear the Authorization header (remove the token)
            res.removeHeader('Authorization');
            
            // Send a response indicating successful logout
            res.status(200).json({ message: 'Logout successful' });
    
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}