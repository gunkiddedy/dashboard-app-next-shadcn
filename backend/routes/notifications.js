const {
    authenticate,
    adminAuthenticate,
  } = require("../middlewares/authenticate"),
  EXPRESS = require("express"),
  ROUTER = EXPRESS.Router(),
  NOTIFICATIONS_CONTROLLERS = require("../controllers/notifications.js");

ROUTER.use(authenticate)
  .post(
    "/broadcast",
    adminAuthenticate,
    NOTIFICATIONS_CONTROLLERS.createBroadcastNotification,
  )
  .get("/get-notifications", NOTIFICATIONS_CONTROLLERS.getNotifications)
  .post("/read-notifications", NOTIFICATIONS_CONTROLLERS.readNotifications)
  .get(
    "/get-notification-by-user",
    NOTIFICATIONS_CONTROLLERS.getNotificationByUser,
  )
  .put("/read-notification/:msg_id", NOTIFICATIONS_CONTROLLERS.readNotification)
  .post("/read-all", NOTIFICATIONS_CONTROLLERS.readAllNotifications);

module.exports = ROUTER;
