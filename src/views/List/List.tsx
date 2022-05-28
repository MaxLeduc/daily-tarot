import { useContext, useMemo } from 'react'
import { useParams } from 'react-router-dom'

import { ListContext } from '@app/providers'
import { List } from '@app/types'

import { TasksTable } from './components'

export default function SingleListView() {
  const { id: listId } = useParams()
  const listValues = useContext(ListContext)

  if (!listValues || !listId) {
    console.error('Lists or ID param missing.')

    return null
  }

  const currentList = useMemo(
    () => listValues.lists.find((list: List) => list.id === Number(listId)),
    [listValues, listId],
  )

  if (!currentList) {
    return null
  }

  const { created_at, name } = currentList
  const formattedCreatedAt = new Date(created_at).toDateString()

  return (
    <>
      <h1>List: {name}</h1>
      <p>Created At: {formattedCreatedAt}</p>
      <TasksTable />
    </>
  )
}
