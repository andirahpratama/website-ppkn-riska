import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Filter, 
  Star, 
  Check, 
  CheckCircle2, 
  Sparkles, 
  MessageCircle, 
  Eye, 
  X,
  FileCheck,
  ShieldCheck,
  Zap,
  ArrowRight
} from 'lucide-react';
import { getStoredDigitalProducts, getStoredPageSettings } from '../data/ppknData';

export default function ProductsPage() {
  const [productsList] = useState(() => getStoredDigitalProducts());
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeProductModal, setActiveProductModal] = useState(null);

  const pageSettings = getStoredPageSettings();
  const waNumber = pageSettings.contact?.whatsappNumber || '6281234567890';

  const categories = ['all', 'Modul Ajar', 'E-Book Guru', 'Media Presentasi', 'Proyek P5'];

  const filteredProducts = productsList.filter(item => {
    const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchSearch = searchQuery.trim() === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const generateWhatsappOrderUrl = (product) => {
    const text = `Halo Bu Riska Puspita, S.Pd.%0A%0ASaya tertarik memesan produk digital di website Ruang PPKn:%0A*${product.title}*%0AHarga: Rp ${product.price.toLocaleString('id-ID')}%0A%0AMohon info nomor rekening dan pengiriman file digitalnya. Terima kasih!`;
    return `https://wa.me/${waNumber}?text=${text}`;
  };

  return (
    <div className="pt-24 pb-20 bg-surface-ground min-h-screen">
      
      {/* Header Banner Marketplace */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-soft-lg border border-slate-700 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-3xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-400/20 text-gold-300 text-xs font-bold border border-gold-400/30">
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Etalase Digital Resmi Guru PPKn</span>
            </div>
            
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
              {pageSettings.products?.heroTitle || 'Marketplace Produk Digital Guru PPKn'}
            </h1>
            
            <p className="text-slate-300 text-xs sm:text-sm sm:leading-relaxed">
              {pageSettings.products?.heroSubtitle || 'Koleksi modul ajar 1 tahun lengkap, slide presentasi Canva siap pakai, dan e-book inovasi pembelajaran karya Riska Puspita, S.Pd. untuk mempermudah administrasi mengajar Anda.'}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-300">
              <span className="flex items-center gap-1.5 text-gold-400">
                <Check className="w-4 h-4 text-emerald-400" /> Akses File Instan via WhatsApp & Email
              </span>
              <span className="flex items-center gap-1.5 text-gold-400">
                <Check className="w-4 h-4 text-emerald-400" /> Format Word/Canva 100% Siap Diedit
              </span>
              <span className="flex items-center gap-1.5 text-gold-400">
                <Check className="w-4 h-4 text-emerald-400" /> Sesuai Kurikulum Merdeka Terbaru
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Marketplace Search & Category Tabs */}
        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-soft flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Search */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari produk digital, contoh: Modul Ajar, Canva, P5..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-gold-400 focus:bg-white"
            />
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white shadow-soft'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {cat === 'all' ? 'Semua Produk' : cat}
              </button>
            ))}
          </div>

        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-soft-sm hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
            >
              
              <div className="p-6 sm:p-8 space-y-5">
                
                {/* Header: Category Badge & Promotional Tag */}
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-slate-100 text-slate-800">
                    {product.category}
                  </span>

                  {product.badge && (
                    <span className="px-3 py-1 rounded-full text-xs font-black bg-gradient-to-r from-gold-400 to-amber-500 text-slate-950 shadow-soft-sm flex items-center gap-1">
                      <Zap className="w-3 h-3 fill-slate-950" />
                      <span>{product.badge}</span>
                    </span>
                  )}
                </div>

                {/* Product Title */}
                <div>
                  <h3 className="text-xl font-black text-slate-900 group-hover:text-patriot-700 transition-colors leading-snug">
                    {product.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Karya Eksklusif: <strong className="text-slate-700">{pageSettings.general?.teacherName || 'Riska Puspita, S.Pd.'}</strong>
                  </p>
                </div>

                {/* Rating & Sales */}
                <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
                  <div className="flex items-center gap-1 text-gold-500 font-bold">
                    <Star className="w-4 h-4 fill-gold-400" />
                    <span>{product.rating}</span>
                    <span className="text-slate-400 font-normal">(Terverifikasi Guru)</span>
                  </div>

                  <span className="text-slate-500 font-semibold text-xs">
                    🔥 {product.salesCount || 350}+ Terjual
                  </span>
                </div>

                {/* Price Display */}
                <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-black text-slate-900">
                    Rp {product.price.toLocaleString('id-ID')}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs sm:text-sm text-slate-400 line-through">
                      Rp {product.originalPrice.toLocaleString('id-ID')}
                    </span>
                  )}
                  <span className="ml-auto text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                    Hemat {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  {product.description}
                </p>

                {/* Feature Highlights */}
                <div className="space-y-1.5 pt-1">
                  <p className="text-xs font-bold text-slate-800">Termasuk di Dalam Paket:</p>
                  {(product.features || []).map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-3 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-center gap-2.5">
                <button
                  onClick={() => setActiveProductModal(product)}
                  className="w-full sm:flex-1 py-3 px-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold border border-slate-200 transition-all flex items-center justify-center gap-1.5 shadow-soft-sm"
                >
                  <Eye className="w-3.5 h-3.5 text-slate-500" />
                  <span>Detail & Pratinjau</span>
                </button>

                <a
                  href={generateWhatsappOrderUrl(product)}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:flex-1 py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black transition-all flex items-center justify-center gap-2 shadow-soft hover:shadow-glow-gold"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Dapatkan via WhatsApp</span>
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Modal Detail Produk */}
      {activeProductModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-soft-lg space-y-5 border border-slate-200 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-gold-100 text-gold-950">
                {activeProductModal.category}
              </span>
              <button onClick={() => setActiveProductModal(null)} className="p-1.5 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <h3 className="text-xl font-black text-slate-900 leading-snug">
                {activeProductModal.title}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Karya Pendidik: {pageSettings.general?.teacherName || 'Riska Puspita, S.Pd.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <p className="text-xs font-bold text-slate-800">Harga Paket Digital:</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-slate-900">
                  Rp {activeProductModal.price.toLocaleString('id-ID')}
                </span>
                {activeProductModal.originalPrice && (
                  <span className="text-xs text-slate-400 line-through">
                    Rp {activeProductModal.originalPrice.toLocaleString('id-ID')}
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-600">
              <p className="font-bold text-slate-800">Deskripsi Lengkap:</p>
              <p className="leading-relaxed">{activeProductModal.description}</p>
            </div>

            <div className="space-y-2 text-xs">
              <p className="font-bold text-slate-800">Rincian File yang Anda Dapatkan:</p>
              <ul className="space-y-1.5 pl-4 list-disc text-slate-700">
                {(activeProductModal.features || []).map((f, idx) => (
                  <li key={idx}>{f}</li>
                ))}
              </ul>
            </div>

            <div className="flex gap-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => setActiveProductModal(null)}
                className="flex-1 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
              >
                Tutup
              </button>
              <a
                href={generateWhatsappOrderUrl(activeProductModal)}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-soft"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Pesan Sekarang via WA</span>
              </a>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
