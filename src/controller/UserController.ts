// aqui fica a comunicação para o business, requisição e resposta para o usuario e validações minimas do user

import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";

export class UserController {
  // 1 
  static getUserById(req: Request, res: Response) {
    try {
      const userId = +req.params.id;

      if (!userId) {
        return res.status(400).json({
          success: false,
          message: "ID inválido"
        });
      }

      const user = UserBusiness.getUserById(userId);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Usuário não encontrado"
        });
      }

      return res.status(200).json({
        success: true,
        data: user
      });
    } catch (error) {
      console.error("Erro em getUserById:", error);
      return res.status(500).json({
        success: false,
        message: "Erro interno do servidor"
      });
    }
  }

  // 2
  static getUsersByAgeRange(req: Request, res: Response) {
    try {
      const min = Number(req.query.min);
      const max = Number(req.query.max);

      if (isNaN(min) || isNaN(max)) {
        return res.status(400).json({
          success: false,
          message: "Parâmetros inválidos"
        });
      }

      if (min > max) {
        return res.status(400).json({
          success: false,
          message: "O valor mínimo não pode ser maior que o máximo"
        });
      }

      const users = UserBusiness.getUsersByAgeRange(min, max);

      return res.status(200).json({
        success: true,
        data: users
      });
    } catch (error) {
      console.error("Erro em getUsersByAgeRange:", error);
      return res.status(500).json({
        success: false,
        message: "Erro interno do servidor"
      });
    }
  }

  // 4
  static updateUser(req: Request, res: Response) {
    try {
      const userId = +req.params.id;
      const { name, email, age } = req.body;

      if (!userId) {
        return res.status(400).json({
          success: false,
          message: "ID inválido"
        });
      }

      if (!name && !email && !age) {
        return res.status(400).json({
          success: false,
          message: "Nenhum dado fornecido para atualização"
        });
      }

      const updatedUser = UserBusiness.updateUser(userId, { name, email, age });

      if (!updatedUser) {
        return res.status(404).json({
          success: false,
          message: "Usuário não encontrado"
        });
      }

      return res.status(200).json({
        success: true,
        message: "Usuário atualizado com sucesso",
        data: updatedUser
      });
    } catch (error) {
      console.error("Erro em updateUser:", error);
      return res.status(500).json({
        success: false,
        message: "Erro interno do servidor"
      });
    }
  }

  // lista todos os usuários
  static getAllUsers(req: Request, res: Response) {
    try {
      const allUsers = UserBusiness.getAllUsers();
      return res.status(200).json({
        success: true,
        data: allUsers
      });
    } catch (error) {
      console.error("Erro em getAllUsers:", error);
      return res.status(500).json({
        success: false,
        message: "Erro interno do servidor"
      });
    }
  }

  // 7
  static removerUsuariosInativos(req: Request, res: Response) {
    try {
      const confirm = req.query.confirm === "true";

      const result = UserBusiness.removerUsuariosInativos(confirm);

      if (typeof result === "string") {
        return res.status(400).json({
          success: false,
          message: result
        });
      }

      return res.status(200).json({
        success: true,
        removidos: result
      });
    } catch (error) {
      console.error("Erro em removerUsuariosInativos:", error);
      return res.status(500).json({
        success: false,
        message: "Erro interno do servidor"
      });
    }
  }
}