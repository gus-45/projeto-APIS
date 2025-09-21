import { UserData, users } from "../data/UserData";
import { User } from "../types/User";
import { PostData } from "../data/PostData";

export class UserBusiness {
  // Exercício 1
  static getUserById(id: number): User | undefined {
    return UserData.findUserById(id);
  }

  // Exercício 2
  static getUsersByAgeRange(min: number, max: number): User[] {
    return UserData.findUsersByAgeRange(min, max);
  }

  // Exercício 4 - Atualização completa
  static updateUser(id: number, updatedData: Partial<User>): User | undefined {
    return UserData.updateUser(id, updatedData);
  }

  // Resetar dados
  static resetUsers(): void {
    UserData.resetUsers();
  }

  // Retornar todos os usuários
  static getAllUsers(): User[] {
    return users;
  }

  // Exercício 7 - Remover usuários inativos
  static removerUsuariosInativos(confirm: boolean): User[] | string {
    if (!confirm) {
      return "Confirmação obrigatória (?confirm=true)";
    }

    const todosUsuarios = UserData.getAllUsers();

    // Filtra: não remove admins e só remove quem não tem posts
    const usuariosInativos = todosUsuarios.filter(u => {
      if (u.role === "ADMIN") return false;
      const postsDoUsuario = PostData.getPostsByAuthor(u.id);
      return postsDoUsuario.length === 0;
    });

    // Remove do "banco"
    usuariosInativos.forEach(u => UserData.deleteUser(u.id));

    return usuariosInativos;
  }
}
