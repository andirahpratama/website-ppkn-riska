import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Plus, 
  Trash2, 
  Edit3, 
  Star, 
  Zap, 
  CheckCircle2, 
  X,
  Sparkles
} from 'lucide-react';

export default function DigitalProductsManagerTab({ products, onUpdateProducts }) {
  const [productsList, setProductsList] = useState([...products]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: '',
    category: 'Modul Ajar',
    price: 35000,
    originalPrice: 70000,
    badge: 'Best Seller',
    description: '',
    feature1: '',
    feature2: '',
    feature3: ''
  });

  const categories = ['Modul Ajar', 'E-Book Guru', 'Media Presentasi', 'Proyek P5', 'Template Canva'];

  const openAdd = () => {
    setEditingId(null);
    setForm({
      title: '',
      category: 'Modul Ajar',
      price: 35000,
      originalPrice: 70000,
      badge: 'Best Seller',
      description: '',
      feature1: 'File Microsoft Word (.docx) 100% siap diedit',
      feature2: 'Sesuai Capaian Pembelajaran Kurikulum Merdeka',
      feature3: 'Dilengkapi Instrumen Asesmen & Rubrik Nilai'
    });
    setIsModalOpen(true);
  };

  const openEdit = (item) => {
    setEditingId(item.id);
    setForm({
      title: item.title,
      category: item.category,
      price: item.price,
      originalPrice: item.originalPrice || item.price * 2,
      badge: item.badge || '',
      description: item.description,
      feature1: item.features?.[0] || '',
      feature2: item.features?.[1] || '',
      feature3: item.features?.[2] || ''
    });
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    const newProd = {
      id: editingId || `prod-${Date.now().toString().slice(-4)}`,
      title: form.title.trim(),
      category: form.category,
      price: parseInt(form.price) || 0,
      originalPrice: parseInt(form.originalPrice) || 0,
      rating: 5.0,
      salesCount: 150,
      badge: form.badge.trim(),
      description: form.description.trim() || 'Paket produk digital resmi untuk mempermudah kegiatan belajar mengajar.',
      features: [form.feature1, form.feature2, form.feature3].filter(f => Boolean(f?.trim()))
    };

    let updated;
    if (editingId) {
      updated = productsList.map(p => p.id === editingId ? newProd : p);
    } else {
      updated = [newProd, ...productsList];
    }

    setProductsList(updated);
    onUpdateProducts(updated);
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Hapus produk digital ini dari marketplace?")) {
      const updated = productsList.filter(p => p.id !== id);
      setProductsList(updated);
      onUpdateProducts(updated);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            Manajemen Produk Digital Marketplace
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Tambah, sunting harga, dan kelola produk digital karya Bu Riska yang dijual di website
          </p>
        </div>

        <button
          onClick={openAdd}
          className="px-4 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-soft flex items-center gap-2"
        >
          <Plus className="w-4 h-4 text-gold-400" />
          <span>Tambah Produk Baru</span>
        </button>
      </div>

      {/* Grid of Products in Admin */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {productsList.map((product) => (
          <div
            key={product.id}
            className="bg-white p-5 rounded-3xl border border-slate-200 shadow-soft-sm flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-700">
                  {product.category}
                </span>
                {product.badge && (
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black bg-gold-400 text-slate-950">
                    {product.badge}
                  </span>
                )}
              </div>

              <h4 className="text-base font-extrabold text-slate-900 leading-snug">
                {product.title}
              </h4>

              <div className="flex items-baseline gap-2 pt-1">
                <span className="text-lg font-black text-slate-900">
                  Rp {product.price.toLocaleString('id-ID')}
                </span>
                {product.originalPrice && (
                  <span className="text-xs text-slate-400 line-through">
                    Rp {product.originalPrice.toLocaleString('id-ID')}
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-600 line-clamp-2">
                {product.description}
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => openEdit(product)}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Hapus</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Add / Edit Product */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-soft-lg space-y-4 border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-black text-slate-900">
                {editingId ? 'Sunting Produk Digital' : 'Tambah Produk Digital Baru'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1.5 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Nama Produk *</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Misal: Paket Lengkap Modul Ajar PPKn Kelas 7"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Kategori</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold"
                  >
                    {categories.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Badge Label</label>
                  <input
                    type="text"
                    value={form.badge}
                    onChange={(e) => setForm({ ...form, badge: e.target.value })}
                    placeholder="Best Seller / Baru"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Harga Jual (Rp) *</label>
                  <input
                    type="number"
                    required
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Harga Coret / Asli (Rp)</label>
                  <input
                    type="number"
                    value={form.originalPrice}
                    onChange={(e) => setForm({ ...form, originalPrice: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Deskripsi Lengkap</label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Jelaskan isi paket digital ini..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Keunggulan Paket (Poin 1, 2, 3)</label>
                <input
                  type="text"
                  value={form.feature1}
                  onChange={(e) => setForm({ ...form, feature1: e.target.value })}
                  placeholder="Poin 1: Format DOCX siap diedit"
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-medium mb-1"
                />
                <input
                  type="text"
                  value={form.feature2}
                  onChange={(e) => setForm({ ...form, feature2: e.target.value })}
                  placeholder="Poin 2: Sesuai Kurikulum Merdeka"
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-medium mb-1"
                />
                <input
                  type="text"
                  value={form.feature3}
                  onChange={(e) => setForm({ ...form, feature3: e.target.value })}
                  placeholder="Poin 3: Dilengkapi Kisi-Kisi & Rubrik"
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-medium"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold"
                >
                  {editingId ? 'Simpan Perubahan' : 'Terbitkan Produk'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
