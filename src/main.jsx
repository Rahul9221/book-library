// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
// import './index.css'
import LibraryForm from './Components/Form/Form.jsx'

createRoot(document.getElementById('root')).render(
  <>
  <App />
  <LibraryForm />
  </>
)
