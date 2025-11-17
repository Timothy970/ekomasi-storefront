import React, { useState } from 'react';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useShareWishlistModal } from '@/app/ClientLayout';
import { X } from 'lucide-react';

interface ShareWishlistModalProps {
    isOpen: boolean;
    onShare: (email: string, message: string) => void;
}

const ShareWishlistModal: React.FC<ShareWishlistModalProps> = ({ isOpen, onShare }) => {
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [message, setMessage] = useState('');
    const { setShareWishlistModalOpen } = useShareWishlistModal();

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
        setShareWishlistModalOpen(false)
    };

    return (
        <div className='absolute inset-0 z-[600] h-screen w-screen flex justify-center items-center'>
            <div className='absolute bg-black/50 z-[65] h-screen w-screen' onClick={() => setShareWishlistModalOpen(false)}>
                <div className='flex p-[1rem] pt-[3rem] w-full justify-end'>
                    <X className='text-white' />
                </div>
            </div>

            <div className='bg-white flex hide-scrollbar flex-col items-center justify-center w-[90vw] rounded md:w-[400px] p-[3rem] gap-y-[1rem] m-[1rem] overflow-y-scroll z-[70]'>
                <h2 className="text-[1.125rem] font-semibold mb-4 text-custom-black">Share Wishlist</h2>

                <form onSubmit={handleSubmit} className='w-full flex flex-col gap-y-[1rem]'>
                    <div className="block mb-4">
                        <Label className="block text-[0.875rem] font-medium mb-2 text-custom-black">
                            Recipient Email
                        </Label>

                        <Input
                            type="email"
                            className="w-full border px-3 py-2 text-[0.875rem]"
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

                        <Textarea
                            className="w-full bg-white h-24 rounded-[0.5rem] px-3 py-2 text-[0.875rem]"
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                            placeholder="Add a personalized message"
                        />
                    </div>

                    <div className="flex justify-end gap-[0.75rem]">
                        <button
                            type="button"
                            className="px-4 py-2 h-[2.5rem] bg-white text-custom-black text-[0.875rem] border border-black rounded-[0.5rem] hover:bg-gray-50 transition-colors"
                            onClick={() => setShareWishlistModalOpen(false)}
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
        </div>
    );
};

export default ShareWishlistModal;