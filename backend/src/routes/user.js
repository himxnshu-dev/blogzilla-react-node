const { Router } = require("express");
const router = Router();
const {
  handleGetUserSignin,
  handleGetUserSignup,
  handleUserSignin,
  handleUserSignup,
  handleUserLogout,
  handleCheckUser,
} = require("../controllers/user");
const { authenticateUserToken } = require("../middlewares/auth.middleware");

router.route("/signup").get(handleGetUserSignup).post(handleUserSignup);

router.route("/signin").get(handleGetUserSignin).post(handleUserSignin);

router.get("/logout", authenticateUserToken, handleUserLogout);

router.get("/check-user", authenticateUserToken, handleCheckUser);

module.exports = router;
