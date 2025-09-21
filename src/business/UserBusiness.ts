import { UserData, users } from "../data/UserData";
import { User } from "../types/User";
import { PostData } from "../data/PostData";

export class UserBusiness {
  // Exercício 1
  static getUserById(id: number): User | undefined | string {
    if (id <= 0 || isNaN(id)) {
      return "ID inválido";
    }
    return UserData.findUserById(id) || "Usuário não encontrado";
  }

  // Exercício 2
  static getUsersByAgeRange(min: number, max: number): User[] | string {
    if (isNaN(min) || isNaN(max)) {
      return "Parâmetros inválidos";
    }
    if (min > max) {
      return "O valor mínimo não pode ser maior que o máximo";
    }
    return UserData.findUsersByAgeRange(min, max);
  }

  // Exercício 4 
  static updateUser(id: number, updatedData: Partial<User>): User | string {
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
  }

  // Resetar dados
  static resetUsers(): void {
    UserData.resetUsers();
  }

  // todos os usuários
  static getAllUsers(): User[] {
    return users;
  }

  // Exercício 7 
  static removerUsuariosInativos(confirm: boolean): User[] | string {
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
  }
}
