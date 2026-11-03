import { useState } from 'react'
import {Route, Routes} from 'react-router-dom';
import './App.css';
import Auth from './Auth.jsx';
import Tasks from './Tasks.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
      <Route path='/' element={<Auth />}/>
      <Route path='/tasks' element={<Tasks />}/>
    </Routes>
    </>
  )
}

export default App
