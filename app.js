require("dotenv").config();

// Imports
const express = require("express");
const mongoose = require("mongoose");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const app = express();


// Get the environment variables
const { DB_HOST, DB_NAME, DB_PORT } = process.env;
const MONGODB_URI = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;
const PORT = process.env.PORT;

const middlewares = [
  express.json({ limit: 5 * 1024 * 1024 }),
  express.urlencoded({ extended: true }),
]
app.use(middlewares);


const setRoutes = require("./routes/routes");
setRoutes(app);

// Database Connection
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("[mongodb] Database connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((e) => {
    return console.log(e);
  });
