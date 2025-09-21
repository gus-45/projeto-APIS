import { User } from "../types/User";

export const users: User[] = [
  { id: 1, name: "Marcos Silva", email: "joao@email.com", age: 19, role: "USER" },
  { id: 2, name: "Maria Souza", email: "maria@email.com", age: 67, role: "ADMIN" },
  { id: 3, name: "Carlos Pereira", email: "carlos@email.com", age: 34, role: "USER" },
  { id: 4, name: "Gustavo Soares", email: "gustavo@email.com", age: 20, role: "USER" }
];

export class UserData {
  static getAllUsers(): User[] {
    return users;
  }

  static findUserById(id: number): User | undefined {
    return users.find(u => u.id === id);
  }

  static findUsersByAgeRange(min: number, max: number): User[] {
    return users.filter(u => u.age >= min && u.age <= max);
  }

  static updateUser(id: number, updatedData: Partial<User>): User | undefined {
    const userIndex = users.findIndex(u => u.id === id);

    if (userIndex === -1) {
      return undefined;
    }

    users[userIndex] = { ...users[userIndex], ...updatedData };
    return users[userIndex];
  }

  static deleteUser(id: number): void {
    const index = users.findIndex(u => u.id === id);
    if (index !== -1) {
      users.splice(index, 1);
    }
  }

  // Vai resetar o array de usuários para os dados originais, para teste
  static resetUsers(): void {
    users.length = 0;
    users.push(
     { id: 1, name: "Marcos Silva", email: "joao@email.com", age: 19, role: "USER" },
     { id: 2, name: "Maria Souza", email: "maria@email.com", age: 67, role: "ADMIN" },
     { id: 3, name: "Carlos Pereira", email: "carlos@email.com", age: 34, role: "USER" },
     { id: 4, name: "Gustavo Soares", email: "gustavo@email.com", age: 20, role: "USER" }
    );
  }
}
