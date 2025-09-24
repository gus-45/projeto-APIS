// aqui fica a comunicação para o business, requisição e resposta para o usuario e validações minimas do post

import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";

export class UserController {
  // Exercício 1 
  static getUserById(req: Request, res: Response) {
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
  }

  // Exercício 2
  static getUsersByAgeRange(req: Request, res: Response) {
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
  }

  // Exercício 4
  static updateUser(req: Request, res: Response) {
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
  }

 

  // para lista os usuários
  static getAllUsers(req: Request, res: Response) {
    const allUsers = UserBusiness.getAllUsers();
    return res.status(200).json({
      success: true,
      data: allUsers
    });
  }

  // Exercício 7
  static removerUsuariosInativos(req: Request, res: Response) {
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
  }
}