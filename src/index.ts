import express, { Request, Response } from 'express'
import cors from 'cors'
import { TPostsDB, TUsersDB, UpdatedPost } from './Types'
import { Post } from './models/Post'
import { PostDatabase } from './database/PostDatabase'

const app = express()

app.use(cors())
app.use(express.json())

app.listen(3003, () => {
    console.log(`Servidor rodando na porta ${3003}`)
})

app.get("/posts", async (req: Request, res: Response) => {
    try {
        const q = req.query.q as string | undefined

       const postDatabase = new PostDatabase()
       const postsDB = await postDatabase.findPosts(q)

        const posts: Post[] = postsDB.map((postDB) => new Post(
            postDB.id,
            postDB.creator_id,
            postDB.content,
            postDB.likes,
            postDB.dislikes,
            postDB.created_at,
            postDB.updated_at
        ))

        res.status(200).send(posts)
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
})

app.post("/posts", async (req: Request, res: Response) => {
    try {
        const { id, creatorId, content, likes, dislikes } = req.body

        if (typeof id !== "string") {
            res.status(400)
            throw new Error("'id' deve ser string")
        }

        if (typeof creatorId !== "string") {
            res.status(400)
            throw new Error("'title' deve ser string")
        }

        if (typeof content !== "string") {
            res.status(400)
            throw new Error("'duration' deve ser string")
        }

        if (typeof likes !== "boolean") {
            res.status(400)
            throw new Error("'likes' deve ser bolean")
        }

        if (typeof dislikes !== "boolean") {
            res.status(400)
            throw new Error("'dislikes' deve ser bolean")
        }

        const postDatabase = new PostDatabase()
        const postDBExists = await postDatabase.findPostById(id)

        if (postDBExists) {
            res.status(400)
            throw new Error("'id' já existe")
        }

        const userDatabase = new PostDatabase()
        const userDBExists = await userDatabase.findUserById(creatorId)

        if (userDBExists) {
            res.status(400)
            throw new Error("'id' já existe")
        }

        const newPost = new Post(
            id,
            creatorId,
            content,
            likes,
            dislikes,
            new Date().toISOString(),
            new Date().toISOString()
        )

        const newPostDB = {
            id: newPost.getId(),
            creator_id: newPost.getCreatorId(),
            content: newPost.getContent(),
            likes: newPost.getLikes(),
            dislikes: newPost.getDislikes(),
            created_at: newPost.getCreatedAt(),
            updated_at: newPost.getUpdatedAt()
        }

        postDatabase.insertPost(newPostDB)

        res.status(201).send(newPost)
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
})

app.put("/posts/:id", async (req: Request, res: Response) => {
    try {
        const idToEdit = req.params.id

        const { content, likes, dislikes } = req.body 

        const postDatabase = new PostDatabase()

        if (idToEdit[0] !== "p") {
            res.status(400);
            throw new Error("'id' deve iniciar com a letra 'p'");
        }

        const postDBExists = await postDatabase.findPostById(idToEdit)

        if (!postDBExists) {
            res.status(404)
            throw new Error("post não encontrado")
        }

        if (content !== undefined) {
            if (typeof content !== "string") {
                res.status(400);
                throw new Error("'content' deve ser string");
            }
        }

            if( likes !== undefined) {
                if (typeof likes !== "boolean") {
                    res.status(400)
                    throw new Error("'likes' deve ser bolean")
                }
            }
       
            if(dislikes !== undefined) {
                if (typeof dislikes !== "boolean") {
                    res.status(400)
                    throw new Error("'dislikes' deve ser bolean")
                }
            }
       
        const newPost = new Post(
            postDBExists.id,
            postDBExists.creator_id,
            content || postDBExists.content,
            likes || postDBExists.likes,
            dislikes || postDBExists.dislikes,
            postDBExists.created_at,
            new Date().toISOString()
        )

        const newPostDB: UpdatedPost = {
            content: newPost.getContent(),
            likes: newPost.getLikes(),
            dislikes: newPost.getDislikes()
        }

        postDatabase.editPost(newPostDB, idToEdit)

        res.status(200).send({ message: "post atualizado com sucesso", newPostDB })

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
})

app.delete("/posts/:id", async (req: Request, res: Response) => {
    try {
        const idToDelete = req.params.id

        const postDatabase = new PostDatabase()
        const postDBExists = await postDatabase.findPostById(idToDelete)

        if (!postDBExists) {
            res.status(404)
            throw new Error("post não encontrado")
        }

        postDatabase.deletePost(idToDelete)
        res.status(200).send("post deletado com sucesso")
        
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
}) 

