import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className='flex flex-col'>
      <Link href="/users/">See Authours</Link>
      <Link href="/posts/">See Posts</Link>
    </main>
  )
}
