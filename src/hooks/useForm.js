// src/hooks/useForm.js
import { useState } from "react";

export function useForm(initialValues = {}) {
  const [values, setValues] = useState(initialValues);

  // Универсальная функция изменения любого поля
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Сброс формы в начальное состояние
  const resetForm = () => {
    setValues(initialValues);
  };

  // Удобная обёртка для onSubmit
  const handleSubmit = (onSubmitFn) => (e) => {
    e.preventDefault();
    onSubmitFn(values);        // передаём все данные формы
  };

  return {
    values,
    handleChange,
    resetForm,
    handleSubmit,
  };
}