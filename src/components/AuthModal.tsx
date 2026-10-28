import React, { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

const CBT_PORTAL_URL = 'https://ujiancbt.ai.studio/';

export interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultRole?: 'user' | 'admin';
  initialStudentData?: any;
  onOpenRegistration?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      window.location.href = CBT_PORTAL_URL;
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center border-2 border-[#D4AF37] shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
        <h3 className="text-base sm:text-lg font-black text-[#1A1615]">
          Mengalihkan ke Portal CBT Resmi...
        </h3>
        <p className="text-xs text-[#756F68] leading-relaxed">
          Seluruh dashboard peserta, ujian CBT, dan dashboard admin telah dialihkan langsung ke situs resmi:
        </p>
        <a
          href={CBT_PORTAL_URL}
          className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl text-xs font-black bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-md hover:from-amber-700 hover:to-amber-800 transition-all cursor-pointer"
        >
          <span>Buka https://ujiancbt.ai.studio/</span>
          <ArrowRight className="w-4 h-4" />
        </a>
        <button
          onClick={onClose}
          className="text-xs text-neutral-400 hover:text-neutral-600 block mx-auto underline pt-1 cursor-pointer"
        >
          Tutup
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
