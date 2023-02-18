import { GetPostWithUserDTO } from "../dtos/PostDTO"
import { PostDB, PostModel, Role } from "../Types"

export class Post {
    constructor(
        private id: string,
        private content: string,
        private likes: number,
        private dislikes: number,
        private createdAt: string,
        private updatedAt: string,
        private creatorId: {
            id: string,
            name: string,
            role: Role
        }
    ) { }

    public getId(): string {
        return this.id
    }

    public getCreatorId(id: string, name: string) {
        return this.creatorId
    }

    public getContent(): string {
        return this.content
    }

    public setContent(newContent: string): void {
        this.content = newContent
    }

    public getLikes(): number {
        return this.likes
    }

    public setLikes(newLikes: number): void {
        this.likes = newLikes
    }

    public getDislikes(): number {
        return this.dislikes
    }

    public setDislikes(newDislikes: number): void {
        this.dislikes = newDislikes
    }

    public getCreatedAt(): string {
        return this.createdAt
    }

    public setCreatedAt(newCreatedAt: string): void {
        this.createdAt = newCreatedAt
    }

    public getUpdatedAt(): string {
        return this.updatedAt
    }

    public setUpdatedAt(newUpdatedAt: string): void {
        this.updatedAt = newUpdatedAt
    }

    public toDBModel(): PostDB {
        return {
            id:this.id,
            creator_id:this.creatorId.id,
            content:this.content,
            likes:this.likes,
            dislikes:this.dislikes,
            created_at:this.createdAt,
            updated_at:this.updatedAt
        }
    }

    public toBusinessModel(): GetPostWithUserDTO{
        return{
            id:this.id,
            content:this.content,
            likes:this.likes,
            dislikes:this.dislikes,
            createdAt:this.createdAt,
            updatedAt:this.updatedAt,
            creator:{
                id:this.creatorId.id,
                name:this.creatorId.name
            }
        
        }
    }
}