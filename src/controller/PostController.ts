import { Request, Response } from "express";
import { PostBusiness } from "../business/PostBusiness";

export class PostController {
    static createPost(req: Request, res: Response) {
        const { title, content, authorId } = req.body;

        if (!title || !content || !authorId) {
            return res.status(400).json({ 
                success: false,
                message: "Todos os campos são obrigatórios" 
            });
        }

        const result = PostBusiness.createPost(title, content, authorId);

        if (typeof result === "string") {
            return res.status(400).json({ 
                success: false,
                message: result 
            }); 
        }

        return res.status(201).json({ 
            success: true,
            data: result 
        }); 
    }

    // Exercício 5 
    // para atualizar parcialmente o post 
    static atualizarPostParcial(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const alteracoes = req.body;

        if (isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: "ID inválido"
            });
        }

        const result = PostBusiness.atualizarPostParcial(id, alteracoes);

        if (typeof result === "string") {
            return res.status(400).json({
                success: false,
                message: result
            });
        }

        return res.status(200).json({
            success: true,
            data: result
        });
    }

    // Exercício 6 
    static removerPost(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const userId = parseInt(req.header("User-Id") || "0");

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Cabeçalho User-Id é obrigatório"
            });
        }

        const result = PostBusiness.removerPost(id, userId);

        if (typeof result === "string") {
            return res.status(400).json({
                success: false,
                message: result
            });
        }

        return res.status(200).json({
            success: true,
            data: result
        });
    }
}