export enum Role {
    ADMIN = "ADMIN",
    NORMAL = "NORMAL"
}

export interface UserDB {
    id: string,
    name: string,
    email: string,
    password: string,
    role: Role,
    created_at: string
}

export interface PostUser {
    id: string,
    name: string
}

export interface PostDB {
    id: string,
    content: string,
    likes: number,
    dislikes: number,
    created_at: string,
    updated_at: string,
    creator_id: string
}

export interface PostModel {
    id: string,
    content: string,
    likes: number,
    dislikes: number,
    createdAd: string,
    updatedAt: string,
    creator: {
        id: string,
        name: string
    }
}

export interface UpdatedPost {
    content?: string,
    likes?: number,
    dislikes?: number
}

export interface ActionDB {
    post_id: string,
    user_id: string,
    like: number
}

export interface EditActionDB {
    likes: number,
    dislikes: number
}

