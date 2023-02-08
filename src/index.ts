import express from 'express'
import cors from 'cors'
import { PostController } from './controller/PostController'
import { postRouter } from './router/postRouter'

const app = express()

app.use(cors())
app.use(express.json())

app.listen(3003, () => {
    console.log(`Servidor rodando na porta ${3003}`)
})

app.use("/posts", postRouter)


