import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { UserData } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

const usernameValidationSchema = zod.object({
  username: zod
    .string()
    .max(15, { message: 'Username must have a maximum of 15 characters.' }),
})

export type UsernameData = zod.infer<typeof usernameValidationSchema>

export default function SignUp() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<UsernameData>({
    resolver: zodResolver(usernameValidationSchema),
    defaultValues: { username: '' },
  })

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
        {errors.username && (
          <p className="text-red-400 text-xs">
            &apos;{errors.username.message}&apos;
          </p>
        )}
        <input
          type="submit"
          disabled={!isDirty}
          value="ENTER"
          className="bg-lilac-300 self-end text-white enabled:hover:bg-lilac-400 default-button-pattern default-transition"
        />
      </form>
    </section>
  )
}
