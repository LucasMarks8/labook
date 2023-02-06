import { PostDatabase } from "../database/PostDatabase"
import { Post } from "../models/Post"
import { PostDB } from "../Types"

export class PostBusiness {
    public getPost = async () => {

        const postDatabase = new PostDatabase()
        const postsDB = await postDatabase.findPosts()

        const posts: Post[] = postsDB.map((postDB) => new Post(
            postDB.id,
            postDB.creator_id,
            postDB.content,
            postDB.likes,
            postDB.dislikes,
            postDB.created_at,
            postDB.updated_at
        ))
        return ({
            message: "Lista de posts",
            posts: posts
        })
    }

    public createPost = async (input: any) => {
        const { id, creatorId, content, likes, dislikes } = input

        if (typeof id !== "string") {
            throw new Error("'id' deve ser string")
        }

        if (typeof creatorId !== "string") {
            throw new Error("'title' deve ser string")
        }

        if (typeof content !== "string") {
            throw new Error("'duration' deve ser string")
        }

        if (typeof likes !== "boolean") {
            throw new Error("'likes' deve ser bolean")
        }

        if (typeof dislikes !== "boolean") {
            throw new Error("'dislikes' deve ser bolean")
        }

        const postDatabase = new PostDatabase()
        const postDBExists = await postDatabase.findPostById(id)

        if (postDBExists) {
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

        await postDatabase.insertPost(newPostDB)

        return ({
            message: "Post criado com sucesso",
            newPost: newPost
        })
    }

    public editPost = async (input: any) => {
        const { idToEdit, content, likes, dislikes } = input

        const postDatabase = new PostDatabase()

        if (idToEdit[0] !== "p") {
            throw new Error("'id' deve iniciar com a letra 'p'");
        }

        const post = await postDatabase.findPostById(idToEdit)

        if (!post) {
            throw new Error("post não encontrado")
        }

        const newPost = new Post(
            post.id,
            post.creator_id,
            post.content,
            post.likes,
            post.dislikes,
            post.created_at,
            post.updated_at
        )

        if (content !== undefined) {
            if (typeof content !== "string") {
                throw new Error("'content' deve ser string");
            }
            newPost.setContent(content)
        }

        if (likes !== undefined) {
            if (typeof likes !== "boolean") {
                throw new Error("'likes' deve ser bolean")
            }
            newPost.setLikes(likes)
        }

        if (dislikes !== undefined) {
            if (typeof dislikes !== "boolean") {
                throw new Error("'dislikes' deve ser bolean")
            }
            newPost.setDislikes(dislikes)
        }

        if (content || likes || dislikes) {
            newPost.setUpdatedAt(new Date().toISOString())
        }

        const newPostDB: PostDB = {
            id: newPost.getId(),
            creator_id: newPost.getCreatorId(),
            content: newPost.getContent(),
            likes: newPost.getLikes(),
            dislikes: newPost.getDislikes(),
            created_at: newPost.getCreatedAt(),
            updated_at: newPost.getUpdatedAt()
        }

        await postDatabase.editPost(newPostDB, idToEdit)

        const outPut = {
            message: "Post atualizado com sucesso",
            post: newPost
        }

        return outPut
    }

    public deletePost = async (input: any) => {
        const { idToDelete } = input

        const postDatabase = new PostDatabase()
        const postDBExists = await postDatabase.findPostById(idToDelete)

        if (!postDBExists) {
            throw new Error("post não encontrado")
        }
        await postDatabase.deletePost(idToDelete)

        const outPut = {
            message: "Post deletado com sucesso",
        }

        return outPut
    }
}