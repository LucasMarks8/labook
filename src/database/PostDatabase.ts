import { TPostsDB, UpdatedPost } from "../Types";
import { BaseDatabase } from "./BaseDatabase";

export class PostDatabase extends BaseDatabase {

    public static TABLE_POST = "posts"

    public async findPosts(q: string | undefined): Promise<TPostsDB[]> {
        let postsDB

        if (q) {
            const result: TPostsDB[] = await BaseDatabase
                .connection(PostDatabase.TABLE_POST)
                .where("content", "LIKE", `%${q}%`)
            postsDB = result
        } else {
            const result: TPostsDB[] = await BaseDatabase
                .connection(PostDatabase.TABLE_POST)
            postsDB = result
        }
        return postsDB
    }

    public async findPostById(id: string | undefined): Promise<TPostsDB | undefined> {
        const [postDBExists]: TPostsDB[] | undefined[] = await BaseDatabase
            .connection(PostDatabase.TABLE_POST)
            .where({ id })
        return postDBExists
    }

    public async findUserById(creatorId: string | undefined): Promise<TPostsDB | undefined> {
        const [userDBExists]: TPostsDB[] | undefined[] = await BaseDatabase
            .connection(PostDatabase.TABLE_POST)
            .where({ id: creatorId })
        return userDBExists
    }

    public async insertPost(newPostDB: TPostsDB): Promise<void> {
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