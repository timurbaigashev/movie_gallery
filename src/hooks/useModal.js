// src/hooks/useModal.js
import { useState } from "react";

export function useModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState(null); // можно передавать любые данные (название фильма и т.д.)

  const openModal = (data = null) => {
    setModalData(data);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalData(null);
  };

  return {
    isOpen,
    modalData,
    openModal,
    closeModal,
  };
}