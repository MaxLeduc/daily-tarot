import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppBackground } from '@app/components'
import { CardList, Home } from '@app/views'

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/card-list" element={<CardList />} />
      </Routes>
    </BrowserRouter>
  )
}

function App() {
  return (
    <AppBackground>
      <Router />
    </AppBackground>
  )
}

export default App
