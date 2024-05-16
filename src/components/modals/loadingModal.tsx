"use client";

import { useAppSelector } from "@/lib/store";


export default function LoadingModal() {
    const isLoading = useAppSelector(state => state.modal.isLoading);

    if(!isLoading) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black bg-opacity-75"></div>
            <div className="relative bg-white rounded-lg shadow-lg w-11/12 max-w-md mx-auto p-6">
                Loading...
            </div>
        </div>
    )
}