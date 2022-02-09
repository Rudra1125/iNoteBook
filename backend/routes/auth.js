// This is a authentication end point..
// we are using thunder client to access the end points within the vs-code whenever necessary
// We don't have to switch the application
// here we have created a collection--(collection of end-points which are related to the applicatoion)
// here we can send the request and check the with in the vs-code
const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs"); // it is used to add hash code and salt
const jwt = require("jsonwebtoken");
var fetchuser =require('../middleware/fetchuser');

const JWT_SECRET = "Thisisagoodboy";
//create a user  using :POST "/api/auth/create".Doesn't require Auth
// create User
// No Login required
//Route 1
router.post(
  "/createUser",
  [
    body("email", "Enter a valid email").isEmail(),
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    // if there are errors return bad request and the errors
    let success= false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }

    //  check whether user with the same email exist already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({success, error: "Sorry a user with this email already exists" });
      }
      // creating a variable which is a secure password
      const salt = await bcrypt.genSalt(10);
      //added hash code to the password and addded salt to it to secure it
      const secPass = await bcrypt.hash(req.body.password, salt);

      // This is  used to create a user
      // here we are using async await function
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      // .then(user => res.json(user))
      // .catch(err=> {console.log(err)
      //   res.json({error:'please enter a unique value for email', message: err.message})});

      // res.send(req.body);

      //created a data which takes id of user and return the JWT
      const data = {
        user: {
          id: user.id,
        },
      };
      //We are assign the singnature to the user
      const authToken = jwt.sign(data, JWT_SECRET);
      //console.log(authToken);
      // sending authentication token to the json response page
       success=true;
      res.json({success, authToken });
    } catch (error) {
      //  this is used when some error occured in feching from the database of something else
      console.error(error.message);
      res.status(500).send("Enternal Server Error");
    }
  }
);

//Authentication  a user  using :POST "/api/auth/login
// Route 2
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "PAssword cannot be blank").exists(),
  ],
  //valodate the email and password
  async (req, res) => {
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success=false
        return res
          .status(400)
          .json({ success,error: "Please try to login with correct credentials" });
      }
      // here we have compare the password using bycrpt.compare function
      const passwordComapare = await bcrypt.compare(password, user.password);
      if (!passwordComapare) {
        success=false;
        return res
          .status(400)
          .json({success, error: "Please try to login with correct credentials" });
      }
      // stored the data and return the data to auth token
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success=true;
      res.json({success, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Enternal Server Error");
    }
  }
);

// Route 3
// Get logged in user details using post "/api/auth/getUser".
// here login is required
// here we  give a fetchuser function as a middle ware  and this function will run
// before the async function. 
router.post("/getUser",fetchuser, async (req, res) => {
  try {
    //  here we are taking user id as to find the the user by its user id
    var userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Enternal Server Error");
  }
});
module.exports = router;
