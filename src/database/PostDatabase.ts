import { PostDB, UpdatedPost } from "../Types";
import { BaseDatabase } from "./BaseDatabase";

export class PostDatabase extends BaseDatabase {

    public static TABLE_POST = "posts"

    public async findPosts(): Promise<PostDB[]> {
        const postDB: PostDB[] = await BaseDatabase
            .connection(PostDatabase.TABLE_POST)

        return postDB
    }

    public async findPostById(id: string | undefined): Promise<PostDB | undefined> {
        const postDBExists: PostDB[] | undefined[] = await BaseDatabase
            .connection(PostDatabase.TABLE_POST)
            .where({ id })

        return postDBExists[0]
    }

    public async findPostByUserById(creatorId: string): Promise<PostDB | undefined> {
        const userDBExists: PostDB[] | undefined[] = await BaseDatabase
            .connection(PostDatabase.TABLE_POST)
            .where({ creator_id: creatorId })

        return userDBExists[0]
    }

    public async insertPost(newPostDB: PostDB): Promise<void> {
        await BaseDatabase
            .connection(PostDatabase.TABLE_POST)
            .insert(newPostDB)
    }

    public async editPost(newPostDB: PostDB, id: string): Promise<void> {
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