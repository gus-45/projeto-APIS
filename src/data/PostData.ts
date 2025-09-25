// eu coloquei a manipulacao e o banco de dados aqui

import { Post } from "../types/Post";

export let posts: Post[] = [];

export class PostData {
  static all(): Post[] {
    return posts;
  }

  static findById(id: number): Post | undefined {
    return posts.find(p => p.id === id);
  }

  static findByAuthor(authorId: number): Post[] {
    return posts.filter(p => p.authorId === authorId);
  }

  static add(post: Post): Post {
    posts.push(post);
    return post;
  }

  static update(id: number, changes: Partial<Post>): Post | undefined {
    const index = posts.findIndex(p => p.id === id);
    if (index === -1) return undefined;

    posts[index] = { ...posts[index], ...changes };
    return posts[index];
  }

  static remove(id: number): boolean {
    const index = posts.findIndex(p => p.id === id);
    if (index === -1) return false;
    posts.splice(index, 1);
    return true;
  }
}
