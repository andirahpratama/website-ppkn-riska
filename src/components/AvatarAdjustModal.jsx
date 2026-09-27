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
  Upload,
  Sparkles
} from 'lucide-react';

const CROP_SIZE = 280; // Ukuran kotak preview dalam pixel
const OUTPUT_SIZE = 600; // Ukuran resolusi hasil crop (600x600 high quality)

export default function AvatarAdjustModal({
  isOpen,
  onClose,
  imageUrl,
  onSave
}) {
  const [imgElement, setImgElement] = useState(null);
  const [naturalSize, setNaturalSize] = useState({ width: 0, height: 0 });
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [previewShape, setPreviewShape] = useState('circle'); // 'circle' | 'square'
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [showGuides, setShowGuides] = useState(true);

  // Load image whenever imageUrl changes
  useEffect(() => {
    if (!imageUrl || !isOpen) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      setImgElement(img);
      setNaturalSize({ width: img.naturalWidth, height: img.naturalHeight });
      // Reset zoom dan offset saat foto baru dimuat
      setZoom(1);
      setOffset({ x: 0, y: 0 });
    };
    img.src = imageUrl;
  }, [imageUrl, isOpen]);

  // Hitung skala dasar agar foto selalu MENUTUPI seluruh frame crop (cover mode tanpa sisi kosong)
  const baseScale = naturalSize.width > 0 && naturalSize.height > 0
    ? Math.max(CROP_SIZE / naturalSize.width, CROP_SIZE / naturalSize.height)
    : 1;

  const currentWidth = naturalSize.width * baseScale * zoom;
  const currentHeight = naturalSize.height * baseScale * zoom;

  // Batas geser maksimum agar foto tidak keluar dari frame crop
  const maxOffsetX = Math.max(0, (currentWidth - CROP_SIZE) / 2);
  const maxOffsetY = Math.max(0, (currentHeight - CROP_SIZE) / 2);

  // Pastikan offset selalu berada dalam batas aman
  const clampOffset = useCallback((x, y, currentZ = zoom) => {
    const w = naturalSize.width * baseScale * currentZ;
    const h = naturalSize.height * baseScale * currentZ;
    const maxX = Math.max(0, (w - CROP_SIZE) / 2);
    const maxY = Math.max(0, (h - CROP_SIZE) / 2);
    return {
      x: Math.max(-maxX, Math.min(maxX, x)),
      y: Math.max(-maxY, Math.min(maxY, y))
    };
  }, [naturalSize, baseScale, zoom]);

  // Mouse / Touch Dragging
  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({
      x: e.clientX - offset.x,
      y: e.clientY - offset.y
    });
  };

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;
    setOffset(clampOffset(newX, newY));
  }, [isDragging, dragStart, clampOffset]);

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      setIsDragging(true);
      setDragStart({
        x: touch.clientX - offset.x,
        y: touch.clientY - offset.y
      });
    }
  };

  const handleTouchMove = useCallback((e) => {
    if (!isDragging || e.touches.length !== 1) return;
    const touch = e.touches[0];
    const newX = touch.clientX - dragStart.x;
    const newY = touch.clientY - dragStart.y;
    setOffset(clampOffset(newX, newY));
  }, [isDragging, dragStart, clampOffset]);

  // Wheel zoom
  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY * -0.0015;
    const newZoom = Math.max(1, Math.min(3.5, Number((zoom + delta).toFixed(2))));
    setZoom(newZoom);
    setOffset(prev => clampOffset(prev.x, prev.y, newZoom));
  };

  const handleZoomChange = (newZoom) => {
    const clampedZoom = Math.max(1, Math.min(3.5, newZoom));
    setZoom(clampedZoom);
    setOffset(prev => clampOffset(prev.x, prev.y, clampedZoom));
  };

  const nudge = (dx, dy) => {
    setOffset(prev => clampOffset(prev.x + dx, prev.y + dy));
  };

  const handleReset = () => {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };

  // Fokus wajah: naikkan offset ke atas sedikit agar wajah di posisi atas/tengah
  const handlePresetFace = () => {
    const newZoom = 1.35;
    setZoom(newZoom);
    setOffset(clampOffset(0, maxOffsetY * 0.45, newZoom));
  };

  // Crop dan export ke Canvas Base64
  const handleSaveCropped = () => {
    if (!imgElement || naturalSize.width === 0) return;

    try {
      const canvas = document.createElement('canvas');
      canvas.width = OUTPUT_SIZE;
      canvas.height = OUTPUT_SIZE;
      const ctx = canvas.getContext('2d');

      // Hitung koordinat crop relatif terhadap natural image
      const sourceX = ((currentWidth / 2 - offset.x - CROP_SIZE / 2) / currentWidth) * naturalSize.width;
      const sourceY = ((currentHeight / 2 - offset.y - CROP_SIZE / 2) / currentHeight) * naturalSize.height;
      const sourceWidth = (CROP_SIZE / currentWidth) * naturalSize.width;
      const sourceHeight = (CROP_SIZE / currentHeight) * naturalSize.height;

      // Gambar potongan ke canvas dengan ukuran 600x600
      ctx.drawImage(
        imgElement,
        Math.max(0, sourceX),
        Math.max(0, sourceY),
        Math.min(naturalSize.width - sourceX, sourceWidth),
        Math.min(naturalSize.height - sourceY, sourceHeight),
        0,
        0,
        OUTPUT_SIZE,
        OUTPUT_SIZE
      );

      const croppedBase64 = canvas.toDataURL('image/jpeg', 0.92);
      if (onSave) {
        onSave(croppedBase64);
      }
      onClose();
    } catch (err) {
      console.error('Gagal mencrop foto:', err);
      // Fallback kirim original
      if (onSave) onSave(imageUrl);
      onClose();
    }
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
      <div className="bg-white rounded-3xl p-5 sm:p-6 max-w-md w-full shadow-2xl border border-slate-200 my-auto flex flex-col space-y-4">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gold-400 text-slate-950 flex items-center justify-center font-bold shadow-soft">
              <Move className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900">
                Posisikan & Potong Foto (Crop)
              </h3>
              <p className="text-xs text-slate-500">
                Tarik geser untuk memusatkan wajah dan gunakan slider zoom
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
        <div className="flex items-center justify-between shrink-0">
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl text-xs font-bold">
            <button
              type="button"
              onClick={() => setPreviewShape('circle')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                previewShape === 'circle' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Circle className="w-3.5 h-3.5 text-gold-500" />
              <span>Bulat (Beranda)</span>
            </button>
            <button
              type="button"
              onClick={() => setPreviewShape('square')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                previewShape === 'square' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Square className="w-3.5 h-3.5 text-patriot-500" />
              <span>Kotak (Profil)</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => setShowGuides(!showGuides)}
            className={`text-xs px-2.5 py-1.5 rounded-xl border font-semibold transition-colors ${
              showGuides ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white border-slate-200 text-slate-400'
            }`}
          >
            Garis Bantu
          </button>
        </div>

        {/* Interactive Viewport Box with Dimmed Mask */}
        <div className="flex flex-col items-center justify-center p-3 bg-slate-950 rounded-3xl relative overflow-hidden shrink-0 shadow-inner">
          
          <div 
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            onWheel={handleWheel}
            style={{ width: `${CROP_SIZE}px`, height: `${CROP_SIZE}px` }}
            className={`relative overflow-hidden bg-slate-900 shadow-2xl border-4 border-gold-400 transition-all ${
              previewShape === 'circle' ? 'rounded-full' : 'rounded-3xl'
            } ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          >
            {imgElement && (
              <img
                src={imageUrl}
                alt="Crop Viewport"
                draggable={false}
                style={{
                  width: `${currentWidth}px`,
                  height: `${currentHeight}px`,
                  maxWidth: 'none',
                  maxHeight: 'none',
                  transform: `translate(${offset.x}px, ${offset.y}px)`,
                  position: 'absolute',
                  left: `${(CROP_SIZE - currentWidth) / 2}px`,
                  top: `${(CROP_SIZE - currentHeight) / 2}px`,
                  transition: isDragging ? 'none' : 'transform 0.05s ease-out'
                }}
                className="select-none pointer-events-none"
              />
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
              <span>Tarik foto untuk memposisikan</span>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 mt-2 text-center">
            Foto otomatis dipotong pas ke dalam bingkai tanpa sisi terpotong
          </p>
        </div>

        {/* Controls: Zoom Slider & Presets */}
        <div className="space-y-3 shrink-0">
          
          {/* Zoom Slider */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span className="flex items-center gap-1.5">
                <ZoomIn className="w-4 h-4 text-slate-500" />
                <span>Skala Zoom: {Math.round(zoom * 100)}%</span>
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                {zoom === 1 ? 'Ukuran Pas' : `Zoom In +${Math.round((zoom - 1) * 100)}%`}
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => handleZoomChange(Number((zoom - 0.1).toFixed(2)))}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                title="Perkecil"
              >
                <ZoomOut className="w-4 h-4" />
              </button>

              <input
                type="range"
                min="1.0"
                max="3.0"
                step="0.02"
                value={zoom}
                onChange={(e) => handleZoomChange(parseFloat(e.target.value))}
                className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-gold-500"
              />

              <button
                type="button"
                onClick={() => handleZoomChange(Number((zoom + 0.1).toFixed(2)))}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                title="Perbesar"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Presets & Nudge D-pad */}
          <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-100">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleReset}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1 transition-colors"
              >
                <RotateCcw className="w-3 h-3 text-slate-500" />
                <span>Reset (100%)</span>
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
                onClick={() => nudge(-10, 0)} 
                className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700" 
                title="Geser Kiri"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button 
                type="button" 
                onClick={() => nudge(0, -10)} 
                className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700" 
                title="Geser Atas"
              >
                <ChevronUp className="w-3.5 h-3.5" />
              </button>
              <button 
                type="button" 
                onClick={() => nudge(0, 10)} 
                className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700" 
                title="Geser Bawah"
              >
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              <button 
                type="button" 
                onClick={() => nudge(10, 0)} 
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
            onClick={handleSaveCropped}
            className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition-all shadow-soft flex items-center gap-2 hover:shadow-glow-gold active:scale-[0.99]"
          >
            <Check className="w-4 h-4 text-gold-400" />
            <span>Simpan & Terapkan Foto</span>
          </button>
        </div>

      </div>
    </div>
  );
}
