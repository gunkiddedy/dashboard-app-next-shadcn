const { authenticate } = require("./middlewares/authenticate");

require("dotenv").config();

const express = require("express"),
  APP = express(),
  cors = require("cors"),
  BODY_PARSER = require("body-parser"),
  // AUTH_ROUTES = require("./routes/auth"),
  AUTH_ROUTES = require("./routes/authRoutes"),
  NOTIFICATION_ROUTES = require("./routes/notifications"),
  { connectDb } = require("./config/db.config"),
  helmet = require("helmet"),
  rateLimit = require("express-rate-limit"),
  xss = require("xss-clean"),
  hpp = require("hpp"),
  mongoSanitize = require("express-mongo-sanitize"),
  nocache = require("nocache");
const _app_folder = "app/dist";
const cookieParser = require("cookie-parser");

(async () => {
  const PORT = process.env.PORT;
  await connectDb();
  APP.listen(PORT, console.log(`Server listening on port ${PORT}...`));
})();

APP.use(
  cors({
    origin: (origin, callback) => {
      const WHITELIST_DOMAINS = [
        "http://localhost:5173",
        "http://localhost:4173",
      ];
      if (
        (process.env.NODE_ENV == "production" &&
          WHITELIST_DOMAINS.indexOf(origin) !== -1) ||
        process.env.NODE_ENV == "development"
      )
        callback(null, true);
      else callback(new Error("Not allowed by CORS"));
    },
  }),
)
  .use(nocache())
  .use(helmet()) // Adds security headers
  .use(xss()) // Prevents XSS attacks by sanitizing user input
  .use(hpp()) // Prevents HTTP Parameter Pollution
  .use(mongoSanitize()) // Prevents NoSQL injection by sanitizing inputs
  .use(express.json())
  .use(BODY_PARSER.json())
  .use(cookieParser())

  .get("/api/status", authenticate, (req, res) => res.json({}))
  .use("/api/auth", AUTH_ROUTES)
  .use("/api/notifications", NOTIFICATION_ROUTES)

  .set("etag", false)
  .use((req, res, next) => {
    res.setHeader(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate",
    );
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    next();
  })
  .get("*.*", express.static(_app_folder, { maxAge: "1y" }))
  .all("*", function (req, res) {
    res.status(200).sendFile(`/`, { root: _app_folder });
  })

  .use((err, req, res, next) => {
    console.log(err);
    res.status(400).json({ message: "Something went wrong!" });
  })

  .use((req, res, next) => res.status(404).json({ message: "Not Found!" }));
