export enum Function {
    admin = "ADMIN",
    normal = "NORMAL"
}

export interface UserDB {
    id: string,
    name: string,
    email: string,
    password: string,
    role: Function,
    created_at: string
}

export interface PostDB {
    id: string,
    creator_id: string,
    content: string,
    likes: number,
    dislikes: number,
    created_at: string,
    updated_at: string,
}

export interface UpdatedPost {
    content?: string,
    likes?: number,
    dislikes?: number
}

