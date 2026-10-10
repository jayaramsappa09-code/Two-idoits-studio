import productFridgeMagnetsImg from '../assets/images/product_fridge_magnets_1791600052313.jpg';
import productCustomBadgesImg from '../assets/images/product_custom_badges_1791600069187.jpg';
import productGiftHamperImg from '../assets/images/product_gift_hamper_1791600082465.jpg';
import sampleCoupleImg from '../assets/images/sample_couple_memory_1791600093926.jpg';
import samplePetImg from '../assets/images/sample_pet_golden_1791600106300.jpg';

export const ASSETS = {
  productFridgeMagnets: productFridgeMagnetsImg,
  productCustomBadges: productCustomBadgesImg,
  productGiftHamper: productGiftHamperImg,
  sampleCouple: sampleCoupleImg,
  samplePet: samplePetImg,
};

export type MagnetShape = 'square' | 'polaroid' | 'daisy' | 'badge';

export interface SamplePhotoPreset {
  id: string;
  label: string;
  captionDefault: string;
  src: string;
  alt: string;
}

export const SAMPLE_PHOTO_PRESETS: SamplePhotoPreset[] = [
  {
    id: 'couple',
    label: 'Diwali / Couple Memory',
    captionDefault: 'Hum & Tum • Forever ♥',
    src: sampleCoupleImg,
    alt: 'Joyful Indian couple smiling together under warm golden fairy lights',
  },
  {
    id: 'pet',
    label: 'Best Boy Bruno',
    captionDefault: 'CEO of Treats 🐾',
    src: samplePetImg,
    alt: 'Adorable golden retriever puppy tilting its head in warm sunlight',
  },
  {
    id: 'fridge-squad',
    label: 'Summer Vacation',
    captionDefault: 'Goa Trip ’26 🌴',
    src: productFridgeMagnetsImg,
    alt: 'Collection of colorful summer vacation photo magnets on a retro fridge',
  },
];

export interface ProductItem {
  id: string;
  category: string;
  name: string;
  startingPrice: number; // Easy to replace placeholder price in INR
  unitNote: string;
  description: string;
  specs: string;
  image: string;
  imageAlt: string;
  defaultShape: MagnetShape;
}

export const INITIAL_PRODUCTS: ProductItem[] = [
  {
    id: 'photo-fridge-magnets',
    category: 'Bestseller · Waterproof Glossy Finish',
    name: 'Custom Photo Fridge Magnets',
    startingPrice: 99,
    unitNote: 'per magnet · Set of 4 at ₹349 [Placeholder]',
    description:
      'Turn camera-roll favourites into high-grip, fade-proof fridge magnets. Choose from classic square, retro Polaroid with custom text, or cute die-cut daisy flower frames.',
    specs: 'HD Glossy Lamination · 1.5mm Full Magnetic Back · Scratch Resistant',
    image: productFridgeMagnetsImg,
    imageAlt:
      'Custom glossy photo fridge magnets in square, polaroid, and daisy flower shapes on a cream fridge door',
    defaultShape: 'polaroid',
  },
  {
    id: 'custom-pin-badges',
    category: 'Tote & Jacket Essential · 44mm & 58mm',
    name: 'Custom Photo & Art Pin Badges',
    startingPrice: 49,
    unitNote: 'per badge · Pack of 5 at ₹199 [Placeholder]',
    description:
      'Glossy mylar-sealed button badges with sturdy metal safety pins. Send us your pet’s face, inside jokes, concert memories, or bridesmaid squad logos!',
    specs: '58mm Standard Size · Rust-Free Metal Pin Back · Weatherproof',
    image: productCustomBadgesImg,
    imageAlt:
      'Round glossy custom photo pin-back button badges pinned onto a natural cotton canvas tote bag',
    defaultShape: 'badge',
  },
  {
    id: 'gift-combos-hampers',
    category: 'Gift Ready · Free Handwritten Note',
    name: 'Gift Combos & Memory Hampers',
    startingPrice: 499,
    unitNote: 'complete box · Free Note Card [Placeholder]',
    description:
      'The ultimate "aww"-worthy gift box! Packed in aesthetic kraft crinkle packaging with 4 custom photo magnets, 3 pin badges, mini Polaroid keepsakes, and your custom note.',
    specs: '4 Magnets + 3 Badges · Keepsake Kraft Box · Pan-India Gift Shipping',
    image: productGiftHamperImg,
    imageAlt:
      'Curated kraft gift hamper box filled with custom photo magnets, pin badges, polaroid prints, and twine-wrapped note card',
    defaultShape: 'square',
  },
];

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Magnets' | 'Badges' | 'Hampers';
  format: string;
  caption: string;
  image: string;
  likesCount: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Retro Polaroid Fridge Makeover',
    category: 'Magnets',
    format: 'Reel Highlight · 24.8k views',
    caption: 'Jab fridge dikhe itna cute, toh kitchen se bahar aane ka mann hi na kare! ✨',
    image: productFridgeMagnetsImg,
    likesCount: '1,840',
  },
  {
    id: 'gal-2',
    title: 'Tote Bag Custom Pin Collection',
    category: 'Badges',
    format: 'Customer Order · Bengaluru',
    caption: 'Custom pet portraits + bookish pins for @kritika’s everyday college tote.',
    image: productCustomBadgesImg,
    likesCount: '962',
  },
  {
    id: 'gal-3',
    title: 'Anniversary Memory Hamper Box',
    category: 'Hampers',
    format: 'Reel Highlight · 18.2k views',
    caption: 'Packed with 5 years of memories, crinkle paper & a handwritten love note.',
    image: productGiftHamperImg,
    likesCount: '2,310',
  },
  {
    id: 'gal-4',
    title: 'Golden Hour Couple Magnet Set',
    category: 'Magnets',
    format: 'Customer Order · Mumbai',
    caption: 'Roka & festive snaps turned into 3x3 glossy square magnets!',
    image: sampleCoupleImg,
    likesCount: '1,420',
  },
  {
    id: 'gal-5',
    title: 'Pet Parent Badge & Magnet Combo',
    category: 'Badges',
    format: 'Customer Order · Delhi NCR',
    caption: 'Bruno’s face is now officially on the fridge AND the dog-walk fanny pack.',
    image: samplePetImg,
    likesCount: '2,105',
  },
  {
    id: 'gal-6',
    title: 'Bridesmaid Return Gift Boxes (Set of 25)',
    category: 'Hampers',
    format: 'Bulk Order · Jaipur Wedding',
    caption: 'Custom squad badges + couple polaroid magnets for a dreamy Jaipur wedding.',
    image: productGiftHamperImg,
    likesCount: '3,090',
  },
];

