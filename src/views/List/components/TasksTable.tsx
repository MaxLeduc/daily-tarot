import { useEffect, useState } from 'react'
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid'
import { useParams } from 'react-router-dom'
import { APIClient } from '@app/api'

import { Task } from '@app/types'

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID' },
  { field: 'created_at', headerName: 'Created At', flex: 1 },
  { field: 'name', headerName: 'Name', flex: 1 },
  { field: 'description', headerName: 'Description', flex: 1 },
]

export default function TasksTable() {
  const { id: listId } = useParams()
  const [tasks, setTasks] = useState<null | Task[]>(null)
  let isLoading: boolean = false

  useEffect(() => {
    if (isLoading) {
      return
    }

    const fetchTasks = async () => {
      isLoading = true
      await new APIClient()
        .get(`/api/lists/${listId}/tasks`)
        .then(res => res.json())
        .then(({ data }) => {
          isLoading = false
          setTasks(data)
        })
        .catch(e => {
          console.error(e)
        })
    }

    fetchTasks()
  }, [listId])

  if (!tasks) {
    return null
  }

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <DataGrid
        rows={tasks}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  )
}
