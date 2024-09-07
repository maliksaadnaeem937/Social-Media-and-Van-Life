import userModel from "../Schema/userschema.js";
import responseMiddleWare from "./Middlewares/res.js";
import errorMiddleWare from "./Middlewares/error.js";
import bcrypt from "bcrypt";
import sendEmail from "./Middlewares/transporter.js";
import unverifiedUserModel from "../Schema/unverifiedUsers.js";

import jwt from "jsonwebtoken";
class Registration {
  // get registered users from database
  static getAllUsers = async (req, res) => {
    try {
      const users = await userModel.find().select(["-password", "-__v"]);
      responseMiddleWare(200, users, res);
    } catch (e) {
      errorMiddleWare(e, res);
    }
  };

  // register a user

  static register = async (req, res) => {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        throw Object.assign(new Error("Please Fill Out All Fields"), {
          status: 400,
        });
      }

      const duplicateCheckInUserModel = await userModel.findOne({ email });
      const duplicateCheckInUnverifiedUserModel=await unverifiedUserModel.findOne({email})
      if (duplicateCheckInUserModel) {
        throw Object.assign(new Error("Duplicate Email"), { status: 409 });
      }
      if(duplicateCheckInUnverifiedUserModel){
        throw Object.assign(new Error("Try Again after 12 hours or use your existing email link"), { status: 409 });
      }

      const hash = await bcrypt.hash(password, 10);

      const document = new unverifiedUserModel({
        name: name,
        email: email,
        password: hash,
      });
      const doc = await document.save();
      const { _id } = doc;
      const payload = {
        email,
        user_id: _id,
        user_name: name,
      };
      console.log(payload);
      const token = jwt.sign(payload, "your-secret-key", { expiresIn: "5m" });

      const  object_containing_email_token_id = {
        email,
        token,
        user_id: _id,
      };
      const response_from_send_email = await sendEmail(
        res,
        object_containing_email_token_id,
        'Welcome to Our WebSite '
      );
      if (response_from_send_email.response)
        return responseMiddleWare(201, payload, res);
      else {
        const error = new Error("Error occured  Please register again");
        await unverifiedUserModel.findByIdAndDelete(object_containing_email_token_id.user_id)
        error.status = 400;
        throw error;
      }
    } catch (e) {
      errorMiddleWare(e, res);
    }
  };
  static deleteUser = async (req, res) => {
    try {
      await userModel.findByIdAndDelete(req.params.id);
      return responseMiddleWare(200, "success", res);
    } catch (e) {
      e.message = "could not find user!";
      e.status = 404;
      errorMiddleWare(e, res);
    }
  };
  static updateUser = async (req, res) => {
    try {
      const updated = await userModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

      return responseMiddleWare(200, updated, res);
    } catch (e) {
      e.message = "Can not find provided id ";
      e.status = 404;
      errorMiddleWare(e, res);
    }
  };

  static getProfileInfo = async (req, res) => {
    try {
      const user_info = await userModel
        .findOne({ _id: req.user.user_id })
        .select(["-__v", "-password"]);
      console.log(user_info);
      return responseMiddleWare(200, user_info, res);
    } catch (e) {}
  };
  static changePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    try {
      const email = req.user.email;
      console.log(email);

      const document = await userModel.findOne({ email });
      console.log(document);
      if (document === null) {
        const error = new Error("Could not find user!");
        error.status = 400;
        return errorMiddleWare(error, res);
      } else {
        const savedHashedPassword = document.password;
        console.log(savedHashedPassword);
        // compare saved hashed password with current password;
        const match = await bcrypt.compare(
          currentPassword,
          savedHashedPassword
        );
        console.log("match hashed and currentpassword=", match);
        if (!match) {
          const error = new Error("Not matching  current and hashed password!");
          error.status = 400;
          return errorMiddleWare(error, res);
        }
        const newHashedPassword = await bcrypt.hash(newPassword, 10);
        console.log(newHashedPassword);

        const { _id } = document;
        try {
          console.log(_id);
          const updated = await userModel.findByIdAndUpdate(
            _id,
            { password: newHashedPassword },
            { new: true }
          );
          console.log("after updation", updated);
          return responseMiddleWare(200, updated, res);
        } catch (e) {
          return errorMiddleWare(e, res);
        }
      }
    } catch (e) {
      errorMiddleWare(e, res);
    }
  };
}

export default Registration;
