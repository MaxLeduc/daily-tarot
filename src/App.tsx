import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppBackground } from '@app/components'
import { Home } from '@app/views'

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
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
