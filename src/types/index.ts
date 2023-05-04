export interface UserData {
  username: string
}

export interface PostData {
  id: number
  username: string
  created_datetime: string
  title: string
  content: string
}

export interface PageData {
  count: number
  next: string | null
  previous: string | null
  results: PostData[]
}

export type ModalType = 'edit' | 'delete' | undefined
