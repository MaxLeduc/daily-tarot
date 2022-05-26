import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Lists, List } from './views'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Lists />} />
        <Route path="/lists/:id" element={<List />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
