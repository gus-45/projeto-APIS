// aqui fica todas as regras de negocio do post

import { Post } from "../types/Post";
import { PostData } from "../data/PostData";
import { UserBusiness } from "./UserBusiness";
import { User } from "../types/User"; 

export class PostBusiness {
  // 3 
  static createPost(title: string, content: string, authorId: number): Post | string {
    try {
      if (title.length < 3) return "O título deve ter no mínimo 3 caracteres";
      if (content.length < 10) return "O conteúdo deve ter no mínimo 10 caracteres";
      
      const user = UserBusiness.getUserById(authorId);
      if (!user) return "Autor não encontrado";

      const newPost: Post = {
        id: Date.now(),
        title,
        content,
        authorId,
        createdAt: new Date(),
        published: false,
      };

      return PostData.addPost(newPost);
    } catch (error) {
      console.error("Erro em createPost:", error);
      return "Erro interno ao criar post";
    }
  }

  // 5
  static atualizarPostParcial(id: number, alteracoes: Partial<Post>): Post | string {
    try {
      const camposPermitidos = ["title", "content", "published"];
      const camposInvalidos = Object.keys(alteracoes).filter(
        campo => !camposPermitidos.includes(campo)
      );

      if (camposInvalidos.length > 0) {
        return `Campos não permitidos: ${camposInvalidos.join(", ")}`;
      }

      const postAtualizado = PostData.updatePostPartial(id, alteracoes);
      if (!postAtualizado) return "Post não encontrado";

      return postAtualizado;
    } catch (error) {
      console.error("Erro em atualizarPostParcial:", error);
      return "Erro interno ao atualizar post";
    }
  }

  // 6 
  static removerPost(id: number, userId: number): string {
    try {
      const post = PostData.getPostById(id);
      if (!post) return "Post não encontrado";

      const user = UserBusiness.getUserById(userId);
      if (!user) return "Usuário não encontrado";

      const userRole = (user as any).role; 
      if (post.authorId !== userId && userRole !== "ADMIN") {
        return "Você não tem permissão para remover este post";
      }

      const resultado = PostData.deletePost(id);
      
      if (resultado) {
        return "Post removido com sucesso";
      }
      
      return "Erro ao remover post";
    } catch (error) {
      console.error("Erro em removerPost:", error);
      return "Erro interno ao remover post";
    }
  }
}