import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { LoginApolo } from './LoginApolo'
import { PrimeReactProvider } from 'primereact/api'
import { ModalProvider } from './context/ModalContext/ModalContext'
import { ThemeProvider } from './context/theme/ThemeContext'
import { ConfirmDialogProvider } from './context/ConfirmDialog/ConfirmDialogContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PrimeReactProvider>
        <ThemeProvider>
          <ConfirmDialogProvider>
            <ModalProvider>
            <LoginApolo />
            </ModalProvider>
          </ConfirmDialogProvider>
        </ThemeProvider>
    </PrimeReactProvider>
  </StrictMode>,
)
