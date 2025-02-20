const jwt = require("jsonwebtoken");

// MID TO VERIFY JWT TOKENS
function authenticationToken(req, res, next) {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ messaage: "Access Denied" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // ATTACH USER DETAILS TO REQUEST
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid Token" });
  }
}

// MID TO RESTRICT ACCESS BASED ON ROLES
function authorizeRoles(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Access Denied: Insufficient Permissions" });
    }
    next();
  };
}

module.exports = { authenticationToken, authorizeRoles };
