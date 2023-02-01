import express from 'express'
import cors from 'cors'
import { PostController } from './controller/PostController'

const app = express()

app.use(cors())
app.use(express.json())

app.listen(3003, () => {
    console.log(`Servidor rodando na porta ${3003}`)
})

const postController = new PostController()

app.get("/posts", postController.getPosts)
app.post("/posts", postController.CreatePost)
app.put("/posts/:id", postController.editPost)
app.delete("/posts/:id", postController.deletePost) 

