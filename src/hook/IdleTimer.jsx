import { useEffect, useRef, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../api/services/authService";

const TIMEOUT = 30 * 60 * 1000 // 30min

const useIdleTimer = (setUser) => {
    const [log, setLog] = useState('')
    const timer = useRef(null);
    const navigate = useNavigate();

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

    const resetTimer = useCallback(() => {
        clearTimeout(timer.current);
        timer.current = setTimeout(logout, TIMEOUT);
    }, [logout])

    useEffect(() => {
        const eventos = ["mousemove", "keydown", "click", "scroll", "touchstart"];
        eventos.forEach(ev => window.addEventListener(ev, resetTimer));
        resetTimer();

        return () => {
            clearTimeout(timer.current);
            eventos.forEach(ev => window.removeEventListener(ev, resetTimer));
        }
    }, [resetTimer]);
};

export default useIdleTimer;
