import getUser from '/lib/getUser'
import getUserPosts from '/lib/getUserPosts'
import getAllUsers from '/lib/getAllUsers'
import { Suspense } from 'react'
import UserPosts from './components/UserPosts'
import { notFound } from 'next/navigation'

// export async function GenerateMetadata({ params: { userId } }) {
//     const userData = getUser(userId)
//     const user = await userData

//     if (!user.name) {
//         return {
//             title: 'User not found',
//         }
//     }

//     return {
//         title: user.name,
//         description: `this is the page of ${user.name}`,
//     }
// }

export default async function UserPage({ params: { userId } }) {
    const userData = getUser(userId)
    const userPostsData = getUserPosts(userId)

    // Parallel fetching user and post data:
    // const [user, userPosts] = await Promise.all([userData, userPostsData])

    const user = await userData

    if (!user.name) return notFound()

    return (
        <>
            <h2 className='text-4xl'>Posts by {user.name}</h2>
            <br />
            <div className="p-5 border-2 border-emerald-500 bg-slate-600 rounded-xl">
                <Suspense fallback="Loading...">
                    <UserPosts promise={userPostsData} />
                </Suspense>
            </div>
        </>
    )
}

export async function generateStaticParams() {
    const usersData = getAllUsers()
    const users = await usersData

    return users.map(user => ({
        userId: user.id.toString()
    }))
}
