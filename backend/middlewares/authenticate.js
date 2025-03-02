const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw new Error("Token isn't found.");

    const token = authorization.split("Bearer ")[1];
    if (!token) throw new Error("Token isn't found.");

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user_id = decodedToken.userId;

    next();
  } catch (err) {
    res.status(401).json({ error: "Unauthorized: " + err.message });
  }
};

const adminAuthenticate = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw new Error("Token isn't found.");

    const token = authorization.split("Bearer ")[1];
    if (!token) throw new Error("Token isn't found.");

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const adminEmails = process.env.ADMIN_EMAILS.split(",");
    if (!decodedToken.email || !adminEmails.includes(decodedToken.email)) {
      throw new Error("User isn't admin!");
    }

    req.user_id = decodedToken.userId;

    next();
  } catch (err) {
    res.status(401).json({ error: "Unauthorized: " + err.message });
  }
};

module.exports = {
  authenticate,
  adminAuthenticate,
};
