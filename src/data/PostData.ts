import { posts } from "./posts";
import { Post } from "../types/Post";

export class PostData {
  static addPost(post: Post): Post {
    posts.push(post);
    return post;
  }

  static getAllPosts(): Post[] {
    return posts;
  }

  static getPostById(id: number): Post | undefined {
    return posts.find(post => post.id === id);
  }

  static deletePost(id: number): Post | undefined {
    const index = posts.findIndex(post => post.id === id);
    if (index === -1) return undefined;

    const [removido] = posts.splice(index, 1);
    return removido;
  }

  // Exercício 5 - para a atualização parcial
  static updatePostPartial(id: number, updates: Partial<Post>): Post | undefined {
    const index = posts.findIndex(p => p.id === id);
    if (index === -1) return undefined;

    posts[index] = { ...posts[index], ...updates };
    return posts[index];
  }
}