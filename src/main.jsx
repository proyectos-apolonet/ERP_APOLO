import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { LoginApolo } from './LoginApolo'
import { PrimeReactProvider } from 'primereact/api'
import { ModalProvider } from './context/ModalContext/ModalContext'
import { ThemeProvider } from './context/theme/ThemeContext'
import { ConfirmDialogProvider } from './context/ConfirmDialog/ConfirmDialogContext'

/**
 * @file main.jsx / index.js
 * @description Punto de arranque de la aplicación React.
 * Configura el renderizado en el DOM y envuelve la aplicación en una "cebolla" de proveedores
 * de contexto para habilitar funcionalidades globales en todo Apolonet.
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* 1. Proveedor de PrimeReact: Configura la base de componentes de UI de Prime */}
    <PrimeReactProvider>
      {/* 2. ThemeProvider: Gestiona el modo claro/oscuro y paleta de colores corporativa */}
      <ThemeProvider>
        {/* 3. ConfirmDialogProvider: Habilita el uso de confirmSave/confirmDelete en cualquier página */}
        <ConfirmDialogProvider>
          {/* 4. ModalProvider: Permite abrir modales dinámicos (como el de Nueva Requisa) */}
          <ModalProvider>
            {/* EL CORAZÓN: Router y lógica de autenticación */}
            <LoginApolo />
          </ModalProvider>
        </ConfirmDialogProvider>
      </ThemeProvider>
    </PrimeReactProvider>
  </StrictMode>,
)
