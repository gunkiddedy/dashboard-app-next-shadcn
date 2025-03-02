const {
  generateAccessToken,
  generateRefreshToken,
} = require("../services/authService");
const CrudService = require("../services/crudService");
const User = require("../models/users");
const RefreshToken = require("../models/refreshToken");
const normalizeEmail = require("../utils/normalizeEmail");
const jwt = require("jsonwebtoken");
const dbType = process.env.DB_TYPE;

// Initialize CrudService for the User model
const userService = new CrudService(User, dbType);
const refreshTokenService = new CrudService(RefreshToken, dbType);

// Register controller (sign up new users)
const register = async (req, res) => {
  try {
    // Normalize the email
    const email = normalizeEmail(req.body.email);

    const existingUser = await userService.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    const newUser = await userService.create({ email, ...req.body });
    // const accessToken = generateAccessToken(newUser);
    const refreshToken = generateRefreshToken(newUser);
    await refreshTokenService.create({
      userId: newUser.id,
      token: refreshToken,
    });

    // Set refresh token as HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // secure in production
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Registration failed: " + err.message });
  }
};

// Login controller
const employeeLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Normalize the email
    // email = normalizeEmail(emailLogin);

    const user = await userService.findOne({ email });
    if (!user || !(user.dataValues.password === password)) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Check for existing refresh token in the database
    const existingToken = await refreshTokenService.findOne({
      userId: user.id,
    });
    if (existingToken) {
      // If a refresh token already exists, update it with the new token
      await refreshTokenService.update(existingToken.id, {
        token: refreshToken,
      });
    } else {
      // If no token exists, create a new refresh token record
      await refreshTokenService.create({
        userId: user.id,
        token: refreshToken,
      });
    }

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ accessToken, refreshToken, success: true, user });
  } catch (err) {
    res.status(500).json({ error: "Login failed: " + err });
  }
};

// Refresh token controller
const refreshAccessToken = async (req, res) => {
  const refreshToken = req.cookies?.refreshToken;
  if (!refreshToken)
    return res.status(401).json({ error: "Refresh token not found" });

  try {
    const storedToken = await refreshTokenService.findOne({
      token: refreshToken,
    });
    if (!storedToken)
      return res.status(401).json({ error: "Invalid refresh token" });

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
    const newAccessToken = generateAccessToken({
      id: decoded.userId,
      email: decoded.email,
    });

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired refresh token" });
  }
};

module.exports = {
  register,
  employeeLogin,
  refreshAccessToken,
};
