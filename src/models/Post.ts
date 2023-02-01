export class Post {
    constructor(
        private id: string,
        private creatorId: string,
        private content: string,
        private likes: boolean,
        private dislikes: boolean,
        private createdAt: string,
        private updatedAt: string
    ) { }

    public getId(): string {
        return this.id
    }

    public getCreatorId(): string {
        return this.creatorId
    }

    public getContent(): string {
        return this.content
    }

    public setContent(newContent: string): void {
        this.content = newContent
    }

    public getLikes(): boolean {
        return this.likes
    }

    public setLikes(newLikes: boolean): void {
        this.likes = newLikes
    }

    public getDislikes(): boolean {
        return this.dislikes
    }

    public setDislikes(newDislikes: boolean): void {
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
}