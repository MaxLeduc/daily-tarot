import React, { useContext, useMemo, useEffect } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { useParams } from 'react-router-dom'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'

import { ListContext } from '@app/providers'
import { List } from '@app/types'
import { APIClient } from '@app/api'
import { ViewContainer } from '@app/components'

export default function CreateTask() {
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

  return (
    <ViewContainer>
      <h1>Create Task for List: {currentList.name}</h1>
      <Box component="form" noValidate autoComplete="off">
        <Card style={{ width: '100%' }}>
          <CardContent>
            <TextField
              label="Name"
              id="name"
              variant="outlined"
              style={{ width: '100%', marginBottom: '15px' }}
            />
            <TextField
              label="Description"
              id="description"
              variant="outlined"
              style={{ width: '100%', marginBottom: '15px' }}
            />
            <Button variant="contained">Create</Button>
          </CardContent>
        </Card>
      </Box>
    </ViewContainer>
  )
}
