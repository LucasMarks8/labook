import { BadRequestError } from "../errors/BadRequestError";
import { User } from "../models/User";
import { Role } from "../Types";

export interface SignupUserInputDTO {
    id: string
    name: string,
    email: string,
    password: string,
    role: Role
}

export interface SignupUserOutputDTO {
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
export interface LoginUserInputDTO {
    email: string,
    password: string
}

export interface LoginUserOutputDTO {
    message: string,
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
    public signupUserInput(
        id: string,
        name: unknown,
        email: unknown,
        password: unknown,
        role: Role
    ): SignupUserInputDTO {

        if (typeof name !== "string") {
            throw new BadRequestError("'name' deve ser string")
        }

        if (typeof email !== "string") {
            throw new BadRequestError("'email' deve ser string")
        }

        if (typeof password !== "string") {
            throw new BadRequestError("'password' deve ser bolean")
        }

        const dto: SignupUserInputDTO = {
            id,
            name,
            email,
            password,
            role
        }

        return dto
    }

    public signupUserOutput(user: User): SignupUserOutputDTO {
        const dto: SignupUserOutputDTO = {
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

    public loginUserInput(
        email: unknown,
        password: unknown
    ): LoginUserInputDTO {

        if (typeof email !== "string") {
            throw new BadRequestError("'email' deve ser string")
        }

        if (typeof password !== "string") {
            throw new BadRequestError("'password' deve ser bolean")
        }

        const dto: LoginUserInputDTO = {
            email,
            password
        }

        return dto
    }

    public loginUserOutput(user: User): LoginUserOutputDTO {
        const dto: LoginUserOutputDTO = {
            message: "usuário conectado com sucesso",
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

        if (name !== undefined) {
            if (typeof name !== "string") {
                throw new BadRequestError("'name' deve ser string")
            }
        }

        if (email !== undefined) {
            if (typeof email !== "string") {
                throw new BadRequestError("'email' deve ser string")
            }
        }

        if (password !== undefined) {
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

    public editUserOutput(user: User): EditUserOutputDTO {
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