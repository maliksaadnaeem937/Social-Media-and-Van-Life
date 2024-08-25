import postModel from "../../Schema/postSchema.js";
import errorMiddleWare from "../Middlewares/error.js";

import responseMiddleWare from "../Middlewares/res.js";
class PostClass {
  static getCreatePost = async (req, res) => {
    responseMiddleWare(200, "grant access", res);
  };
  static createPost = async (req, res) => {
    console.log("create post called");
    const path = req.file?.filename || "";
    let image_path;
    if (path) {
      image_path = `static/${path}`;
    }

    try {
      const { body } = req.body;

      const created_by = req.user.user_id;
      const user_email = req.user.email;
      const user_name = req.user.user_name;
      console.log(image_path);

      console.log(created_by);

      if (!image_path && !body) {
        throw Object.assign(new Error("Please Fill Any One Field"), {
          status: 400,
        });
      }
      const document = new postModel({
        image: image_path || "",
        body,
        created_by,
        user_email,
        user_name,
      });
      const result = await document.save();
      return responseMiddleWare(201, result, res);
    } catch (e) {
      errorMiddleWare(e, res);
    }
  };
  static getAllPosts = async (req, res) => {
    try {
      const posts = await postModel
        .find()
        .select(["-__v"])
        .sort({ created_at: -1 });
      return responseMiddleWare(200, posts, res);
    } catch (e) {
      errorMiddleWare(e, res);
    }
  };

  static getUserSpecificPosts = async (req, res) => {
    try {
      console.log("user specific posts called ", req.user.user_id);

      const posts = await postModel
        .find({ created_by: req.user.user_id })
        .select(["-__v"]);
      return responseMiddleWare(200, posts, res);
    } catch (e) {
      errorMiddleWare(e, res);
    }
  };

  static deletePost = async (req, res) => {
    try {
      console.log("entered delete post");
      const resp = await postModel.findByIdAndDelete(req.body.post_id);

      return responseMiddleWare(200, "Deleted", res);
    } catch (e) {
      return errorMiddleWare(e, res);
    }
  };

  static editPost = async (req, res) => {
    const path = req.file?.filename || "";
    let update_image = false;
    let image_path;
    if (path) {
      image_path = `static/${path}`;
      update_image = true;
    }
    try {
      const post_id = req.params.id;
      const { body } = req.body;
      const created_by = req.user.user_id;
      const user_email = req.user.email;
      const user_name = req.user.user_name;

      if (!image_path && !body) {
        throw Object.assign(new Error("Please Fill Any One Field"), {
          status: 400,
        });
      }

      try {
        const updateData = {
          body,
          created_by,
          user_email,
          user_name,
          ...(update_image ? { image: image_path } : {}),
        };

        const updatedPost = await postModel.findByIdAndUpdate(
          post_id,
          updateData,
          { new: true }
        );
        console.log("updated post", updatedPost);
      } catch (e) {
        e.status = 400;
        e.message = "Invalid Post Id";
        return errorMiddleWare(e, res);
      }

      return responseMiddleWare(201, "Edited", res);
    } catch (e) {
      errorMiddleWare(e, res);
    }
  };
}

export default PostClass;
