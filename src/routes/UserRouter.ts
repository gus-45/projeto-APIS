//aqui fica as rotas do users

import { Router } from "express";
import { UserController } from "../controller/UserController";

const router = Router();

// pega todos os usuarios
router.get('/users', UserController.getAllUsers);

// 2 
router.get("/age-range", UserController.getUsersByAgeRange);

//1 
router.get("/:id", UserController.getUserById);

// 4 
router.put("/:id", UserController.updateUser);

// 7
router.delete("/cleanup-inactive", UserController.removerUsuariosInativos);

export default router;
