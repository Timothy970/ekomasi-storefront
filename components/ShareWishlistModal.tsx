import React, { useState } from 'react';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { useShareWishlistModal } from '@/app/ClientLayout';
import { X } from 'lucide-react';

interface ShareWishlistModalProps {
    isOpen: boolean;
    onShare: (email: string, message: string, fullNames: string) => void;
}

const ShareWishlistModal: React.FC<ShareWishlistModalProps> = ({ isOpen, onShare }) => {
    const [email, setEmail] = useState('');
    const [fullNames, setFullNames] = useState('');
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [fullNamesErrorMessage, setFullNamesErrorMessage] = useState('');
    const [message, setMessage] = useState('');
    const { setShareWishlistModalOpen } = useShareWishlistModal();

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!email) {
            setEmailErrorMessage("Please enter an email address.");
            return;
        }

        if (!fullNames) {
            setFullNamesErrorMessage("Please enter your full names.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/;

        if (!emailRegex.test(email)) {
            setEmailErrorMessage("Please enter a valid email address.");
            return;
        }

        setEmailErrorMessage('');
        setFullNamesErrorMessage('');
        onShare(email, message, fullNames);
        setEmail('');
        setMessage('');
        setShareWishlistModalOpen(false)
    };

    return (
        <div className='absolute inset-0 z-[600] h-screen w-screen flex justify-center items-center'>
            <button
                type="button"
                aria-label="Close modal overlay"
                className='absolute bg-black/50 z-[65] h-screen w-screen border-none p-0 cursor-pointer'
                onClick={() => setShareWishlistModalOpen(false)}
            />

            <div className='bg-white relative flex hide-scrollbar flex-col items-center justify-center w-[90vw] rounded md:w-[400px] p-[3rem] gap-y-[1rem] m-[1rem] overflow-y-scroll z-[70]'>
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label="Close modal"
                    className="absolute top-3 right-3 text-custom-black hover:bg-gray-100 rounded-full"
                    onClick={() => setShareWishlistModalOpen(false)}
                >
                    <X className="w-5 h-5" />
                </Button>

                <h2 className="text-[1.125rem] font-semibold mb-4 text-custom-black">Share Wishlist</h2>

                <form onSubmit={handleSubmit} className='w-full flex flex-col gap-y-[1rem]'>
                    <div className="block mb-4">
                        <Label className="block text-[0.875rem] font-medium mb-2 text-custom-black">
                            Your Names
                        </Label>

                        <Input
                            type="text"
                            className="w-full border px-3 py-2 text-[0.875rem]"
                            value={fullNames}
                            onChange={e => setFullNames(e.target.value)}
                            required
                            placeholder="Enter your name(s)"
                        />
                        {fullNamesErrorMessage && <div className="text-red-500 text-[0.75rem]">{fullNamesErrorMessage}</div>}
                    </div>
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
                        {emailErrorMessage && <div className="text-red-500 text-[0.75rem]">{emailErrorMessage}</div>}
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
                        <Button
                            type="button"
                            variant="outline"
                            className="px-4 py-2 h-[2.5rem] bg-white text-foreground text-[0.875rem] border border-border rounded-[0.5rem] hover:bg-muted transition-colors"
                            onClick={() => setShareWishlistModalOpen(false)}
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            className="px-4 py-2 h-[2.5rem] bg-primary-tenant text-primary-foreground text-[0.875rem] border border-primary-tenant rounded-[0.5rem] hover:opacity-90 transition-opacity"
                        >
                            Share
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ShareWishlistModal;