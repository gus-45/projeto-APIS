// aqui fica regras de negocios do users/get

import { UserData, users } from "../data/UserData";
import { User } from "../types/User";
import { PostData } from "../data/PostData";

export class UserBusiness {
  // 1
  static getUserById(id: number): User | undefined | string {
    try {
      if (id <= 0 || isNaN(id)) {
        return "ID inválido";
      }
      return UserData.findUserById(id) || "Usuário não encontrado";
    } catch (error) {
      console.error("Erro em getUserById:", error);
      return "Erro interno ao buscar usuário";
    }
  }

  // 2
  static getUsersByAgeRange(min: number, max: number): User[] | string {
    try {
      if (isNaN(min) || isNaN(max)) {
        return "Parâmetros inválidos";
      }
      if (min > max) {
        return "O valor mínimo não pode ser maior que o máximo";
      }
      return UserData.findUsersByAgeRange(min, max);
    } catch (error) {
      console.error("Erro em getUsersByAgeRange:", error);
      return "Erro interno ao buscar usuários por idade";
    }
  }

  // 4 
  static updateUser(id: number, updatedData: Partial<User>): User | string {
    try {
      if (id <= 0 || isNaN(id)) {
        return "ID inválido";
      }
      if (!updatedData.name && !updatedData.email && !updatedData.age) {
        return "Nenhum dado fornecido para atualização";
      }
      if (updatedData.age && updatedData.age < 0) {
        return "Idade inválida";
      }
      const updatedUser = UserData.updateUser(id, updatedData);
      return updatedUser || "Usuário não encontrado";
    } catch (error) {
      console.error("Erro em updateUser:", error);
      return "Erro interno ao atualizar usuário";
    }
  }

  // todos os usuários
  static getAllUsers(): User[] {
    try {
      return users;
    } catch (error) {
      console.error("Erro em getAllUsers:", error);
      return []; 
    }
  }

  // 7 
  static removerUsuariosInativos(confirm: boolean): User[] | string {
    try {
      if (!confirm) {
        return "Confirmação obrigatória (?confirm=true)";
      }

      const todosUsuarios = UserData.getAllUsers();

      const usuariosInativos = todosUsuarios.filter(u => {
        if (u.role === "ADMIN") return false;
        const postsDoUsuario = PostData.getPostsByAuthor(u.id);
        return postsDoUsuario.length === 0;
      });

      if (usuariosInativos.length === 0) {
        return "Nenhum usuário inativo encontrado";
      }

      usuariosInativos.forEach(u => UserData.deleteUser(u.id));

      return usuariosInativos;
    } catch (error) {
      console.error("Erro em removerUsuariosInativos:", error);
      return "Erro interno ao remover usuários inativos";
    }
  }
}