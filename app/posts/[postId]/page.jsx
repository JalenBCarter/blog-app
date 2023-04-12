import getPost from '/lib/getPost'
import getPostComments from '/lib/getPostComments'
import getAllPosts from '/lib/getAllPosts'
import getUser from '/lib/getUser'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export default async function UserPage({ params: { postId } }) {
    const postData = await getPost(postId)
    const postCommentsData = await getPostComments(postId)

    // Parallel fetching user and post data:
    const [post, postComments] = await Promise.all([postData, postCommentsData])

    const userData = await getUser(post.userId)
    const user = await userData

    if (!post.title) return notFound()

    return (
        <>
            <h2 className='text-2xl'>{post.title}</h2>
            <Link href={`/users/${user.id}`}>
                <p className='text-lg'>Author: <span className='text-emerald-500'>{user.name}</span></p>
            </Link>
            <p>{post.body}</p>
            <br />
            <h2 className='text-2xl'>Comments</h2>
            <br />
            {
                postComments.map((comment) =>
                (<>
                    <h3 className='text-emerald-500'>{comment.email}</h3>
                    <p>{comment.body}</p>
                    <br />
                </>)
                )
            }
        </>
    )
}

export async function generateStaticParams() {
    const postsData = getAllPosts()
    const posts = await postsData

    return posts.map(post => ({
        postId: post.id.toString()
    }))
}
