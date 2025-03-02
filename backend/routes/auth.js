const {
    authenticate,
    adminAuthenticate,
  } = require("../middlewares/authenticate"),
  EXPRESS = require("express"),
  ROUTER = EXPRESS.Router(),
  AUTH_CONTROLLERS = require("../controllers/auth");

ROUTER.post("/create-user", AUTH_CONTROLLERS.createUser)
  .post(
    "/check-if-phone-number-exists",
    AUTH_CONTROLLERS.checkIfPhoneNumberExists,
  )
  .post("/check-user-by-email", AUTH_CONTROLLERS.checkUserByEmail)
  .post("/get-user-by-token", AUTH_CONTROLLERS.getUserByToken)

  .post(
    "/create-user-by-admin",
    adminAuthenticate,
    AUTH_CONTROLLERS.createUserByAdmin,
  )

  .use(authenticate)
  .put("/change-password", AUTH_CONTROLLERS.changePassword)
  .get("/login", AUTH_CONTROLLERS.login)
  .get("/me", AUTH_CONTROLLERS.me)
  .get("/get-all-users", adminAuthenticate, AUTH_CONTROLLERS.getAllUsers)
  .put("/update-user", AUTH_CONTROLLERS.updateUser)
  .get("/delete-user", AUTH_CONTROLLERS.deleteUser)
  .put("/update-user-by-id", AUTH_CONTROLLERS.updateUserData)
  .post("/google-auth", AUTH_CONTROLLERS.googleAuth);

module.exports = ROUTER;
