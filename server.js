const express = require("express");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss");
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("dotenv");
const app = express();

//XSS protection --- Cross-Site-Scripting
app.use(
  helmet({
    poweredBy: false,
    noCache: true,
    frameguard: { action: "deny" },
  })
);

app.use(
  cors({
    origin: "http://localhost:3000", // Replace with the actual frontend URL
    credentials: true,
  })
);

//Limit Brute Force Attack
app.use(
  rateLimit({
    //min*seconds*miliseconds
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 15 * 120, // Limit to 5 requests per windowMs
    message: "Too many api req from this ip pls come later",
  })
);

//Sanitize user input to prevent XSS and low request url
app.use((req, res, next) => {
  console.log("Request--->", req.url);
  req.body = xss(req.body);
  next();
});

app.use(express.json({ limit: "5mb", extended: true }));
app.use(
  express.urlencoded({ limit: "5mb", extended: true, parameterLimit: 50000 })
);
app.use(cookieParser());

///////////////////////////////////////////////////////

app.get("/name/:name", (req, res) => {
  res.send(req.params.name);
});
app.post("/test", (req, res) => {
  const { name } = req.body;
  res.send({ name: name });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
  if (err) {
    console.log("Server Not Started", "Some Error Occurred");
  }
  console.log("Server started at localhost:" + PORT);
});
