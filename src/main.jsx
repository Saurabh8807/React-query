import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import {QueryClient ,QueryClientProvider} from "@tanstack/react-query"
const queryClient =  new QueryClient()
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <App />
    <ReactQueryDevtools initailsIsOpen={false}/>
    </QueryClientProvider>
  </StrictMode>,
)