import React, { useState, useRef } from 'react';
import {
  Upload,
  Sparkles,
  Check,
  RotateCcw,
  ZoomIn,
  MessageCircle,
  Camera,
} from 'lucide-react';
import {
  MagnetShape,
  SAMPLE_PHOTO_PRESETS,
} from '../data/studioData';
import { DaisyMagnetFrame } from './BrandDoodles';

interface TryItCustomStudioProps {
  onOrderCustomDesign: (designSummary: {
    shape: MagnetShape;
    shapeLabel: string;
    caption: string;
    petalColorName: string;
    isCustomUpload: boolean;
    fileName?: string;
    photoPreviewUrl: string;
  }) => void;
}

const SHAPE_OPTIONS: {
  id: MagnetShape;
  label: string;
  sublabel: string;
  priceTag: string;
}[] = [
  {
    id: 'square',
    label: 'Square Magnet',
    sublabel: '2.75" × 2.75" Glossy',
    priceTag: '₹99',
  },
  {
    id: 'polaroid',
    label: 'Rectangle Polaroid',
    sublabel: '3.5" × 2.75" + Caption',
    priceTag: '₹119',
  },
  {
    id: 'daisy',
    label: 'Daisy Flower',
    sublabel: 'Die-Cut 3.2" Magnet',
    priceTag: '₹129',
  },
  {
    id: 'badge',
    label: 'Round Pin Badge',
    sublabel: '58mm Metal Pin Back',
    priceTag: '₹49',
  },
];

const PETAL_COLORS = [
  { name: 'Soft Pink', hex: '#F4B6C2' },
  { name: 'Sunny Yellow', hex: '#F7D469' },
  { name: 'Sage Green', hex: '#8FA58B' },
  { name: 'Terracotta', hex: '#C9714F' },
];

const FRIDGE_SURFACES = [
  {
    id: 'cream',
    label: 'Retro Cream Fridge',
    bgClass: 'bg-gradient-to-br from-[#FAF3EA] via-[#F3E6D6] to-[#E9D7C0]',
    handleColor: 'bg-[#D6C3AC] border-[#5B3A29]',
  },
  {
    id: 'sage',
    label: 'Mint Sage Fridge',
    bgClass: 'bg-gradient-to-br from-[#E5ECE3] via-[#D3DFD0] to-[#BACBB5]',
    handleColor: 'bg-[#FAF3EA] border-[#5B3A29]',
  },
  {
    id: 'pink',
    label: 'Blush Pink Fridge',
    bgClass: 'bg-gradient-to-br from-[#FCE8EC] via-[#F8D5DC] to-[#F4B6C2]',
    handleColor: 'bg-[#FAF3EA] border-[#5B3A29]',
  },
];

