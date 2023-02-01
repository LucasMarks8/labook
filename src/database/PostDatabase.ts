import { PostDB, UpdatedPost } from "../Types";
import { BaseDatabase } from "./BaseDatabase";

export class PostDatabase extends BaseDatabase {

    public static TABLE_POST = "posts"

    public async findPosts(q: string | undefined): Promise<PostDB[]> {
        let postDB

        if (q) {
            const result: PostDB[] = await BaseDatabase
                .connection(PostDatabase.TABLE_POST)
                .where("content", "LIKE", `%${q}%`)
            postDB = result
        } else {
            const result: PostDB[] = await BaseDatabase
                .connection(PostDatabase.TABLE_POST)
            postDB = result
        }
        return postDB
    }

    public async findPostById(id: string | undefined): Promise<PostDB | undefined> {
        const [postDBExists]: PostDB[] | undefined[] = await BaseDatabase
            .connection(PostDatabase.TABLE_POST)
            .where({ id })
        return postDBExists
    }

    public async findUserById(creatorId: string | undefined): Promise<PostDB | undefined> {
        const [userDBExists]: PostDB[] | undefined[] = await BaseDatabase
            .connection(PostDatabase.TABLE_POST)
            .where({ id: creatorId })
        return userDBExists
    }

    public async insertPost(newPostDB: PostDB): Promise<void> {
        await BaseDatabase
            .connection(PostDatabase.TABLE_POST)
            .insert(newPostDB)
    }

    public async editPost(newPostDB: UpdatedPost, id: string): Promise<void> {
        await BaseDatabase.connection(PostDatabase.TABLE_POST)
            .update(newPostDB)
            .where({ id })
    }

    public async deletePost(id: string): Promise<void> {
        await BaseDatabase
            .connection(PostDatabase.TABLE_POST)
            .del()
            .where({ id })
    }
}