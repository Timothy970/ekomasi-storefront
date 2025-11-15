import React, { useState, useRef, useEffect } from 'react';
import { Label } from './ui/label';
import { Input } from './ui/input';

interface ShareWishlistModalProps {
    isOpen: boolean;
    onClose: () => void;
    onShare: (email: string, message: string) => void;
}

const ShareWishlistModal: React.FC<ShareWishlistModalProps> = ({ isOpen, onClose, onShare }) => {
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [message, setMessage] = useState('');
    const modalRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose()
            }
        };
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);
    if (!isOpen) return null;
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) {
            setErrorMessage("Please enter an email address.");
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setErrorMessage("Please enter a valid email address.");
            return;
        }
        setErrorMessage('');
        onShare(email, message);
        setEmail('');
        setMessage('');
        onClose();
    };
    return (
        <div
            ref={modalRef}
            className="absolute top-full right-0 mt-2 z-50 bg-white rounded-lg shadow-xl border border-gray-200 p-6 w-[90vw] md:w-[400px]"
        >
            <h2 className="text-[1.25rem] font-semibold mb-4 text-custom-black">Share Wishlist</h2>
            <form onSubmit={handleSubmit}>
                <div className="block mb-4">
                    <Label className="block text-[0.875rem] font-medium mb-2 text-custom-black">
                        Recipient Email
                    </Label>
                    <Input
                        type="email"
                        className="w-full border border-gray-300 rounded-[0.5rem] px-3 py-2 text-[0.875rem] focus:outline-none focus:ring-2 focus:ring-[rgba(232,41,138,0.25)] focus:border-transparent"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        placeholder="Enter recipient's email"
                    />
                    {errorMessage && <div className="text-red-500 text-[0.75rem]">{errorMessage}</div>}
                </div>
                <div className="block mb-6">
                    <Label className="block text-[0.875rem] font-medium mb-2 text-custom-black">
                        Message (optional)
                    </Label>
                    <textarea
                        className="w-full h-24 border border-gray-300 rounded-[0.5rem] px-3 py-2 text-[0.875rem] resize-none focus:outline-none focus:ring-2 focus:ring-[rgba(232,41,138,0.25)] focus:border-transparent"
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        placeholder="Add a personalized message"
                    />
                </div>
                <div className="flex justify-end gap-[0.75rem]">
                    <button
                        type="button"
                        className="px-4 py-2 h-[2.5rem] bg-white text-custom-black text-[0.875rem] border border-black rounded-[0.5rem] hover:bg-gray-50 transition-colors"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 h-[2.5rem] bg-[rgba(232,41,138,0.25)] text-custom-black text-[0.875rem] border border-[rgba(232,41,138,0.25)] rounded-[0.5rem] hover:bg-[rgba(232,41,138,0.35)] transition-colors"
                        onClick={handleSubmit}
                    >
                        Share
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ShareWishlistModal;