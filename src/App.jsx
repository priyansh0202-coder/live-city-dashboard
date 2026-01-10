import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-8">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Tailwind CSS is Working! 🎉
        </h1>
        
        <div className="space-y-4">
          <p className="text-lg text-gray-600">
            This text is styled with Tailwind CSS
          </p>
          
          <div className="bg-gray-50 rounded-xl p-6">
            <button 
              onClick={() => setCount((count) => count + 1)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 transform hover:scale-105"
            >
              Count is {count}
            </button>
            <p className="text-gray-600 mt-4 text-sm">
              Click the button to test React state
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-2 mt-6">
            <div className="bg-red-400 h-8 rounded"></div>
            <div className="bg-green-400 h-8 rounded"></div>
            <div className="bg-blue-400 h-8 rounded"></div>
          </div>
          
          <p className="text-xs text-gray-500 mt-4">
            Color palette demonstration
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
