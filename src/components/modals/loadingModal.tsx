"use client";

import { useAppSelector } from "@/lib/store";

import '../../app/globals.css';


export default function LoadingModal() {
    const isLoading = useAppSelector(state => state.modal.isLoading);

    if(!isLoading) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-white bg-opacity-75"></div>
            <div className="relative flex flex-col items-center gap-6 bg-white rounded-lg drop-shadow-lg max-w-md mx-auto py-12 px-24">
                <div className="loading-spinner" />
                <p className="text-2xl font-medium">Loading...</p>
            </div>
        </div>
    )
}