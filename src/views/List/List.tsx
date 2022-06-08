import { useContext, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import Button from '@mui/material/Button'

import { ListContext } from '@app/providers'
import { List } from '@app/types'
import { APIClient } from '@app/api'
import { ViewContainer } from '@app/components'

import { TasksTable } from './components'
import { useEffect } from 'react'

export default function SingleListView() {
  const { id: listId } = useParams()
  const { lists, setLists } = useContext(ListContext)

  if (!listId) {
    console.error('Invalid list ID param.')

    return null
  }

  const currentList = useMemo(
    () => lists.find((list: List) => list.id === Number(listId)),
    [lists, listId],
  )

  useEffect(() => {
    const fetchList = async () =>
      await APIClient.get(`/api/lists/${listId}`)
        .then(res => res.json())
        .then(({ data }) => {
          if (setLists) {
            setLists(data as List[])
          }
        })
        .catch(e => console.error(e))

    if (!currentList) {
      fetchList()
    }
  }, [currentList])

  if (!currentList) {
    return null
  }

  const { created_at, name } = currentList
  const formattedCreatedAt = new Date(created_at).toDateString()

  return (
    <ViewContainer>
      <h1>List: {name}</h1>
      <p>Created At: {formattedCreatedAt}</p>
      <Link
        to={`/lists/${listId}/createTask`}
        style={{ textDecoration: 'none' }}
      >
        <Button variant="contained">Add Task</Button>
      </Link>
      <TasksTable />
    </ViewContainer>
  )
}
