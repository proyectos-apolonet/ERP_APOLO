import React, { createContext, useContext, useState } from 'react'
import GlobalModal from '../GlobalContext/GlobalModal';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {

    const [modal, setModal] = useState({ isOpen: false });

    const openModal = (config) => setModal({ isOpen: true, ...config });  // ← fix
    const closeModal = () => setModal({ isOpen: false });

    return (
        <ModalContext.Provider value={{ openModal, closeModal }}>
            {children}
            <GlobalModal {...modal} onClose={closeModal} />
        </ModalContext.Provider>
    );
};

export const useModal = () => useContext(ModalContext);