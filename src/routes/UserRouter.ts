// userRoutes.ts - Rotas dos usuários
import { Router } from "express";
import { UserController } from "../controller/UserController";

const router = Router();

// Listar todos os usuários
router.get('/', UserController.getAllUsers);

// Filtrar usuários por faixa etária  
router.get("/age-range", UserController.getUsersByAgeRange);

// Buscar usuário por ID
router.get("/:id", UserController.getUserById);

// Substituir usuário completamente (PUT)
router.put("/:id", UserController.replaceUser);

// Atualizar usuário parcialmente (PATCH)
router.patch("/:id", UserController.updateUser);

// Remover usuários inativos
router.delete("/cleanup-inactive", UserController.removeInactiveUsers);

export default router;

