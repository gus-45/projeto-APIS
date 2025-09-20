import { Router } from "express";
import { PostController } from "../controller/PostController";

const router = Router();

// Exercício 3
router.post("/", PostController.createPost);

// Exercício 5
router.patch("/:id", PostController.atualizarPostParcial);

// Exercício 6 
router.delete("/:id", PostController.removerPost);

export default router;