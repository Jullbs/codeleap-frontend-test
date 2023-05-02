import NewPost from '@/components/NewPost'
import Post from '@/components/Post'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Feed() {
  const [loggedUser, setLoggedUser] = useState<string | undefined>(undefined)
  const router = useRouter()

  useEffect(() => {
    const username = localStorage.getItem(
      '@codeleap-network-frontend-test:username',
    )

    if (username) {
      setLoggedUser(username)
    } else {
      router.push('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const post = {
    id: 1,
    username: 'Victor',
    title: 'My First Post at CodeLeap Network!',
    createdAt: '25 minutes ago',
    content:
      'Curabitur suscipit suscipit tellus. Phasellus consectetuer vestibulum elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas egestas arcu quis ligula mattis placerat. Duis vel nibh at velit scelerisque suscipit. Duis lobortis massa imperdiet quam. Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc, eu sollicitudin urna dolor sagittis lacus. Fusce a quam. Nullam vel sem. Nullam cursus lacinia erat.',
  }

  console.log(loggedUser)
  return (
    <>
      <Head>
        <title>CodeLeap Network Feed</title>
        <meta name="description" content="A feed page from CodeLeap Network." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-full flex justify-center pt-[5.125rem]">
        <div className="bg-white max-w-[50rem] w-full p-6 flex flex-col gap-6">
          <NewPost />

          <Post post={post} />
        </div>
      </main>
    </>
  )
}
