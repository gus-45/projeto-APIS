import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";

export class UserController {
  
  
  static getAllUsers(req: Request, res: Response) {
    try {
      const users = UserBusiness.getAllUsers();

      return res.status(200).json({
        success: true,
        message: "Usuários listados com sucesso",
        data: users,
        total: users.length
      });
    } catch (error) {
      console.error("Erro em getAllUsers:", error);
      return res.status(500).json({
        success: false,
        message: "Erro interno do servidor"
      });
    }
  }

  // 1
  static getUserById(req: Request, res: Response) {
    try {
      const userId = Number(req.params.id);
      const errors = [];

      if (!userId || userId <= 0) {
        errors.push("ID inválido");
      }

      if (errors.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Dados inválidos",
          errors: errors
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
        message: "Usuário encontrado com sucesso",
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
      const errors = [];

     
      if (!min || min <= 0) {
        errors.push("Parâmetro min é obrigatório");
      }
      if (!max || max <= 0) {
        errors.push("Parâmetro max é obrigatório");
      }
      if (min && max && min > max) {
        errors.push("Min não pode ser maior que max");
      }

      if (errors.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Parâmetros inválidos",
          errors: errors
        });
      }

      const users = UserBusiness.getUsersByAgeRange(min, max);

      return res.status(200).json({
        success: true,
        message: "Usuários filtrados com sucesso",
        data: users,
        total: users.length
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
  static replaceUser(req: Request, res: Response) {
    try {
      const userId = Number(req.params.id);
      const { name, email, role, age } = req.body;
      const errors = [];

     
      if (!userId || userId <= 0) {
        errors.push("ID inválido");
      }

     
      if (!name) {
        errors.push("Nome é obrigatório");
      }
      if (!email) {
        errors.push("Email é obrigatório");
      }
      if (!role) {
        errors.push("Role é obrigatório");
      }
      if (!age) {
        errors.push("Idade é obrigatória");
      }

      if (errors.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Dados inválidos",
          errors: errors
        });
      }

      const replacedUser = UserBusiness.replaceUser(userId, { name, email, role, age });

      if (!replacedUser) {
        return res.status(404).json({
          success: false,
          message: "Usuário não encontrado"
        });
      }

      return res.status(200).json({
        success: true,
        message: "Usuário substituído com sucesso",
        data: replacedUser
      });
    } catch (error) {
      console.error("Erro em replaceUser:", error);
      return res.status(500).json({
        success: false,
        message: "Erro interno do servidor"
      });
    }
  }

  // 4
  static updateUser(req: Request, res: Response) {
    try {
      const userId = Number(req.params.id);
      const { name, email, age } = req.body;
      const errors = [];

  
      if (!userId || userId <= 0) {
        errors.push("ID inválido");
      }
    
      if (!name && !email && !age) {
        errors.push("Nenhum dado fornecido");
      }

      if (errors.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Dados inválidos",
          errors: errors
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

  static removeInactiveUsers(req: Request, res: Response) {
    try {
      const confirm = req.query.confirm === "true";
      const errors = [];

      if (!confirm) {
        errors.push("Confirmação obrigatória");
      }

      if (errors.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Confirmação necessária",
          errors: errors
        });
      }

      const removedUsers = UserBusiness.removeInactiveUsers();

      return res.status(200).json({
        success: true,
        message: "Usuários inativos removidos com sucesso",
        data: removedUsers,
        total: removedUsers.length
      });
    } catch (error) {
      console.error("Erro em removeInactiveUsers:", error);
      return res.status(500).json({
        success: false,
        message: "Erro interno do servidor"
      });
    }
  }
}