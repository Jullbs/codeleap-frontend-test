import { ModalType, PostData } from '@/types'
import { Icon } from '@iconify/react'
import * as Dialog from '@radix-ui/react-dialog'
import { useState } from 'react'
import PostModal from '../PostModal'
import getFormattedDate from '@/util/getFormattedDate'

interface PostProps {
  post: PostData
  loggedUser: string | undefined
}

interface InteractionButtonsProps {
  handleOpenModal: (value: ModalType) => void
}

function InteractionButtons({ handleOpenModal }: InteractionButtonsProps) {
  return (
    <span className="flex items-center gap-6 m-[-0.5rem]">
      <button onClick={() => handleOpenModal('delete')}>
        <Icon
          icon="ic:baseline-delete-forever"
          className="w-[2.375rem] h-[2.375rem] text-white rounded-lg p-1 default-transition hover:bg-lilac-400 hover:drop-shadow-lg"
        />
      </button>
      <button onClick={() => handleOpenModal('edit')}>
        <Icon
          icon="bx:bx-edit"
          className="w-[2.375rem] h-[2.375rem] text-white rounded-lg p-1 default-transition hover:bg-lilac-400 hover:drop-shadow-lg"
        />
      </button>
    </span>
  )
}

export default function Post({ post, loggedUser }: PostProps) {
  const [open, setOpen] = useState<boolean>(false)
  const [modalType, setModalType] = useState<ModalType>(undefined)

  function handleOpenModal(value: ModalType) {
    switch (value) {
      case 'edit':
        setModalType('edit')
        setOpen(true)
        return
      case 'delete':
        setModalType('delete')
        setOpen(true)
        return
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col">
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal className="fixed">
          <Dialog.Overlay className="fixed w-screen h-screen inset-0 z-20 bg-black/50" />
          <PostModal modalType={modalType} setOpen={setOpen} post={post} />
        </Dialog.Portal>
      </Dialog.Root>

      <div className="flex justify-between items-center p-6 bg-lilac-300 rounded-t-lg">
        <h3 className="text-white font-bold text-xl leading-[1.375rem]">
          {post.title}
        </h3>
        {loggedUser === post.username && (
          <InteractionButtons handleOpenModal={handleOpenModal} />
        )}
      </div>

      <div className="flex flex-col p-6 gap-2 border-gray-400 border-[1px] border-t-0 rounded-b-lg">
        <span className="flex flex-wrap gap-2 justify-between text-lg leading-[1.125rem] text-gray-400">
          <p className="font-bold truncate">@{post.username}</p>
          <p>{getFormattedDate(post.created_datetime)}</p>
        </span>
        <p className="text-lg leading-5">{post.content}</p>
      </div>
    </div>
  )
}
