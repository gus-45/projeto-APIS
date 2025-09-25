// aqui fica as rotas do post

import { Router } from "express";
import { PostController } from "../controller/PostController";

const router = Router();

// 3
router.post("/", PostController.createPost);

//5
router.patch("/:id", PostController.atualizarPostParcial);

//6 
router.delete("/:id", PostController.removerPost);

export default router;