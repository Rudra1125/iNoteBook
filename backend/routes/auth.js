// This is a authentication end point..
// we are using thunder client to access the end points within the vs-code whenever necessary
// We don't have to switch the application 
// here we have created a collection--(collection of end-points which are related to the applicatoion)
// here we can send the request and check the with in the vs-code
const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET ='Thisisagoodboy';
//create a user  using :POST "/api/auth/creat".Doesn't require Auth
// create User
// No Login required


router.post(
  "/createUser",
  [
    body("email", "Enter a valid email").isEmail(),
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    // if there are errors return bad request and the errors

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //  check whether user with the same email exist already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email already exists" });
      }
      // creating a variable which is a secure password
      const salt = await bcrypt.genSalt(10)

      const secPass = await bcrypt.hash(req.body.password,salt);


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
      const data= {
        user: {
          id: user.id
        }
      }
      const authToken = jwt.sign(data,JWT_SECRET);
      //console.log(authToken);
      res.json({authToken});
    } catch (error) {
      //  this is used when some error occured in feching from the database of something else
      console.error(error.message);
      res.status(500).send("some error occured")
    }
  }
);
module.exports = router;
