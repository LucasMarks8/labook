import { GetPostWithUserDTO } from "../dtos/PostDTO";
import { ActionDB, PostDB } from "../Types";
import { BaseDatabase } from "./BaseDatabase";
import { UserDatabase } from "./UserDatabase";

export class PostDatabase extends BaseDatabase {

    public static TABLE_POST = "posts"
    public static TABLE_ACTION = "likes_dislikes"

    public async findAllPosts(): Promise<PostDB[]> {
        const postsDB: PostDB[] = await BaseDatabase
            .connection(PostDatabase.TABLE_POST)
            .select()

        return postsDB
    }

    public async findPostsByContent(q: string): Promise<PostDB[]> {
        const postsDB: PostDB[] = await BaseDatabase
            .connection(PostDatabase.TABLE_POST)
            .select()
            .where("content", "LIKE", `%${q}%`)

        return postsDB
    }

    public async getPostsAndUsers(q: string | undefined) {
        let postsDB: PostDB[]

        if(q) {
            postsDB = await this.findPostsByContent(q)
        } else {
            postsDB =await this.findAllPosts()
        }

        const usersDB = await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .select()

        return {
            postsDB,
            usersDB
        }
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
        await BaseDatabase
            .connection(PostDatabase.TABLE_POST)
            .update(newPostDB)
            .where({ id })
    }

    public async deletePost(id: string): Promise<void> {
        await BaseDatabase
            .connection(PostDatabase.TABLE_POST)
            .del()
            .where({ id })
    }

    public async findactionByUser (actionDB: ActionDB): Promise<ActionDB | undefined> {
        const result: ActionDB[] = await BaseDatabase
        .connection(PostDatabase.TABLE_ACTION)
        .where({post_id: actionDB.post_id})
        .andWhere({user_id: actionDB.user_id})

        return result[0]
    }

    public async newAction(newLikeDB: ActionDB): Promise<void> {
        await BaseDatabase
        .connection(PostDatabase.TABLE_ACTION)
        .insert(newLikeDB)
    }

    public async editAction(newLikeDB: ActionDB): Promise<void> {
        await BaseDatabase
        .connection(PostDatabase.TABLE_ACTION)
        .update({likes: newLikeDB.like})
        .where({post_id: newLikeDB.post_id})
        .andWhere({user_id: newLikeDB.user_id})
    }

    public async deleteAction(actionDB: ActionDB): Promise<void> {
        await BaseDatabase
        .connection(PostDatabase.TABLE_ACTION)
        .del()
        .where({post_id: actionDB.post_id})
        .andWhere({user_id: actionDB.user_id})
    }

}