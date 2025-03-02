const ADMIN = require("firebase-admin"),
  User = require("../models/users"),
  BYCRIPT = require("bcrypt"),
  { getAuth } = require("firebase-admin/auth");

const createUser = async (req, res) => {
  try {
    const {
      body: {
        first_name,
        last_name,
        email,
        password,
        phone_number,
        country,
        city,
      },
    } = req;

    if (!first_name) throw new Error("Firest Name is required.");
    if (!last_name) throw new Error("Last Name is required.");
    if (!email) throw new Error("Email is required.");
    if (!password) throw new Error("Password is required.");
    if (!country) throw new Error("Country is required.");
    if (!city) throw new Error("City is required.");

    const newUser = await ADMIN.auth().createUser({ email, password });
    if (!newUser) throw new Error("Failed to create the user.");

    const user = await new User({
      first_name,
      last_name,
      email,
      phone_number,
      country,
      city,
      user_id: newUser.uid,
    }).save();
    if (!user) {
      await ADMIN.auth().deleteUser(newUser.uid);
      throw new Error("Failed to register the user.");
    }

    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { user_id } = req,
      user = await User.findOne({ user_id });
    if (!user) throw new Error("User not found.");
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
};

const me = async (req, res) => {
  try {
    const { user_id } = req,
      user = await User.findOne({ user_id });
    if (!user) throw new Error("User not found");
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const {
      userId,
      body: { first_name, last_name, country, city },
    } = req;

    let dataToUpdate = {};
    if (first_name) dataToUpdate.firstName = first_name;
    if (last_name) dataToUpdate.lastName = last_name;
    if (country) dataToUpdate.country = country;
    if (city) dataToUpdate.city = city;
    if (!Object.keys(dataToUpdate).length)
      throw new Error("Please provide any data to update.");

    const user = await User.findOneAndUpdate({ userId }, dataToUpdate);
    if (!user) throw new Error("User is failed to update");

    res.json({});
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const {
      body: { user_id },
    } = req;
    if (!user_id) throw new Error("User ID not found");

    const delFbRes = await ADMIN.auth().deleteUser(user_id);
    if (!delFbRes) throw new Error("User is failed to delete.");

    const delMongoRes = await User.deleteOne({ user_id });
    if (!delMongoRes) throw new Error("User is failed to delete.");

    res.json({});
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
};

const changePassword = async (req, res) => {
  try {
    const {
      user_id,
      body: { old_password, new_password },
    } = req;
    if (!old_password) throw new Error("Old Password is not defined");
    if (!new_password) throw new Error("New Password is not defined");
    if (old_password == new_password)
      throw new Error("New password must be different from current password.");

    await ADMIN.auth().updateUser(user_id, { password: new_password });

    res.json({});
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
};

const checkIfPhoneNumberExists = async (req, res) => {
  let foundByEmail = true,
    foundByPhNo = true;
  try {
    const {
      body: { phoneNumber, email },
    } = req;

    const PHONE_NUMBER_RESULT = phoneNumber
      ? await User.findOne({ phone_number: phoneNumber })
      : null;
    if (!PHONE_NUMBER_RESULT) foundByPhNo = false;

    if (email) await getAuth().getUserByEmail(email);
    else foundByEmail = null;

    res.json({ phExist: foundByPhNo, emExist: foundByEmail });
  } catch (err) {
    if (err.code == "auth/user-not-found") {
      foundByEmail = false;
      return res.json({ phExist: foundByPhNo, emExist: foundByEmail });
    }
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
};

async function checkUserByEmail(req, res) {
  try {
    await ADMIN.auth().getUserByEmail(req.body.email);
    res.status(200).json({});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

const updateUserData = async (req, res) => {
  try {
    const { user_id, body } = req;
    if (!body || !Object.values(body).length)
      throw new Error("Payload not found");
    const UPDATED_USER = await User.findOneAndUpdate({ user_id }, body, {
      new: true,
    });
    if (!UPDATED_USER)
      throw new Error("Either user not found or user failed to update.");
    res.json(UPDATED_USER);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
};

const googleAuth = async (req, res) => {
  try {
    const {
      user_id,
      body: { firstName, lastName, email, phone_number, isAlreadyRegistered },
    } = req;
    if (!email) throw new Error("Rquired fields not found.");

    if (!isAlreadyRegistered) {
      const USER = {
        emailVerified: true,
        first_name: firstName,
        last_name: lastName,
        email,
        password: "",
        country: "",
        city: "",
        phone_number,
        isVerified: true,
        createdAt: new Date().toUTCString(),
        user_id,
        isSignWithGoogle: true,
      };

      const NEW_USER = new User(USER);
      await NEW_USER.save();
      if (!NEW_USER) throw new Error("Failed to create the user.");
      res.status(200).json(NEW_USER._doc);
    } else {
      const EXISTING_USER = await User.findOne({ user_id });
      if (!EXISTING_USER) throw new Error("User not found.");
      res.status(200).json(EXISTING_USER._doc);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getUserByToken = async (req, res) => {
  try {
    const {
      body: { email },
    } = req;
    if (!email) throw new Error("Email not found.");
    const user = await User.findOne({ email });
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({});
  }
};

const getAllUsers = async (req, res) => {
  try {
    let {
      query: { userType, page, limit },
    } = req;
    if (!userType) throw new Error("User Type not defined.");
    if (!page) throw new Error("Page not defined.");
    if (!limit) throw new Error("Limit not defined.");

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    userType = userType == 1 ? true : false;

    let USER_COUNT = await User.countDocuments(
        userType ? { email: { $exists: true, $ne: "" } } : {},
      ),
      USERS = await User.find(
        userType ? { email: { $exists: true, $ne: "" } } : {},
      )
        .skip((page - 1) * limit)
        .limit(limit);

    res.json({ users: USERS, total: USER_COUNT });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

const createUserByAdmin = async (req, res) => {
  try {
    const {
      body: {
        first_name,
        last_name,
        email,
        phone_number,
        password,
        country,
        city,
        isVerified,
      },
    } = req;
    if (!first_name || !last_name || !email || !phone_number || !password)
      throw new Error("Please provide the required fields.");

    const userRecord = await ADMIN.auth().createUser({
        email,
        password,
        emailVerified: true,
        displayName: "createdByAdmin",
      }),
      { uid } = userRecord,
      hashedPassword = await BYCRIPT.hash(password, 10),
      newUser = await new User({
        user_id: uid,
        emailVerified: true,
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: hashedPassword,
        isVerified,
        searchTokenRemaining: 20,
        phone_number: phone_number,
        totalSearch: 0,
        country,
        city,
        adminManuallyRegistered: true,
      }).save();

    if (!newUser) {
      await ADMIN.auth().deleteUser(uid);
      throw new Error("Failed to create the user");
    }

    res.json({});
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createUser,
  login,
  me,
  updateUser,
  deleteUser,
  changePassword,
  checkIfPhoneNumberExists,
  checkUserByEmail,
  updateUserData,
  googleAuth,
  getUserByToken,
  getAllUsers,
  createUserByAdmin,
};