export const TryItCustomStudio: React.FC<TryItCustomStudioProps> = ({
  onOrderCustomDesign,
}) => {
  const [selectedShape, setSelectedShape] = useState<MagnetShape>('polaroid');
  const [activePhotoUrl, setActivePhotoUrl] = useState<string>(
    SAMPLE_PHOTO_PRESETS[0].src
  );
  const [activePresetId, setActivePresetId] = useState<string>('couple');
  const [isCustomUpload, setIsCustomUpload] = useState<boolean>(false);
  const [uploadedFileName, setUploadedFileName] = useState<string>('');
  const [caption, setCaption] = useState<string>(
    SAMPLE_PHOTO_PRESETS[0].captionDefault
  );
  const [petalColor, setPetalColor] = useState(PETAL_COLORS[0]);
  const [zoom, setZoom] = useState<number>(1);
  const [surfaceId, setSurfaceId] = useState<string>('cream');
  const [isSnapping, setIsSnapping] = useState<boolean>(false);
  const [isDraggingOver, setIsDraggingOver] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const triggerSnapEffect = () => {
    setIsSnapping(false);
    window.requestAnimationFrame(() => {
      setIsSnapping(true);
    });
  };

  const handleShapeSelect = (shape: MagnetShape) => {
    setSelectedShape(shape);
    triggerSnapEffect();
  };

  const handlePresetSelect = (preset: (typeof SAMPLE_PHOTO_PRESETS)[0]) => {
    setActivePhotoUrl(preset.src);
    setActivePresetId(preset.id);
    setIsCustomUpload(false);
    setUploadedFileName('');
    setCaption(preset.captionDefault);
    setZoom(1);
    triggerSnapEffect();
  };

  const processUploadedFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      if (typeof e.target?.result === 'string') {
        setActivePhotoUrl(e.target.result);
        setActivePresetId('custom');
        setIsCustomUpload(true);
        setUploadedFileName(file.name);
        triggerSnapEffect();
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processUploadedFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processUploadedFile(file);
    }
  };

  const activeSurface =
    FRIDGE_SURFACES.find((s) => s.id === surfaceId) || FRIDGE_SURFACES[0];
  const currentShapeMeta =
    SHAPE_OPTIONS.find((s) => s.id === selectedShape) || SHAPE_OPTIONS[0];

  const handleWhatsAppOrderClick = () => {
    onOrderCustomDesign({
      shape: selectedShape,
      shapeLabel: currentShapeMeta.label,
      caption: caption.trim() || 'No text caption',
      petalColorName: selectedShape === 'daisy' ? petalColor.name : 'Standard',
      isCustomUpload,
      fileName: uploadedFileName || undefined,
      photoPreviewUrl: activePhotoUrl,
    });
  };

  return (
    <section
      id="try-it"
      aria-labelledby="try-it-heading"
      className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      {/* Section Header */}
      <div className="max-w-2xl mx-auto text-center mb-10 md:mb-14">
        <p className="text-xs sm:text-sm font-bold tracking-wide text-[#C9714F] mb-2">
          Interactive Live Previewer · Try Before You Order
        </p>
        <h2
          id="try-it-heading"
          className="text-3xl sm:text-4xl lg:text-[2.65rem] font-bold text-[#5B3A29] leading-tight"
        >
          Try It Yourself: See Your Photo on a Fridge!
        </h2>
        <p className="mt-3 text-base sm:text-lg text-[#7C5846]">
          Upload any photo from your phone gallery, pick a magnet or pin badge shape, and see how cute it looks in seconds.
        </p>
      </div>

      {/* Main 2-Column Interactive Studio */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-[#F3E6D6]/75 border-2 border-[#5B3A29] rounded-3xl p-5 sm:p-8 shadow-sticker">
        {/* Left Column: Controls (5 cols on desktop) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          {/* Step 1: Upload Photo or Pick Sample */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-sm font-bold text-[#5B3A29]">
                01. Choose or Upload Your Photo
              </span>
              {isCustomUpload && (
                <button
                  type="button"
                  onClick={() => handlePresetSelect(SAMPLE_PHOTO_PRESETS[0])}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#C9714F] hover:underline cursor-pointer whitespace-nowrap shrink-0"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset to Sample
                </button>
              )}
            </div>

            {/* Upload Dropzone Button */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDraggingOver(true);
              }}
              onDragLeave={() => setIsDraggingOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  fileInputRef.current?.click();
                }
              }}
              aria-label="Upload your own photo from device"
              className={`w-full rounded-2xl border-2 border-dashed p-4 transition-colors cursor-pointer flex items-center justify-between gap-3 ${
                isDraggingOver
                  ? 'border-[#C9714F] bg-[#FCE8EC]'
                  : isCustomUpload
                  ? 'border-[#8FA58B] bg-[#E5ECE3]/70'
                  : 'border-[#5B3A29]/60 bg-[#FAF3EA] hover:border-[#C9714F]'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-11 h-11 rounded-xl bg-[#C9714F] text-[#FAF3EA] flex items-center justify-center shrink-0 border-2 border-[#5B3A29]">
                  {isCustomUpload ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <Upload className="w-5 h-5" />
                  )}
                </div>
                <div className="text-left min-w-0">
                  <p className="text-sm font-bold text-[#5B3A29] truncate">
                    {isCustomUpload
                      ? `Loaded: ${uploadedFileName || 'Your Custom Photo'}`
                      : 'Upload a Photo from Your Phone / PC'}
                  </p>
                  <p className="text-xs text-[#7C5846] truncate">
                    {isCustomUpload
                      ? 'Tap to test another photo anytime'
                      : 'JPG, PNG, WEBP · 100% private in your browser'}
                  </p>
                </div>
              </div>
              <span className="px-3 py-1.5 rounded-xl bg-[#5B3A29] text-[#FAF3EA] text-xs font-bold whitespace-nowrap shrink-0">
                Browse
              </span>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            {/* Sample Presets Row */}
            <div className="mt-3">
              <p className="text-xs text-[#7C5846] mb-2">
                Or test instantly with our sample memories:
              </p>
              <div className="grid grid-cols-3 gap-2.5">
                {SAMPLE_PHOTO_PRESETS.map((preset) => {
                  const isSelected =
                    !isCustomUpload && activePresetId === preset.id;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => handlePresetSelect(preset)}
                      className={`group flex items-center gap-2 p-1.5 rounded-xl border-2 text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#5B3A29] bg-[#FAF3EA] shadow-sticker-sm'
                          : 'border-[#5B3A29]/25 bg-[#FAF3EA]/60 hover:bg-[#FAF3EA]'
                      }`}
                    >
                      <img
                        src={preset.src}
                        alt={preset.alt}
                        referrerPolicy="no-referrer"
                        className="w-8 h-8 rounded-lg object-cover shrink-0 border border-[#5B3A29]/30"
                      />
                      <span className="text-xs font-bold text-[#5B3A29] truncate">
                        {preset.label.split(' ')[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Step 2: Pick a Shape */}
          <div>
            <span className="block text-sm font-bold text-[#5B3A29] mb-2.5">
              02. Pick Your Magnet or Badge Shape
            </span>
            <div className="grid grid-cols-2 gap-2.5">
              {SHAPE_OPTIONS.map((option) => {
                const active = selectedShape === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleShapeSelect(option.id)}
                    className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer magnet-snap ${
                      active
                        ? 'border-[#5B3A29] bg-[#C9714F] text-[#FAF3EA] shadow-sticker-sm'
                        : 'border-[#5B3A29]/40 bg-[#FAF3EA] text-[#5B3A29] hover:border-[#5B3A29]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-sm font-bold whitespace-nowrap truncate">
                        {option.label}
                      </span>
                      <span
                        className={`text-xs font-mono font-semibold tabular-nums whitespace-nowrap shrink-0 ${
                          active ? 'text-[#FAF3EA]' : 'text-[#C9714F]'
                        }`}
                      >
                        {option.priceTag}
                      </span>
                    </div>
                    <p
                      className={`text-xs mt-0.5 truncate ${
                        active ? 'text-[#FAF3EA]/90' : 'text-[#7C5846]'
                      }`}
                    >
                      {option.sublabel}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Customize Caption / Daisy Petal Color & Zoom */}
          <div className="space-y-4 bg-[#FAF3EA] p-4 rounded-2xl border-2 border-[#5B3A29]/30">
            {(selectedShape === 'polaroid' || selectedShape === 'badge') && (
              <div>
                <label
                  htmlFor="custom-magnet-caption"
                  className="block text-xs font-bold text-[#5B3A29] mb-1.5"
                >
                  Custom Caption / Date (Optional)
                </label>
                <input
                  id="custom-magnet-caption"
                  type="text"
                  maxLength={28}
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="e.g. Goa Trip '26 • Best Days"
                  className="w-full px-3.5 py-2 rounded-xl border-2 border-[#5B3A29]/40 bg-white text-sm font-semibold text-[#5B3A29] focus:outline-none focus:border-[#C9714F]"
                />
              </div>
            )}

            {selectedShape === 'daisy' && (
              <div>
                <span className="block text-xs font-bold text-[#5B3A29] mb-2">
                  Daisy Flower Petal Color
                </span>
                <div className="flex items-center gap-2.5">
                  {PETAL_COLORS.map((color) => (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => {
                        setPetalColor(color);
                        triggerSnapEffect();
                      }}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border-2 text-xs font-bold cursor-pointer whitespace-nowrap shrink-0 ${
                        petalColor.name === color.name
                          ? 'border-[#5B3A29] bg-[#F3E6D6] shadow-sticker-sm'
                          : 'border-[#5B3A29]/25 bg-white'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-[#5B3A29]"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span>{color.name.split(' ')[1] || color.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Photo Zoom Slider */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-[#5B3A29] mb-1">
                <span className="inline-flex items-center gap-1">
                  <ZoomIn className="w-3.5 h-3.5 text-[#C9714F]" />
                  Photo Crop Zoom
                </span>
                <span className="font-mono tabular-nums">
                  {Math.round(zoom * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="1.45"
                step="0.05"
                value={zoom}
                onChange={(e) => setZoom(parseFloat(e.target.value))}
                aria-label="Adjust photo zoom inside magnet"
                className="w-full accent-[#C9714F] cursor-pointer"
              />
            </div>
          </div>

          {/* Primary CTA: Order This Design on WhatsApp */}
          <div className="pt-1">
            <button
              type="button"
              onClick={handleWhatsAppOrderClick}
              className="w-full py-3.5 px-6 rounded-2xl bg-[#C9714F] hover:bg-[#B25B3A] text-[#FAF3EA] font-heading font-bold text-base sm:text-lg border-2 border-[#5B3A29] shadow-sticker magnet-snap flex items-center justify-center gap-2.5 cursor-pointer whitespace-nowrap"
            >
              <MessageCircle className="w-5 h-5 shrink-0" />
              <span>Order This Design on WhatsApp</span>
            </button>
            <p className="text-xs text-center text-[#7C5846] mt-2">
              Starting at{' '}
              <span className="font-mono font-bold text-[#5B3A29] tabular-nums">
                {currentShapeMeta.priceTag}
              </span>{' '}
              [Placeholder] · We send a final digital proof before printing!
            </p>
          </div>
        </div>

        {/* Right Column: Interactive Fridge Door Preview Stage (7 cols on desktop) */}
        <div className="lg:col-span-7 flex flex-col">
          <div
            className={`relative flex-1 min-h-[420px] sm:min-h-[480px] rounded-3xl border-2 border-[#5B3A29] overflow-hidden flex flex-col justify-between p-5 sm:p-7 transition-colors duration-300 ${activeSurface.bgClass}`}
          >
            {/* Realistic Fridge Door Details: Top Metallic Brand Letters & Side Handle */}
            <div className="flex items-center justify-between z-10">
              <div className="flex items-center gap-2 text-xs font-bold text-[#5B3A29]/80">
                <Camera className="w-4 h-4 text-[#C9714F]" />
                <span>
                  {selectedShape === 'badge'
                    ? 'Live Pin Badge Preview'
                    : 'Live Fridge Door Preview'}
                </span>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums">
                  {currentShapeMeta.label}
                </span>
              </div>

              {/* Fridge Door Surface Color Switcher */}
              <div className="flex items-center gap-1.5 bg-[#FAF3EA]/90 p-1 rounded-xl border border-[#5B3A29]/30">
                {FRIDGE_SURFACES.map((surface) => (
                  <button
                    key={surface.id}
                    type="button"
                    onClick={() => setSurfaceId(surface.id)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      surfaceId === surface.id
                        ? 'bg-[#5B3A29] text-[#FAF3EA]'
                        : 'text-[#5B3A29] hover:bg-[#F3E6D6]'
                    }`}
                  >
                    {surface.label.split(' ')[1]}
                  </button>
                ))}
              </div>
            </div>

            {/* Decorative Fridge Seam & Handle on Right Edge */}
            <div
              aria-hidden="true"
              className={`hidden sm:block absolute right-6 top-1/2 -translate-y-1/2 w-4 h-44 rounded-full border-2 shadow-md ${activeSurface.handleColor}`}
            />

            {/* Decorative Sticky Note on the Fridge */}
            <div
              aria-hidden="true"
              className="hidden md:flex flex-col absolute left-6 bottom-20 w-32 bg-[#FFF7C2] border-2 border-[#5B3A29] p-2.5 rounded-xl -rotate-6 shadow-sm select-none"
            >
              <div className="w-4 h-4 rounded-full bg-[#C9714F] border border-[#5B3A29] mx-auto -mt-4 mb-1" />
              <p className="text-[11px] font-bold text-[#5B3A29] leading-tight text-center">
                Fridge khaali-khaali lagta hai? Stick a memory here! ✨
              </p>
            </div>

            {/* Center Stage: The Live Rendered Custom Magnet or Badge */}
            <div className="my-auto flex flex-col items-center justify-center py-6 z-10">
              <div
                onClick={triggerSnapEffect}
                title="Click to test magnetic snap!"
                className={`cursor-pointer select-none ${
                  isSnapping ? 'animate-magnet-slap' : ''
                }`}
              >
                {/* 1. SQUARE MAGNET */}
                {selectedShape === 'square' && (
                  <div className="relative w-60 h-60 sm:w-64 sm:h-64 rounded-2xl bg-[#FAF3EA] p-2.5 border-3 border-[#5B3A29] shadow-magnet magnet-snap overflow-hidden">
                    <div className="w-full h-full rounded-xl overflow-hidden relative bg-[#F3E6D6]">
                      <img
                        src={activePhotoUrl}
                        alt="Custom Square Fridge Magnet Preview"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-150"
                        style={{ transform: `scale(${zoom})` }}
                      />
                      {/* Glossy Lamination Diagonal Reflection */}
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/25 to-white/40 pointer-events-none"
                      />
                    </div>
                  </div>
                )}

                {/* 2. RECTANGLE POLAROID MAGNET */}
                {selectedShape === 'polaroid' && (
                  <div className="relative w-60 sm:w-64 bg-[#FAF3EA] pt-3.5 px-3.5 pb-5 rounded-2xl border-3 border-[#5B3A29] shadow-magnet magnet-snap -rotate-1">
                    <div className="w-full aspect-square rounded-xl overflow-hidden relative border-2 border-[#5B3A29]/20 bg-[#F3E6D6]">
                      <img
                        src={activePhotoUrl}
                        alt="Custom Polaroid Fridge Magnet Preview"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-150"
                        style={{ transform: `scale(${zoom})` }}
                      />
                      {/* Glossy Lamination Sheen */}
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-white/35 pointer-events-none"
                      />
                    </div>
                    <div className="mt-3 text-center px-1">
                      <p className="font-heading font-bold text-[#5B3A29] text-base truncate">
                        {caption || 'Your Cute Caption ✨'}
                      </p>
                    </div>
                  </div>
                )}

                {/* 3. DAISY FLOWER MAGNET */}
                {selectedShape === 'daisy' && (
                  <div className="magnet-snap">
                    <DaisyMagnetFrame
                      imageSrc={activePhotoUrl}
                      petalColor={petalColor.hex}
                      size={265}
                    />
                  </div>
                )}

                {/* 4. ROUND PIN BADGE (BUTTON PIN) */}
                {selectedShape === 'badge' && (
                  <div className="relative w-60 h-60 sm:w-64 sm:h-64 rounded-full border-3 border-[#5B3A29] shadow-[0_8px_0_#5B3A29,0_16px_28px_rgba(91,58,41,0.28)] overflow-hidden magnet-snap bg-[#FAF3EA]">
                    <img
                      src={activePhotoUrl}
                      alt="Custom Round Pin Badge Preview"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-150"
                      style={{ transform: `scale(${zoom})` }}
                    />
                    {/* 3D Curved Button Badge Mylar Rim & Highlight */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full pointer-events-none"
                      style={{
                        background:
                          'radial-gradient(circle at 30% 25%, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.08) 42%, rgba(91,58,41,0.28) 92%, rgba(91,58,41,0.55) 100%)',
                      }}
                    />
                    {/* Optional Curved Badge Caption Banner */}
                    {caption && (
                      <div className="absolute bottom-4 inset-x-6 bg-[#FAF3EA]/95 border-2 border-[#5B3A29] rounded-xl py-1 px-2.5 text-center shadow-sm">
                        <p className="font-heading font-bold text-xs text-[#5B3A29] truncate">
                          {caption}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Interactive Snap Feedback Button */}
              <button
                type="button"
                onClick={triggerSnapEffect}
                className="mt-5 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#FAF3EA]/90 hover:bg-[#FAF3EA] border border-[#5B3A29]/40 text-xs font-bold text-[#5B3A29] cursor-pointer transition-colors whitespace-nowrap shrink-0"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C9714F]" />
                <span>Tap Magnet to Test the &ldquo;SNAP!&rdquo; Effect</span>
              </button>
            </div>

            {/* Bottom Fridge Spec Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-[#5B3A29]/15 text-xs text-[#5B3A29]/85 z-10">
              <span>Waterproof HD Glossy Print · Fade-Resistant Inks</span>
              <span className="font-mono font-semibold tabular-nums">
                {selectedShape === 'badge'
                  ? 'Safety Pin Metal Back'
                  : '1.5mm Full Magnetic Sheet'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
