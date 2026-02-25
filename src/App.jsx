import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import LogSession from './pages/LogSession'
import History from './pages/History'
import Progress from './pages/Progress'
// import SpotConditionsPanel from './components/SpotConditionsPanel'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/log" element={<LogSession />} />
        <Route path="/history" element={<History />} />
        <Route path="/progress" element={<Progress />} />
        
      </Routes>
    </>
  )
}

export default App
