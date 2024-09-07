import jwt from "jsonwebtoken";
import errorMiddleWare from "../Middlewares/error.js";
class JWT {
  static createToken = (payload, res) => {
    try {
      const token = jwt.sign(payload, "your-secret-key", {
        expiresIn: "1h",
      });
      return token;
    } catch (e) {
      errorMiddleWare(e, res);
    }
  };

  static verifyToken = (token, res) => {
    try {
      const decoded = jwt.verify(token, "your-secret-key");

      return decoded;
    } catch (e) {
      e.message='Verification failed!',
      e.status=404,
      errorMiddleWare(e, res);
    }
  };
}

export default JWT;
