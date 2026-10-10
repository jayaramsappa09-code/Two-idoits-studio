/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import {
  MessageCircle,
  Instagram,
  Mail,
  Heart,
  Sparkles,
  Truck,
  ShieldCheck,
  Gift,
  Users,
  ChevronDown,
  Upload,
  Check,
  Copy,
  ExternalLink,
  SlidersHorizontal,
  Download,
  Menu,
  X,
  ArrowRight,
  Phone,
} from 'lucide-react';
import {
  TwoIdiotsLogo,
  DoodleUnderline,
  DaisyMagnetFrame,
} from './components/BrandDoodles';
import { TryItCustomStudio } from './components/TryItCustomStudio';
import {
  ASSETS,
  INITIAL_PRODUCTS,
  GALLERY_ITEMS,
  TESTIMONIALS,
  FAQ_ITEMS,
  MagnetShape,
} from './data/studioData';
import { downloadStandaloneHtmlFile } from './utils/exportStandaloneHtml';

export default function App() {
  // Demo Pitch Banner & Live Customizer State (so freelancer/owner can tweak placeholders live)
  const [showDemoBanner, setShowDemoBanner] = useState<boolean>(true);
  const [showPitchDrawer, setShowPitchDrawer] = useState<boolean>(false);
  const [presenterName, setPresenterName] = useState<string>('[YOUR NAME]');
  const [presenterContact, setPresenterContact] = useState<string>('[YOUR CONTACT]');
  const [whatsappNumber, setWhatsappNumber] = useState<string>('+91 XXXXXXXXXX');
  const [studioEmail, setStudioEmail] = useState<string>('hello@twoidiotsstudio.com');
  const [instagramHandle, setInstagramHandle] = useState<string>('twoidiotsstudio');
  const [customLogoUrl, setCustomLogoUrl] = useState<string | null>(null);

  // Editable placeholder starting prices (INR)
  const [magnetPrice, setMagnetPrice] = useState<number>(99);
  const [badgePrice, setBadgePrice] = useState<number>(49);
  const [hamperPrice, setHamperPrice] = useState<number>(499);

  // Mobile Menu State
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Hero interactive fridge state
  const [activeHeroNote, setActiveHeroNote] = useState<string>(
    'Tap any magnet on our fridge door to test the magnetic snap!'
  );

  // Gallery Filter State
  const [galleryFilter, setGalleryFilter] = useState<'All' | 'Magnets' | 'Badges' | 'Hampers'>('All');

  // Collab copy feedback
  const [collabCopied, setCollabCopied] = useState<boolean>(false);

  // FAQ Accordion State
  const [openFaqId, setOpenFaqId] = useState<string>('faq-1');

  // Order Form State
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<string>(
    'Custom Photo Fridge Magnets'
  );
  const [selectedShapeText, setSelectedShapeText] = useState<string>(
    'Rectangle Polaroid Magnet'
  );
  const [quantity, setQuantity] = useState<number>(4);
  const [orderMessage, setOrderMessage] = useState<string>('');
  const [orderPhotos, setOrderPhotos] = useState<
    { name: string; previewUrl: string }[]
  >([]);
  const [formError, setFormError] = useState<string>('');

  // WhatsApp Ready Modal State (avoids window.open popup blocking inside iframes)
  const [whatsAppModalData, setWhatsAppModalData] = useState<{
    isOpen: boolean;
    messageText: string;
    waUrl: string;
    copied: boolean;
  } | null>(null);

  const orderFormFileRef = useRef<HTMLInputElement | null>(null);
  const logoUploadRef = useRef<HTMLInputElement | null>(null);

  // Compute dynamic product list with editable placeholder prices
  const products = INITIAL_PRODUCTS.map((item) => {
    if (item.id === 'photo-fridge-magnets') {
      return { ...item, startingPrice: magnetPrice };
    }
    if (item.id === 'custom-pin-badges') {
      return { ...item, startingPrice: badgePrice };
    }
    return { ...item, startingPrice: hamperPrice };
  });

  // Helper to build WhatsApp URL safely
  const buildWhatsAppLink = (text: string) => {
    const digitsOnly = whatsappNumber.replace(/[^0-9]/g, '');
    const phoneParam = digitsOnly.length >= 10 ? digitsOnly : '919876543210';
    return `https://wa.me/${phoneParam}?text=${encodeURIComponent(text)}`;
  };

  // Trigger WhatsApp Modal or prefill Order Form from "Try It Yourself" Studio
  const handleOrderFromCustomStudio = (design: {
    shape: MagnetShape;
    shapeLabel: string;
    caption: string;
    petalColorName: string;
    isCustomUpload: boolean;
    fileName?: string;
    photoPreviewUrl: string;
  }) => {
    const prodName =
      design.shape === 'badge'
        ? 'Custom Photo & Art Pin Badges'
        : 'Custom Photo Fridge Magnets';

    setSelectedProduct(prodName);
    setSelectedShapeText(
      design.shape === 'daisy'
        ? `${design.shapeLabel} (${design.petalColorName} Petals)`
        : design.shapeLabel
    );
    setOrderMessage(
      `Caption: "${design.caption}"${
        design.fileName ? ` | Uploaded Photo: ${design.fileName}` : ''
      }`
    );

    if (design.isCustomUpload && design.photoPreviewUrl) {
      setOrderPhotos([
        {
          name: design.fileName || 'custom-magnet-photo.jpg',
          previewUrl: design.photoPreviewUrl,
        },
      ]);
    }

    const msg = [
      `Hi Two Idiots Studio! 👋`,
      `I just designed a custom piece on your website previewer and want to order it:`,
      ``,
      `• Product: ${prodName}`,
      `• Shape / Style: ${design.shapeLabel}${
        design.shape === 'daisy' ? ` (${design.petalColorName} Petals)` : ''
      }`,
      `• Custom Caption: ${design.caption}`,
      `• Photo: ${
        design.isCustomUpload
          ? `Ready to send my photo (${design.fileName || '1 photo'}) here on chat!`
          : 'Tested with sample photo (I will send my photos here)'
      }`,
      ``,
      `Please share the payment link & preview timeline! ✨`,
    ].join('\n');

    setWhatsAppModalData({
      isOpen: true,
      messageText: msg,
      waUrl: buildWhatsAppLink(msg),
      copied: false,
    });
  };

  // Select a product from the Products section and scroll to Order Form
  const handleSelectProductToOrder = (productName: string, defaultShape: string) => {
    setSelectedProduct(productName);
    setSelectedShapeText(defaultShape);
    const el = document.getElementById('order-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle multiple photo uploads in Order Form
  const handleOrderPhotoFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (typeof ev.target?.result === 'string') {
          setOrderPhotos((prev) => [
            ...prev.slice(0, 5),
            { name: file.name, previewUrl: ev.target!.result as string },
          ]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Handle Order Form submission
  const handleOrderFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!customerName.trim()) {
      setFormError('Please enter your name so we know what to call you!');
      return;
    }
    const cleanPhone = customerPhone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      setFormError('Please enter a valid 10-digit WhatsApp / mobile number.');
      return;
    }

    const photoSummary =
      orderPhotos.length > 0
        ? `${orderPhotos.length} photo(s) selected (${orderPhotos
            .map((p) => p.name)
            .join(', ')}) — attaching them in this chat next!`
        : 'I will share my photos right here in the WhatsApp chat.';

    const messageLines = [
      `Namaste Two Idiots Studio! 🧲✨`,
      `I'd like to place a custom order from your website:`,
      ``,
      `• Name: ${customerName.trim()}`,
      `• Phone: ${customerPhone.trim()}`,
      `• Product: ${selectedProduct}`,
      `• Style / Shape: ${selectedShapeText}`,
      `• Quantity: ${quantity} pcs`,
      orderMessage.trim() ? `• Custom Notes / Caption: ${orderMessage.trim()}` : null,
      `• Photos: ${photoSummary}`,
      ``,
      `Please confirm the total amount & share the preview timeline!`,
    ].filter(Boolean) as string[];

    const finalMsg = messageLines.join('\n');
    setWhatsAppModalData({
      isOpen: true,
      messageText: finalMsg,
      waUrl: buildWhatsAppLink(finalMsg),
      copied: false,
    });
  };

  // Copy text helper
  const copyToClipboard = (text: string, onSuccess?: () => void) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        if (onSuccess) onSuccess();
      });
    }
  };

  // Filtered gallery items
  const visibleGalleryItems =
    galleryFilter === 'All'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === galleryFilter);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF3EA] text-[#5B3A29]">
      {/* =====================================================================
          DEMO-SPECIFIC DISMISSIBLE TOP BANNER (Non-sticky to respect mobile cap)
      ===================================================================== */}
      {showDemoBanner && (
        <div className="bg-[#5B3A29] text-[#FAF3EA] px-4 py-2 text-xs border-b border-[#7C5846]">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="font-semibold">
                Website concept by {presenterName} • {presenterContact}
              </span>
              <span aria-hidden="true" className="opacity-50">
                ·
              </span>
              <span className="hidden sm:inline text-[#FAF3EA]/80">
                Pitch-Ready Interactive Demo for @twoidiotsstudio
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowPitchDrawer((prev) => !prev)}
                className="inline-flex items-center gap-1 text-[#F4B6C2] hover:text-white font-bold underline cursor-pointer whitespace-nowrap shrink-0"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>{showPitchDrawer ? 'Hide Pitch Controls' : 'Edit Placeholders / Logo'}</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  downloadStandaloneHtmlFile({
                    presenterName,
                    presenterContact,
                    whatsappNumber,
                    email: studioEmail,
                    instagramHandle,
                    magnetPrice,
                    badgePrice,
                    hamperPrice,
                  })
                }
                className="hidden md:inline-flex items-center gap-1 text-[#8FA58B] hover:text-white font-bold underline cursor-pointer whitespace-nowrap shrink-0"
                title="Download single-file HTML for Netlify or GitHub Pages"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Single-File HTML</span>
              </button>

              <button
                type="button"
                onClick={() => setShowDemoBanner(false)}
                aria-label="Dismiss demo concept banner"
                className="text-[#FAF3EA]/75 hover:text-white font-bold cursor-pointer px-1 whitespace-nowrap shrink-0"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Expandable Live Pitch Controls Drawer for the Freelancer / Owner */}
          {showPitchDrawer && (
            <div className="max-w-7xl mx-auto mt-2.5 pt-2.5 border-t border-[#FAF3EA]/20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pb-1 text-xs">
              <div>
                <label className="block text-[#FAF3EA]/70 mb-1">
                  Your Name & Contact (Top Banner)
                </label>
                <div className="flex gap-1.5">
                  <input
                    type="text"
                    value={presenterName}
                    onChange={(e) => setPresenterName(e.target.value)}
                    placeholder="Your Name"
                    className="w-1/2 px-2 py-1 rounded bg-[#FAF3EA] text-[#5B3A29] font-semibold"
                  />
                  <input
                    type="text"
                    value={presenterContact}
                    onChange={(e) => setPresenterContact(e.target.value)}
                    placeholder="Your Phone/Portfolio"
                    className="w-1/2 px-2 py-1 rounded bg-[#FAF3EA] text-[#5B3A29] font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#FAF3EA]/70 mb-1">
                  Owner WhatsApp Number (Live Test)
                </label>
                <input
                  type="text"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-2.5 py-1 rounded bg-[#FAF3EA] text-[#5B3A29] font-mono font-semibold"
                />
              </div>

              <div>
                <label className="block text-[#FAF3EA]/70 mb-1">
                  Placeholder Starting Prices (₹)
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  <input
                    type="number"
                    value={magnetPrice}
                    onChange={(e) => setMagnetPrice(Number(e.target.value) || 99)}
                    title="Magnet Starting Price"
                    className="px-2 py-1 rounded bg-[#FAF3EA] text-[#5B3A29] font-mono font-semibold"
                  />
                  <input
                    type="number"
                    value={badgePrice}
                    onChange={(e) => setBadgePrice(Number(e.target.value) || 49)}
                    title="Badge Starting Price"
                    className="px-2 py-1 rounded bg-[#FAF3EA] text-[#5B3A29] font-mono font-semibold"
                  />
                  <input
                    type="number"
                    value={hamperPrice}
                    onChange={(e) => setHamperPrice(Number(e.target.value) || 499)}
                    title="Hamper Starting Price"
                    className="px-2 py-1 rounded bg-[#FAF3EA] text-[#5B3A29] font-mono font-semibold"
                  />
                </div>
              </div>

              <div className="flex items-end gap-2">
                <button
                  type="button"
                  onClick={() => logoUploadRef.current?.click()}
                  className="flex-1 py-1.5 px-2.5 rounded bg-[#C9714F] text-white font-bold cursor-pointer text-center whitespace-nowrap"
                >
                  {customLogoUrl ? 'Change Uploaded Logo' : 'Upload Actual Logo PNG'}
                </button>
                <input
                  ref={logoUploadRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const r = new FileReader();
                      r.onload = (ev) => {
                        if (typeof ev.target?.result === 'string') {
                          setCustomLogoUrl(ev.target.result);
                        }
                      };
                      r.readAsDataURL(file);
                    }
                  }}
                  className="hidden"
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* =====================================================================
          1. STICKY NAVBAR (Strict 3-Zone Top Bar Contract)
      ===================================================================== */}
      <header className="sticky top-0 z-40 bg-[#FAF3EA]/95 backdrop-blur-md border-b-2 border-[#5B3A29]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Title (Single-line lockup) */}
          <a
            href="#"
            className="flex items-center gap-2.5 font-heading text-lg sm:text-xl font-bold text-[#5B3A29] whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9714F] rounded-lg"
          >
            <TwoIdiotsLogo size="sm" customLogoUrl={customLogoUrl} />
            <span>Two Idiots Studio</span>
          </a>

          {/* Zone 2: 5 Concise Single-Line Navigation Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-7 text-sm font-bold text-[#5B3A29]"
          >
            <a
              href="#try-it"
              className="hover:text-[#C9714F] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Try Studio
            </a>
            <a
              href="#products"
              className="hover:text-[#C9714F] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Products
            </a>
            <a
              href="#how-to-order"
              className="hover:text-[#C9714F] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              How to Order
            </a>
            <a
              href="#gallery"
              className="hover:text-[#C9714F] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Gallery
            </a>
            <a
              href="#collab"
              className="hover:text-[#C9714F] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Collab
            </a>
          </nav>

          {/* Zone 3: 1 Primary Action Button (+ Mobile Hamburger) */}
          <div className="flex items-center gap-2.5 shrink-0">
            <a
              href="#order-form"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#C9714F] hover:bg-[#B25B3A] text-[#FAF3EA] font-heading font-semibold text-xs sm:text-sm border-2 border-[#5B3A29] shadow-sticker-sm magnet-snap whitespace-nowrap shrink-0"
            >
              <MessageCircle className="w-4 h-4 shrink-0" />
              <span>Order on WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
              className="md:hidden p-2 rounded-xl border-2 border-[#5B3A29] bg-[#FAF3EA] text-[#5B3A29] cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <nav
            aria-label="Mobile Navigation"
            className="md:hidden bg-[#FAF3EA] border-b-2 border-[#5B3A29] px-4 pt-3 pb-5 space-y-2"
          >
            {[
              { label: 'Try It Yourself Studio', href: '#try-it' },
              { label: 'Products & Pricing', href: '#products' },
              { label: 'How to Order', href: '#how-to-order' },
              { label: 'Instagram Gallery', href: '#gallery' },
              { label: 'Creator Collab', href: '#collab' },
              { label: 'FAQ & Shipping', href: '#faq' },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 px-3 rounded-xl font-heading font-semibold text-base text-[#5B3A29] hover:bg-[#F3E6D6]"
              >
                {link.label}
              </a>
            ))}
          </nav>
        )}
      </header>

      <main className="flex-1">
        {/* =====================================================================
            2. HERO SECTION (1440px Balanced Split + Fridge Door Collage)
        ===================================================================== */}
        <section className="relative pt-10 pb-16 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-hero-enter">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            {/* Left Column: Brand Proposition & CTAs */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              {/* Unboxed Metadata Sub-line (Zero Pills) */}
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold tracking-wide text-[#C9714F] mb-3">
                <span>Gifts</span>
                <span aria-hidden="true">·</span>
                <span>Memories</span>
                <span aria-hidden="true">·</span>
                <span>Moments</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#7C5846]">Handcrafted in India</span>
              </div>

              {/* Main Display Headline */}
              <h1
                className="font-heading font-bold text-[#5B3A29] leading-[1.12] tracking-tight"
                style={{ fontSize: 'clamp(2.35rem, 4.2vw, 3.75rem)' }}
              >
                Your memories, but make them{' '}
                <span className="relative inline-block text-[#C9714F]">
                  CUTE!
                  <DoodleUnderline className="w-full h-3.5 -mt-1" color="#C9714F" />
                </span>
              </h1>

              {/* Playful Light-Hinglish Subtext */}
              <p className="mt-5 text-base sm:text-lg text-[#5B3A29]/90 leading-relaxed max-w-xl">
                <strong className="font-bold text-[#5B3A29]">
                  Fridge khaali-khaali lagta hai? Toh phir fatafat order karo!
                </strong>{' '}
                We turn your camera-roll favourites—couples, pets, vacations &amp; inside jokes—into glossy custom photo fridge magnets and pin button badges that stick around forever.
              </p>

              {/* Hero Action Buttons */}
              <div className="mt-7 flex flex-wrap items-center gap-4">
                <a
                  href="#try-it"
                  className="px-6 py-3.5 rounded-2xl bg-[#C9714F] hover:bg-[#B25B3A] text-[#FAF3EA] font-heading font-bold text-base border-2 border-[#5B3A29] shadow-sticker magnet-snap inline-flex items-center gap-2 whitespace-nowrap shrink-0"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Order Now · Try Live Preview</span>
                </a>

                <a
                  href="#products"
                  className="px-6 py-3.5 rounded-2xl bg-[#FAF3EA] hover:bg-[#F3E6D6] text-[#5B3A29] font-heading font-bold text-base border-2 border-[#5B3A29] shadow-sticker-sm magnet-snap inline-flex items-center gap-2 whitespace-nowrap shrink-0"
                >
                  <span>See Our Magnets</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              {/* Clean Unboxed Trust Proof Strip */}
              <div className="mt-9 pt-6 border-t border-[#5B3A29]/15 grid grid-cols-3 gap-4 max-w-lg">
                <div>
                  <p className="font-heading font-bold text-xl sm:text-2xl text-[#5B3A29] font-mono tabular-nums">
                    ₹{ badgePrice }+
                  </p>
                  <p className="text-xs text-[#7C5846] mt-0.5">
                    Pocket-Friendly [Placeholder]
                  </p>
                </div>
                <div>
                  <p className="font-heading font-bold text-xl sm:text-2xl text-[#5B3A29] font-mono tabular-nums">
                    24–48h
                  </p>
                  <p className="text-xs text-[#7C5846] mt-0.5">
                    Fast Custom Dispatch
                  </p>
                </div>
                <div>
                  <p className="font-heading font-bold text-xl sm:text-2xl text-[#5B3A29] font-mono tabular-nums">
                    100%
                  </p>
                  <p className="text-xs text-[#7C5846] mt-0.5">
                    Waterproof Glossy Print
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Fridge-Door Collage Mockup */}
            <div className="lg:col-span-6 flex">
              <div className="relative w-full rounded-3xl bg-gradient-to-br from-[#F3E6D6] via-[#EADAC5] to-[#DFC9AE] border-3 border-[#5B3A29] shadow-sticker p-5 sm:p-7 flex flex-col justify-between overflow-hidden min-h-[450px]">
                {/* Top Fridge Emblem & Metallic Letters */}
                <div className="flex items-center justify-between border-b-2 border-[#5B3A29]/15 pb-3.5">
                  <div className="flex items-center gap-2.5">
                    <TwoIdiotsLogo size="md" customLogoUrl={customLogoUrl} />
                    <div>
                      <p className="font-heading font-bold text-xs tracking-wider text-[#5B3A29]">
                        TWO IDIOTS STUDIO – Fridge Magnets
                      </p>
                      <p className="text-xs text-[#7C5846]">
                        {activeHeroNote}
                      </p>
                    </div>
                  </div>
                  <span className="hidden sm:inline-block font-mono text-xs font-bold text-[#5B3A29]/70 tabular-nums">
                    @twoidiotsstudio
                  </span>
                </div>

                {/* Chrome Retro Fridge Handle on Right Side */}
                <div
                  aria-hidden="true"
                  className="hidden sm:block absolute right-4 top-1/2 -translate-y-1/2 w-3.5 h-36 rounded-full bg-[#FAF3EA] border-2 border-[#5B3A29] shadow-sm"
                />

                {/* Interactive Collage of Magnets & Badges Sticking to the Fridge */}
                <div className="grid grid-cols-2 sm:grid-cols-12 gap-4 my-auto py-4 items-center">
                  {/* Magnet 1: Polaroid Couple Memory */}
                  <a
                    href="#try-it"
                    onClick={() =>
                      setActiveHeroNote(
                        'Snapped! Polaroid Magnet (3.5" × 2.75") — customize yours below!'
                      )
                    }
                    className="sm:col-span-5 bg-[#FAF3EA] p-2.5 pb-4 rounded-2xl border-2 border-[#5B3A29] shadow-magnet magnet-snap -rotate-2 block group"
                  >
                    <div className="aspect-square rounded-xl overflow-hidden border border-[#5B3A29]/20 bg-[#F3E6D6]">
                      <img
                        src={ASSETS.sampleCouple}
                        alt="Custom couple polaroid fridge magnet on fridge door"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                    <p className="font-heading font-bold text-xs text-center text-[#5B3A29] mt-2 truncate">
                      Hum &amp; Tum • ’26 ♥
                    </p>
                  </a>

                  {/* Magnet 2: Center Daisy Flower + Round Pin Badge Stack */}
                  <div className="sm:col-span-7 flex flex-col items-center sm:items-start gap-4">
                    <div className="flex items-center gap-3 w-full justify-center">
                      {/* Daisy Flower Magnet */}
                      <a
                        href="#try-it"
                        onClick={() =>
                          setActiveHeroNote(
                            'Snapped! Cute Die-Cut Daisy Flower Magnet — pick your petal color below!'
                          )
                        }
                        className="magnet-snap rotate-3 shrink-0"
                        title="Custom Daisy Flower Magnet"
                      >
                        <DaisyMagnetFrame
                          imageSrc={ASSETS.samplePet}
                          petalColor="#F4B6C2"
                          size={142}
                        />
                      </a>

                      {/* Round Glossy Pin Badge */}
                      <a
                        href="#try-it"
                        onClick={() =>
                          setActiveHeroNote(
                            'Snapped! 58mm Custom Pin Button Badge for totes & jackets!'
                          )
                        }
                        className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full border-2 border-[#5B3A29] shadow-magnet overflow-hidden magnet-snap -rotate-6 shrink-0 bg-[#FAF3EA]"
                        title="Custom Round Pin Badge"
                      >
                        <img
                          src={ASSETS.productCustomBadges}
                          alt="Custom glossy round pin button badge"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 rounded-full"
                          style={{
                            background:
                              'radial-gradient(circle at 30% 25%, rgba(255,255,255,0.5) 0%, transparent 55%, rgba(91,58,41,0.35) 100%)',
                          }}
                        />
                        <span className="absolute bottom-2 inset-x-3 bg-[#FAF3EA]/95 border border-[#5B3A29] rounded-md text-[10px] font-heading font-bold text-center text-[#5B3A29] py-0.5 truncate">
                          Pin Badge
                        </span>
                      </a>
                    </div>

                    {/* Wide Fridge Collage Strip Card */}
                    <a
                      href="#products"
                      className="w-full bg-[#FAF3EA] p-2.5 rounded-2xl border-2 border-[#5B3A29] shadow-sticker-sm magnet-snap flex items-center gap-3"
                    >
                      <img
                        src={ASSETS.productFridgeMagnets}
                        alt="Full fridge magnet collection"
                        referrerPolicy="no-referrer"
                        className="w-16 h-14 rounded-xl object-cover border border-[#5B3A29]/30 shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="font-heading font-bold text-xs sm:text-sm text-[#5B3A29] truncate">
                          Square, Polaroid &amp; Daisy Sets
                        </p>
                        <p className="text-xs text-[#7C5846] truncate">
                          Starting at ₹{magnetPrice} [Placeholder] · Tap to explore
                        </p>
                      </div>
                    </a>
                  </div>
                </div>

                {/* Fridge Door Footer Caption */}
                <div className="pt-3 border-t-2 border-[#5B3A29]/15 flex items-center justify-between text-xs text-[#5B3A29]/80">
                  <span>✨ Interactive Fridge Door Mockup</span>
                  <a
                    href="#try-it"
                    className="font-bold text-[#C9714F] hover:underline whitespace-nowrap"
                  >
                    Upload Your Own Photo ↓
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            3. WOW FEATURE: "TRY IT YOURSELF" LIVE CUSTOMIZER STUDIO
        ===================================================================== */}
        <TryItCustomStudio onOrderCustomDesign={handleOrderFromCustomStudio} />

        {/* =====================================================================
            4. PRODUCTS SECTION (3-Column Balanced Grid, 4:3 Studio Imagery)
        ===================================================================== */}
        <section
          id="products"
          aria-labelledby="products-heading"
          className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <p className="text-xs sm:text-sm font-bold tracking-wide text-[#C9714F] mb-2">
                Handcrafted Custom Goodies · Placeholder Prices Easy to Edit
              </p>
              <h2
                id="products-heading"
                className="text-3xl sm:text-4xl font-bold text-[#5B3A29]"
              >
                Pick Your Cute Keepsake
              </h2>
            </div>
            <p className="text-sm sm:text-base text-[#7C5846] max-w-md">
              Every piece is printed in HD color, sealed with a waterproof glossy film, and checked by hand before packing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product) => (
              <article
                key={product.id}
                className="bg-[#FAF3EA] border-2 border-[#5B3A29] rounded-3xl overflow-hidden shadow-sticker flex flex-col justify-between magnet-snap"
              >
                <div>
                  {/* 4:3 Product Image Container with Resilient Fallback */}
                  <div className="aspect-[4/3] w-full bg-[#F3E6D6] border-b-2 border-[#5B3A29] overflow-hidden relative">
                    <img
                      src={product.image}
                      alt={product.imageAlt}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    {/* Unboxed Category Kicker */}
                    <p className="text-xs font-bold text-[#7C5846] mb-1.5">
                      {product.category}
                    </p>

                    <h3 className="font-heading text-xl font-bold text-[#5B3A29]">
                      {product.name}
                    </h3>

                    {/* Tabular-nums Price Line */}
                    <div className="mt-2.5 flex items-baseline gap-2">
                      <span className="font-heading text-2xl font-bold text-[#C9714F] font-mono tabular-nums">
                        Starting from ₹{product.startingPrice}
                      </span>
                      <span className="text-xs text-[#7C5846]">
                        {product.unitNote}
                      </span>
                    </div>

                    <p className="mt-3 text-sm text-[#5B3A29]/90 leading-relaxed">
                      {product.description}
                    </p>

                    <p className="mt-4 pt-3 border-t border-[#5B3A29]/15 text-xs font-semibold text-[#7C5846]">
                      {product.specs}
                    </p>
                  </div>
                </div>

                {/* Contiguous Card Footer CTA */}
                <div className="px-6 pb-6 pt-1">
                  <button
                    type="button"
                    onClick={() =>
                      handleSelectProductToOrder(
                        product.name,
                        product.defaultShape === 'badge'
                          ? 'Round Pin Badge (58mm)'
                          : 'Rectangle Polaroid Magnet'
                      )
                    }
                    className="w-full py-3 px-4 rounded-xl bg-[#5B3A29] hover:bg-[#C9714F] text-[#FAF3EA] font-heading font-semibold text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
                  >
                    <MessageCircle className="w-4 h-4 shrink-0" />
                    <span>Order {product.name.split(' ')[1]} on WhatsApp</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* =====================================================================
            5. WHY CHOOSE US & 6. HOW TO ORDER (Combined Cohesive Narrative Section)
        ===================================================================== */}
        <section
          id="how-to-order"
          aria-labelledby="how-to-order-heading"
          className="py-16 md:py-24 bg-[#F3E6D6]/70 border-y-2 border-[#5B3A29]"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
            {/* Part A: Why Choose Two Idiots Studio (5 Artisanal Promises) */}
            <div>
              <div className="text-center max-w-2xl mx-auto mb-12">
                <p className="text-xs sm:text-sm font-bold text-[#C9714F] mb-2">
                  Small Business Love · Big Studio Quality
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold text-[#5B3A29]">
                  Why India’s Cute-Heads Love Us
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
                {[
                  {
                    icon: Heart,
                    title: 'Handmade with Love',
                    desc: 'Every photo is cropped, color-checked & pressed by hand in our studio.',
                    accent: 'bg-[#FCE8EC]',
                  },
                  {
                    icon: ShieldCheck,
                    title: 'Premium Gloss Finish',
                    desc: 'Waterproof, scratch-proof mylar coat that never fades in kitchen steam.',
                    accent: 'bg-[#E5ECE3]',
                  },
                  {
                    icon: Truck,
                    title: 'Fast 24–48hr Dispatch',
                    desc: 'Quick turnaround with tracked pan-India delivery to 28,000+ pin codes.',
                    accent: 'bg-[#FAF3EA]',
                  },
                  {
                    icon: Users,
                    title: 'Bulk & Event Orders',
                    desc: 'Special rates for weddings, return gifts, college fests & brand merch.',
                    accent: 'bg-[#FCE8EC]',
                  },
                  {
                    icon: Gift,
                    title: 'Cute Gift Packaging',
                    desc: 'Packed in aesthetic kraft boxes with crinkle paper & handwritten notes.',
                    accent: 'bg-[#E5ECE3]',
                  },
                ].map((feature) => {
                  const IconComponent = feature.icon;
                  return (
                    <div
                      key={feature.title}
                      className={`${feature.accent} border-2 border-[#5B3A29] rounded-2xl p-5 shadow-sticker-sm flex flex-col justify-between`}
                    >
                      <div>
                        <div className="w-10 h-10 rounded-xl bg-[#FAF3EA] border-2 border-[#5B3A29] flex items-center justify-center mb-3.5 text-[#C9714F]">
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <h3 className="font-heading font-bold text-base text-[#5B3A29]">
                          {feature.title}
                        </h3>
                        <p className="mt-1.5 text-xs sm:text-sm text-[#7C5846] leading-relaxed">
                          {feature.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Part B: How to Order in 4 Simple Steps */}
            <div>
              <div className="text-center max-w-2xl mx-auto mb-12">
                <p className="text-xs sm:text-sm font-bold text-[#C9714F] mb-2">
                  Zero Complicated Checkout · Direct Personal Service
                </p>
                <h2
                  id="how-to-order-heading"
                  className="text-3xl sm:text-4xl font-bold text-[#5B3A29]"
                >
                  How to Order in 4 Easy Steps
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    num: '01.',
                    title: 'Choose Your Product',
                    desc: 'Pick Square Magnets, Polaroids, Daisy Magnets, Pin Badges, or a Gift Hamper.',
                  },
                  {
                    num: '02.',
                    title: 'Send Photos on WhatsApp / DM',
                    desc: 'Use our quick order form below or DM us your favourite photos & captions.',
                  },
                  {
                    num: '03.',
                    title: 'Approve Digital Preview',
                    desc: 'We crop, brighten & share a digital layout preview for your thumbs-up.',
                  },
                  {
                    num: '04.',
                    title: 'Get It Delivered!',
                    desc: 'We craft, pack with cute stickers, and ship straight to your doorstep.',
                  },
                ].map((step) => (
                  <div
                    key={step.num}
                    className="bg-[#FAF3EA] border-2 border-[#5B3A29] rounded-2xl p-6 shadow-sticker-sm relative"
                  >
                    <span className="font-heading font-bold text-2xl text-[#C9714F] font-mono tabular-nums">
                      {step.num}
                    </span>
                    <h3 className="mt-2 font-heading font-bold text-lg text-[#5B3A29]">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm text-[#7C5846] leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            7. GALLERY (Product Photo / Reel Grid + Follow @twoidiotsstudio)
            & 8. CUSTOMER REVIEWS (Adjacent Proof)
        ===================================================================== */}
        <section
          id="gallery"
          aria-labelledby="gallery-heading"
          className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20"
        >
          {/* Gallery Header + Filter Tabs */}
          <div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div>
                <p className="text-xs sm:text-sm font-bold text-[#C9714F] mb-2">
                  Fresh Off Our Studio Press · @twoidiotsstudio
                </p>
                <h2
                  id="gallery-heading"
                  className="text-3xl sm:text-4xl font-bold text-[#5B3A29]"
                >
                  Spotted on Fridges &amp; Tote Bags Across India
                </h2>
              </div>

              {/* Interactive Segmented Filter Control */}
              <div
                role="tablist"
                aria-label="Filter gallery items"
                className="inline-flex items-center gap-1 p-1.5 bg-[#F3E6D6] border-2 border-[#5B3A29] rounded-2xl self-start"
              >
                {(['All', 'Magnets', 'Badges', 'Hampers'] as const).map((tab) => (
                  <button
                    key={tab}
                    role="tab"
                    aria-selected={galleryFilter === tab}
                    type="button"
                    onClick={() => setGalleryFilter(tab)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      galleryFilter === tab
                        ? 'bg-[#5B3A29] text-[#FAF3EA]'
                        : 'text-[#5B3A29] hover:bg-[#FAF3EA]'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* 3-Column Photo & Reel Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleGalleryItems.map((item) => (
                <article
                  key={item.id}
                  className="bg-[#FAF3EA] border-2 border-[#5B3A29] rounded-2xl overflow-hidden shadow-sticker-sm magnet-snap flex flex-col justify-between"
                >
                  <div className="aspect-[4/3] w-full bg-[#F3E6D6] border-b-2 border-[#5B3A29] overflow-hidden relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between text-xs text-[#7C5846] mb-1.5">
                      <span>{item.format}</span>
                      <span className="font-mono tabular-nums">
                        ♥ {item.likesCount}
                      </span>
                    </div>
                    <h3 className="font-heading font-bold text-base text-[#5B3A29]">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm text-[#7C5846]">
                      {item.caption}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            {/* Follow @twoidiotsstudio CTA */}
            <div className="mt-10 text-center">
              <a
                href={`https://instagram.com/${instagramHandle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-[#FAF3EA] hover:bg-[#FCE8EC] text-[#5B3A29] font-heading font-bold text-base border-2 border-[#5B3A29] shadow-sticker magnet-snap whitespace-nowrap"
              >
                <Instagram className="w-5 h-5 text-[#C9714F]" />
                <span>Follow @{instagramHandle} on Instagram</span>
                <ExternalLink className="w-4 h-4 opacity-70" />
              </a>
            </div>
          </div>

          {/* 8. REVIEWS: 4 Attributable Customer Testimonials */}
          <div id="reviews" className="pt-8 border-t-2 border-[#5B3A29]/15">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="text-xs sm:text-sm font-bold text-[#C9714F] mb-2">
                Happy Customers · Verified Unboxing Smiles [Placeholder Reviews]
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#5B3A29]">
                Loved by 1,500+ Indian Homes
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {TESTIMONIALS.map((review) => (
                <blockquote
                  key={review.id}
                  className="bg-[#F3E6D6]/60 border-2 border-[#5B3A29] rounded-2xl p-6 shadow-sticker-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-bold text-[#C9714F] mb-3">
                      <span>★★★★★ Verified Order</span>
                      <span className="text-[#7C5846]">{review.location}</span>
                    </div>
                    <p className="text-sm sm:text-base text-[#5B3A29] leading-relaxed">
                      &ldquo;{review.quote}&rdquo;
                    </p>
                  </div>

                  <footer className="mt-5 pt-4 border-t border-[#5B3A29]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                    <div>
                      <strong className="font-heading font-bold text-sm text-[#5B3A29]">
                        {review.name}
                      </strong>
                      <span aria-hidden="true" className="mx-1.5 text-[#7C5846]">
                        ·
                      </span>
                      <span className="text-[#7C5846]">{review.orderDetail}</span>
                    </div>
                    <span className="font-semibold text-[#5B3A29]/80">
                      {review.outcome}
                    </span>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================================
            9. CREATOR COLLAB SECTION
        ===================================================================== */}
        <section
          id="collab"
          aria-labelledby="collab-heading"
          className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
        >
          <div className="bg-[#F4B6C2] border-3 border-[#5B3A29] rounded-3xl p-7 sm:p-12 shadow-sticker grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <p className="text-xs sm:text-sm font-bold text-[#5B3A29] mb-2">
                Creator &amp; Micro-Influencer Barter Program · Open Across India
              </p>
              <h2
                id="collab-heading"
                className="text-2xl sm:text-4xl font-bold text-[#5B3A29] leading-tight"
              >
                Creators, we’re looking for you! You create a reel, we provide the product FREE. DM &lsquo;COLLAB&rsquo; now!
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#5B3A29]/90 max-w-2xl">
                Love filming cute aesthetics, room makeovers, gift unboxings, or couple/pet reels? We’ll ship you a custom magnet or badge set completely free in exchange for an honest Instagram Reel!
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
              <a
                href={`https://instagram.com/${instagramHandle}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  copyToClipboard('COLLAB', () => {
                    setCollabCopied(true);
                    setTimeout(() => setCollabCopied(false), 3000);
                  });
                }}
                className="py-3.5 px-6 rounded-2xl bg-[#5B3A29] hover:bg-[#C9714F] text-[#FAF3EA] font-heading font-bold text-base border-2 border-[#5B3A29] shadow-sticker-sm magnet-snap flex items-center justify-center gap-2 text-center whitespace-nowrap"
              >
                <Instagram className="w-5 h-5 shrink-0" />
                <span>DM &lsquo;COLLAB&rsquo; on Instagram</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  copyToClipboard(
                    `Hi @${instagramHandle}! 👋 COLLAB — I'd love to film an unboxing & fridge makeover reel for Two Idiots Studio!`,
                    () => {
                      setCollabCopied(true);
                      setTimeout(() => setCollabCopied(false), 3000);
                    }
                  );
                }}
                className="py-2.5 px-4 rounded-xl bg-[#FAF3EA] hover:bg-[#F3E6D6] text-[#5B3A29] font-heading font-semibold text-xs border-2 border-[#5B3A29] flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                {collabCopied ? (
                  <>
                    <Check className="w-4 h-4 text-[#8FA58B]" />
                    <span>Copied Collab Pitch to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Ready-to-Send DM Pitch</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* =====================================================================
            10. INTERACTIVE WHATSAPP ORDER FORM
        ===================================================================== */}
        <section
          id="order-form"
          aria-labelledby="order-form-heading"
          className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto"
        >
          <div className="bg-[#FAF3EA] border-3 border-[#5B3A29] rounded-3xl p-6 sm:p-10 shadow-sticker">
            <div className="text-center max-w-xl mx-auto mb-8">
              <p className="text-xs sm:text-sm font-bold text-[#C9714F] mb-1.5">
                Fastest Way to Order · Takes 30 Seconds
              </p>
              <h2
                id="order-form-heading"
                className="text-3xl sm:text-4xl font-bold text-[#5B3A29]"
              >
                Start Your Custom WhatsApp Order
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#7C5846]">
                Fill in your details below and select your photos—on submit, it opens a pre-filled WhatsApp message straight to our studio team!
              </p>
            </div>

            <form onSubmit={handleOrderFormSubmit} className="space-y-5" noValidate>
              {formError && (
                <div
                  role="alert"
                  className="p-3.5 rounded-xl bg-[#FCE8EC] border-2 border-[#C9714F] text-xs sm:text-sm font-bold text-[#5B3A29]"
                >
                  {formError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Customer Name */}
                <div>
                  <label
                    htmlFor="order-name"
                    className="block text-xs sm:text-sm font-bold text-[#5B3A29] mb-1.5"
                  >
                    Your Full Name *
                  </label>
                  <input
                    id="order-name"
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Riya Sharma"
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#5B3A29] bg-white text-sm font-semibold text-[#5B3A29] focus:outline-none focus:border-[#C9714F]"
                  />
                </div>

                {/* Customer Phone */}
                <div>
                  <label
                    htmlFor="order-phone"
                    className="block text-xs sm:text-sm font-bold text-[#5B3A29] mb-1.5"
                  >
                    WhatsApp / Phone Number *
                  </label>
                  <input
                    id="order-phone"
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#5B3A29] bg-white text-sm font-semibold text-[#5B3A29] font-mono tabular-nums focus:outline-none focus:border-[#C9714F]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {/* Product Dropdown */}
                <div className="sm:col-span-1">
                  <label
                    htmlFor="order-product"
                    className="block text-xs sm:text-sm font-bold text-[#5B3A29] mb-1.5"
                  >
                    Select Product *
                  </label>
                  <select
                    id="order-product"
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                    className="w-full px-3.5 py-3 rounded-xl border-2 border-[#5B3A29] bg-white text-sm font-semibold text-[#5B3A29] focus:outline-none focus:border-[#C9714F]"
                  >
                    <option value="Custom Photo Fridge Magnets">
                      Fridge Magnets (₹{magnetPrice}+)
                    </option>
                    <option value="Custom Photo & Art Pin Badges">
                      Custom Pin Badges (₹{badgePrice}+)
                    </option>
                    <option value="Gift Combos & Memory Hampers">
                      Gift Hamper Box (₹{hamperPrice}+)
                    </option>
                    <option value="Bulk / Event Return Gifts Enquiry">
                      Bulk / Wedding Order (20+ pcs)
                    </option>
                  </select>
                </div>

                {/* Shape / Style */}
                <div className="sm:col-span-1">
                  <label
                    htmlFor="order-shape"
                    className="block text-xs sm:text-sm font-bold text-[#5B3A29] mb-1.5"
                  >
                    Shape / Style Preference
                  </label>
                  <select
                    id="order-shape"
                    value={selectedShapeText}
                    onChange={(e) => setSelectedShapeText(e.target.value)}
                    className="w-full px-3.5 py-3 rounded-xl border-2 border-[#5B3A29] bg-white text-sm font-semibold text-[#5B3A29] focus:outline-none focus:border-[#C9714F]"
                  >
                    <option value="Rectangle Polaroid Magnet">
                      Rectangle Polaroid Magnet
                    </option>
                    <option value="Square Glossy Magnet">
                      Square Glossy Magnet
                    </option>
                    <option value="Daisy Flower Cut-Out Magnet">
                      Daisy Flower Magnet
                    </option>
                    <option value="Round Pin Badge (58mm)">
                      Round Pin Badge (58mm)
                    </option>
                    <option value="Mix of Shapes (Combo)">
                      Mix of Shapes (Combo)
                    </option>
                  </select>
                </div>

                {/* Quantity Stepper */}
                <div className="sm:col-span-1">
                  <label
                    htmlFor="order-qty"
                    className="block text-xs sm:text-sm font-bold text-[#5B3A29] mb-1.5"
                  >
                    Quantity (Pieces) *
                  </label>
                  <div className="flex items-center border-2 border-[#5B3A29] rounded-xl bg-white overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      aria-label="Decrease quantity"
                      className="px-3.5 py-2.5 font-bold text-base text-[#5B3A29] hover:bg-[#F3E6D6] cursor-pointer"
                    >
                      −
                    </button>
                    <input
                      id="order-qty"
                      type="number"
                      min="1"
                      max="500"
                      value={quantity}
                      onChange={(e) =>
                        setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))
                      }
                      className="w-full text-center font-mono font-bold text-sm text-[#5B3A29] tabular-nums focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => q + 1)}
                      aria-label="Increase quantity"
                      className="px-3.5 py-2.5 font-bold text-base text-[#5B3A29] hover:bg-[#F3E6D6] cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Photo Upload Preview Field */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-[#5B3A29] mb-1.5">
                  Attach Your Photos (Optional — Preview Before Sending on WhatsApp)
                </label>
                <div
                  onClick={() => orderFormFileRef.current?.click()}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      orderFormFileRef.current?.click();
                    }
                  }}
                  className="w-full rounded-2xl border-2 border-dashed border-[#5B3A29]/60 bg-[#F3E6D6]/50 hover:bg-[#F3E6D6] p-4 cursor-pointer transition-colors flex flex-col sm:flex-row items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#8FA58B] text-[#FAF3EA] border-2 border-[#5B3A29] flex items-center justify-center shrink-0">
                      <Upload className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-bold text-[#5B3A29]">
                        {orderPhotos.length > 0
                          ? `${orderPhotos.length} photo(s) ready for your order`
                          : 'Select Photos from Your Device'}
                      </p>
                      <p className="text-xs text-[#7C5846]">
                        We’ll include the photo filenames in your WhatsApp order message
                      </p>
                    </div>
                  </div>
                  <span className="px-3.5 py-1.5 rounded-xl bg-[#FAF3EA] border-2 border-[#5B3A29] text-xs font-bold text-[#5B3A29] whitespace-nowrap shrink-0">
                    Choose Files
                  </span>
                  <input
                    ref={orderFormFileRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleOrderPhotoFiles}
                    className="hidden"
                  />
                </div>

                {/* Selected Photo Thumbnails */}
                {orderPhotos.length > 0 && (
                  <div className="mt-3 flex flex-wrap items-center gap-2.5">
                    {orderPhotos.map((photo, idx) => (
                      <div
                        key={`${photo.name}-${idx}`}
                        className="flex items-center gap-2 bg-white border-2 border-[#5B3A29] rounded-xl p-1.5 pr-2.5"
                      >
                        <img
                          src={photo.previewUrl}
                          alt={photo.name}
                          referrerPolicy="no-referrer"
                          className="w-9 h-9 rounded-lg object-cover border border-[#5B3A29]/30"
                        />
                        <span className="text-xs font-semibold text-[#5B3A29] max-w-[120px] truncate">
                          {photo.name}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            setOrderPhotos((prev) =>
                              prev.filter((_, i) => i !== idx)
                            )
                          }
                          aria-label={`Remove ${photo.name}`}
                          className="text-xs font-bold text-[#C9714F] hover:text-[#5B3A29] cursor-pointer ml-1"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Custom Message / Notes */}
              <div>
                <label
                  htmlFor="order-notes"
                  className="block text-xs sm:text-sm font-bold text-[#5B3A29] mb-1.5"
                >
                  Custom Captions, Dates, or Gift Note Instructions
                </label>
                <textarea
                  id="order-notes"
                  rows={3}
                  value={orderMessage}
                  onChange={(e) => setOrderMessage(e.target.value)}
                  placeholder="Tell us if you want custom Polaroid text, a handwritten gift card note, or urgent delivery..."
                  className="w-full px-4 py-3 rounded-xl border-2 border-[#5B3A29] bg-white text-sm font-semibold text-[#5B3A29] focus:outline-none focus:border-[#C9714F]"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-2xl bg-[#C9714F] hover:bg-[#B25B3A] text-[#FAF3EA] font-heading font-bold text-base sm:text-lg border-2 border-[#5B3A29] shadow-sticker magnet-snap flex items-center justify-center gap-2.5 cursor-pointer whitespace-nowrap"
              >
                <MessageCircle className="w-5 h-5 shrink-0" />
                <span>Generate Pre-Filled WhatsApp Order</span>
              </button>
            </form>
          </div>
        </section>

        {/* =====================================================================
            11. FAQ ACCORDION SECTION
        ===================================================================== */}
        <section
          id="faq"
          aria-labelledby="faq-heading"
          className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <p className="text-xs sm:text-sm font-bold text-[#C9714F] mb-2">
              Got Questions? · Everything You Need to Know
            </p>
            <h2
              id="faq-heading"
              className="text-3xl sm:text-4xl font-bold text-[#5B3A29]"
            >
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3.5">
            {FAQ_ITEMS.map((item) => {
              const isOpen = openFaqId === item.id;
              return (
                <div
                  key={item.id}
                  className="bg-[#FAF3EA] border-2 border-[#5B3A29] rounded-2xl overflow-hidden shadow-sticker-sm"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqId(isOpen ? '' : item.id)}
                    aria-expanded={isOpen}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-heading font-bold text-base sm:text-lg text-[#5B3A29] hover:bg-[#F3E6D6]/50 transition-colors cursor-pointer"
                  >
                    <span>{item.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#C9714F] shrink-0 transition-transform duration-150 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-sm sm:text-base text-[#7C5846] leading-relaxed border-t border-[#5B3A29]/10">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* =====================================================================
          12. FOOTER
      ===================================================================== */}
      <footer
        id="contact"
        className="bg-[#F3E6D6] border-t-3 border-[#5B3A29] pt-14 pb-10 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-[#5B3A29]/20">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-3">
              <TwoIdiotsLogo size="md" customLogoUrl={customLogoUrl} />
              <div>
                <p className="font-heading font-bold text-xl text-[#5B3A29]">
                  Two Idiots Studio
                </p>
                <p className="text-xs font-bold text-[#C9714F]">
                  Gifts · Memories · Moments
                </p>
              </div>
            </div>
            <p className="text-sm text-[#7C5846] max-w-sm leading-relaxed">
              Your memories, but make them CUTE! Small Indian creative studio crafting custom photo fridge magnets, polaroid frames, daisy magnets &amp; pin button badges.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-2">
            <p className="font-heading font-bold text-base text-[#5B3A29] mb-2">
              Quick Explore
            </p>
            <ul className="space-y-1.5 text-sm font-semibold text-[#7C5846]">
              <li>
                <a href="#try-it" className="hover:text-[#C9714F]">
                  Try Live Magnet Studio
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-[#C9714F]">
                  Custom Magnets &amp; Badges
                </a>
              </li>
              <li>
                <a href="#how-to-order" className="hover:text-[#C9714F]">
                  How to Order
                </a>
              </li>
              <li>
                <a href="#collab" className="hover:text-[#C9714F]">
                  Creator Free Barter Collab
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#C9714F]">
                  Shipping &amp; FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Placeholders */}
          <div className="md:col-span-4 space-y-2.5">
            <p className="font-heading font-bold text-base text-[#5B3A29] mb-2">
              Say Hello / Order Direct
            </p>
            <a
              href={buildWhatsAppLink(
                'Hi Two Idiots Studio! I have a question about custom magnets.'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 text-sm font-semibold text-[#5B3A29] hover:text-[#C9714F]"
            >
              <Phone className="w-4 h-4 text-[#C9714F] shrink-0" />
              <span className="font-mono tabular-nums">
                WhatsApp: {whatsappNumber}
              </span>
            </a>
            <a
              href={`https://instagram.com/${instagramHandle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 text-sm font-semibold text-[#5B3A29] hover:text-[#C9714F]"
            >
              <Instagram className="w-4 h-4 text-[#C9714F] shrink-0" />
              <span>Instagram: @{instagramHandle}</span>
            </a>
            <a
              href={`mailto:${studioEmail}`}
              className="flex items-center gap-2.5 text-sm font-semibold text-[#5B3A29] hover:text-[#C9714F]"
            >
              <Mail className="w-4 h-4 text-[#C9714F] shrink-0" />
              <span>Email: {studioEmail}</span>
            </a>
          </div>
        </div>

        {/* Bottom Copyright & Made With Love */}
        <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-semibold text-[#7C5846]">
          <p>Made with ❤️ by Two Idiots Studio</p>
          <p>
            © {new Date().getFullYear()} Two Idiots Studio · Shipping Across India
          </p>
        </div>
      </footer>

      {/* =====================================================================
          FLOATING WHATSAPP CTA BUTTON (Compact, Mobile-Friendly)
      ===================================================================== */}
      <a
        href={buildWhatsAppLink(
          'Hi Two Idiots Studio! 👋 I want to order custom fridge magnets / badges!'
        )}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Two Idiots Studio on WhatsApp"
        className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 px-4 py-3 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white font-heading font-bold text-sm border-2 border-[#5B3A29] shadow-sticker magnet-snap whitespace-nowrap"
      >
        <MessageCircle className="w-5 h-5 fill-current shrink-0" />
        <span className="hidden sm:inline">Chat on WhatsApp</span>
      </a>

      {/* =====================================================================
          PRE-FILLED WHATSAPP ORDER CONFIRMATION MODAL
          (Ensures 100% reliable ordering in both mobile browsers & iframes)
      ===================================================================== */}
      {whatsAppModalData?.isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="wa-modal-title"
          className="fixed inset-0 z-50 bg-[#5B3A29]/60 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div className="bg-[#FAF3EA] border-3 border-[#5B3A29] rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-sticker space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold text-[#C9714F]">
                  Your Custom Order Summary is Ready!
                </p>
                <h3
                  id="wa-modal-title"
                  className="font-heading font-bold text-xl sm:text-2xl text-[#5B3A29]"
                >
                  Send to Two Idiots Studio on WhatsApp
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setWhatsAppModalData(null)}
                aria-label="Close modal"
                className="p-1.5 rounded-xl border-2 border-[#5B3A29] bg-[#F3E6D6] text-[#5B3A29] font-bold cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-white border-2 border-[#5B3A29]/30 rounded-2xl p-4">
              <p className="text-xs font-bold text-[#7C5846] mb-1.5">
                Pre-filled WhatsApp Message Preview:
              </p>
              <pre className="text-xs sm:text-sm font-sans text-[#5B3A29] whitespace-pre-wrap leading-relaxed">
                {whatsAppModalData.messageText}
              </pre>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <a
                href={whatsAppModalData.waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3.5 px-5 rounded-2xl bg-[#25D366] hover:bg-[#20BD5A] text-white font-heading font-bold text-sm sm:text-base border-2 border-[#5B3A29] shadow-sticker-sm flex items-center justify-center gap-2 text-center whitespace-nowrap"
              >
                <MessageCircle className="w-5 h-5 shrink-0" />
                <span>Open WhatsApp &amp; Send</span>
                <ExternalLink className="w-4 h-4 shrink-0" />
              </a>

              <button
                type="button"
                onClick={() =>
                  copyToClipboard(whatsAppModalData.messageText, () =>
                    setWhatsAppModalData((prev) =>
                      prev ? { ...prev, copied: true } : null
                    )
                  )
                }
                className="py-3.5 px-4 rounded-2xl bg-[#F3E6D6] hover:bg-[#EADAC5] text-[#5B3A29] font-heading font-bold text-sm border-2 border-[#5B3A29] flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                {whatsAppModalData.copied ? (
                  <>
                    <Check className="w-4 h-4 text-[#8FA58B]" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Message</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
