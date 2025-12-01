import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ComponentErrorBoundary } from '@/error-boundaries'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ComponentErrorBoundary name="RootBoundary">
      <App />
    </ComponentErrorBoundary>
  </StrictMode>,
)
