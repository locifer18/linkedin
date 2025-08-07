import express from "express";
import { requireSignIn } from "../middleware/authMiddleware.js";
import { createPostController, getPostControllers, getSinglePostController } from "../controllers/postControllers.js";

const router = express.Router();

//Create post
router.post("/create-post",requireSignIn,createPostController);

//get post 
router.get("/get-post",requireSignIn, getPostControllers);

//get single post
router.get("/get-post/:id",requireSignIn, getSinglePostController);

export default router;