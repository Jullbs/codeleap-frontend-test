import NewPost from '@/components/NewPost'
import Post from '@/components/Post'
import { PageData, PostData } from '@/types'
import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import useSWRInfinite from 'swr/infinite'

const fetcher = (url: string) => axios.get(url).then((res) => res.data)

export const getKey = (pageIndex: number, previousPageData: PageData) => {
  // no more pages
  if (previousPageData && !previousPageData.next) return null

  // first page
  if (pageIndex === 0) return `https://dev.codeleap.co.uk/careers/?limit=10`

  return previousPageData.next
}

export default function Feed() {
  const [loggedUser, setLoggedUser] = useState<string | undefined>(undefined)

  const router = useRouter()

  const { data, size, setSize } = useSWRInfinite(getKey, fetcher)

  const isEmpty = data?.[0]?.next === null
  const isReachedEnd = isEmpty || (data && data[data.length - 1]?.next === null)

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

  return (
    <>
      <Head>
        <title>CodeLeap Network Feed</title>
        <meta name="description" content="A feed page from CodeLeap Network." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.ico" />
      </Head>
      <main className="w-full flex justify-center">
        <section className="bg-white max-w-[50rem] w-full p-6 flex flex-col gap-6">
          <NewPost loggedUser={loggedUser} />

          {data && (
            <InfiniteScroll
              dataLength={data.length}
              next={() => setSize(size + 1)}
              hasMore={!isReachedEnd}
              loader={<h4 className="self-center text-gray-400">Loading...</h4>}
              endMessage={
                <p className="font-bold text-gray-400 self-center">
                  Yay! You have seen all the posts.
                </p>
              }
              className="flex flex-col gap-8"
            >
              {data.map((page) =>
                page.results.map((post: PostData) => {
                  return (
                    <Post key={post.id} post={post} loggedUser={loggedUser} />
                  )
                }),
              )}
            </InfiniteScroll>
          )}
        </section>
      </main>
    </>
  )
}
