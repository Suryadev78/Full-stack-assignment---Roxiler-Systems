import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className=' w-full h-screen font-bold flex justify-center justify-items-center'>
        <h1 className='text-2xl'>Hello Vite!</h1>
     </div>
    </>
  )
}

export default App
