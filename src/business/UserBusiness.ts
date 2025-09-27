import { UserData } from "../data/UserData";
import { PostData } from "../data/PostData";
import { User } from "../types/User";

export class UserBusiness {
  

  static getAllUsers() {
    return UserData.getAllUsers();
  }

  // 1
  static getUserById(id: number) {
    return UserData.getUserById(id);
  }

  // 2
  static getUsersByAgeRange(min: number, max: number) {
    return UserData.getUsersByAgeRange(min, max);
  }

  // 4
  static replaceUser(id: number, userData: any) {
 
    const existingUser = UserData.getUserById(id);
    if (!existingUser) {
      return undefined;
    }


    if (userData.email) {
      const userWithEmail = UserData.getUserByEmail(userData.email);
      if (userWithEmail && userWithEmail.id !== id) {
        return undefined;
      }
    }

    
    const newUserData: User = {
      id: id,
      name: userData.name,
      email: userData.email,
      role: userData.role,
      age: userData.age
    };

    return UserData.replaceUser(id, newUserData);
  }

  // 5
  static updateUser(id: number, updatedData: any) {
   
    const existingUser = UserData.getUserById(id);
    if (!existingUser) {
      return undefined;
    }

    if (updatedData.email) {
      const userWithEmail = UserData.getUserByEmail(updatedData.email);
      if (userWithEmail && userWithEmail.id !== id) {
        return undefined; 
      }
    }

    return UserData.updateUser(id, updatedData);
  }

  // 7
  static removeInactiveUsers() {
    const allUsers = UserData.getAllUsers();
    const removedUsers: User[] = [];

   
    for (const user of allUsers) {
 
      if (user.role === "ADMIN") {
        continue;
      }

     
      const userPosts = PostData.getPostsByAuthor(user.id);
      
      if (userPosts.length === 0) {
       
        const wasRemoved = UserData.deleteUser(user.id);
        if (wasRemoved) {
          removedUsers.push(user);
        }
      }
    }

    return removedUsers;
  }
}
