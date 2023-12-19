const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { createToken } = require("../helpers/token");
const nodemailer = require("nodemailer");
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
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    // Create a new user in the database
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      address,
      otp,
    });
    await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
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
    //valid or not
    if (user.isActivated === false) {
      return res.status(401).json({
        message: "Account not activated yet",
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
    res.set("Authorization", token);
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
    res.json({ message: "Authenticated route", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// ============= LogOut ============

exports.userLogOut = async (req, res) => {
  try {
    // Clear the Authorization header (remove the token)
    res.removeHeader("Authorization");

    // Send a response indicating successful logout
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ============= verifyemail ============

exports.sendEmail = async (req, res) => {
  try {
    const { toEmail, otp } = req.body;
    console.log(toEmail, otp);
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "sbg.barua@gmail.com", // generated ethereal user
        pass: "dtsz bthr vzqh wbvs", // generated ethereal password
      },
    });
    // console.log(token);
    // const activationLink = `http://localhost:5000/api/v1/user/activate`;
    // console.log(activationLink);
    let message = {
      from: "sbg.barua@gmail.com", // sender address
      to: toEmail, // list of receivers
      subject: "Activate your account", // Subject line
      text: "Thank you for creating account in Flavor Factory", // plain text body
      // html: `<p>Click the following link to activate your account:</p><a href="${activationLink}">${activationLink}</a>`,
      html: `This is your one time password (OTP): ${otp}, don't share it with others`,
    };
    transporter
      .sendMail(message)
      .then((info) => {
        return res.status(201).json({
          msg: "you should receive an email",
          info: info.messageId,
          preview: nodemailer.getTestMessageUrl(info),
        });
      })
      .catch((error) => {
        return res.status(500).json({ error });
      });
    // let info = await transporter.sendMail({
    //   from: "sbg.barua@gmail.com",
    //   to: "shatabdi.barua7@gmail.com",
    //   subject: "Account verification",
    //   text: "Welcome",
    //   // html: `
    //   // <div>
    //   // <a href=${link}>Click here to activate your account</a>
    //   // </div>`,
    //   html: `<p>Click the following link to activate your account:</p><a href="${activationLink}">${activationLink}</a>`,
    // });
    console.log("mail send successfully");
  } catch (error) {
    console.log(error, "mail failed to send");
  }
};
// ============= Activate Account ============

exports.activateAccount = async (req, res) => {
  try {
    // const user = req.user;
    // const user = localStorage.getItem("user");
    const { user, inputOtp } = req.body;
    console.log(user.otp, inputOtp);
    // Check if the user with the activation token exists
    // console.log("user ====> ", user.isActivated);
    if (!user) {
      return res
        .status(404)
        .json({ error: "User not found or activation token is invalid" });
    }

    // Check if the user is already activated
    if (user.isActivated === true) {
      return res.status(400).json({ error: "User is already activated" });
    } else {
      if (parseInt(inputOtp) === user.otp) {
        const activationStatus = await User.findByIdAndUpdate(
          user._id,
          {
            isActivated: true,
          },
          { new: true }
        );
        await activationStatus.save();
        res.json({ msg: "Account activated" });
      } else {
        return res.status(400).json({ error: "OTP does not match" });
      }

      // res.redirect("/dashboard");
    }

    // Update the user status to activated
    // user.isActivated = true;
    // user.activationToken = undefined; // Clear the activation token after activation
    // await user.save();
    // res.json({ msg: "Account activated" });
    // Redirect or respond with a success message
    // res.redirect("/dashboard"); // Redirect to the login page
  } catch (error) {
    console.error("Error activating account:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
