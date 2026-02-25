import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import LogSession from './pages/LogSession'
import History from './pages/History'
import Progress from './pages/Progress'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/log" element={<LogSession />} />
        <Route path="/history" element={<History />} />
        <Route path="/progress" element={<Progress />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
