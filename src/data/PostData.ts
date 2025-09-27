import { Post } from "../types/Post";


export let posts: Post[] = [];

export class PostData {
  

  static getAllPosts() {
    return posts;
  }


  static getPostById(id: number) {
    return posts.find(post => post.id === id);
  }

  static getPostsByAuthor(authorId: number) {
    return posts.filter(post => post.authorId === authorId);
  }


  static addPost(post: any) {
    posts.push(post);
    return post;
  }

  
  static updatePost(id: number, changes: any) {
    const index = posts.findIndex(post => post.id === id);
    if (index === -1) {
      return undefined;
    }

   
    posts[index] = { ...posts[index], ...changes };
    return posts[index];
  }

  
  static deletePost(id: number) {
    const index = posts.findIndex(post => post.id === id);
    if (index === -1) {
      return false;
    }

    posts.splice(index, 1);
    return true;
  }
}