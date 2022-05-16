import { useEffect, useState } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID' },
  { field: 'name', headerName: 'Name' },
]

export default function BasicTable() {
  const [lists, setLists] = useState([])

  console.log('dev')

  // todo: cleanup
  // local host should be an env variable
  // probably need an abstracted client soon
  useEffect(() => {
    fetch(`${import.meta.env.DEV ? 'http://localhost:8888' : ''}/api/lists`)
      .then(res => res.json())
      .then(({ data }) => {
        setLists(data)
      })
      .catch(e => {
        console.error(e)
      })
  }, [])

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <DataGrid
        rows={lists}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  )
}