export interface TestimonialItem {
  id: string;
  name: string;
  location: string;
  orderDetail: string;
  quote: string;
  outcome: string;
}

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'rev-1',
    name: 'Ananya Verma',
    location: 'Mumbai, Maharashtra',
    orderDetail: 'Ordered Set of 8 Polaroid & Daisy Magnets',
    quote:
      'Honestly expected thin paper magnets, but these are thick, super glossy, and snap onto our fridge with a proper thud! Even my dark concert photos came out bright and sharp.',
    outcome: 'Re-ordered 2 gift hampers for her parents’ 25th anniversary',
  },
  {
    id: 'rev-2',
    name: 'Rohan & Meera Nair',
    location: 'Bengaluru, Karnataka',
    orderDetail: 'Ordered 45 Custom Badges for Haldi & Mehendi',
    quote:
      'We needed custom #RoMeKiShaadi pin badges on short notice. Two Idiots Studio shared the digital mockup on WhatsApp within 2 hours and delivered to Bengaluru in 4 days flat!',
    outcome: '45 guests wore the badges across all 3 wedding functions',
  },
  {
    id: 'rev-3',
    name: 'Sneha Kulkarni',
    location: 'Pune, Maharashtra',
    orderDetail: 'Ordered Custom Memory Gift Hamper',
    quote:
      'Sent this straight to my long-distance best friend on her birthday. The kraft box, dried flowers, and handwritten card made her cry happy tears on video call. 10/10 packaging!',
    outcome: 'Delivered with zero transit dents in 3 business days',
  },
  {
    id: 'rev-4',
    name: 'Kabir Malhotra',
    location: 'Gurugram, Haryana',
    orderDetail: 'Ordered 6 Pet Portrait Magnets & Tote Pins',
    quote:
      'Uploaded random phone clicks of our Indie dog Momo and they cropped and color-corrected every single one before printing. Hamara fridge ab poora Momo shrine ban gaya hai!',
    outcome: 'Waterproof finish survived 6 months of kitchen steam with zero fading',
  },
];

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'How long does making & delivery take across India?',
    answer:
      'Since every magnet and badge is custom-made for you, we craft and dispatch orders within 24–48 hours after you approve the preview on WhatsApp. Standard shipping takes 3–5 business days across metro cities and 5–7 days for rest of India.',
  },
  {
    id: 'faq-2',
    question: 'Do you take bulk orders for weddings, college fests, or corporate gifting?',
    answer:
      'Bilkul! We love bulk orders for wedding return favours, bridesmaid hampers, college fests, and small-business merch. Special tiered discounts start from 20+ pieces—just select "Bulk / Event Enquiry" in the order form below.',
  },
  {
    id: 'faq-3',
    question: 'What kind of photos work best? Will WhatsApp photos lose quality?',
    answer:
      'Regular smartphone photos work great! Even if you send photos normally on WhatsApp, we perform a brightness and sharpness check before printing. Just avoid blurry screenshots or very dark zoomed-in crops.',
  },
  {
    id: 'faq-4',
    question: 'Do you ship pan-India and what are the shipping charges?',
    answer:
      'Yes, we ship to 28,000+ pin codes across India via trusted courier partners with live tracking. Flat shipping is ₹59 [Placeholder], and shipping is FREE on all prepaid orders above ₹599 [Placeholder]!',
  },
  {
    id: 'faq-5',
    question: 'What payment methods do you accept?',
    answer:
      'We accept UPI (GPay, PhonePe, Paytm), Bank Transfer, and all Debit/Credit cards via our secure WhatsApp payment link. Since every item is personalized with your photos, orders are confirmed on prepaid basis.',
  },
  {
    id: 'faq-6',
    question: 'What is your replacement policy if an item arrives damaged?',
    answer:
      'We pack every order in bubble-wrapped rigid boxes. However, in the rare case your magnet or badge arrives damaged in transit, simply share a 30-second unboxing video within 24 hours of delivery and we will ship a free replacement—no stress!',
  },
];
