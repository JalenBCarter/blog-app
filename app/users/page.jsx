import getAllUsers from "/lib/getAllUsers";
import Link from "next/link";

export const metadata = {
    title: "Users"
}

export default async function UsersPage() {
    const usersData = getAllUsers();

    const users = await usersData

    const content = (
        <section>
            <h2 className="text-3xl">Authours</h2>
            <p>Select an authour whos posts you would like to read.</p>
            <br />
            {
                users.map((user) => (
                    <>
                        <p className="p-2 text-emerald-500">
                            <Link href={`/users/${user.id}`}>{user.name}</Link>
                        </p>
                    </>
                ))
            }
        </section>
    )

    return content
}
