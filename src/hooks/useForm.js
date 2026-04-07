// src/hooks/useForm.js
import { useState, useRef, useCallback } from "react";

export function useForm(initialValues = {}) {
  const [values, setValues] = useState(initialValues);
  const formRef = useRef(null);                    // для uncontrolled полей

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Получить значение uncontrolled поля
  const getUncontrolledValue = (name) => {
    return formRef.current ? formRef.current.elements[name]?.value : "";
  };

  const resetForm = () => {
    setValues(initialValues);
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  const handleSubmit = useCallback((onSubmitFn) => (e) => {
    e.preventDefault();

    // Собираем данные из controlled + uncontrolled полей
    const formData = { ...values };

    if (formRef.current) {
      Array.from(formRef.current.elements).forEach((element) => {
        if (element.name && !values.hasOwnProperty(element.name)) {
          formData[element.name] = element.value;
        }
      });
    }

    onSubmitFn(formData);
  }, [values]);

  return {
    values,                    // controlled values
    handleChange,
    resetForm,
    handleSubmit,
    formRef,                   // для uncontrolled полей
    getUncontrolledValue,
  };
}