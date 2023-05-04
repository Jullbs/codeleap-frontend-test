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
          className="default-input-pattern"
        />
        <input
          type="submit"
          disabled={!isDirty}
          value="ENTER"
          className="bg-lilac-300 self-end text-white enabled:hover:bg-lilac-400 default-button-pattern"
        />
      </form>
    </section>
  )
}
