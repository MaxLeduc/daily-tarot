import { useEffect, useContext } from 'react'

import { APIClient } from '@app/api'
import { ListContext } from '@app/providers'
import { List } from '@app/types'
import { ViewContainer } from '@app/components'

import { ListsTable } from './components'

export default function Lists() {
  const { setLists } = useContext(ListContext)

  useEffect(() => {
    const fetchLists = async () => {
      await APIClient.get('/api/lists')
        .then(res => res.json())
        .then(({ data }) => {
          if (setLists) {
            setLists(data as List[])
          }
        })
        .catch(e => {
          console.error(e)
        })
    }

    fetchLists()
  }, [])

  return (
    <ViewContainer>
      <ListsTable />
    </ViewContainer>
  )
}
