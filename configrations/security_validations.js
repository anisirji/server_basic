const asyncHandler = require("express-async-handler");
const { default: rateLimit } = require("express-rate-limit");

const LoginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit to 5 requests per windowMs
  message: "Too many login attempts from this IP, please try again later.",
});
module.exports = { LoginRateLimiter };
