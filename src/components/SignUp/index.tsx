import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { UserData } from '@/types'

export default function SignUp() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { isDirty },
  } = useForm({ defaultValues: { username: '' } })

  const onSubmit = (data: UserData) => {
    localStorage.setItem(
      '@codeleap-network-frontend-test:username',
      data.username,
    )

    router.push('/feed')
  }

  return (
    <section className="bg-white max-w-[31.25rem] w-full rounded-2xl p-6">
      <h1 className="font-bold text-xl mb-6">Welcome to CodeLeap network!</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <label htmlFor="username">Please enter your username</label>
        <input
          type="text"
          placeholder="John Doe"
          {...register('username', { required: true })}
          className="p-2 text-sm leading-4 border-gray-400 border-[1px] rounded-lg focus:outline-lilac-400"
        />
        <input
          type="submit"
          disabled={!isDirty}
          value="ENTER"
          className="bg-lilac-300 self-end mt-2 px-8 py-2 rounded-lg font-bold text-white leading-[1.125rem] disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-lilac-400 hover:cursor-pointer"
        />
      </form>
    </section>
  )
}
