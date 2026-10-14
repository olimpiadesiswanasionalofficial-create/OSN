import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  Trophy, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  Search, 
  Filter, 
  ExternalLink, 
  Eye, 
  X, 
  ChevronRight, 
  Medal, 
  ShieldCheck, 
  School,
  GraduationCap,
  Star,
  Upload
} from 'lucide-react';
import { APP_CONFIG } from '../../appConfig.js';
import { LogoLKP, StempelLKP, LogoOSN } from './BrandLogos';
import { showToast } from './NotificationToast';

export interface GalleryItem {
  id: string;
  title: string;
  studentName?: string;
  subtitle: string;
  caption?: string;
  subject?: string;
  category?: string;
  level?: string;
  rank?: string;
  badge?: string;
  trophy?: string;
  medal?: string;
  image: string;
  filename?: string;
}

interface GalleryOSNProps {
  onOpenRegistration?: (product?: any) => void;
  onOpenLogin?: (role: 'user' | 'admin') => void;
}

// Subcomponent with IntersectionObserver for lazy loading images (Requirement 7)
interface GalleryCardWithObserverProps {
  item: GalleryItem;
  currentImage: string;
  onClick: () => void;
}

const GalleryCardWithObserver: React.FC<GalleryCardWithObserverProps> = ({ item, currentImage, onClick }) => {
  const [isInView, setIsInView] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    if (!('IntersectionObserver' in window)) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '200px 0px',
        threshold: 0.01,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      className="group relative h-96 rounded-3xl overflow-hidden cursor-pointer bg-[#0B132B] border border-[#E8E2D9] shadow-sm hover:shadow-2xl hover:border-[#D4AF37]/80 transition-all duration-300 flex flex-col justify-end"
    >
      {/* Lazy Loaded Image Background */}
      {isInView ? (
        <img
          src={currentImage}
          alt={item.title}
          referrerPolicy="no-referrer"
          loading="lazy"
          className="w-full h-full object-cover absolute inset-0 group-hover:scale-108 transition-transform duration-700 brightness-95 group-hover:brightness-105"
          onError={(e) => {
            const target = e.currentTarget;
            target.onerror = null;
            target.src = item.id === 'gal-abizar' ? '/abizar_radinka_annail.svg' : 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop';
          }}
        />
      ) : (
        <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center">
          <Trophy className="w-8 h-8 text-[#D4AF37]/30 animate-pulse" />
        </div>
      )}

      {/* Dark Luxury Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B] via-[#0B132B]/60 to-transparent opacity-95 group-hover:opacity-90 transition-opacity" />

      {/* Top Floating Badge */}
      <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
        <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-[#D4AF37] text-[#1A1615] uppercase tracking-wider shadow-md inline-flex items-center gap-1">
          <Trophy className="w-3 h-3 text-[#1A1615]" />
          {item.badge || 'Juara Nasional'}
        </span>
        
        <span className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-[#D4AF37] group-hover:text-[#1A1615] transition-colors shadow-sm">
          <Eye className="w-3.5 h-3.5" />
        </span>
      </div>

      {/* Content Overlay at Bottom */}
      <div className="relative p-5 text-white space-y-2 z-10">
        <div className="flex items-center gap-1.5 text-[11px] text-[#D4AF37] font-semibold">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>{item.level || item.category || 'Jenjang Siswa'}</span>
        </div>

        <h3 className="text-sm sm:text-base font-extrabold text-white leading-snug group-hover:text-[#D4AF37] transition-colors">
          {item.title}
        </h3>

        {item.trophy && (
          <div className="flex items-center gap-1.5 text-[11px] text-amber-200/90 font-medium">
            <Medal className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
            <span className="truncate">{item.trophy}</span>
          </div>
        )}

        <p className="text-[11px] text-neutral-300 line-clamp-2 leading-relaxed">
          {item.subtitle}
        </p>

        <div className="pt-1 flex items-center justify-between text-[11px] text-[#D4AF37] font-bold border-t border-white/10 mt-2">
          <span className="flex items-center gap-1 text-emerald-400">
            <CheckCircle2 className="w-3 h-3" />
            Terverifikasi LKP
          </span>
          <span className="group-hover:translate-x-1 transition-transform inline-flex items-center gap-0.5">
            Lihat Piagam & Trofi
            <ChevronRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </div>
  );
};

export const GalleryOSN: React.FC<GalleryOSNProps> = ({ onOpenRegistration, onOpenLogin }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'paud' | 'sd' | 'smp' | 'umum'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  
  // Custom images uploaded by admin stored in localStorage
  const [customImages, setCustomImages] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('osn_gallery_custom_images');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Admin authentication state: only admin has access to upload and replace photos
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      return localStorage.getItem('osn_admin_session') === 'true';
    } catch {
      return false;
    }
  });

  // Sync gallery images from Neon DB server on load
  React.useEffect(() => {
    fetch('/api/gallery', { cache: 'no-store' })
      .then(res => res.json())
      .then(json => {
        if (json.success && json.data && typeof json.data === 'object') {
          setCustomImages(prev => {
            const merged = { ...prev, ...json.data };
            try {
              localStorage.setItem('osn_gallery_custom_images', JSON.stringify(merged));
            } catch {}
            return merged;
          });
        }
      })
      .catch(() => {});
  }, []);

  React.useEffect(() => {
    const checkAdmin = () => {
      try {
        setIsAdmin(localStorage.getItem('osn_admin_session') === 'true');
      } catch {
        setIsAdmin(false);
      }
    };
    checkAdmin();
    window.addEventListener('storage', checkAdmin);
    const interval = setInterval(checkAdmin, 1500);
    return () => {
      window.removeEventListener('storage', checkAdmin);
      clearInterval(interval);
    };
  }, []);

  const handleFileUpload = (itemId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isAdmin) {
      showToast('error', 'Akses Ditolak', 'Fitur unggah dan sinkronisasi foto hanya diperuntukkan bagi Administrator / Panitia Pusat.');
      return;
    }
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const rawDataUrl = uploadEvent.target?.result as string;
      if (!rawDataUrl) return;

      // Compress image using canvas before storing & sending to prevent PayloadTooLargeError
      const img = new Image();
      img.onload = () => {
        const maxWidth = 1200;
        const maxHeight = 1200;
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);

          setCustomImages((prev) => {
            const updated = { ...prev, [itemId]: compressedDataUrl };
            try {
              localStorage.setItem('osn_gallery_custom_images', JSON.stringify(updated));
            } catch (err) {
              console.warn('Could not persist image to localStorage', err);
            }
            // Sync to Neon DB server
            fetch('/api/gallery', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ images: updated })
            }).catch(() => {});
            return updated;
          });
          showToast('success', 'Foto Tersimpan & Tersinkron', 'Foto galeri juara berhasil dioptimalkan dan disinkronkan ke database server.');
        }
      };
      img.src = rawDataUrl;
    };
    reader.readAsDataURL(file);
  };

  const handleResetImage = (itemId: string) => {
    if (!isAdmin) return;
    setCustomImages((prev) => {
      const updated = { ...prev };
      delete updated[itemId];
      try {
        localStorage.setItem('osn_gallery_custom_images', JSON.stringify(updated));
      } catch {}
      // Sync to Neon DB server
      fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ images: updated })
      }).catch(() => {});
      return updated;
    });
  };

  // Gallery items from APP_CONFIG
  const rawGallery: GalleryItem[] = useMemo(() => {
    return (APP_CONFIG.gallery || []) as GalleryItem[];
  }, []);

  // Filter gallery items based on category and search query
  const filteredGallery = useMemo(() => {
    return rawGallery.filter((item) => {
      // Category filter
      let matchesCategory = true;
      if (activeCategory === 'paud') {
        matchesCategory = Boolean(item.level?.toLowerCase().includes('paud') || item.category?.toLowerCase().includes('kategori a') || item.level?.toLowerCase().includes('tk'));
      } else if (activeCategory === 'sd') {
        matchesCategory = Boolean(item.level?.toLowerCase().includes('sd') || item.category?.toLowerCase().includes('kategori b') || item.level?.toLowerCase().includes('mi'));
      } else if (activeCategory === 'smp') {
        matchesCategory = Boolean(item.level?.toLowerCase().includes('smp') || item.category?.toLowerCase().includes('kategori c') || item.level?.toLowerCase().includes('mts'));
      } else if (activeCategory === 'umum') {
        matchesCategory = Boolean(item.rank?.toLowerCase().includes('umum') || item.badge?.toLowerCase().includes('umum') || item.title?.toLowerCase().includes('umum'));
      }

      // Search query filter
      let matchesSearch = true;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        matchesSearch = Boolean(
          item.title?.toLowerCase().includes(q) ||
          item.studentName?.toLowerCase().includes(q) ||
          item.subtitle?.toLowerCase().includes(q) ||
          item.subject?.toLowerCase().includes(q) ||
          item.trophy?.toLowerCase().includes(q) ||
          item.medal?.toLowerCase().includes(q) ||
          item.caption?.toLowerCase().includes(q)
        );
      }

      return matchesCategory && matchesSearch;
    });
  }, [rawGallery, activeCategory, searchQuery]);

  return (
    <section id="galeri" className="py-20 bg-[#FAF8F5] border-b border-[#E8E2D9] relative overflow-hidden">
      {/* Background radial soft gold shimmer */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-[radial-gradient(circle,rgba(212,175,55,0.08),transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[radial-gradient(circle,rgba(11,19,43,0.04),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A1615] text-[#D4AF37] text-xs font-black shadow-sm border border-[#D4AF37]/40">
            <Trophy className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>DOKUMENTASI ASLI PARA JUARA NASIONAL</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#1A1615] tracking-tight">
            Galeri Sang Juara Olimpiade Siswa Nasional
          </h2>

          <p className="text-xs sm:text-sm text-[#66615B] leading-relaxed max-w-2xl mx-auto">
            Bukti nyata kegemilangan anak bangsa yang membanggakan orang tua dan sekolah. Dilengkapi trofi mahkota berkilau, medali emas berukir presisi, dan sertifikat resmi ber-QR Code dari <strong>LKP Prestasi Nusantara</strong>.
          </p>
        </div>

        {/* Admin Authority Bar (Visible only when logged in as admin) */}
        {isAdmin && (
          <div className="mt-6 mb-2 p-3.5 rounded-2xl bg-amber-50 border border-amber-300 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
            <div className="flex items-center gap-2.5 text-xs text-amber-950">
              <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0" />
              <span>
                <strong>Otoritas Panitia Aktif:</strong> Fitur unggah dan sinkronisasi foto juara hanya aktif untuk akun Admin. Pengunjung publik tidak memiliki akses upload.
              </span>
            </div>
            {onOpenLogin && (
              <button
                type="button"
                onClick={() => onOpenLogin('admin')}
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#1A1615] text-[#D4AF37] shrink-0 hover:bg-[#2A2321] transition-all cursor-pointer shadow-xs"
              >
                Dashboard Admin
              </button>
            )}
          </div>
        )}

        {/* Filter Bar & Search Input */}
        <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-4 p-2 bg-white/80 backdrop-blur-md rounded-2xl border border-[#E8E2D9] shadow-sm">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto p-1 scrollbar-none">
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-[#1A1615] text-[#D4AF37] shadow-sm'
                  : 'text-[#66615B] hover:text-[#1A1615] hover:bg-[#FAF8F5]'
              }`}
            >
              Semua Juara ({rawGallery.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory('sd')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === 'sd'
                  ? 'bg-[#1A1615] text-[#D4AF37] shadow-sm'
                  : 'text-[#66615B] hover:text-[#1A1615] hover:bg-[#FAF8F5]'
              }`}
            >
              Jenjang SD/MI (Kat. B)
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory('smp')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === 'smp'
                  ? 'bg-[#1A1615] text-[#D4AF37] shadow-sm'
                  : 'text-[#66615B] hover:text-[#1A1615] hover:bg-[#FAF8F5]'
              }`}
            >
              Jenjang SMP/MTs (Kat. C)
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory('paud')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === 'paud'
                  ? 'bg-[#1A1615] text-[#D4AF37] shadow-sm'
                  : 'text-[#66615B] hover:text-[#1A1615] hover:bg-[#FAF8F5]'
              }`}
            >
              PAUD / TK (Kat. A)
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory('umum')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === 'umum'
                  ? 'bg-[#1A1615] text-[#D4AF37] shadow-sm'
                  : 'text-[#66615B] hover:text-[#1A1615] hover:bg-[#FAF8F5]'
              }`}
            >
              Juara Umum & Ganda
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama juara / mapel..."
              className="w-full pl-9 pr-4 py-2 bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl text-xs text-[#1A1615] placeholder-neutral-400 focus:outline-none focus:border-[#D4AF37] focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

        </div>

        {/* Gallery Grid */}
        {filteredGallery.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#E8E2D9] mt-8 p-6">
            <Trophy className="w-12 h-12 text-[#D4AF37] mx-auto opacity-50 mb-3" />
            <h3 className="text-base font-bold text-[#1A1615]">Dokumentasi Tidak Ditemukan</h3>
            <p className="text-xs text-[#756F68] mt-1">
              Tidak ada data juara yang cocok dengan pencarian "{searchQuery}". Coba kata kunci lain atau pilih tab Semua.
            </p>
            <button
              onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
              className="mt-4 px-4 py-2 bg-[#1A1615] text-[#D4AF37] rounded-xl text-xs font-bold"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredGallery.map((item) => {
              const currentImage = customImages[item.id] || item.image;
              return (
                <GalleryCardWithObserver
                  key={item.id}
                  item={item}
                  currentImage={currentImage}
                  onClick={() => setSelectedItem(item)}
                />
              );
            })}
          </div>
        )}

        {/* Bottom Proof Trust Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-white border border-[#E8E2D9] shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
              <Trophy className="w-7 h-7 text-[#D4AF37]" />
            </div>
            <div className="space-y-1">
              <h4 className="text-base font-extrabold text-[#1A1615]">
                Piala Kemilau & Medali Emas Siap Dikirim ke Seluruh Indonesia
              </h4>
              <p className="text-xs text-[#756F68] max-w-2xl">
                Paket piala mahkota kejuaraan, medali logam kuningan presisi tinggi, dan sertifikat ber-QR Code dikirim menggunakan kemasan ekstra aman bergaransi resmi ke alamat para pemenang.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onOpenRegistration && onOpenRegistration(APP_CONFIG.products[0])}
              className="px-6 py-3 rounded-xl text-xs font-black bg-[#1A1615] text-[#D4AF37] hover:bg-[#2A2321] transition-all border border-[#D4AF37]/50 shadow-md inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Daftar Babak Penyisihan (Gratis)</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* LIGHTBOX MODAL WITH FULL DETAILS */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fade-in"
          onClick={() => setSelectedItem(null)}
        >
          <div 
            className="relative max-w-4xl w-full bg-[#0B132B] rounded-3xl border-2 border-[#D4AF37] shadow-2xl overflow-hidden my-8" 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-white hover:text-[#D4AF37] hover:bg-black transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
              
              {/* Photo View Column */}
              <div className="md:col-span-7 relative bg-black flex items-center justify-center min-h-[350px] md:min-h-[500px]">
                <img
                  src={customImages[selectedItem.id] || selectedItem.image}
                  alt={selectedItem.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full max-h-[70vh] object-cover"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.onerror = null;
                    target.src = selectedItem.id === 'gal-abizar' ? '/abizar_radinka_annail.svg' : 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop';
                  }}
                />
                
                {/* Official Stamp Watermark on Image */}
                <div className="absolute bottom-4 left-4 opacity-80 pointer-events-none">
                  <StempelLKP className="w-20 h-20" isRotated={true} />
                </div>

                {/* Trophy Badge Overlay */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1.5 rounded-full text-xs font-black bg-[#D4AF37] text-[#1A1615] shadow-lg flex items-center gap-1.5">
                    <Trophy className="w-3.5 h-3.5" />
                    {selectedItem.badge || 'Juara Nasional'}
                  </span>
                </div>
              </div>

              {/* Information Column */}
              <div className="md:col-span-5 p-6 sm:p-8 text-white flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  
                  {/* Top Organizers Brand */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2">
                      <LogoOSN className="w-8 h-8" />
                      <div>
                        <span className="text-[10px] text-[#D4AF37] font-bold block">OLIMPIADE OSN 2026</span>
                        <span className="text-[10px] text-neutral-400 block">LKP PRESTASI NUSANTARA</span>
                      </div>
                    </div>
                    <LogoLKP className="w-7 h-7" />
                  </div>

                  {/* Title & Name */}
                  <div className="space-y-1">
                    <span className="text-xs font-extrabold text-[#D4AF37] tracking-wider uppercase">
                      {selectedItem.category || selectedItem.level || 'Kategori Kejuaraan'}
                    </span>
                    <h3 className="text-xl font-black text-white leading-tight">
                      {selectedItem.title}
                    </h3>
                  </div>

                  {/* Highlights Grid */}
                  <div className="space-y-2.5 text-xs">
                    {selectedItem.trophy && (
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-start gap-2.5">
                        <Trophy className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                        <div>
                          <strong className="block text-[#D4AF37] font-bold">Penghargaan Trofi:</strong>
                          <span className="text-neutral-300">{selectedItem.trophy}</span>
                        </div>
                      </div>
                    )}

                    {selectedItem.medal && (
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-start gap-2.5">
                        <Medal className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                        <div>
                          <strong className="block text-amber-300 font-bold">Penghargaan Medali:</strong>
                          <span className="text-neutral-300">{selectedItem.medal}</span>
                        </div>
                      </div>
                    )}

                    <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-start gap-2.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-emerald-300 font-bold">Sertifikat Resmi Ber-QR Code:</strong>
                        <span className="text-neutral-300">
                          Sah dan terakreditasi resmi untuk dokumen portofolio PPDB Jalur Prestasi di seluruh Indonesia.
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Caption / Description */}
                  {selectedItem.caption && (
                    <p className="text-xs text-neutral-300 italic leading-relaxed pt-1 border-t border-white/10">
                      "{selectedItem.caption}"
                    </p>
                  )}

                </div>

                {/* Modal Action CTA */}
                <div className="pt-4 border-t border-white/10 space-y-2.5">
                  {/* ADMIN ONLY CONTROLS: Unggah & Sinkronisasi Foto Langsung */}
                  {isAdmin && (
                    <div className="p-3 rounded-2xl bg-amber-950/40 border border-[#D4AF37]/50 space-y-2">
                      <div className="flex items-center justify-between text-[11px] text-[#D4AF37] font-bold">
                        <span className="flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                          Otoritas Panitia (Admin Only)
                        </span>
                        {customImages[selectedItem.id] && (
                          <button
                            type="button"
                            onClick={() => handleResetImage(selectedItem.id)}
                            className="text-[10px] text-rose-300 hover:text-rose-200 underline cursor-pointer"
                          >
                            Reset Foto Awal
                          </button>
                        )}
                      </div>

                      <label className="w-full py-2.5 px-3 rounded-xl text-xs font-bold bg-[#D4AF37] hover:bg-[#FFF2B2] text-[#1A1615] flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md">
                        <Upload className="w-4 h-4 text-[#1A1615]" />
                        <span>Ganti / Unggah Foto Juara Ini</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(selectedItem.id, e)}
                        />
                      </label>

                      {selectedItem.filename && (
                        <p className="text-[10px] text-amber-200/80 text-center font-mono">
                          File arsip panitia: {selectedItem.filename}
                        </p>
                      )}
                    </div>
                  )}

                  <button
                    onClick={() => {
                      setSelectedItem(null);
                      if (onOpenRegistration) onOpenRegistration(APP_CONFIG.products[0]);
                    }}
                    className="w-full py-3 rounded-xl text-xs font-black bg-[#D4AF37] text-[#1A1615] hover:bg-[#FFF2B2] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <Sparkles className="w-4 h-4 text-[#1A1615]" />
                    <span>Daftar Sekarang (Ikuti Jejak Juara)</span>
                  </button>
                  <p className="text-[10px] text-center text-neutral-400">
                    Penyisihan gratis · Terbuka bagi siswa seluruh Indonesia
                  </p>
                </div>

              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
};
