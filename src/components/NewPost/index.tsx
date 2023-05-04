import axios from 'axios'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { toast } from 'react-toastify'

interface NewPostProps {
  loggedUser: string | undefined
  revalidateSWRData: () => void
}

interface FormData {
  title: string
  content: string
}

const newPostValidationSchema = zod.object({
  title: zod
    .string()
    .max(30, { message: 'Post title must have a maximum of 30 characters.' }),
  content: zod.string().max(500, {
    message: 'Post content must have a maximum of 500 characters.',
  }),
})

export type NewPostData = zod.infer<typeof newPostValidationSchema>

export default function NewPost({
  loggedUser,
  revalidateSWRData,
}: NewPostProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, dirtyFields },
  } = useForm<NewPostData>({
    resolver: zodResolver(newPostValidationSchema),
    defaultValues: { title: '', content: '' },
  })

  const onSubmit = async (data: FormData) => {
    const postData = {
      username: loggedUser,
      ...data,
    }

    await axios
      .post('https://dev.codeleap.co.uk/careers/', postData)
      .then(function () {
        toast.success('Your post has been created!')
      })
      .catch(function (error) {
        console.log(error)
        toast.error('Something went wrong.')
      })

    reset()
    revalidateSWRData()
  }

  return (
    <section className="border-gray-400 border-[1px] rounded-lg p-6 flex flex-col gap-6">
      <h2 className="font-bold text-xl leading-[1.375rem]">
        What&apos;s on your mind?
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="leading-[1.1875rem]">
            Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="Hello world"
            className="default-input-pattern"
            {...register('title', { required: true })}
          />
          {errors.title && (
            <p className="text-red-400 text-xs">
              &apos;{errors.title.message}&apos;
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="leading-[1.1875rem]">Content</label>
          <textarea
            rows={4}
            placeholder="Content here"
            className="default-input-pattern"
            {...register('content', { required: true })}
          ></textarea>
          {errors.content && (
            <p className="text-red-400 text-xs">
              &apos;{errors.content.message}&apos;
            </p>
          )}
        </div>
        <button
          type="submit"
          disabled={!dirtyFields.title || !dirtyFields.content}
          className="bg-lilac-300 self-end default-button-pattern text-white enabled:hover:bg-lilac-400"
        >
          CREATE
        </button>
      </form>
    </section>
  )
}
