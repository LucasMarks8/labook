import { Request, Response } from "express"
import { PostBusiness } from "../business/PostBusiness"
import { PostDTO } from "../dtos/PostDTO"
import { BaseError } from "../errors/BaseError"

export class PostController {
    constructor(
        private postDTO: PostDTO,
        private postBusiness: PostBusiness
    ) { }

    public getPosts = async (req: Request, res: Response) => {
        try {
            const input = req.query.q as string | undefined

            const outPut = await this.postBusiness.getPost(input)

            res.status(200).send(outPut)
        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }

    public CreatePost = async (req: Request, res: Response) => {
        try {
            const input = this.postDTO.createPostInput(
                req.body.creatorId,
                req.body.content,
                req.body.likes,
                req.body.dislikes
            )

            const outPut = await this.postBusiness.createPost(input)

            res.status(201).send(outPut)
        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }

    public editPost = async (req: Request, res: Response) => {
        try {
            const input = this.postDTO.editPostInput(
                req.params.id,
                req.body.creatorId,
                req.body.content,
                req.body.likes,
                req.body.dislikes
            )

            const outPut = await this.postBusiness.editPost(input)

            res.status(200).send(outPut)
        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }

    public deletePost = async (req: Request, res: Response) => {
        try {
            const input = { idToDelete: req.params.id }

            const outPut = await this.postBusiness.deletePost(input)

            res.status(200).send(outPut)

        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }

    public likeDislike = async (req: Request, res: Response) => {
        try {

            const params = {
                postId: req.params.id as string,
                creatorId: req.body.creatorId as string
            }
            const input = await this.postDTO.EditLikeInput(req.body.likes)
        
            const outPut = await this.postBusiness.EditLikeDislike(params, input)
    
            res.status(200).send(outPut)
        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
      
    }


}