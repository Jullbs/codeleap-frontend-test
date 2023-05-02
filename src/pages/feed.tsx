import NewPost from '@/components/NewPost'
import Post from '@/components/Post'
import { PageData, PostData } from '@/types'
import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import useSWRInfinite from 'swr/infinite'

const fetcher = (url: string) => axios.get(url).then((res) => res.data)

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

  const getKey = (pageIndex: number, previousPageData: PageData) => {
    if (previousPageData && !previousPageData.next) return null

    // primeira página
    if (pageIndex === 0) return `https://dev.codeleap.co.uk/careers/?limit=10`

    return previousPageData.next
  }

  const { data, size, setSize } = useSWRInfinite(getKey, fetcher)

  return (
    <>
      <Head>
        <title>CodeLeap Network Feed</title>
        <meta name="description" content="A feed page from CodeLeap Network." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.ico" />
      </Head>
      <main className="w-full flex justify-center pt-[5.125rem]">
        <div className="bg-white max-w-[50rem] w-full p-6 flex flex-col gap-6">
          <NewPost />

          {data &&
            data.map((page) =>
              page.results.map((post: PostData) => {
                return (
                  <Post key={post.id} post={post} loggedUser={loggedUser} />
                )
              }),
            )}
          <button onClick={() => setSize(size + 1)}>Carregar mais</button>
        </div>
      </main>
    </>
  )
}
