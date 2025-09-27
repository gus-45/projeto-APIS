import { User } from "../types/User";


export const users: User[] = [
  { id: 1, name: "Marcos Silva", email: "marcos@email.com", age: 19, role: "USER" },
  { id: 2, name: "Maria Souza", email: "maria@email.com", age: 67, role: "ADMIN" },
  { id: 3, name: "Carlos Pereira", email: "carlos@email.com", age: 34, role: "USER" },
  { id: 4, name: "Gustavo Soares", email: "gustavo@email.com", age: 20, role: "USER" }
];

export class UserData {
  
 
  static getAllUsers() {
    return users;
  }


  static getUserById(id: number) {
    return users.find(user => user.id === id);
  }
  
  static getUserByEmail(email: string) {
    return users.find(user => user.email === email);
  }

 
  static getUsersByAgeRange(min: number, max: number) {
    return users.filter(user => user.age >= min && user.age <= max);
  }


  static addUser(user: any) {
    users.push(user);
    return user;
  }

  static updateUser(id: number, data: any) {
    const index = users.findIndex(user => user.id === id);
    if (index === -1) {
      return undefined;
    }

    
    users[index] = { ...users[index], ...data };
    return users[index];
  }

  
  static replaceUser(id: number, newUser: any) {
    const index = users.findIndex(user => user.id === id);
    if (index === -1) {
      return undefined;
    }

 
    users[index] = newUser;
    return users[index];
  }


  static deleteUser(id: number) {
    const index = users.findIndex(user => user.id === id);
    if (index === -1) {
      return false;
    }

    users.splice(index, 1);
    return true;
  }
}
