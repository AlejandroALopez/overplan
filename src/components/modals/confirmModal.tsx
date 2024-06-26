"use client";

import { useAppSelector, useAppDispatch } from "@/lib/store";
import { setIsConfirmOpen } from "@/lib/store/modalSlice";

export default function ConfirmModal() {
    const dispatch = useAppDispatch();
    const { isConfirmOpen, message, onConfirm } = useAppSelector(state => state.modal);

    const closeModal = () => {
        dispatch(setIsConfirmOpen(false));
    }

    // Execute function passed to modal
    const handleConfirm = () => {
        if (onConfirm) onConfirm();
        closeModal();
    };

    if (!isConfirmOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div onClick={closeModal} className="absolute inset-0 bg-white bg-opacity-75"></div>
            <div className="relative bg-white rounded-lg shadow-lg w-96 max-w-md mx-auto p-6">
                <p className="text-xl font-medium text-center">{message}</p>
                <div className="flex flex-row justify-between mt-4">
                    <button
                        onClick={closeModal}
                        className={`py-4 px-6 border-none rounded-md bg-gray-200 
                        text-black text-xl drop-shadow-lg transition hover:scale-110 duration-300`}>
                        No
                    </button>
                    <button
                        onClick={handleConfirm}
                        className={`py-4 px-6 border-none rounded-md bg-primary 
                        text-white text-xl drop-shadow-lg transition hover:scale-110 duration-300`}>
                        Yes
                    </button>
                </div>
            </div>
        </div>
    )
}