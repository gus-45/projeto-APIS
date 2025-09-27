// Business - Regras de negócio dos posts

import { Post } from "../types/Post";
import { PostData } from "../data/PostData";
import { UserBusiness } from "./UserBusiness";

export class PostBusiness {
  
  // EXEMPLO - Listar todos os posts
  static getAllPosts() {
    return PostData.getAllPosts();
  }

  // EXERCÍCIO 3 - Criar novo post
  static createPost(title: string, content: string, authorId: number) {
    // Verificar se autor existe
    const author = UserBusiness.getUserById(authorId);
    if (!author) {
      return "Autor não encontrado";
    }

    // Criar novo post
    const newPost: Post = {
      id: Date.now(), // ID simples baseado no timestamp
      title,
      content,
      authorId,
      createdAt: new Date(),
      published: false
    };

    return PostData.addPost(newPost);
  }

  // EXERCÍCIO 5 - Atualizar post parcialmente
  static updatePost(id: number, changes: any) {
    // Verificar se post existe
    const existingPost = PostData.getPostById(id);
    if (!existingPost) {
      return "Post não encontrado";
    }

    // Atualizar apenas campos permitidos
    if (changes.title) {
      existingPost.title = changes.title;
    }
    if (changes.content) {
      existingPost.content = changes.content;
    }
    if (changes.published !== undefined) {
      existingPost.published = changes.published;
    }

    return PostData.updatePost(id, existingPost);
  }

  // EXERCÍCIO 6 - Remover post com autorização
  static deletePost(postId: number, userId: number) {
    // Verificar se post existe
    const post = PostData.getPostById(postId);
    if (!post) {
      return "Post não encontrado";
    }

    // Verificar se usuário existe
    const user = UserBusiness.getUserById(userId);
    if (!user) {
      return "Usuário não encontrado";
    }

    // Verificar permissão: apenas autor do post ou admin podem remover
    if (post.authorId !== userId && user.role !== "ADMIN") {
      return "Você não tem permissão para remover este post";
    }

    // Remover post
    const wasDeleted = PostData.deletePost(postId);
    return wasDeleted;
  }
}