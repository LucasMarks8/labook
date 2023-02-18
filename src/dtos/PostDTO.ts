import { BadRequestError } from "../errors/BadRequestError"
import { Post } from "../models/Post"
import { PostModel } from "../Types"

export interface GetPostsInput {
    q: unknown,
    token: string | undefined
}

export type GetPostsOutput = PostModel[]

export interface GetPostWithUserDTO {
    id: string,
    content: string,
    likes: number,
    dislikes: number,
    createdAt: string,
    updatedAt: string,
    creator: {
        id: string,
        name: string
    }
}

export interface CreatePostInputDTO {
    content: string,
    token: string
}

export interface CreatePostOutputDTO {
    message: string,
    post: GetPostWithUserDTO
}

export interface EditPostInputDTO {
    id: string,
    content: string | undefined,
    token: string
}

export interface EditPostOutputDTO {
   message: string,
   post: GetPostWithUserDTO
}

export interface EditLikeOutputDTO {
    message: string
}

export interface deleteInputDTO {
    id: string,
    token: string
}

export interface deleteOutputDTO {
    message: string
}

export class PostDTO {
    public createPostInput(
        content: unknown,
        token: string
    ): CreatePostInputDTO {

        if (typeof content !== "string") {
            throw new BadRequestError("'duration' deve ser string")
        }

        const dto: CreatePostInputDTO = {
            content,
            token
        }

        return dto
    }

    public createPostOutput(post: Post): CreatePostOutputDTO {
        const dto: CreatePostOutputDTO = {
            message: "Post registrado com sucesso",
            post: post.toBusinessModel()
        }

        return dto
    }

    public editPostInput(
        id: unknown,
        content: unknown,
        token: string,
        updatedAt: string
    ) {

        if (typeof id !== "string") {
            throw new BadRequestError("'id' deve ser uma string");
        }

        if (content !== undefined) {
            if (typeof content !== "string") {
                throw new BadRequestError("'content' deve ser string");
            }
        }

        const dto: EditPostInputDTO = {
            content,
            updatedAt
        }

        return dto
    }

    public editPostOutput(post: Post): EditPostOutputDTO {
        const dto: EditPostOutputDTO = {
            message: "Post editado com sucesso",
            post: {
                id: post.getId(),
                creatorId: post.getCreatorId(),
                content: post.getContent(),
                likes: post.getLikes(),
                dislikes: post.getDislikes()
            }
        }

        return dto
    }

    public EditLikeInput = (likes: unknown): boolean => {

        if (typeof likes !== 'boolean') {
            throw new BadRequestError("'like' deve ser boolean")
        }

        return likes
    }
    public EditLikeOutput = (message: string): EditLikeOutputDTO => {
        return {
            message: message
        }
    }

}