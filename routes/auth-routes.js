const express = require ("express");
const jwt = require ("jsonwebtoken");
// const pool = require ("../db.js");
const bcrypt = require ("bcrypt");
const { jwtTokens } = require ("../utils/jwt-helpers.js");
const { User } = require ("../models/Users.js");
const {authenticateToken} = require ('../middleware/authorization.js');


const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    // console.log(req.cookies, req.get("origin"));
    const { email, password } = req.body;
    const users = await User.findAll({
      where: {
        user_email: email,
      },
    });

    // const users = await pool.query(
    //   "SELECT * FROM users WHERE user_email = $1",
    //   [email]
    // );
    // return res.json(users);
    if (users.length === 0)
      return res.status(401).json({ error: "Email is incorrect" });
    //PASSWORD CHECK
    const validPassword = await bcrypt.compare(
      password,
      users[0].user_password
    );
    if (!validPassword)
      return res.status(401).json({ error: "Incorrect password" });
    // return res.status(200).json("success");
    //JWT
    let tokens = jwtTokens(users[0]);

    //Gets access and refresh tokens
    // res.cookie("refresh_token", tokens.refreshToken, {
    //   ...(process.env.COOKIE_DOMAIN && { domain: process.env.COOKIE_DOMAIN }),
    //   httpOnly: true,
    //   sameSite: "none",
    //   secure: true,
    // });

    // const userss = await pool.query(
    //   "UPDATE users SET access_token = $1, refresh_token= $2 WHERE user_email = $3",
    //   [tokens.accessToken, tokens.refreshToken, email]
    // );
    await User.update(
      { refresh_token: tokens.refreshToken, access_token: tokens.accessToken },
      {
        where: {
          user_email: email,
        },
      }
    );
    res.json(tokens);
  } catch (error) {
    res.status(401).json({ error: error.message });
    // console.log(error, '---------');
  }
});

router.get("/refresh_token", (req, res) => {
  try {
    // console.log(req.headers);
    const refreshToken = req.headers["refresh-token"];
    if (refreshToken === null) return res.sendStatus(401);
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (error, user) => {
        if (error) return res.status(403).json({ error: error.message });
        let tokens = jwtTokens(user);
        // res.cookie("refresh_token", tokens.refreshToken, {
        //   ...(process.env.COOKIE_DOMAIN && {
        //     domain: process.env.COOKIE_DOMAIN,
        //   }),
        //   httpOnly: true,
        //   sameSite: "none",
        //   secure: true,
        // });
        // console.log(user)
        await User.update(
          {
            refresh_token: tokens.refreshToken,
            access_token: tokens.accessToken,
          },
          {
            where: {
              user_email: user.user_email
            },
          }
          );
        // console.log('-------', user);
        return res.json(tokens);
      }
    );
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

router.delete("/refresh_token", authenticateToken,  async (req, res) => {
  try {
    // console.log("______", req.user);
    // res.clearCookie("refresh_token");
    await User.update(
      { refresh_token: null, access_token: null },
      {
        where: {
          user_email: req.user.user_email,
        },
      }
    );
    return res.status(200).json({ message: "Refresh token deleted." });
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: error.message });
  }
});

module.exports = router;
