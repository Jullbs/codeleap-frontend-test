import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>CodeLeap Network</title>
        <meta
          name="description"
          content="A signup page test from CodeLeap Network."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-screen h-screen flex justify-center items-center font-default">
        <section className="bg-white max-w-[31.25rem] w-full rounded-2xl p-6 ">
          <h1 className="font-bold text-xl mb-6">
            Welcome to CodeLeap network!
          </h1>
          <form className="flex flex-col gap-2">
            <label htmlFor="username">Please enter your username</label>
            <input
              id="username"
              type="text"
              placeholder="John Doe"
              className="border-gray-400 border-[1px] rounded-lg p-2 text-sm leading-4"
            />
            <button
              type="submit"
              className="bg-lilac-300 self-end mt-2 px-8 py-2 rounded-lg font-bold text-white leading-[1.125rem] disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-lilac-400"
            >
              ENTER
            </button>
          </form>
        </section>
      </main>
    </>
  )
}
