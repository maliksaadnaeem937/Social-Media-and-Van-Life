import express from "express";
import Registration from "../DBoperations/Registration.js";
import Login from "../DBoperations/Login.js";
import ProtectedRoutes from "../DBoperations/Protected.js";
import checkIfLoggedIn from "../DBoperations/Middlewares/loginCheck.js";
import PostClass from "../DBoperations/Posts/posts.js";

const router = express.Router();
import upload from "../DBoperations/Middlewares/multer.js";

// some of these routes are just for getting registered users through postman and delete or updatee their record
//just dummy process
router.get("/users", Registration.getAllUsers);
router.post("/register_user/", Registration.register);
router.delete("/delete_user/:id", Registration.deleteUser);
router.post("/update_user/:id", Registration.updateUser);

//login processes
router.get("/if_logged_redirect", Login.getLogin_Register_Page); // if logged in user requests for logged or register page then redirect
router.post("/login_user", Login.userLogin);

//protected routes
// router.get("/protected", checkIfLoggedIn, ProtectedRoutes.getProtectedRoute);

// posts
router.post("/create-post", [checkIfLoggedIn,upload.single('image'), PostClass.createPost]); //post req on create-post
router.get("/get-create-post", checkIfLoggedIn, PostClass.getCreatePost); //get req for create-post
router.get("/getPosts", checkIfLoggedIn, PostClass.getAllPosts); //getting all posts
router.delete('/deletePost',checkIfLoggedIn,PostClass.deletePost)//delete post
router.post('/edit-post/:id',checkIfLoggedIn,upload.single("image"),PostClass.editPost)


//user specific posts
router.get(
  "/getUserSpecificPosts",
  checkIfLoggedIn,
  PostClass.getUserSpecificPosts
); //get req for myposts mean users posts

//profile page
router.get("/get-profile", checkIfLoggedIn, Registration.getProfileInfo);

// change password

router.post("/change-password", checkIfLoggedIn, Registration.changePassword);

router.post('/verify-email/:id/:token', Login.verifyEmail)
router.get('/verify-email/:id/:token', Login.getVerifyEmailPage)

router.post('/resend-email/:id/:token',Login.resendEmail);

export default router;
