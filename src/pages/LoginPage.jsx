import React, { useState } from 'react';
import { loginUser } from '../api/services/authService';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ setUser }) => {

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
    e.preventDefault(); 
    setError("");

    try {
        const userFound = await loginUser(form);
        
        setUser(userFound); 
        
        navigate('/home'); 
    } catch (err) {
        setError(err.response?.data?.message || "Credenciales inválidas");
    }
};

    return (
        <>

                <div className='flex items-center justify-center'>
                    <figure className='-mb-22'>
                        <img
                        src='/img/logoApolo.png'
                        alt='Logo Apolo'
                        className='object-contain w-150'
                        />
                    </figure>
                </div>
                <div className="flex items-start justify-center pt-0 ">
                    <form 
                    className='border rounded-lg w-100 p-2 mb-1'
                    onSubmit={handleSubmit}
                    >
                        <h1 className='flex items-center justify-center text-3xl mb-2 p-3'>Iniciar sesión</h1>
                        {error && <p className='text-red-500 mb-4'>{error}</p>}
                        <input
                            type="email"
                            placeholder='Email'
                            className='rounded-xl border p-3 w-95 mb-3'
                            value={form.email} 
                            onChange={(e) => setForm({
                                ...form, email: e.target.value
                            })}
                        />
                        <input
                            type="password"
                            placeholder='Contraseña'
                            className='rounded-xl border p-3 w-95 mb-3'
                            value={form.password} 
                            onChange={(e) => setForm({
                                ...form, password: e.target.value
                            })}
                        />
                        <button type="submit" className='btn btn-warning  p-3 w-95 mb-2'>Iniciar sesión</button>
                    </form>

                    <footer className='absolute bottom-0 w-full text-center text-sm p-4'>
                        © {new Date().getFullYear()} Apolonet. Todos los derechos reservados.
                    </footer>
                </div>
            
        </>
    )
}

export default LoginPage;