import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const isCustomAuth = token?.length < 500;

    if (!token) return res.status(401).json({ message: "No token provided" });

    let decodedData;
    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, process.env.SECRET_KEY);

      req.userId = decodedData?.id;
      req.email = decodedData?.email;
    } else {
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub;
    }

    next();
  } catch (error) {
    // console.log(error, "error");
    res.status(403).json({ message: "Token is not valid" });
  }
};

export default auth;
