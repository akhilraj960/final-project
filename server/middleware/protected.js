const jwt = require("jsonwebtoken");

const protected = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = extractBearerToken(authHeader);

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - Please login again" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Assuming that the decoded token contains user information
    req.body.user = decodedToken;

    // Log user information if needed
    // console.log(decodedToken);

    // Call the next middleware or route handler
    next();
  } catch (error) {
    console.error("Error during token verification:", error);
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized - Please login again" });
  }
};

const extractBearerToken = (authHeader) => {
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.substring(7); // "Bearer " is 7 characters long
  }
  return null;
};

module.exports = protected;
