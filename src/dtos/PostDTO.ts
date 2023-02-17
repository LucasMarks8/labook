import { BadRequestError } from "../errors/BadRequestError"
import { Post } from "../models/Post"

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
    creatorId: string,
    content: string,
    likes: number,
    dislikes: number
}

export interface CreatePostOutputDTO {
    message: string,
    post: {
        id: string,
        creatorId: string,
        content: string,
        likes: number,
        dislikes: number,
        createdAt: string,
        updatedAt: string
    }
}

export interface EditPostInputDTO {
    idToEdit: string,
    creatorId: string,
    content: string | undefined,
    likes: number | undefined,
    dislikes: number | undefined
}

export interface EditPostOutputDTO {
    message: string,
    post: {
        id: string,
        creatorId: string,
        content: string,
        likes: number,
        dislikes: number
    }
}

// export interface EditLikeInputDTO {
//     postId: string,
//     creatorId: string,
//     likes: number | undefined,
//     dislikes: number | undefined
// }

export interface EditLikeOutputDTO {
    message: string
}

export class PostDTO {
    public createPostInput(
        creatorId: unknown,
        content: unknown,
        likes: unknown,
        dislikes: unknown
    ): CreatePostInputDTO {

        if (typeof creatorId !== "string") {
            throw new BadRequestError("'title' deve ser string")
        }

        if (typeof content !== "string") {
            throw new BadRequestError("'duration' deve ser string")
        }

        if (typeof likes !== "number") {
            throw new BadRequestError("'likes' deve ser number")
        }

        if (typeof dislikes !== "number") {
            throw new BadRequestError("'dislikes' deve ser number")
        }

        const dto: CreatePostInputDTO = {
            creatorId,
            content,
            likes,
            dislikes
        }

        return dto
    }

    public createPostOutput(post: Post): CreatePostOutputDTO {
        const dto: CreatePostOutputDTO = {
            message: "Post registrado com sucesso",
            post: {
                id: post.getId(),
                creatorId: post.getCreatorId(),
                content: post.getContent(),
                likes: post.getLikes(),
                dislikes: post.getDislikes(),
                createdAt: post.getCreatedAt(),
                updatedAt: post.getUpdatedAt()
            }
        }

        return dto
    }

    public editPostInput(
        idToEdit: string,
        creatorId: unknown,
        content: unknown,
        likes: unknown,
        dislikes: unknown
    ) {

        if (typeof creatorId !== "string") {
            throw new BadRequestError("'creatorId' deve ser uma string");
        }

        if (content !== undefined) {
            if (typeof content !== "string") {
                throw new BadRequestError("'content' deve ser string");
            }
        }


        if (likes !== undefined) {
            if (typeof likes !== "number") {
                throw new BadRequestError("'likes' deve ser number")
            }
        }


        if (dislikes !== undefined) {
            if (typeof dislikes !== "number") {
                throw new BadRequestError("'dislikes' deve ser number")
            }
        }

        const dto: EditPostInputDTO = {
            idToEdit,
            creatorId,
            content,
            likes,
            dislikes
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