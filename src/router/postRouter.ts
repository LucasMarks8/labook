import express from "express"
import { PostController } from "../controller/PostController"

export const postRouter = express.Router()

const postController = new PostController()

postRouter.get("/", postController.getPosts)
postRouter.post("/", postController.CreatePost)
postRouter.put("/:id", postController.editPost)
postRouter.delete("/:id", postController.deletePost) 