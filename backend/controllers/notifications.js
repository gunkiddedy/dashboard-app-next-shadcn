const Notification = require("../models/notification"),
  User = require("../models/users");

// Create a broadcast notification
const createBroadcastNotification = async (req, res) => {
  const { title, text } = req.body;
  if (!title || !text) throw new Error("Required data not found");

  const USERS = await User.find({}).lean(),
    USER_IDS = USERS.map((user) => user.user_id),
    PROMISED_ARRAY = [];

  USER_IDS.map(async (userId) => {
    const OBJ = {
      ...{ title, text },
      user_id: userId,
      read: false,
      created_at: new Date(),
    };
    let promiseObj = await Notification.create(OBJ);
    PROMISED_ARRAY.push(promiseObj);
  });

  res.status(200).json({ message: "Notification created successfully" });
};

// Get Notifications By User
const getNotificationByUser = async (req, res) => {
  try {
    const { user_id } = req;
    const NOTIFICATIONS = await Notification.find({ user_id });
    res.send(NOTIFICATIONS);
  } catch (error) {
    console.error("Error getting notifications:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const readNotification = async (req, res) => {
  try {
    const { msg_id } = req.params,
      RESULT = await Notification.updateOne(
        { _id: msg_id },
        { $set: { read: true } },
      );
    if (RESULT.modifiedCount === 1) {
      res
        .status(200)
        .json({ message: "Notification marked as read successfully" });
    } else {
      res.status(404).json({ error: "Notification not found" });
    }
  } catch (error) {
    console.error("Error marking notification as read:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const readAllNotifications = async (req, res) => {
  try {
    const { user_id } = req;
    await Notification.updateMany({ user_id }, { $set: { read: true } });
    res.status(200).json({ message: "All notifications read successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getNotifications = async (req, res) => {
  try {
    const {
      user_id,
      query: { page },
    } = req;
    if (!user_id) throw new Error("User ID not found.");
    const LIMIT = 10,
      CURRENT_LIMIT = LIMIT * page,
      SKIP = (page - 1) * LIMIT,
      NOTIFICATIONS = await Notification.find({ user_id })
        .sort({ _id: -1 })
        .skip(SKIP)
        .limit(CURRENT_LIMIT);
    if (!NOTIFICATIONS) throw new Error("Failed to get the Notifications.");

    const TOTAL_DOCS = await Notification.countDocuments({ user_id });
    if (typeof TOTAL_DOCS !== "number")
      throw new Error("Failed to get the Notification count.");
    res.json({ data: NOTIFICATIONS, total: TOTAL_DOCS });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

const readNotifications = async (req, res) => {
  try {
    const {
      body: { ids },
    } = req;
    if (!ids.length) return res.json({});
    await Notification.updateMany(
      { _id: { $in: ids } },
      { $set: { read: true } },
    );
    res.json({});
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createBroadcastNotification,
  getNotificationByUser,
  readNotification,
  readAllNotifications,

  getNotifications,
  readNotifications,
};
