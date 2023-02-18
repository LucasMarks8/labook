import { PostDatabase } from "../database/PostDatabase"
import { UserDatabase } from "../database/UserDatabase"
import { CreatePostInputDTO, CreatePostOutputDTO, deleteInputDTO, EditPostInputDTO, EditPostOutputDTO, GetPostsInput, GetPostsOutput, GetPostWithUserDTO } from "../dtos/PostDTO"
import { BadRequestError } from "../errors/BadRequestError"
import { NotFoundError } from "../errors/NotFoundError"
import { Post } from "../models/Post"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"
import { PostDB, PostModel, Role, UpdatedPost, UserDB } from "../Types"

export class PostBusiness {
    constructor(
        private postDatabase: PostDatabase,
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager
    ) { }

    public getPost = async (input: any): Promise<GetPostsOutput> => {  

        const { q, token } = input

        const payload = this.tokenManager.getPayload(token)

        if(payload === null){
            throw new BadRequestError("'token' inválido")
        }

        const {
            postsDB,
            usersDB
        } = await this.postDatabase.getPostsAndUsers(q)

        const posts = postsDB.map((postDB): PostModel => {
            const post: PostModel = {
                id: postDB.id,
                content: postDB.content,
                likes: postDB.likes,
                dislikes: postDB.dislikes,
                createdAt: postDB.created_at,
                updatedAt: postDB.updated_at,
                creator: getCreator(postDB.creator_id)
            }

            return post
        })

        function getCreator(creatorId: string) {
            const creator: UserDB = usersDB.find((userDB) => {
                return userDB.id === creatorId
            })

            return {
                id: creator.id,
                name: creator.name
            }
        }
        return posts
    }

    public createPost = async (input: any) => {
        const { content, token } = input

        const payload = this.tokenManager.getPayload(token)

        if(payload === null){
            throw new BadRequestError("'token' inválido")
        }

        if(payload.role !== Role.ADMIN){
            throw new BadRequestError("permissão necessária não atendida")
        }

        const id = this.idGenerator.generate()

        const newPost = new Post(
            id,
            content,
            0,
            0,
            new Date().toISOString(),
            new Date().toISOString(),
            payload
        )

        const newPostDB = newPost.toDBModel()

        await this.postDatabase.insertPost(newPostDB)

        return ({
            message: "Post criado com sucesso",
            newPost: newPost
        })
    }

    public editPost = async (input: EditPostInputDTO) => {
        const { id, token, content } = input

        const postExists = await this.postDatabase.findPostById(id)

        if (!postExists) {
            throw new NotFoundError("post não encontrado")
        }
        
        const creator = await this.userDatabase.findUserById(postExists.creator_id)

        if (!creator) {
            throw new NotFoundError("criador do post não encontrado")
        }

        const payload = this.tokenManager.getPayload(token)

        if(payload === null) {
            throw new BadRequestError("'token inválido");
        }

        if(payload.id !== creator.id) {
            throw new BadRequestError("Voçê não tem autorização");  
        }

        const newPost = new Post(
            postExists.id,
            postExists.content,
            postExists.likes,
            postExists.dislikes,
            postExists.created_at,
            postExists.updated_at,
            creator
        )

        if (content !== undefined) {
            newPost.setContent(content)
        }

        if (content) {
            newPost.setUpdatedAt(new Date().toISOString())
        }

        const newPostDB: UpdatedPost = {
            content: newPost.getContent(),
            updated_at: newPost.getUpdatedAt()
        }

        await this.postDatabase.editPost(newPostDB, newPost.getId())

        const outPut = {
            message: "Post atualizado com sucesso",
            post: newPost
        }

        return outPut
    }

    public deletePost = async (input: deleteInputDTO) => {
        const { id, token } = input

        const postDBExists = await this.postDatabase.findPostById(id)

        if (!postDBExists) {
            throw new NotFoundError("post não encontrado")
        }

        const payload = this.tokenManager.getPayload(token)
        if (payload === null) {
            throw new BadRequestError("Usuário não está logado")
        }

        if (payload.role !== Role.ADMIN) {
        const postByUser = await this.postDatabase.findPostByUserById(payload.id)

        const PostByUserExists = postByUser.find((postUser) => {
            return postUser.id === id
        })
     
            if (!PostByUserExists) {
                throw new BadRequestError("Usuário não é o autor do post")
            }
        }

        await this.postDatabase.deletePost(id)

        const outPut = {
            message: "Post deletado com sucesso",
        }

        return outPut
    }

    // public EditLikeDislike = async (params: {postId: string, creatorId: string}, likes: boolean) => {
    //     const post = await this.postDatabase.findPostById(params.postId)

    //     if (!post) {
    //         throw new NotFoundError("post não encontrado")
    //     }

    //     const creator = await this.userDatabase.findUserById(params.creatorId)

    //     if(!creator) {
    //         throw new NotFoundError("usuário não encontrado");
            
    //     }

    //     const newPost = new Post(
    //         post.id,
    //         post.creator_id,
    //         post.content,
    //         post.likes,
    //         post.dislikes,
    //         post.created_at,
    //         post.updated_at
    //     )

    //     if (post.likes === 1) {
    //         newPost.setLikes(0)
    //         newPost.setDislikes(1)
    //     } else {
    //         newPost.setLikes(1)
    //         newPost.setDislikes(0)
    //     }

    //     // if(likes === true) {
    //     //     creator.setLikes(true)
    //     //     setDislikes(false)
    //     // } 

    //     // if(dislikes === true) {
    //     //     dislikes === false
            
    //     // } else {
    //     //     setdislikes(true)
    //     //     setLikes(false)
    //     // }

    //     const newPostDB: PostDB = {
    //         id: newPost.getId(),
    //         creator_id: newPost.getCreatorId(),
    //         content: newPost.getContent(),
    //         likes: newPost.getLikes(),
    //         dislikes: newPost.getDislikes(),
    //         created_at: newPost.getCreatedAt(),
    //         updated_at: newPost.getUpdatedAt()
    //     }

    //     await this.postDatabase.editPost(newPostDB, post.id)

    //     const outPut = {
    //         message: "Post atualizado com sucesso",
    //         post: newPost.getLikes()
    //     }

    //     return outPut
    // }
}