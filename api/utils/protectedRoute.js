const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json({ message: "Unauthorized 😌" });

    const decoded = jwt.verify(token, process.env.JWT_SEC);

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) return res.status(401).json({ message: "Unauthorized 😌" });

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const roleBasedAccess = (roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
};

module.exports = { protectedRoute, roleBasedAccess };
