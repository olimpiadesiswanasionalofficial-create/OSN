import logoOsnImg from '../assets/images/logo_osn.png';
import logoLkpImg from '../assets/images/logo_lkp.png';
import stempelLkpImg from '../assets/images/stempel_lkp.png';

let cachedOsnDataUrl: string | null = null;
let cachedLkpDataUrl: string | null = null;
let cachedStempelDataUrl: string | null = null;

/**
 * Mengonversi berkas logo menjadi format PNG Data URL resolusi tinggi
 * tanpa mengubah bentuk, warna, rasio, atau model asli logo.
 */
function convertImgToDataUrl(src: string): Promise<string> {
  return new Promise((resolve) => {
    // If running in non-browser environment
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      resolve(src);
      return;
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        // Gunakan ukuran natural untuk ketajaman maksimal dokumen cetak
        canvas.width = img.naturalWidth || img.width || 400;
        canvas.height = img.naturalHeight || img.height || 400;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const dataUrl = canvas.toDataURL('image/png');
          resolve(dataUrl);
          return;
        }
      } catch (err) {
        console.warn('[pdfLogosHelper] Canvas conversion warning:', err);
      }
      resolve(src);
    };

    img.onerror = () => {
      console.warn('[pdfLogosHelper] Image loading fallback to direct src:', src);
      resolve(src);
    };

    img.src = src;
  });
}

/**
 * Mengambil 3 Logo Resmi:
 * 1. LOGO OSN (LOGO OSN NEW NO BG PERSEGGI.png)
 * 2. LOGO LKP PRESTASI NUSANTARA (LOGO LKP PRESTASI NUSANTARA NO BACKGROUND PAS.png)
 * 3. STEMPEL RESMI LKP (STEMPEL LKP PRESTASI NUSANTARA NO BACKGROUND PAS.png)
 */
export async function getOfficialLogosForPdf(): Promise<{
  logoOsn: string;
  logoLkp: string;
  stempelLkp: string;
}> {
  try {
    if (!cachedOsnDataUrl) cachedOsnDataUrl = await convertImgToDataUrl(logoOsnImg);
    if (!cachedLkpDataUrl) cachedLkpDataUrl = await convertImgToDataUrl(logoLkpImg);
    if (!cachedStempelDataUrl) cachedStempelDataUrl = await convertImgToDataUrl(stempelLkpImg);

    return {
      logoOsn: cachedOsnDataUrl || logoOsnImg,
      logoLkp: cachedLkpDataUrl || logoLkpImg,
      stempelLkp: cachedStempelDataUrl || stempelLkpImg
    };
  } catch (error) {
    console.error('[pdfLogosHelper] Error getting official logos:', error);
    return {
      logoOsn: logoOsnImg,
      logoLkp: logoLkpImg,
      stempelLkp: stempelLkpImg
    };
  }
}

// Inisialisasi awal agar logo siap di memori
if (typeof window !== 'undefined') {
  setTimeout(() => {
    getOfficialLogosForPdf().catch(() => {});
  }, 100);
}
