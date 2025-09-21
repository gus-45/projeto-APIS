import { Router } from "express";
import { UserController } from "../controller/UserController";

const router = Router();

// GET para listar todos os usuários
router.get("/", UserController.getAllUsers);

// Exercício 2 
router.get("/age-range", UserController.getUsersByAgeRange);

// resetar os dados
router.post("/reset", UserController.resetUsers);

// Exercício 1 
router.get("/:id", UserController.getUserById);

// Exercício 4 
router.put("/:id", UserController.updateUser);

// Exercício 7
router.delete("/cleanup-inactive", UserController.removerUsuariosInativos);

export default router;
