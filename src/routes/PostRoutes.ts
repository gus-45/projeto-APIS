// postRoutes.ts - Rotas dos posts
import { Router } from "express";
import { PostController } from "../controller/PostController";

const router = Router();

// Listar todos os posts
router.get("/", PostController.getAllPosts);

// Criar novo post
router.post("/", PostController.createPost);

// Atualizar post (apenas PATCH para posts)
router.patch("/:id", PostController.updatePost);

// Remover post
router.delete("/:id", PostController.deletePost);

export default router;