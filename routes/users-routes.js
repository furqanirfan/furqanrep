const bcrypt = require("bcrypt");
const express = require("express");
const pool = require("../db.js");
const { authenticateToken } = require("../middleware/authorization.js");
// const { Users } = require ('../models/user.js');
const { User } = require("../models/users.js");
const { jwtTokens } = require("../utils/jwt-helpers.js");

let refreshToken = [];

const router = express.Router();

router.get("/", authenticateToken, async (req, res) => {
  try {
    // console.log(req.cookies);
    // const users = await pool.query('SELECT * FROM users');
    const users = await User.findAll({
      // where: {
      //   user_email: email
      // }
    });
    // console.log(users);
    res.json({ users: users });
    // return res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    // const newUser = await pool.query(
    //   'INSERT INTO users (user_name,user_email,user_password) VALUES ($1,$2,$3) RETURNING *'
    //   , [req.body.name, req.body.email, hashedPassword]);
    const newUser = await User.findAll({
      where: {
        user_email: email,
        user_name: name,
        user_password: hashedPassword,
      },
    });
    res.json(jwtTokens(newUser.rows[0]));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
