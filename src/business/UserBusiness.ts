// Business - Regras de negócio dos usuários

import { UserData } from "../data/UserData";
import { PostData } from "../data/PostData";
import { User } from "../types/User";

export class UserBusiness {
  
  // EXEMPLO - Listar todos os usuários
  static getAllUsers() {
    return UserData.getAllUsers();
  }

  // EXERCÍCIO 1 - Buscar usuário por ID
  static getUserById(id: number) {
    return UserData.getUserById(id);
  }

  // EXERCÍCIO 2 - Buscar usuários por faixa etária
  static getUsersByAgeRange(min: number, max: number) {
    return UserData.getUsersByAgeRange(min, max);
  }

  // EXERCÍCIO 4 - Substituir usuário completamente (PUT)
  static replaceUser(id: number, userData: any) {
    // Buscar se usuário existe
    const existingUser = UserData.getUserById(id);
    if (!existingUser) {
      return undefined;
    }

    // Verificar se email já existe em outro usuário
    if (userData.email) {
      const userWithEmail = UserData.getUserByEmail(userData.email);
      if (userWithEmail && userWithEmail.id !== id) {
        return undefined; // Email já existe
      }
    }

    // Substituir TODOS os dados (mantendo apenas o ID original)
    const newUserData: User = {
      id: id,
      name: userData.name,
      email: userData.email,
      role: userData.role,
      age: userData.age
    };

    return UserData.replaceUser(id, newUserData);
  }

  // EXERCÍCIO 5 - Atualizar usuário parcialmente (PATCH)
  static updateUser(id: number, updatedData: any) {
    // Buscar se usuário existe
    const existingUser = UserData.getUserById(id);
    if (!existingUser) {
      return undefined;
    }

    // Verificar se email já existe em outro usuário
    if (updatedData.email) {
      const userWithEmail = UserData.getUserByEmail(updatedData.email);
      if (userWithEmail && userWithEmail.id !== id) {
        return undefined; // Email já existe
      }
    }

    return UserData.updateUser(id, updatedData);
  }

  // EXERCÍCIO 7 - Remover usuários inativos (sem posts)
  static removeInactiveUsers() {
    const allUsers = UserData.getAllUsers();
    const removedUsers: User[] = [];

    // Procurar usuários sem posts que não sejam admins
    for (const user of allUsers) {
      // Não remover administradores
      if (user.role === "ADMIN") {
        continue;
      }

      // Verificar se usuário tem posts
      const userPosts = PostData.getPostsByAuthor(user.id);
      
      if (userPosts.length === 0) {
        // Usuário sem posts - remover
        const wasRemoved = UserData.deleteUser(user.id);
        if (wasRemoved) {
          removedUsers.push(user);
        }
      }
    }

    return removedUsers;
  }
}
