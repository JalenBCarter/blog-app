import Link from 'next/link'

export default async function UserPosts({ promise }) {

    const posts = await promise

    const content = posts.map(post => {
        return (
            <article className="text-slate-200 p-4" key={post.id}>
                <Link href={`/posts/${post.id}`} >
                    <h2 className="text-2xl">{post.title}</h2>
                    <p className="text-slate-300">{post.body}</p>
                    <br />
                </Link>
            </article>
        )
    })

    return content
}
