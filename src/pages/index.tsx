import Head from 'next/head'
import SignUp from '../components/SignUp'

export default function Home() {
  return (
    <>
      <Head>
        <title>CodeLeap Network</title>
        <meta
          name="description"
          content="A signup page from CodeLeap Network."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.ico" />
      </Head>
      <main className="w-full h-screen flex justify-center items-center">
        <SignUp />
      </main>
    </>
  )
}
