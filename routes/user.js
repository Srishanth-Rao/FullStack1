const express = require("express");
const router = express.Router();
const passport = require("passport");
const wrapAsync = require("../utils/wrapAsync.js");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/users.js");

// Signup routes
router.route("/signup")
    .get(userController.renderSignup)
    .post(wrapAsync(userController.signup));

// Login routes
router.route("/login")
    .get(userController.renderLogin)
    .post(
        passport.authenticate("local", {
            failureRedirect: "/login",
            failureFlash: true
        }),
        userController.login
    );

// Logout route
router.get("/logout", userController.logout);

module.exports = router;