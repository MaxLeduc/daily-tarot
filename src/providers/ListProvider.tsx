import { createContext, FC, ReactNode, useState, useEffect } from 'react'
import type {List} from '../types'

type ListContextProps = {
  children: ReactNode
}

export const ListContext = createContext<{ lists: List[] } | null>(null)

const ListProvider: FC<ListContextProps> = ({ children }) => {
  const [lists, setLists] = useState([])

  // todo: cleanup
  // probably need an abstracted client soon
  useEffect(() => {
    fetch(`${import.meta.env.DEV ? import.meta.env.VITE_LOCAL_BACKEND_URL : ''}/api/lists`)
      .then(res => res.json())
      .then(({ data }) => {
        setLists(data)
      })
      .catch(e => {
        console.error(e)
      })
  }, [])

  return (
    <ListContext.Provider value={{ lists }}>{children}</ListContext.Provider>
  )
}

export default ListProvider
