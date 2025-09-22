import { useSearchModal } from '@/app/ClientLayout';
import React from 'react';

export default function SearchBackground() {
  const { openSearchModal, setOpenSearchModal } = useSearchModal();

  if (!openSearchModal) return null; 

  return (
    <div
      className="h-screen w-screen fixed inset-0 z-[1000] bg-black/40"
      onClick={() => setOpenSearchModal(false)}
    />
  );
}
