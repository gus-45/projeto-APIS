//aqui fica as rotas do users

import { Router } from "express";
import { UserController } from "../controller/UserController";

const router = Router();

// pega todos os usuarios
router.get('/users', UserController.getAllUsers);

// Exercício 2 
router.get("/age-range", UserController.getUsersByAgeRange);

// Exercício 1 
router.get("/:id", UserController.getUserById);

// Exercício 4 
router.put("/:id", UserController.updateUser);

// Exercício 7
router.delete("/cleanup-inactive", UserController.removerUsuariosInativos);

export default router;
