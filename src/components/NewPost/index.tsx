import axios from 'axios'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

interface NewPostProps {
  loggedUser: string | undefined
  revalidateSWRData: () => void
}

interface FormData {
  title: string
  content: string
}

export default function NewPost({
  loggedUser,
  revalidateSWRData,
}: NewPostProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { dirtyFields },
  } = useForm({ defaultValues: { title: '', content: '' } })

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
        </div>
        <div className="flex flex-col gap-2">
          <label className="leading-[1.1875rem]">Content</label>
          <textarea
            rows={4}
            placeholder="Content here"
            className="default-input-pattern"
            {...register('content', { required: true })}
          ></textarea>
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
