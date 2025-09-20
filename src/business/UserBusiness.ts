import { UserData, users } from "../data/UserData";
import { User } from "../types/User";

export class UserBusiness {
  static getUserById(id: number): User | undefined {
    return UserData.findUserById(id);
  }

  static getUsersByAgeRange(min: number, max: number): User[] {
    return UserData.findUsersByAgeRange(min, max);
  }

  static updateUser(id: number, updatedData: Partial<User>): User | undefined {
    return UserData.updateUser(id, updatedData);
  }

  // Chama o método da camada de dados e resetar os dados
  static resetUsers(): void {
    UserData.resetUsers();
  }

  
  // Retorna todos os usuários dos dados
  static getAllUsers(): User[] {
    return users; // vai retornar o array completo de usuários
  }

}