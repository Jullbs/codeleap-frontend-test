import { ModalType } from '@/types'
import * as Dialog from '@radix-ui/react-dialog'
import { useForm } from 'react-hook-form'

interface ModalProps {
  modalType: ModalType
  setOpen: (value: boolean) => void
}

interface ModalTypeProps {
  setOpen: ModalProps['setOpen']
}

function EditModal({ setOpen }: ModalTypeProps) {
  const {
    register,
    handleSubmit,
    formState: { dirtyFields },
  } = useForm({ defaultValues: { title: '', content: '' } })
  const onSubmit = (data: any) => console.log(data)

  return (
    <Dialog.Content className="fixed z-50 max-w-[41.25rem] w-full p-6 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white rounded-2xl">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <h2 className="font-bold text-xl leading-[1.625rem]">Edit item</h2>
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="leading-[1.125rem]">
            Title
          </label>
          <input
            {...register('title', { required: true })}
            id="title"
            placeholder="Hello World"
            className="default-input-pattern"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="content" className="leading-[1.125rem]">
            Content
          </label>
          <input
            {...register('content', { required: true })}
            id="content"
            placeholder="Content here"
            className="default-input-pattern"
          />
        </div>
        <div className="flex justify-end gap-4">
          <button
            onClick={() => setOpen(false)}
            className="default-button-pattern border-gray-400 border-[1px] rounded-lg enabled:hover:bg-gray-300 enabled:hover:border-gray-300"
          >
            Cancel
          </button>
          <input
            type="submit"
            placeholder="Confirm"
            disabled={!dirtyFields.title || !dirtyFields.content}
            className="default-button-pattern text-white bg-green-400"
          />
        </div>
      </form>
    </Dialog.Content>
  )
}

function DeleteModal({ setOpen }: ModalTypeProps) {
  return (
    <Dialog.Content className="fixed flex flex-col gap-8 z-50 max-w-[41.25rem] w-full p-6 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white rounded-2xl">
      <h2 className="font-bold text-xl leading-[1.625rem]">
        Are you sure you want to delete this item?
      </h2>
      <span className="flex justify-end gap-4">
        <button
          onClick={() => setOpen(false)}
          className="default-button-pattern border-gray-400 border-[1px] rounded-lg enabled:hover:bg-gray-300 enabled:hover:border-gray-300"
        >
          Cancel
        </button>
        <button className="default-button-pattern text-white bg-red-400 enabled:hover:bg-red-500">
          Delete
        </button>
      </span>
    </Dialog.Content>
  )
}

export default function PostModal({ modalType, setOpen }: ModalProps) {
  switch (modalType) {
    case 'edit':
      return <EditModal setOpen={setOpen} />
    case 'delete':
      return <DeleteModal setOpen={setOpen} />
    default:
      return null
  }
}
