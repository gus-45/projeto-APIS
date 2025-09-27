import { Post } from "../types/Post";
import { PostData } from "../data/PostData";
import { UserBusiness } from "./UserBusiness";

export class PostBusiness {
  
  static getAllPosts() {
    return PostData.getAllPosts();
  }

    static createPost(title: string, content: string, authorId: number) {
     const author = UserBusiness.getUserById(authorId);
     if (!author) {
      return "Autor não encontrado";
     }

  
    const newPost: Post = {
      id: Date.now(), 
      title,
      content,
      authorId,
      createdAt: new Date(),
      published: false
    };

    return PostData.addPost(newPost);
  }

  static updatePost(id: number, changes: any) {
    const existingPost = PostData.getPostById(id);
    if (!existingPost) {
      return "Post não encontrado";
    }

   
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
  static deletePost(postId: number, userId: number) {

    const post = PostData.getPostById(postId);
    if (!post) {
      return "Post não encontrado";
    }

   
    const user = UserBusiness.getUserById(userId);
    if (!user) {
      return "Usuário não encontrado";
    }

    
    if (post.authorId !== userId && user.role !== "ADMIN") {
      return "Você não tem permissão para remover este post";
    }


    const wasDeleted = PostData.deletePost(postId);
    return wasDeleted;
  }
}