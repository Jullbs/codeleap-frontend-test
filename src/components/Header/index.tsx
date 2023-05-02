import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Icon } from '@iconify/react'

export default function Header() {
  const [loggedUser, setLoggedUser] = useState<string | undefined>(undefined)

  const router = useRouter()

  useEffect(() => {
    const username = localStorage.getItem(
      '@codeleap-network-frontend-test:username',
    )

    if (username) {
      setLoggedUser(username)
    }
  }, [])

  const logOutUser = () => {
    localStorage.removeItem('@codeleap-network-frontend-test:username')

    router.push('/')
  }

  return (
    <header className="fixed w-full flex justify-center text-white">
      <div className="max-w-[50rem] w-full p-7 flex justify-between bg-lilac-300 ">
        <h1 className="font-bold text-xl leading-[1.625rem]">
          CodeLeap Network
        </h1>

        <span className="flex items-center gap-6">
          <p className="font-bold">@{loggedUser}</p>
          <button onClick={logOutUser}>
            <Icon
              icon="material-symbols:logout"
              className="w-[1.875rem] h-[1.875rem]"
            />
          </button>
        </span>
      </div>
    </header>
  )
}