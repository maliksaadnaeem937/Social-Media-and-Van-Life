import responseMiddleWare from "./Middlewares/res.js";
import jwt from "jsonwebtoken";
class ProtectedRoutes {
  static getProtectedRoute = (req, res) => {
    responseMiddleWare(200, req.user, res);
  };
}
export default ProtectedRoutes;
