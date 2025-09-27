// Camada de dados - Simulação do banco de dados para usuários

import { User } from "../types/User";

// "Banco de dados" em memória
export const users: User[] = [
  { id: 1, name: "Marcos Silva", email: "marcos@email.com", age: 19, role: "USER" },
  { id: 2, name: "Maria Souza", email: "maria@email.com", age: 67, role: "ADMIN" },
  { id: 3, name: "Carlos Pereira", email: "carlos@email.com", age: 34, role: "USER" },
  { id: 4, name: "Gustavo Soares", email: "gustavo@email.com", age: 20, role: "USER" }
];

export class UserData {
  
  // Listar todos os usuários
  static getAllUsers() {
    return users;
  }

  // Buscar usuário por ID
  static getUserById(id: number) {
    return users.find(user => user.id === id);
  }

  // Buscar usuário por email
  static getUserByEmail(email: string) {
    return users.find(user => user.email === email);
  }

  // Buscar usuários por faixa etária
  static getUsersByAgeRange(min: number, max: number) {
    return users.filter(user => user.age >= min && user.age <= max);
  }

  // Adicionar novo usuário
  static addUser(user: any) {
    users.push(user);
    return user;
  }

  // Atualizar usuário (parcial)
  static updateUser(id: number, data: any) {
    const index = users.findIndex(user => user.id === id);
    if (index === -1) {
      return undefined;
    }

    // Atualizar apenas os campos fornecidos
    users[index] = { ...users[index], ...data };
    return users[index];
  }

  // Substituir usuário completamente (PUT)
  static replaceUser(id: number, newUser: any) {
    const index = users.findIndex(user => user.id === id);
    if (index === -1) {
      return undefined;
    }

    // Substitui o usuário inteiro (mantendo o id passado)
    users[index] = newUser;
    return users[index];
  }

  // Remover usuário
  static deleteUser(id: number) {
    const index = users.findIndex(user => user.id === id);
    if (index === -1) {
      return false;
    }

    users.splice(index, 1);
    return true;
  }
}
