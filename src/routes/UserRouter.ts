import { Router } from "express";
import { UserController } from "../controller/UserController";

const router = Router();

// Rota GET para listar todos 
router.get("/", UserController.getAllUsers);

// Exercício 2 
router.get("/age-range", UserController.getUsersByAgeRange);

// Rota POST para resetar dados
router.post("/reset", UserController.resetUsers);

// Exercício 1 
router.get("/:id", UserController.getUserById);

// Exercício 4
router.put("/:id", UserController.updateUser);

export default router;