import { PostData } from '@/types'
import { Icon } from '@iconify/react'

interface PostProps {
  post: PostData
  loggedUser: string | undefined
}

function InteractionButtons() {
  return (
    <span className="flex items-center gap-6">
      <button>
        <Icon
          icon="ic:baseline-delete-forever"
          className="w-[1.875rem] h-[1.875rem] text-white"
        />
      </button>
      <button>
        <Icon
          icon="bx:bx-edit"
          className="w-[1.875rem] h-[1.875rem] text-white"
        />
      </button>
    </span>
  )
}

export default function Post({ post, loggedUser }: PostProps) {
  return (
    <section className="flex flex-col">
      <div className="flex justify-between items-center p-6 bg-lilac-300 rounded-t-lg">
        <h3 className="text-white font-bold text-xl leading-[1.375rem]">
          {post.title}
        </h3>
        {loggedUser === post.username && <InteractionButtons />}
      </div>

      <div className="flex flex-col p-6 gap-2 border-gray-400 border-[1px] border-t-0 rounded-b-lg">
        <span className="flex justify-between text-lg leading-[1.125rem] text-gray-400">
          <p className="font-bold">@{post.username}</p>
          <p>{post.createdAt}</p>
        </span>
        <p className="text-lg leading-5">{post.content}</p>
      </div>
    </section>
  )
}
