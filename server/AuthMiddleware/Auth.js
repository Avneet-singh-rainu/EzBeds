const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    console.log("auth header not set");
    return res
      .status(401)
      .json({ message: "Authorization header not provided" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, "ssshhh", (err, user) => {
    if (err)
      return res.status(403).json({ message: "Only admins are allowed" });

    console.log(req.params.id + "    ...  in auth ");
    req.user = user;
    next();
  });
};

module.exports = verifyToken;
