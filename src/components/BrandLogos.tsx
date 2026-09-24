import React from 'react';
import logoOsnImg from '../assets/images/logo_osn.png';
import logoLkpImg from '../assets/images/logo_lkp.png';
import stempelLkpImg from '../assets/images/stempel_lkp.png';

/**
 * 1. LOGO RESMI OLIMPIADE SISWA NASIONAL (LOGO OSN NEW NO BG PERSEGGI.png)
 * Murni menggunakan gambar logo resmi asli tanpa animasi buatan.
 * Latar belakang transparan tanpa kotak abu-abu (No Background).
 * Hanya dimensi ukuran (width & height) yang disesuaikan secara proporsional.
 */
export const LogoOSN = ({
  className = "w-12 h-12",
  showLabel = false,
  isLight = false,
  alt = "Logo Resmi Olimpiade Siswa Nasional"
}: {
  className?: string;
  showLabel?: boolean;
  isLight?: boolean;
  alt?: string;
}) => {
  return (
    <div className="flex items-center gap-3 select-none">
      <img
        src={logoOsnImg}
        alt={alt}
        className={`${className} object-contain shrink-0 drop-shadow-[0_2px_10px_rgba(0,0,0,0.08)]`}
        referrerPolicy="no-referrer"
      />
      {showLabel && (
        <div className="flex flex-col text-left">
          <span className={`text-sm sm:text-base md:text-lg font-black tracking-tight leading-tight ${isLight ? 'text-white' : 'text-[#1A1615]'}`}>
            OLIMPIADE SISWA NASIONAL
          </span>
          <span className="text-[10px] font-bold text-[#D4AF37] tracking-wider uppercase mt-0.5">
            Platform Online Terakreditasi · Seluruh Indonesia
          </span>
        </div>
      )}
    </div>
  );
};

/**
 * 2. LOGO RESMI LKP PRESTASI NUSANTARA (LOGO LKP PRESTASI NUSANTARA NO BACKGROUND.png)
 * Murni menggunakan berkas perisai navy-emas asli penyelenggara tanpa animasi buatan.
 * Latar belakang transparan tanpa kotak luar (No Background).
 * Hanya dimensi ukuran yang disesuaikan proporsional.
 */
export const LogoLKP = ({
  className = "w-10 h-10",
  showLabel = false,
  isLight = false,
  alt = "Logo Resmi LKP Prestasi Nusantara"
}: {
  className?: string;
  showLabel?: boolean;
  isLight?: boolean;
  alt?: string;
}) => {
  return (
    <div className="flex items-center gap-2.5 select-none">
      <img
        src={logoLkpImg}
        alt={alt}
        className={`${className} object-contain shrink-0 drop-shadow-[0_2px_8px_rgba(0,0,0,0.08)]`}
        referrerPolicy="no-referrer"
      />
      {showLabel && (
        <div className="flex flex-col text-left">
          <span className={`text-xs sm:text-sm font-extrabold leading-tight ${isLight ? 'text-white' : 'text-[#1A1615]'}`}>
            LKP PRESTASI NUSANTARA
          </span>
          <span className="text-[9px] text-[#D4AF37] font-bold tracking-wide">
            Penyelenggara Resmi Terdaftar
          </span>
        </div>
      )}
    </div>
  );
};

/**
 * 3. STEMPEL RESMI LKP PRESTASI NUSANTARA (STEMPEL LKP PRESTASI NUSANTARA NO BACKGROUND PAS.png)
 * Murni menggunakan gambar stempel biru asli tanpa animasi buatan.
 * Latar belakang transparan (No Background).
 * Hanya dimensi ukuran yang disesuaikan.
 */
export const StempelLKP = ({
  className = "w-24 h-24",
  isRotated = false,
  alt = "Stempel Pengesahan Resmi LKP Prestasi Nusantara"
}: {
  className?: string;
  isRotated?: boolean;
  alt?: string;
}) => {
  return (
    <img
      src={stempelLkpImg}
      alt={alt}
      className={`${className} object-contain shrink-0 select-none ${isRotated ? '-rotate-6' : ''} drop-shadow-[0_2px_6px_rgba(30,58,138,0.15)]`}
      referrerPolicy="no-referrer"
    />
  );
};

export default LogoOSN;
