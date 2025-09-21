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
    return posts.find(p => p.id === id);
  }

  static getPostsByAuthor(authorId: number): Post[] {
    return posts.filter(p => p.authorId === authorId);
  }

  static deletePost(id: number): Post | undefined {
    const index = posts.findIndex(p => p.id === id);
    if (index === -1) return undefined;

    const [removido] = posts.splice(index, 1);
    return removido;
  }

  // Exercício 5 
  static updatePostPartial(id: number, updates: Partial<Post>): Post | undefined {
    const index = posts.findIndex(p => p.id === id);
    if (index === -1) return undefined;

    posts[index] = { ...posts[index], ...updates };
    return posts[index];
  }
}
