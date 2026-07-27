import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import './index.css'
import './pages.css'
import App from './App.jsx'
import { Analytics } from "@vercel/analytics/react"

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Analytics />
      <App />
      <Toaster position="bottom-center" />
    </QueryClientProvider>
  </StrictMode>,
)
