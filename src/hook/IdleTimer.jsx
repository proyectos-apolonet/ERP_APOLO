import { useEffect, useRef, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../api/services/authService";

/**
 * Tiempo de espera antes de cerrar la sesión automáticamente.
 * Configurado actualmente en 30 minutos (en milisegundos).
 * @constant {number}
 */
const TIMEOUT = 30 * 60 * 1000 // 30min

/**
 * `useIdleTimer` - Hook personalizado para gestionar el cierre de sesión por inactividad.
 * * Este hook monitorea la actividad del usuario (mouse, teclado, clics, etc.) y dispara
 * un proceso de logout automático si no se detecta actividad dentro del tiempo definido.
 * * @example
 * // En el componente principal (App.js o NavBar)
 * useIdleTimer(setUser);
 * * @param {Function} setUser - Función para limpiar el estado global del usuario al expirar la sesión.
 * @returns {void}
 */
const useIdleTimer = (setUser) => {
   
    /** @state {string} log - Almacena la respuesta del servicio de logout. */
    const [log, setLog] = useState('')

    /** @property {React.MutableRefObject} timer - Referencia para almacenar el ID del temporizador activo. */
    const timer = useRef(null);
    const navigate = useNavigate();

    /**
     * Realiza el proceso de cierre de sesión tanto en el servidor como en el estado local.
     * @async
     * @callback logout
     */
    const logout = useCallback(async () => {
        try {
            const tempo = await logoutUser();
            setLog(tempo);
        } catch (err) {
            console.error("El token ya vencio", err);
        }
        setUser(null);
        navigate("/");
    }, [navigate, setUser]);

    /**
     * Reinicia el temporizador de inactividad.
     * Se invoca cada vez que el usuario interactúa con la interfaz.
     * @callback resetTimer
     */
    const resetTimer = useCallback(() => {
        clearTimeout(timer.current);
        timer.current = setTimeout(logout, TIMEOUT);
    }, [logout])

    /**
     * Configura los escuchadores de eventos del sistema (DOM) al montar el hook.
     * Los eventos monitoreados incluyen: movimiento del mouse, teclas, clics, scroll y toques.
     */
    useEffect(() => {
        const eventos = ["mousemove", "keydown", "click", "scroll", "touchstart"];

        // Agregar listeners para detectar actividad
        eventos.forEach(ev => window.addEventListener(ev, resetTimer));
        // Iniciar el temporizador por primera vez
        resetTimer();

        /**
         * Limpieza al desmontar: remueve los listeners y cancela el timeout pendiente
         * para prevenir ejecuciones en componentes que ya no están en pantalla.
         */
        return () => {
            clearTimeout(timer.current);
            eventos.forEach(ev => window.removeEventListener(ev, resetTimer));
        }
    }, [resetTimer]);
};

export default useIdleTimer;
