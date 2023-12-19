const { validateToken } = require("../helpers/token");

function checkForAuth(Authorization) {
  return (req, res, next) => {
    const tokenValue = req.headers.authorization;
    // console.log(tokenValue)
   
    // Check if token is missing
    if (!tokenValue) {
      return res.status(401).json({ error: "unauthorized" });
    }

    try {
      // Validate the token and extract user payload
      const userPayload = validateToken(tokenValue);

      // Attach the user payload to the request object
      req.user = userPayload;
      //  console.log(userPayload)
      return next();
    } catch (error) {
      return res.status(401).json({ error: "Invalid token" });
    }

    next();
  };
}

module.exports = { checkForAuth };
