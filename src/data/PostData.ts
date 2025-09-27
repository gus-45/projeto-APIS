// Camada de dados - Simulação do banco de dados para posts

import { Post } from "../types/Post";

// "Banco de dados" em memória
export let posts: Post[] = [];

export class PostData {
  
  // Listar todos os posts
  static getAllPosts() {
    return posts;
  }

  // Buscar post por ID
  static getPostById(id: number) {
    return posts.find(post => post.id === id);
  }

  // Buscar posts por autor
  static getPostsByAuthor(authorId: number) {
    return posts.filter(post => post.authorId === authorId);
  }

  // Adicionar novo post
  static addPost(post: any) {
    posts.push(post);
    return post;
  }

  // Atualizar post
  static updatePost(id: number, changes: any) {
    const index = posts.findIndex(post => post.id === id);
    if (index === -1) {
      return undefined;
    }

    // Atualizar apenas os campos fornecidos
    posts[index] = { ...posts[index], ...changes };
    return posts[index];
  }

  // Remover post
  static deletePost(id: number) {
    const index = posts.findIndex(post => post.id === id);
    if (index === -1) {
      return false;
    }

    posts.splice(index, 1);
    return true;
  }
}