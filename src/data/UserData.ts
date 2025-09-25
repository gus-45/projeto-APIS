import { User } from "../types/User";

export const users: User[] = [
  { id: 1, name: "Marcos Silva", email: "joao@email.com", age: 19, role: "USER" },
  { id: 2, name: "Maria Souza", email: "maria@email.com", age: 67, role: "ADMIN" },
  { id: 3, name: "Carlos Pereira", email: "carlos@email.com", age: 34, role: "USER" },
  { id: 4, name: "Gustavo Soares", email: "gustavo@email.com", age: 20, role: "USER" }
];

export class UserData {
  static all(): User[] {
    return users;
  }

  static findById(id: number): User | undefined {
    return users.find(u => u.id === id);
  }

  static findByAge(min: number, max: number): User[] {
    return users.filter(u => u.age >= min && u.age <= max);
  }

  static add(user: User): User {
    users.push(user);
    return user;
  }

  static update(id: number, data: Partial<User>): User | undefined {
    const index = users.findIndex(u => u.id === id);
    if (index === -1) return undefined;

    users[index] = { ...users[index], ...data };
    return users[index];
  }

  static remove(id: number): boolean {
    const index = users.findIndex(u => u.id === id);
    if (index === -1) return false;
    users.splice(index, 1);
    return true;
  }
}
