import { useParams } from 'react-router-dom'

import { TasksTable } from './components'

export default function List() {
  const { id } = useParams()

  console.log('hello')

  return <h1>{`list number is: ${id}`}</h1>

  // return <TasksTable />
}
