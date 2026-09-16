import { useSearchModal } from '@/app/ClientLayout';
import React from 'react';

export default function SearchBackground() {
  const { openSearchModal, setOpenSearchModal } = useSearchModal();

  if (!openSearchModal) return null; 

  return (
    <button
      type="button"
      aria-label="Close search overlay"
      className="h-screen w-screen fixed inset-0 z-[1000] bg-black/40 border-0 p-0 m-0 cursor-default"
      onClick={() => setOpenSearchModal(false)}
    />
  );
}
