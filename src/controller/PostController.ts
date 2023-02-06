import { Request, Response } from "express"
import { PostBusiness } from "../business/PostBusiness"

export class PostController {
    public getPosts = async (req: Request, res: Response) => {
        try {
            const postBusiness = new PostBusiness()
            const outPut = await postBusiness.getPost()

            res.status(200).send(outPut)
        } catch (error) {
            console.log(error)

            if (req.statusCode === 200) {
                res.status(500)
            }

            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }

    public CreatePost = async (req: Request, res: Response) => {
        try {
            const input = {
                id: req.body.id,
                creatorId: req.body.creatorId,
                content: req.body.content,
                likes: req.body.likes,
                dislikes: req.body.dislikes,
            }

            const postBusiness = new PostBusiness()
            const outPut = await postBusiness.createPost(input)

            res.status(201).send(outPut)
        } catch (error) {
            console.log(error)

            if (req.statusCode === 200) {
                res.status(500)
            }

            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }

    public editPost = async (req: Request, res: Response) => {
        try {
            const input = {
                idToEdit: req.params.id,
                content: req.body.content,
                likes: req.body.likes,
                dislikes: req.body.dislikes
            }

            const postBusiness = new PostBusiness()
            const outPut = await postBusiness.editPost(input)

            res.status(200).send(outPut)

        } catch (error) {
            console.log(error)

            if (req.statusCode === 200) {
                res.status(500)
            }

            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }

    public deletePost = async (req: Request, res: Response) => {
        try {
            const input = { idToDelete: req.params.id }

            const postBusiness = new PostBusiness()
            const outPut = await postBusiness.deletePost(input)

            res.status(200).send(outPut)

        } catch (error) {
            console.log(error)

            if (req.statusCode === 200) {
                res.status(500)
            }

            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }
}