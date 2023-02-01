import { Enum } from "../Types"

export class User {
    constructor(
        private id: string,
        private name: string,
        private email: string,
        private password: string,
        private role: Enum,
        private createdAt: string
    ) { }

    public getId(): string {
        return this.id
    }

    public getName(): string {
        return this.name
    }

    public setName(newName: string): void {
        this.name = newName
    }

    public getEmail(): string {
        return this.email
    }

    public setEmail(newEmail: string): void {
        this.email = newEmail
    }

    public getPassword(): string {
        return this.password
    }

    public setPassword(newPassword: string): void {
        this.password = newPassword
    }

    public getRole(): Enum {
        return this.role
    }

    public setRole(newRole: Enum): void {
        this.role = newRole
    }

    public getCreatedAt(): string {
        return this.createdAt
    }

    public setCreatedAt(newCreatedAt: string): void {
        this.createdAt = newCreatedAt
    }
}