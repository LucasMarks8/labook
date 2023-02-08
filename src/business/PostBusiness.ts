import { PostDatabase } from "../database/PostDatabase"
import { CreatePostInputDTO, EditPostInputDTO } from "../dtos/PostDTO"
import { BadRequestError } from "../errors/BadRequestError"
import { NotFoundError } from "../errors/NotFoundError"
import { Post } from "../models/Post"
import { PostDB } from "../Types"

export class PostBusiness {
    constructor(
        private postDatabase: PostDatabase
    ) {}

    public getPost = async () => {

        const postsDB = await this.postDatabase.findPosts()

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

    public createPost = async (input: CreatePostInputDTO) => {
        const { id, creatorId, content, likes, dislikes } = input

        const postDBExists = await this.postDatabase.findPostById(id)

        if (postDBExists) {
            throw new BadRequestError("'id' já existe")
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

        await this.postDatabase.insertPost(newPostDB)

        return ({
            message: "Post criado com sucesso",
            newPost: newPost
        })
    }

    public editPost = async (input: EditPostInputDTO) => {
        const { idToEdit, creatorId, content, likes, dislikes } = input

        if (idToEdit[0] !== "p") {
            throw new BadRequestError("'id' deve iniciar com a letra 'p'");
        }

        const post = await this.postDatabase.findPostById(idToEdit)
        
        if (!post) {
            throw new NotFoundError("post não encontrado")
        }
        if(typeof creatorId !== "string") {
            throw new BadRequestError("a");
        }
        const creatorIdExists = await this.postDatabase.findPostByUserById(creatorId)
        console.log(creatorId);
        
        if (!creatorIdExists) {
            throw new NotFoundError("usuário não encontrado")
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
            newPost.setContent(content)
        }

        if (likes !== undefined) {
            newPost.setLikes(likes)
        }

        if (dislikes !== undefined) {
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

        await this.postDatabase.editPost(newPostDB, idToEdit)

        const outPut = {
            message: "Post atualizado com sucesso",
            post: newPost
        }

        return outPut
    }

    public deletePost = async (input: {idToDelete: string}) => {
        const { idToDelete } = input

        const postDBExists = await this.postDatabase.findPostById(idToDelete)

        if (!postDBExists) {
            throw new NotFoundError("post não encontrado")
        }
        
        await this.postDatabase.deletePost(idToDelete)

        const outPut = {
            message: "Post deletado com sucesso",
        }

        return outPut
    }
}