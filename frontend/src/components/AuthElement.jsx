import React, { useState } from 'react'
import { useAuthStore } from '../store/useStoreAuth'
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from "@heroui/react";
import LoginForm from './Form/LoginForm'
const AuthElement = ({ children }) => {
    const { isAuthenticated,onOpen } = useAuthStore()
    const handleClick = () => {
        if (!isAuthenticated) {
            onOpen();
            return;
        }
    }


    const stopAllEvents = (e) => {
        if (!isAuthenticated) {
            e.stopPropagation();
            e.preventDefault();
        }
    };
    return (
        <div>
            <button onClick={handleClick}>
                <div
                    onClick={stopAllEvents}
                    onMouseDown={stopAllEvents}
                    onMouseUp={stopAllEvents}
                    onFocus={stopAllEvents}
                    onBlur={stopAllEvents}
                    onKeyDown={stopAllEvents}
                    onKeyUp={stopAllEvents}
                    className={`${!isAuthenticated && "pointer-events-none opacity-50"}`}
                >
                    {children}
                </div>
            </button>
            {/* modal */}
            
        </div>
    )
}

export default AuthElement