const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const morgan = require("morgan");
const redis = require("redis");
const expressSession = require("express-session");
const expressValidator = require("express-validator");
const RedisStore = require("connect-redis")(expressSession);
const config = require("./config");

const { pipe } = require("ramda");

/*
 * Create Redis Client
 */
const RedisClient = redis.createClient(config.redis.url);

/*
 * Connect to MongoDB
 */

if (config.database.user && config.database.password) {
  mongoose.connect(
    `mongodb://${config.database.user}:${config.database.password}@${config.database.host}/${config.database.name}`,
    {
      useMongoClient: true
    }
  );
} else {
  mongoose.connect(
    `mongodb://${config.database.host}/${config.database.name}`,
    {
      useMongoClient: true
    }
  );
}

/*
 * MongoDb Connection
 */
const Connection = mongoose.connection;

/*
 * Apply Express Sessions to app and store to redis
 */
app.use(
  expressSession({
    secret: config.salt.session,
    store: new RedisStore({
      ttl: config.redis.ttl,
      client: RedisClient
    }),
    saveUninitialized: false,
    resave: false
  })
);

if (config.node.env === "development") {
  RedisClient.on("ready", () => {
    console.log("redis is running");
  });
}

RedisClient.on("error", err => {
  console.log("redis is not running");
  console.log(err);
});

/*
 * Check Connection Simple as possible
 * State Code: 0 - Disconnected; 1 - Connected; 2 - Connecting; 3 - Disconnecting;
 */
if (config.node.env === "development") {
  console.log("Mongoose State Status:", Connection.readyState);
}
/*
 * Load Router
 */
const { V1 } = require("./Server/Route");

/*
 * Declare Mongoose Promise as global
 */
mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(expressValidator());

/*
 * Console Output for development
 */
app.use(morgan("short"));

/*
 * Enable CORS
 */
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use((error, req, res, next) => {
  pipe(
    x => x.status(error.statusCode || 500),
    x =>
      x.json({
        success: false,
        trace: process.env.NODE_ENV === "development" ? error : null,
        message:
          process.env.NODE_ENV === "development"
            ? error.message || "Error occurred"
            : "Something went wrong"
      })
  )(res);
});

/*
 * Description: define static directory /public/ as /assets/
 * Access: ./assets/dirname/filename.ext etc ...
 */
if (config.node.env === "development ") {
  app.use("/assets", express.static(path.join(__dirname, "public")));
  app.use("/image", express.static(path.join(__dirname, "upload/images")));
}

/*
 * Access to API Endpoint
 * Version: 1
 */
app.use("/api/v1/", [V1.MessageRouter]);

app.get("/__info__", (req, res) =>
  res.json({
    title: config.info.title,
    version: config.info.version
  })
);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

/*
 * Listen to 3000 or Take Free Port
 */
http.listen(config.server.port, () => {
  if (config.node.env === "development") {
    console.log(`Server Run's at ${config.server.port}`);
  }
});
