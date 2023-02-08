import { BadRequestError } from "../errors/BadRequestError";
import { User } from "../models/User";
import { Function } from "../Types";

export interface CreateUserInputDTO {
    id: string,
    name: string,
    email: string,
    password: string,
    role: unknown
}

export interface CreateUserOutputDTO {
    message: string,
    user: {
        id: string,
        name: string,
        email: string,
        password: string,
        role: unknown,
        createdAt: string
    }
}

export interface EditUserInputDTO {
    idToEdit: string,
    name: string | undefined,
    email: string | undefined,
    password: string | undefined
    role: unknown | undefined
}

export interface EditUserOutputDTO {
    message: string,
    user: {
        id: string,
        name: string,
        email: string,
        password: string,
        role: unknown
    }
}

export class UserDTO {
    public createUserInput(
        id: unknown,
        name: unknown,
        email: unknown,
        password: unknown,
        role: unknown
    ): CreateUserInputDTO {

        if (typeof id !== "string") {
            throw new BadRequestError("'id' deve ser string")
        }

        if (typeof name !== "string") {
            throw new BadRequestError("'name' deve ser string")
        }

        if (typeof email !== "string") {
            throw new BadRequestError("'email' deve ser string")
        }

        if (typeof password !== "string") {
            throw new BadRequestError("'password' deve ser bolean")
        }

        if (role !== Function) {
            throw new BadRequestError("'role' deve ser ADMIN ou NORMAL")
        }

        const dto: CreateUserInputDTO = {
            id,
            name,
            email,
            password,
            role
        }

        return dto
    }

    public createUserOutput(user: User): CreateUserOutputDTO {
        const dto: CreateUserOutputDTO = {
            message: "usuário registrado com sucesso",
            user: {
                id: user.getId(),
                name: user.getName(),
                email: user.getEmail(),
                password: user.getPassword(),
                role: user.getRole(),
                createdAt: user.getCreatedAt()
            }
        }

        return dto
    }

    public editUserInput(
        idToEdit: string,
        name: unknown,
        email: unknown,
        password: unknown,
        role: unknown
    ) {

        if(name !== undefined) {
            if (typeof name !== "string") {
                throw new BadRequestError("'name' deve ser string")
            }
        }
       
        if(email !== undefined) {
            if (typeof email !== "string") {
                throw new BadRequestError("'email' deve ser string")
            }
        }
       
        if(password !== undefined) {
            if (typeof password !== "string") {
                throw new BadRequestError("'password' deve ser bolean")
            }
        }
        

        const dto: EditUserInputDTO = {
            idToEdit,
            name,
            email,
            password,
            role
        }

        return dto
    }

    public editUserOutput (user: User): EditUserOutputDTO {
        const dto: EditUserOutputDTO = {
            message: "usuário editado com sucesso",
            user: {
                id: user.getId(),
                name: user.getName(),
                email: user.getEmail(),
                password: user.getPassword(),
                role: user.getRole()
            }
        }
        return dto
    }
}