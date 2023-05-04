import { ModalType } from '@/types'
import * as Dialog from '@radix-ui/react-dialog'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { toast } from 'react-toastify'

interface ModalProps {
  modalType: ModalType
  setOpen: (value: boolean) => void
  postId: number
}

interface ModalTypeProps {
  setOpen: ModalProps['setOpen']
  postId: number
}

interface UpdatedDataType {
  updatedTitle: string
  updatedContent: string
}

const updatePostValidationSchema = zod.object({
  updatedTitle: zod
    .string()
    .max(30, { message: 'Post title must have a maximum of 30 characters.' }),
  updatedContent: zod.string().max(500, {
    message: 'Post content must have a maximum of 500 characters.',
  }),
})

export type UpdatePostData = zod.infer<typeof updatePostValidationSchema>

function EditModal({ setOpen, postId }: ModalTypeProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, dirtyFields },
  } = useForm<UpdatePostData>({
    resolver: zodResolver(updatePostValidationSchema),
    defaultValues: { updatedTitle: '', updatedContent: '' },
  })

  const onSubmit = (updatedData: UpdatedDataType) => {
    const postUpdatedData = {
      title: updatedData.updatedTitle,
      content: updatedData.updatedContent,
    }

    axios
      .patch(`https://dev.codeleap.co.uk/careers/${postId}/`, postUpdatedData)
      .then(function () {
        reset()
        setOpen(false)
        toast.success('Your post has been updated!')
      })
      .catch(function (error) {
        reset()
        setOpen(false)
        console.log(error)
        toast.error('Something went wrong.')
      })
  }

  return (
    <Dialog.Content className="fixed z-50 max-w-[41.25rem] w-full p-6 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white rounded-2xl">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <h2 className="font-bold text-xl leading-[1.625rem]">Edit item</h2>
        <div className="flex flex-col gap-2">
          <label htmlFor="updatedTitle" className="leading-[1.125rem]">
            Title
          </label>
          <input
            {...register('updatedTitle', { required: true })}
            id="updatedTitle"
            placeholder="Hello World"
            className="default-input-pattern"
          />
          {errors.updatedTitle && (
            <p className="text-red-400 text-xs">
              &apos;{errors.updatedTitle.message}&apos;
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="updatedContent" className="leading-[1.125rem]">
            Content
          </label>
          <textarea
            rows={4}
            {...register('updatedContent', { required: true })}
            id="updatedContent"
            placeholder="Content here"
            className="default-input-pattern"
          ></textarea>
          {errors.updatedContent && (
            <p className="text-red-400 text-xs">
              &apos;{errors.updatedContent.message}&apos;
            </p>
          )}
        </div>
        <div className="flex justify-end gap-4">
          <button
            onClick={() => setOpen(false)}
            className="default-button-pattern border-gray-400 border-[1px] rounded-lg enabled:hover:bg-white enabled:hover:border-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!dirtyFields.updatedTitle || !dirtyFields.updatedContent}
            className="default-button-pattern text-white bg-green-400"
          >
            Confirm
          </button>
        </div>
      </form>
    </Dialog.Content>
  )
}

function DeleteModal({ setOpen, postId }: ModalTypeProps) {
  function handleDeletePost() {
    axios
      .delete(`https://dev.codeleap.co.uk/careers/${postId}/`)
      .then(function () {
        setOpen(false)
        toast.success('Your post has been deleted!')
      })
      .catch(function (error) {
        setOpen(false)
        console.log(error)
        toast.error('Something went wrong.')
      })
  }

  return (
    <Dialog.Content className="fixed flex flex-col gap-8 z-50 max-w-[41.25rem] w-full p-6 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white rounded-2xl">
      <h2 className="font-bold text-xl leading-[1.625rem]">
        Are you sure you want to delete this item?
      </h2>
      <span className="flex justify-end gap-4">
        <button
          onClick={() => setOpen(false)}
          className="default-button-pattern border-gray-400 border-[1px] rounded-lg enabled:hover:bg-white enabled:hover:border-gray-300"
        >
          Cancel
        </button>
        <button
          onClick={() => handleDeletePost()}
          className="default-button-pattern text-white bg-red-400 enabled:hover:bg-red-500"
        >
          Delete
        </button>
      </span>
    </Dialog.Content>
  )
}

export default function PostModal({ modalType, setOpen, postId }: ModalProps) {
  switch (modalType) {
    case 'edit':
      return <EditModal setOpen={setOpen} postId={postId} />
    case 'delete':
      return <DeleteModal setOpen={setOpen} postId={postId} />
    default:
      return null
  }
}
