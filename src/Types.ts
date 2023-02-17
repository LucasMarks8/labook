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

export interface UserOutput {
    id: string,
    name: string,
    email: string,
    password: string,
    role: Role,
    createdAt: string
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
    createdAt: string,
    updatedAt: string,
    creator: {
        id: string,
        name: string
    }
}

export interface UpdatedPost {
    content?: string,
    likes?: number,
    dislikes?: number, 
    // updated_at?: string
}

export interface ActionDB {
    post_id: string,
    user_id: string,
    like: boolean
}


