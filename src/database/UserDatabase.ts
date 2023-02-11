import { UserDB } from "../Types";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
    public static TABLE_USERS = "users"

    public async findUsers(q: string | undefined): Promise<UserDB[]> {
        if (q) {
            const result: UserDB[] = await BaseDatabase
                .connection(UserDatabase.TABLE_USERS)
                .where("name", "LIKE", `%${q}%`)

            return result

        } else {
            const result: UserDB[] = await BaseDatabase
                .connection(UserDatabase.TABLE_USERS)

            return result
        }
    }

    public async findUserById(id: string | undefined) {
        const userDB: UserDB[] | undefined[] = await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .where({ id })

        return userDB[0]
    }

    public async insertUser(newUserDB: UserDB): Promise<void> {
        await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .insert(newUserDB)
    }

    public async editUser(newUserDB: UserDB, id: string): Promise<void> {
        await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .update(newUserDB)
            .where({ id })
    }

    public async deleteUser(id: string): Promise<void> {
        await BaseDatabase
        .connection(UserDatabase.TABLE_USERS)
        .del()
        .where({ id })
    }
}