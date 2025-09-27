import { Router } from "express";
import { PostController } from "../controller/PostController";

const router = Router();


router.get("/", PostController.getAllPosts);


router.post("/", PostController.createPost);


router.patch("/:id", PostController.updatePost);


router.delete("/:id", PostController.deletePost);

export default router;