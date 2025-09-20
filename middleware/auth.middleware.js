const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; 

  if (!token) return res.status(401).json({ 
    status: "forbidden",
    message: "No token provided" 
});

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ 
      status: "forbidden",
      message: "Invalid token" 
    });
    req.user = decoded;
    next();
  });
};

const adminMiddleware = (req, res, next) => {
  if (!req.user?.roles.includes('admin')) {
      return res.status(403).json({
          status: "forbidden",
          message: "Admin access required"
      });
  } 
  next();
}

export { authMiddleware, adminMiddleware };