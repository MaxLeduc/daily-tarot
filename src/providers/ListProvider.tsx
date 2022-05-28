import { createContext, FC, ReactNode, useState, useEffect } from 'react'

import type {List} from '@app/types'
import {APIClient} from '@app/api'

type ListContextProps = {
  children: ReactNode
}

export const ListContext = createContext<{ lists: List[] } | null>(null)

const ListProvider: FC<ListContextProps> = ({ children }) => {
  const [lists, setLists] = useState([])
  let isLoading: boolean = false

  useEffect(() => {
    if (isLoading) {
      return
    }

    const fetchLists = async () => {
      isLoading = true

      await new APIClient().get('/api/lists')
        .then(res => res.json())
        .then(({ data }) => {
          isLoading = false
          setLists(data)
        })
        .catch(e => {
          console.error(e)
        })
    } 

    fetchLists()
  }, [])

  return (
    <ListContext.Provider value={{ lists }}>{children}</ListContext.Provider>
  )
}

export default ListProvider
