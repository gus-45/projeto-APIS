// aqui fica o acesso ao bancos de dados e manipulação dele

import { Post } from "../types/Post";

export let posts: Post[] = [];

export class PostData {
  static addPost(post: Post): Post {
    posts.push(post);
    return post;
  }

  static getPostById(id: number): Post | undefined {
    return posts.find(p => p.id === id);
  }

  static updatePostPartial(id: number, alteracoes: Partial<Post>): Post | undefined {
    const post = posts.find(p => p.id === id);
    if (!post) return undefined;

    Object.assign(post, alteracoes);
    return post;
  }

  static deletePost(id: number): boolean {
    const index = posts.findIndex(p => p.id === id);
    if (index === -1) return false;
    posts.splice(index, 1);
    return true;
  }

  static getPostsByAuthor(authorId: number): Post[] {
    return posts.filter(p => p.authorId === authorId);
  }
  
   static getAllPosts(): Post[] {
    console.log(`Buscando todos os posts. Total: ${posts.length}`);
    return posts;
  }

}
