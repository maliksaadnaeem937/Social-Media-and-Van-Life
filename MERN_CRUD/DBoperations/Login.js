import errorMiddleWare from "./Middlewares/error.js";
import responseMiddleWare from "./Middlewares/res.js";
import userModel from "../Schema/userschema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import unverifiedUserModel from "../Schema/unverifiedUsers.js";
import sendEmail from "./Middlewares/transporter.js";

class Login {
  static userLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw Object.assign(new Error("Please Fill Out All Fields"), {
          status: 400,
        });
      }
      const ifPresent = await userModel.findOne({ email });
      if (!ifPresent) {
        throw Object.assign(new Error("Wrong email or password "), {
          status: 400,
        });
      }
      const { _id, name } = ifPresent;

      const match = await bcrypt.compare(password, ifPresent.password);
      console.log(match);
      if (!match ) {
        const e = new Error();
        e.message = "wrong email or password";
        e.status = 400;
        return errorMiddleWare(e, res);
      }

      const payLoad = {
        email,
        user_id: _id,
        user_name: name,
      };

      const token = jwt.sign(payLoad, "your-secret-key", { expiresIn: "1h" });
      console.log("user is logging in with payload ", payLoad);

      responseMiddleWare(200, token, res);
    } catch (e) {
      errorMiddleWare(e, res);
    }
  };

  static getLogin_Register_Page = (req, res) => {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      console.log("starts with bearer");
      const token = authHeader.split(" ")[1];

      if (token) {
        jwt.verify(token, "your-secret-key", (err, decoded) => {
          if (err) {
            responseMiddleWare(
              200,
              (err.message = "Jwt verification failed grant access"),
              res
            );
          } else {
            responseMiddleWare(302, "Redirect", res);
          }
        });
        return;
      }
      return responseMiddleWare(200, "GRANT ACCESS", res);
    }
    return responseMiddleWare(200, "grant access", res);
  };

  /// new approaches

  static getVerifyEmailPage = async (req, res) => {
    try {
      const userId = req.params.id;
      const token = req.params.token;

      if (userId && token) {
        const user = await unverifiedUserModel.findById(userId);

        if (user) {
          return responseMiddleWare(200, "Ok", res);
        }
      }

      const error = new Error("User is not in unverified database.");
      error.status = 302;
      throw error;
    } catch (error) {
      errorMiddleWare(error, res);
    }
  };

  static verifyEmail = async (req, res) => {
    // check for token expiration
    //check for user id
    const userId = req.params.id;
    const token = req.params.token;
    console.log(userId, "token=", token);
    const { password, new_password } = req.body;

    if (!userId || !token || !password || !new_password) {
      throw Object.assign(
        new Error("Either any field is empty or url is tempered"),
        {
          status: 400,
        }
      );
    }

    try {
      try {
        jwt.verify(token, "your-secret-key");
      } catch (e) {
        console.log('jwt verification failed')
        e.status = 400;
        e.message =
          "Link has  expired please request for email resend.The link u are using to verify email has expired .In order to get a new link please request for email resend.as link is present in email so u will get  a new one";
        return errorMiddleWare(e, res);
      }

      const user = await unverifiedUserModel.findById(userId);
      if (!user) {
        console.log("no user")
        throw Object.assign(
          new Error(
            "No user with this user id is present in unverified db."
          ),
          {
            status: 400,
          }
        );
      }
      const unverified_name = user.name;
      const unverified_email = user.email;

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        throw Object.assign(
          new Error(
            "Wrong password(your password does not match with password u used during registration process)"
          ),
          {
            status: 400,
          }
        );
      }

      const hash = await bcrypt.hash(new_password, 10);

      const document = new userModel({
        name: unverified_name,
        email: unverified_email,
        password: hash,
      });
      const registered_user = await document.save();
      const newtoken = jwt.sign(
        {
          email: registered_user.email,
          user_id: registered_user._id,
          user_name: registered_user.name,
        },
        "your-secret-key",
        {
          expiresIn: "1h",
        }
      );

      await unverifiedUserModel.findByIdAndDelete(userId);
      responseMiddleWare(201, newtoken, res);
    } catch (e) {
      errorMiddleWare(e, res);
    }
  };

  // resend email for verification
  static resendEmail = async (req, res) => {
    const token = req.params.token;
    const userId = req.params.id;

    const user = await unverifiedUserModel.findById(userId);
    if (!user) {
      const error = new Error(
        "Email is only sent to user in unverified db(those who have registered but not verified).Can not send email user is not in unverified db!"
      );
      error.status = 400;
      return errorMiddleWare(error, res);
    }
    jwt.verify(token, "your-secret-key", async (err, decoded) => {
      if (err) {
        const new_token = jwt.sign(
          {
            email: user.email,
            user_id: user._id,
            user_name: user.name,
          },
          "your-secret-key",
          { expiresIn: "5m" }
        );

        const object_containing_email_token_id = {
          email: user.email,
          token: new_token,
          user_id: user._id,
        };
        const response_from_send_email = await sendEmail(
          res,
          object_containing_email_token_id,
          "Welcome to Our WebSite"
        );
        if (response_from_send_email.response) {
          return responseMiddleWare(200, "Email sent", res);
        } else {
          const error = new Error(
            "Error occured while sending email  Please try(register) again"
          );
          error.status = 400;
          return errorMiddleWare(error, res);
        }
      } else {
        const error = new Error(
          "Use current email link or wait for 5 mins until it expires to get new!"
        );
        error.status = 400;
        return errorMiddleWare(error, res);
      }
    });
  };
}
export default Login;
