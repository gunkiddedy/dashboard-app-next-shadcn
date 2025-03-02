const jwt = require("jsonwebtoken");

// Generate short-lived access token
const generateAccessToken = (user) => {
  return jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }, // Access token valid for 15 minutes
  );
};

// Generate long-lived refresh token (e.g., 30 days)
const generateRefreshToken = (user) => {
  return jwt.sign(
    { userId: user.id, email: user.email },
    process.env.REFRESH_SECRET,
    { expiresIn: "30d" }, // Refresh token valid for 30 days
  );
};

// Middleware to refresh access token using the refresh token cookie
const refreshToken = async (req, res) => {
  const refreshToken = req.cookies?.refreshToken;
  if (!refreshToken)
    return res.status(401).json({ error: "Refresh token not found" });

  try {
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
  generateAccessToken,
  generateRefreshToken,
  refreshToken,
};
