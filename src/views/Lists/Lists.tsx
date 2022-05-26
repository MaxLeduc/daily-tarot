import { ListsTable } from './components'
import { ListProvider } from '../../providers'

export default function Lists() {
  return (
    <ListProvider>
      <ListsTable />
    </ListProvider>
  )
}
