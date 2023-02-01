import express, { Request, Response } from 'express'
import cors from 'cors'
import { db } from './database/knex'
import { TPostsDB, TUsersDB } from './Types'
import { Post } from './models/Post'

const app = express()

app.use(cors())
app.use(express.json())

app.listen(3003, () => {
    console.log(`Servidor rodando na porta ${3003}`)
})

app.get("/ping", async (req: Request, res: Response) => {
    try {
        res.status(200).send({ message: "Pong!" })
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

app.get("/posts", async (req: Request, res: Response) => {
    try {
        const q = req.query.q

        let postsDB

        if (q) {
            const result: TPostsDB[] = await db("posts").where("content", "LIKE", `%${q}%`)
            postsDB = result
        } else {
            const result: TPostsDB[] = await db("posts")
            postsDB = result
        }

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

        const [postDBExists]: TPostsDB[] | undefined[] = await db("posts").where({ id })

        if (postDBExists) {
            res.status(400)
            throw new Error("'id' já existe")
        }

        const [userDBExists]: TPostsDB[] | undefined[] = await db("posts").where({ id: creatorId })

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

        await db("posts").insert(newPostDB)

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

        const { id, creatorId, content, likes, dislikes, createdAt } = req.body 

        if (idToEdit[0] !== "p") {
            res.status(400);
            throw new Error("'id' deve iniciar com a letra 'p'");
        }

        const [ postDBExists ]: TPostsDB[] = await db("posts").where({ id: idToEdit })

        if (!postDBExists) {
            res.status(404)
            throw new Error("post não encontrado")
        }

        const [ post ]: TPostsDB[] = await db("posts").where({ id })

        if (post) {
            res.status(400)
            throw new Error("'id' já existe")
        }

        const [ user ]: TPostsDB[] = await db("posts").where({ id: creatorId })

        if (!user) {
            res.status(404)
            throw new Error("usuário não encontrado")
        }

        if (id !== undefined) {
            if (typeof id !== "string") {
                res.status(400);
                throw new Error("'id' deve ser uma string");
            }

            if (id[0] !== "p") {
                res.status(400);
                throw new Error("'id' deve iniciar com a letra 'p'");
            }
        }

        if (creatorId !== undefined) {
            if (typeof creatorId !== "string") {
                res.status(400);
                throw new Error("'id do usuário' deve ser uma string");
            }

            if (creatorId[0] !== "u") {
                res.status(400);
                throw new Error("'id' do usuário deve iniciar com a letra 'u'");
            }
        }

        if (content !== undefined) {
            if (content !== "string") {
                res.status(400);
                throw new Error("'content' deve ser string");
            }
        }

            if(likes !== undefined) {
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
            id || postDBExists.id,
            creatorId || postDBExists.creator_id,
            content || postDBExists.content,
            likes || postDBExists.likes,
            dislikes || postDBExists.dislikes,
            createdAt || postDBExists.created_at,
            new Date().toISOString()
        )

        const newPostDB: TPostsDB = {
            id: newPost.getId(),
            creator_id: newPost.getCreatorId(),
            content: newPost.getContent(),
            likes: newPost.getLikes(),
            dislikes: newPost.getDislikes(),
            created_at: newPost.getCreatedAt(),
            updated_at: newPost.getUpdatedAt()
        }

        await db("posts").update(newPostDB).where({ id: idToEdit })

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

        const [postDBExists]: TPostsDB[] = await db("posts").where({ id: idToDelete })

        if (!postDBExists) {
            res.status(404)
            throw new Error("post não encontrado")
        }

        await db("posts").del().where({ id: idToDelete })
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

