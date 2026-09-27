import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  X, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Move, 
  Check, 
  Circle, 
  Square, 
  ChevronUp, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight,
  Maximize2,
  Minimize2,
  Sparkles
} from 'lucide-react';

export default function AvatarAdjustModal({
  isOpen,
  onClose,
  imageUrl,
  currentZoom = 1,
  currentX = 0,
  currentY = 0,
  onSave
}) {
  const [zoom, setZoom] = useState(currentZoom || 1);
  const [position, setPosition] = useState({ x: currentX || 0, y: currentY || 0 });
  const [previewShape, setPreviewShape] = useState('circle'); // 'circle' | 'square'
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [showGuides, setShowGuides] = useState(true);

  const containerRef = useRef(null);

  // Sync state when opened
  useEffect(() => {
    if (isOpen) {
      setZoom(currentZoom || 1);
      setPosition({ x: currentX || 0, y: currentY || 0 });
    }
  }, [isOpen, currentZoom, currentX, currentY]);

  // Handle Mouse / Touch Dragging
  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x * 2.2,
      y: e.clientY - position.y * 2.2
    });
  };

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    const newX = (e.clientX - dragStart.x) / 2.2;
    const newY = (e.clientY - dragStart.y) / 2.2;
    // Rentang pergeseran luas (-100% sampai +100%) agar bagian kepala/dada dapat ditarik penuh
    setPosition({
      x: Math.max(-100, Math.min(100, newX)),
      y: Math.max(-100, Math.min(100, newY))
    });
  }, [isDragging, dragStart]);

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch support for mobile / tablets
  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      setIsDragging(true);
      setDragStart({
        x: touch.clientX - position.x * 2.2,
        y: touch.clientY - position.y * 2.2
      });
    }
  };

  const handleTouchMove = useCallback((e) => {
    if (!isDragging || e.touches.length !== 1) return;
    const touch = e.touches[0];
    const newX = (touch.clientX - dragStart.x) / 2.2;
    const newY = (touch.clientY - dragStart.y) / 2.2;
    setPosition({
      x: Math.max(-100, Math.min(100, newX)),
      y: Math.max(-100, Math.min(100, newY))
    });
  }, [isDragging, dragStart]);

  // Mouse wheel zoom
  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY * -0.0015;
    setZoom(prev => Math.max(0.3, Math.min(3.5, Number((prev + delta).toFixed(2)))));
  };

  // D-pad nudge
  const nudge = (dx, dy) => {
    setPosition(prev => ({
      x: Math.max(-100, Math.min(100, prev.x + dx)),
      y: Math.max(-100, Math.min(100, prev.y + dy))
    }));
  };

  // Presets
  const handleFitAll = () => {
    setZoom(0.75);
    setPosition({ x: 0, y: 0 });
  };

  const handleReset = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  const handlePresetFace = () => {
    setZoom(1.3);
    setPosition({ x: 0, y: -6 });
  };

  const handlePresetCloseUp = () => {
    setZoom(1.65);
    setPosition({ x: 0, y: -10 });
  };

  const handleSave = () => {
    if (onSave) {
      onSave({
        zoom: Number(zoom.toFixed(2)),
        x: Math.round(position.x),
        y: Math.round(position.y)
      });
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-fadeIn select-none overflow-y-auto"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUp}
    >
      <div className="bg-white rounded-3xl p-5 sm:p-6 max-w-lg w-full shadow-2xl border border-slate-200 my-auto flex flex-col space-y-4">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gold-400/20 text-gold-600 flex items-center justify-center font-bold">
              <Move className="w-5 h-5 text-slate-900" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900">
                Atur Posisi & Zoom Foto Profil
              </h3>
              <p className="text-xs text-slate-500">
                Tarik geser untuk memusatkan wajah dan atur slider zoom agar tidak terpotong
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Shape Switcher */}
        <div className="flex items-center justify-between shrink-0 flex-wrap gap-2">
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl text-xs font-bold">
            <button
              onClick={() => setPreviewShape('circle')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                previewShape === 'circle' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Circle className="w-3.5 h-3.5" />
              <span>Preview Bulat (Beranda)</span>
            </button>
            <button
              onClick={() => setPreviewShape('square')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                previewShape === 'square' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Square className="w-3.5 h-3.5" />
              <span>Preview Kotak (Profil)</span>
            </button>
          </div>

          <button
            onClick={() => setShowGuides(!showGuides)}
            className={`text-xs px-2.5 py-1.5 rounded-xl border font-semibold transition-colors ${
              showGuides ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white border-slate-200 text-slate-400'
            }`}
            title="Tampilkan / Sembunyikan garis bantu komposisi"
          >
            Garis Bantu
          </button>
        </div>

        {/* Interactive Viewport Box (Strict 1:1 Aspect Ratio) */}
        <div className="flex flex-col items-center justify-center py-5 px-3 bg-slate-950 rounded-3xl relative overflow-hidden shrink-0 shadow-inner">
          
          {/* Strictly Locked 1:1 Square/Circle Frame */}
          <div 
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            onWheel={handleWheel}
            style={{
              width: '260px',
              height: '260px',
              minWidth: '260px',
              minHeight: '260px',
              maxWidth: '260px',
              maxHeight: '260px'
            }}
            className={`relative aspect-square shrink-0 overflow-hidden bg-slate-900 shadow-2xl border-4 border-gold-400 transition-all ${
              previewShape === 'circle' ? 'rounded-full' : 'rounded-3xl'
            } ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="Repositioning Preview"
                draggable={false}
                style={{
                  transform: `scale(${zoom}) translate(${position.x}%, ${position.y}%)`,
                  transformOrigin: 'center center',
                  transition: isDragging ? 'none' : 'transform 0.08s ease-out'
                }}
                className="w-full h-full object-cover select-none pointer-events-none"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-white">
                <span className="text-4xl font-black text-gold-400">RP</span>
                <span className="text-xs text-slate-400 mt-2">Belum ada foto</span>
              </div>
            )}

            {/* Rule of Thirds Guide Grid */}
            {showGuides && (
              <div className="absolute inset-0 pointer-events-none grid grid-cols-3 grid-rows-3 opacity-30">
                <div className="border-r border-b border-white" />
                <div className="border-r border-b border-white" />
                <div className="border-b border-white" />
                <div className="border-r border-b border-white" />
                <div className="border-r border-b border-white" />
                <div className="border-b border-white" />
                <div className="border-r border-white" />
                <div className="border-r border-white" />
                <div />
              </div>
            )}

            {/* Drag hint overlay */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-slate-900/85 backdrop-blur-xs text-white/95 text-[10px] font-bold px-2.5 py-1 rounded-full pointer-events-none flex items-center gap-1 border border-white/10 shadow-sm">
              <Move className="w-3 h-3 text-gold-400" />
              <span>Tarik geser foto</span>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 mt-2.5 text-center">
            Gunakan scroll mouse atau slider di bawah untuk memperkecil/memperbesar
          </p>
        </div>

        {/* Controls: Zoom Slider & Presets */}
        <div className="space-y-3.5 shrink-0">
          
          {/* Zoom Slider */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span className="flex items-center gap-1.5">
                <ZoomIn className="w-4 h-4 text-slate-500" />
                <span>Skala Zoom: {Math.round(zoom * 100)}%</span>
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                X: {Math.round(position.x)}% • Y: {Math.round(position.y)}%
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setZoom(prev => Math.max(0.3, Number((prev - 0.05).toFixed(2))))}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                title="Perkecil (Zoom Out)"
              >
                <ZoomOut className="w-4 h-4" />
              </button>

              <input
                type="range"
                min="0.3"
                max="3.0"
                step="0.01"
                value={zoom}
                onChange={(e) => setZoom(parseFloat(e.target.value))}
                className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-gold-500"
              />

              <button
                type="button"
                onClick={() => setZoom(prev => Math.min(3.0, Number((prev + 0.05).toFixed(2))))}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                title="Perbesar (Zoom In)"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Presets & Nudge D-pad */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-100">
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                type="button"
                onClick={handleFitAll}
                className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-black flex items-center gap-1 transition-colors"
                title="Perkecil agar seluruh kepala dan pundak masuk pas tanpa terpotong"
              >
                <Minimize2 className="w-3 h-3 text-emerald-600" />
                <span>Muat Pas (75%)</span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1 transition-colors"
              >
                <RotateCcw className="w-3 h-3 text-slate-500" />
                <span>Normal (100%)</span>
              </button>

              <button
                type="button"
                onClick={handlePresetFace}
                className="px-3 py-1.5 rounded-xl bg-gold-50 hover:bg-gold-100 text-gold-900 border border-gold-300 text-xs font-bold transition-colors"
              >
                <span>Fokus Wajah</span>
              </button>
            </div>

            {/* Micro D-Pad Buttons */}
            <div className="flex items-center gap-1">
              <button 
                type="button" 
                onClick={() => nudge(-4, 0)} 
                className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700" 
                title="Geser Kiri"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button 
                type="button" 
                onClick={() => nudge(0, -4)} 
                className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700" 
                title="Geser Atas"
              >
                <ChevronUp className="w-3.5 h-3.5" />
              </button>
              <button 
                type="button" 
                onClick={() => nudge(0, 4)} 
                className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700" 
                title="Geser Bawah"
              >
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              <button 
                type="button" 
                onClick={() => nudge(4, 0)} 
                className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700" 
                title="Geser Kanan"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Modal Action Bar */}
        <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-bold transition-colors"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition-all shadow-soft flex items-center gap-2 hover:shadow-glow-gold active:scale-[0.99]"
          >
            <Check className="w-4 h-4 text-gold-400" />
            <span>Simpan Posisi Foto</span>
          </button>
        </div>

      </div>
    </div>
  );
}
