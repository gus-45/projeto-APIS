import { Request, Response } from "express";
import { PostBusiness } from "../business/PostBusiness";

export class PostController {

 
  static getAllPosts(req: Request, res: Response) {
    try {
      const posts = PostBusiness.getAllPosts();

      return res.status(200).json({
        success: true,
        message: "Posts listados com sucesso",
        data: posts,
        total: posts.length
      });
    } catch (error) {
      console.error("Erro em getAllPosts:", error);
      return res.status(500).json({
        success: false,
        message: "Erro interno do servidor"
      });
    }
  }

  static createPost(req: Request, res: Response) {
    try {
      const { title, content, authorId } = req.body;
      const errors = [];

      
      if (!title) {
        errors.push("Título é obrigatório");
      }
      if (title && title.length < 3) {
        errors.push("Título muito curto");
      }

     
      if (!content) {
        errors.push("Conteúdo é obrigatório");
      }
      if (content && content.length < 10) {
        errors.push("Conteúdo muito curto");
      }

      
      if (!authorId) {
        errors.push("ID do autor é obrigatório");
      }

      if (errors.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Dados inválidos",
          errors: errors
        });
      }

      const result = PostBusiness.createPost(title, content, authorId);

      if (typeof result === "string") {
        return res.status(400).json({
          success: false,
          message: result,
          errors: [result]
        });
      }

      return res.status(201).json({
        success: true,
        message: "Post criado com sucesso",
        data: result
      });
    } catch (error) {
      console.error("Erro em createPost:", error);
      return res.status(500).json({
        success: false,
        message: "Erro interno do servidor"
      });
    }
  } 

  static updatePost(req: Request, res: Response) {
    try {
      const postId = Number(req.params.id);
      const { title, content, published } = req.body;
      const errors = [];

      if (!postId || postId <= 0) {
        errors.push("ID inválido");
      }

      if (!title && !content && published === undefined) {
        errors.push("Nenhum dado fornecido");
      }

      if (title && typeof title !== 'string') {
        errors.push("Título inválido");
      }

      if (content && typeof content !== 'string') {
        errors.push("Conteúdo inválido");
      }

      if (errors.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Dados inválidos",
          errors: errors
        });
      }

      const result = PostBusiness.updatePost(postId, { title, content, published });

      if (typeof result === "string") {
        return res.status(404).json({
          success: false,
          message: result,
          errors: [result]
        });
      }

      return res.status(200).json({
        success: true,
        message: "Post atualizado com sucesso",
        data: result
      });
    } catch (error) {
      console.error("Erro em updatePost:", error);
      return res.status(500).json({
        success: false,
        message: "Erro interno do servidor"
      });
    }
  }

  static deletePost(req: Request, res: Response) {
    try {
      const postId = Number(req.params.id);
      const userId = Number(req.header("User-Id") || "0");
      const errors = [];

      
      if (!postId || postId <= 0) {
        errors.push("ID do post inválido");
      }

      if (!userId || userId <= 0) {
        errors.push("User-Id obrigatório");
      }

      if (errors.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Dados inválidos",
          errors: errors
        });
      }

      const result = PostBusiness.deletePost(postId, userId);

      if (typeof result === "string") {
        return res.status(403).json({
          success: false,
          message: result,
          errors: [result]
        });
      }

      return res.status(200).json({
        success: true,
        message: "Post removido com sucesso"
      });
    } catch (error) {
      console.error("Erro em deletePost:", error);
      return res.status(500).json({
        success: false,
        message: "Erro interno do servidor"
      });
    }
  }
}