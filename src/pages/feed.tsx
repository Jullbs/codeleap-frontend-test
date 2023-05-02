import NewPost from '@/components/NewPost'
import Post from '@/components/Post'
import Head from 'next/head'

export default function Feed() {
  const post = {
    id: 1,
    username: 'Victor',
    title: 'My First Post at CodeLeap Network!',
    createdAt: '25 minutes ago',
    content:
      'Curabitur suscipit suscipit tellus. Phasellus consectetuer vestibulum elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas egestas arcu quis ligula mattis placerat. Duis vel nibh at velit scelerisque suscipit. Duis lobortis massa imperdiet quam. Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc, eu sollicitudin urna dolor sagittis lacus. Fusce a quam. Nullam vel sem. Nullam cursus lacinia erat.',
  }

  return (
    <>
      <Head>
        <title>CodeLeap Network Feed</title>
        <meta name="description" content="A feed page from CodeLeap Network." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-screen h-full flex justify-center pt-[5.125rem]">
        <div className="bg-white max-w-[50rem] w-full p-6 flex flex-col gap-6">
          <NewPost />
          <Post post={post} />
        </div>
      </main>
    </>
  )
}
