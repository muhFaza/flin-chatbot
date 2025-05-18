import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ChatBot from './components/ChatBot/ChatBot.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChatBot/>
    <App />
  </StrictMode>,
)
