const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  let token;

  if (req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = decoded;

      next();
    } catch (error) {
      res.status(401).json({
        message: "Not authorized",
      });
    }
  }

  if (!token) {
    res.status(401).json({
      message: "No token found",
    });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user.role === "Admin") {
    next();
  } else {
    res.status(403).json({
      message: "Admin access only",
    });
  }
};

module.exports = {
  protect,
  adminOnly,
};