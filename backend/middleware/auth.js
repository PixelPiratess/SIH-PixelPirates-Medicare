const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  console.log("Auth middleware called");
  const token = req.header("Authorization")?.split(" ")[1];
  console.log("Token:", token);

  if (!token) {
    console.log("No token provided");
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    console.log("Attempting to verify token");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);
    if (decoded.user) {
      req.user = decoded.user;
      console.log("User authenticated");
    } else if (decoded.hospital) {
      req.hospital = decoded.hospital;
      console.log("Hospital authenticated");
    } else {
      console.log("Invalid token payload");
      throw new Error("Invalid token payload");
    }
    next();
  } catch (err) {
    console.error("Token verification failed:", err.message);
    res.status(401).json({ message: "Token is not valid" });
  }
};
