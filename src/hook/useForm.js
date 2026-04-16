// src/hooks/useForm.js
import { useState } from "react";

const useForm = (initialValues = {}) => {

  const [form, setForm]       = useState(initialValues);
  const [errors, setErrors]   = useState({});
  const [loading, setLoading] = useState(false);

  // Actualiza cualquier campo
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    // limpia el error del campo al escribir
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  // Limpia el formulario al estado inicial
  const resetForm = () => {
    setForm(initialValues);
    setErrors({});
  };

  // Llena el formulario con datos existentes (para editar)
  const fillForm = (data) => {
    setForm(data);
  };

  // Valida campos requeridos
  const validate = (requiredFields = []) => {
    const newErrors = {};
    requiredFields.forEach(field => {
      if (!form[field] || form[field].toString().trim() === "") {
        newErrors[field] = "Este campo es requerido";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // true = válido
  };

  // Submit con loading automático
  const handleSubmit = (onSubmit, requiredFields = []) => async (e) => {
    e?.preventDefault();
    if (!validate(requiredFields)) return;
    setLoading(true);
    try {
      await onSubmit(form);
      resetForm();
    } catch (err) {
      console.error("Error en submit:", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    errors,
    loading,
    handleChange,
    resetForm,
    fillForm,
    validate,
    handleSubmit,
    setForm,
    setErrors,
  };
};

export default useForm;