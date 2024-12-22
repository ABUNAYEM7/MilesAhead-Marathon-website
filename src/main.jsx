import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import MainRoutes from './Routes/MainRoutes'
import AuthProvider from './AuthProvider/AuthProvider'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <AuthProvider>
    <BrowserRouter>
    <MainRoutes/>
    </BrowserRouter>
    </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
