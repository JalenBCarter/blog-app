import getAllPosts from "/lib/getAllPosts"
import getAllUsers from "/lib/getAllUsers"

import Link from "next/link";

export const metadata = {
    title: "Users"
}

export default async function UsersPage() {
    const postsData = getAllPosts();
    const usersData = getAllUsers();

    const posts = await postsData
    const users = await usersData

    const content = (
        <section>
            <h2 className="text-3xl">Post Feed</h2>
            <p>Select posts to read.</p>
            <br />
            {
                posts.map((post) => (
                    <>
                        <p className="p-3 m-2 bg-white rounded">
                            <Link href={`/posts/${post.id}`}><span className="font-bold">{post.title}</span> by {(users.find((i) => i.id === post.userId)).name}</Link>
                        </p>
                    </>
                ))
            }
        </section>
    )

    return content
}
