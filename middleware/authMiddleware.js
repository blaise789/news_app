import jwt from "jsonwebtoken";
export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
console.log(authHeader)
  if (authHeader == null || authHeader == undefined) {
    return res.status(401).json({ error: "not authorized" });
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err)
      return res.status(401).json({ status: 401, message: "invalid token" });
    req.user = user;
    next()
  });
};
