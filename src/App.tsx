import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Lists, List } from '@app/views'
import { ListProvider } from '@app/providers'

function App() {
  return (
    <ListProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Lists />} />
          <Route path="/lists/:id" element={<List />} />
        </Routes>
      </BrowserRouter>
    </ListProvider>
  )
}

export default App
