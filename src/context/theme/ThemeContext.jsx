import { createContext, useContext, useEffect, useState } from "react";

/**
 * @typedef {Object} ThemeContextType
 * @property {string} theme - El tema actual aplicado ('light' o 'dark').
 * @property {function} toggleTheme - Función para alternar entre los temas disponibles.
 */
const ThemeContext = createContext();

/**
 * `ThemeProvider` - Proveedor de contexto para la gestión del tema visual (Light/Dark).
 * * Este componente se encarga de:
 * 1. Persistir la preferencia del usuario en el `localStorage`.
 * 2. Aplicar el atributo `data-theme` al elemento raíz (`<html>`), permitiendo que DaisyUI y Tailwind cambien los colores.
 * 3. Sincronizar el estado del tema al cargar la aplicación.
 * * @param {Object} props
 * @param {React.ReactNode} props.children - Componentes que consumirán el tema.
 */
export const ThemeProvider = ({ children }) => {
    /** @state {string} theme - Estado local del tema actual. */
    const [theme, setTheme] = useState("light");

    /**
     * Efecto inicial: Recupera el tema guardado en el navegador.
     * Si no existe, establece 'light' por defecto.
     */
    useEffect(() => {
        const saved = localStorage.getItem("theme") || "ligth";
        setTheme(saved);
    }, []);

    /**
     * Efecto de actualización: Cada vez que el tema cambia, actualiza 
     * el DOM y el almacenamiento local.
     */
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    /**
     * Cambia el tema de 'light' a 'dark' y viceversa.
     */
    const toggleTheme = () => {
        setTheme(prev => (prev === "light" ? "dark" : "light"));
    };

    return(
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            { children }
        </ThemeContext.Provider>
    );
};

/**
 * Hook personalizado para acceder al tema actual y a la función de cambio.
 * * @returns {ThemeContextType}
 * * @example
 * const { theme, toggleTheme } = useTheme();
 */
export const useTheme = () => useContext(ThemeContext);