// db.config.js
const mongoose = require("mongoose");
const { Sequelize } = require("sequelize");

const dbType = process.env.DB_TYPE || "mongodb"; // Default to MongoDB if not specified
const isProduction = process.env.NODE_ENV === "production";

// Create a Sequelize instance only if PostgreSQL is used
let sequelize;
if (dbType === "postgres") {
  sequelize = new Sequelize(
    isProduction ? process.env.LIVE_PG_DB : process.env.DEV_PG_DB,
    isProduction ? process.env.LIVE_PG_USER : process.env.DEV_PG_USER,
    isProduction ? process.env.LIVE_PG_PASS : process.env.DEV_PG_PASS,
    {
      host: isProduction ? process.env.LIVE_PG_HOST : process.env.DEV_PG_HOST,
      dialect: "postgres",
      logging: false,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    },
  );
}

const connectDb = async () => {
  if (dbType === "mongodb") {
    const mongoUri = isProduction
      ? process.env.LIVE_MONGO_URI
      : process.env.DEV_MONGO_URI;
    await mongoose
      .connect(mongoUri)
      .then(() => console.log("Connected to MongoDB"))
      .catch((err) => console.error("MongoDB connection error:", err));
  } else if (dbType === "postgres") {
    try {
      await sequelize.authenticate();
      console.log("Connected to PostgreSQL");

      await sequelize.sync({ alter: true });
    } catch (error) {
      console.error("PostgreSQL connection error:", error);
    }
  } else {
    throw new Error(
      "Unsupported DB_TYPE. Please use either 'mongodb' or 'postgres'.",
    );
  }
};

module.exports = { connectDb, sequelize };
