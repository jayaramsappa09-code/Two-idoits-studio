/**
 * Generates and downloads a 100% standalone, single-file HTML version
 * (HTML + CSS + Vanilla JS, zero external framework dependencies)
 * so the presenter can deploy directly to Netlify Drop or GitHub Pages.
 */
export function downloadStandaloneHtmlFile(config: {
  presenterName: string;
  presenterContact: string;
  whatsappNumber: string;
  email: string;
  instagramHandle: string;
  magnetPrice: number;
  badgePrice: number;
  hamperPrice: number;
}) {
  const cleanPhone = config.whatsappNumber.replace(/[^0-9]/g, '') || '919876543210';

  const htmlContent = `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Custom Fridge Magnets & Photo Badges | Two Idiots Studio</title>
  <meta name="description" content="Your memories, but make them CUTE! Order handcrafted custom photo fridge magnets, polaroid frames, daisy magnets, and pin badges from Two Idiots Studio." />
  <meta property="og:title" content="Custom Fridge Magnets & Photo Badges | Two Idiots Studio" />
  <meta property="og:description" content="Fridge khaali-khaali lagta hai? Turn your favorite photos into cute custom fridge magnets & pin badges. Try our live magnet previewer!" />
  <meta property="og:type" content="website" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=JetBrains+Mono:wght@500;600&family=Nunito:wght@400;600;700&display=swap" rel="stylesheet" />
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Two Idiots Studio",
    "description": "Custom photo fridge magnets and custom pin button badges handcrafted in India.",
    "slogan": "Your memories, but make them CUTE!",
    "url": "https://instagram.com/${config.instagramHandle}",
    "telephone": "${config.whatsappNumber}",
    "email": "${config.email}",
    "priceRange": "₹${config.badgePrice} - ₹${config.hamperPrice}",
    "address": { "@type": "PostalAddress", "addressCountry": "IN" }
  }
  </script>
  <style>
    :root {
      --cream: #FAF3EA;
      --cream-deep: #F3E6D6;
      --brown: #5B3A29;
      --brown-muted: #7C5846;
      --terracotta: #C9714F;
      --sage: #8FA58B;
      --pink: #F4B6C2;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; font-family: 'Nunito', sans-serif; background: var(--cream); color: var(--brown); line-height: 1.6; }
    h1, h2, h3, h4 { font-family: 'Fredoka', sans-serif; line-height: 1.2; text-wrap: balance; }
    .container { max-width: 1200px; margin: 0 auto; padding: 0 1.25rem; }
    .demo-banner { background: var(--brown); color: var(--cream); font-size: 0.85rem; padding: 0.55rem 1rem; display: flex; justify-content: space-between; align-items: center; }
    header { position: sticky; top: 0; z-index: 40; background: rgba(250, 243, 234, 0.95); backdrop-filter: blur(8px); border-bottom: 2px solid var(--brown); }
    .nav-bar { display: flex; align-items: center; justify-content: space-between; gap: 2rem; height: 4.5rem; }
    .nav-links { display: flex; gap: 1.5rem; list-style: none; }
    .nav-links a { color: var(--brown); text-decoration: none; font-weight: 700; font-size: 0.95rem; white-space: nowrap; }
    .nav-links a:hover { color: var(--terracotta); text-decoration: underline; }
    .btn { display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; padding: 0.7rem 1.35rem; border-radius: 1rem; font-family: 'Fredoka', sans-serif; font-weight: 600; text-decoration: none; border: 2px solid var(--brown); box-shadow: 0 3px 0 var(--brown); cursor: pointer; transition: transform 160ms cubic-bezier(0.16, 1, 0.3, 1); white-space: nowrap; }
    .btn:hover { transform: translateY(-2px); }
    .btn-primary { background: var(--terracotta); color: var(--cream); }
    .btn-secondary { background: var(--cream); color: var(--brown); }
    section { padding: 4.5rem 0; }
    .grid-2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(310px, 1fr)); gap: 2.5rem; align-items: center; }
    .grid-3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(290px, 1fr)); gap: 2rem; }
    .card { background: #fff; border: 2px solid var(--brown); border-radius: 1.5rem; padding: 1.5rem; box-shadow: 0 4px 0 var(--brown); }
    .fridge-stage { background: linear-gradient(135deg, #FAF3EA, #E9D7C0); border: 2px solid var(--brown); border-radius: 1.5rem; min-height: 380px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 2rem; position: relative; }
    .preview-frame { width: 220px; height: 220px; background: #fff; border: 3px solid var(--brown); box-shadow: 0 6px 0 var(--brown); overflow: hidden; display: flex; flex-direction: column; align-items: center; justify-content: center; transition: all 180ms ease; }
    .preview-frame img { width: 100%; height: 100%; object-fit: cover; }
    .shape-polaroid { height: 255px; padding: 10px 10px 36px 10px; border-radius: 14px; }
    .shape-square { border-radius: 16px; padding: 8px; }
    .shape-badge { border-radius: 50%; }
    .shape-daisy { border-radius: 35% 65% 60% 40% / 40% 45% 55% 60%; border-color: var(--pink); border-width: 10px; outline: 3px solid var(--brown); }
    input, select, textarea { width: 100%; padding: 0.75rem; border: 2px solid var(--brown); border-radius: 0.75rem; font-family: inherit; margin-top: 0.35rem; margin-bottom: 1rem; background: #fff; }
    .floating-wa { position: fixed; bottom: 1.25rem; right: 1.25rem; z-index: 50; background: #25D366; color: #fff; border: 2px solid var(--brown); box-shadow: 0 4px 0 var(--brown); padding: 0.75rem 1.1rem; border-radius: 999px; font-weight: 700; text-decoration: none; }
    @media (max-width: 768px) { .nav-links { display: none; } }
  </style>
</head>
<body>
  <div class="demo-banner" id="demoBanner">
    <span>Website concept by ${config.presenterName} • ${config.presenterContact}</span>
    <button onclick="document.getElementById('demoBanner').remove()" style="background:none;border:none;color:inherit;cursor:pointer;font-weight:700;">Dismiss ✕</button>
  </div>
  <header>
    <div class="container nav-bar">
      <a href="#" style="font-family:'Fredoka',sans-serif;font-size:1.35rem;font-weight:700;color:var(--brown);text-decoration:none;">Two Idiots Studio</a>
      <ul class="nav-links">
        <li><a href="#try-it">Try Studio</a></li>
        <li><a href="#products">Products</a></li>
        <li><a href="#how-to-order">How to Order</a></li>
        <li><a href="#collab">Collab</a></li>
        <li><a href="#faq">FAQ</a></li>
      </ul>
      <a class="btn btn-primary" href="https://wa.me/${cleanPhone}?text=Hi%20Two%20Idiots%20Studio!%20I%20want%20to%20order%20custom%20magnets" target="_blank" rel="noopener">Order on WhatsApp</a>
    </div>
  </header>
  <main class="container">
    <section class="grid-2">
      <div>
        <p style="font-weight:700;color:var(--terracotta);margin-bottom:0.5rem;">Gifts · Memories · Moments</p>
        <h1 style="font-size:clamp(2.25rem, 4vw, 3.5rem);margin-bottom:1rem;">Your memories, but make them CUTE!</h1>
        <p style="font-size:1.1rem;color:var(--brown-muted);margin-bottom:1.5rem;">Fridge khaali-khaali lagta hai? Toh phir fatafat order karo! Handcrafted custom photo fridge magnets & pin button badges shipped across India.</p>
        <div style="display:flex;gap:1rem;flex-wrap:wrap;">
          <a href="#order-form" class="btn btn-primary">Order Now</a>
          <a href="#products" class="btn btn-secondary">See Our Magnets</a>
        </div>
      </div>
      <div class="fridge-stage">
        <p style="font-weight:700;margin-bottom:1rem;">TWO IDIOTS STUDIO – Fridge Magnets</p>
        <div class="preview-frame shape-polaroid" id="previewBox">
          <img id="previewImg" src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80" alt="Sample Memory" />
        </div>
        <p id="previewCaption" style="margin-top:0.75rem;font-weight:700;">Best Days Forever ✨</p>
      </div>
    </section>

    <section id="try-it">
      <h2 style="text-align:center;font-size:2.2rem;margin-bottom:2rem;">Try It Yourself: Upload Your Photo!</h2>
      <div class="card grid-2">
        <div>
          <label><strong>1. Upload Photo:</strong></label>
          <input type="file" accept="image/*" onchange="if(this.files[0]){const r=new FileReader();r.onload=e=>document.getElementById('previewImg').src=e.target.result;r.readAsDataURL(this.files[0]);}" />
          <label><strong>2. Pick Shape:</strong></label>
          <select id="shapeSelect" onchange="const b=document.getElementById('previewBox');b.className='preview-frame shape-'+this.value;">
            <option value="polaroid">Rectangle Polaroid Magnet (₹119)</option>
            <option value="square">Square Photo Magnet (₹99)</option>
            <option value="daisy">Daisy Flower Magnet (₹129)</option>
            <option value="badge">Round Pin Badge (₹49)</option>
          </select>
          <label><strong>3. Custom Caption:</strong></label>
          <input type="text" value="Best Days Forever ✨" oninput="document.getElementById('previewCaption').textContent=this.value" />
          <a class="btn btn-primary" style="width:100%" href="#order-form">Order This Design on WhatsApp</a>
        </div>
        <div style="text-align:center;">
          <p style="color:var(--brown-muted);">Your uploaded photo updates live in the fridge preview box above!</p>
        </div>
      </div>
    </section>

    <section id="products">
      <h2 style="text-align:center;font-size:2.2rem;margin-bottom:2rem;">Our Cute Custom Creations</h2>
      <div class="grid-3">
        <div class="card">
          <h3>Custom Photo Fridge Magnets</h3>
          <p style="color:var(--terracotta);font-weight:700;margin:0.5rem 0;">Starting from ₹${config.magnetPrice} [Placeholder]</p>
          <p>Square, Polaroid & Daisy shapes with waterproof HD glossy finish and strong magnetic grip.</p>
        </div>
        <div class="card">
          <h3>Custom Pin Badges</h3>
          <p style="color:var(--terracotta);font-weight:700;margin:0.5rem 0;">Starting from ₹${config.badgePrice} [Placeholder]</p>
          <p>58mm glossy pin-back button badges for tote bags, denim jackets, weddings & college fests.</p>
        </div>
        <div class="card">
          <h3>Gift Combos & Hampers</h3>
          <p style="color:var(--terracotta);font-weight:700;margin:0.5rem 0;">Starting from ₹${config.hamperPrice} [Placeholder]</p>
          <p>Curated kraft gift box with 4 photo magnets, 3 badges, mini polaroids & handwritten note.</p>
        </div>
      </div>
    </section>

    <section id="collab" class="card" style="background:var(--pink);text-align:center;margin:2rem 0;">
      <h2>Creators, we're looking for you!</h2>
      <p style="margin:0.75rem 0 1.25rem;">You create a reel, we provide the product FREE. DM 'COLLAB' now!</p>
      <a class="btn btn-primary" href="https://instagram.com/${config.instagramHandle}" target="_blank" rel="noopener">DM 'COLLAB' on Instagram @${config.instagramHandle}</a>
    </section>

    <section id="order-form">
      <h2 style="text-align:center;font-size:2.2rem;margin-bottom:2rem;">Quick WhatsApp Order Form</h2>
      <form class="card" style="max-width:620px;margin:0 auto;" onsubmit="event.preventDefault();const n=this.custName.value;const p=this.prod.value;const q=this.qty.value;const m=this.msg.value;window.open('https://wa.me/${cleanPhone}?text='+encodeURIComponent('Hi Two Idiots Studio! Name: '+n+' | Product: '+p+' | Qty: '+q+' | Note: '+m),'_blank');">
        <label>Your Name *</label><input name="custName" required placeholder="e.g. Riya Sharma" />
        <label>Phone Number *</label><input name="phone" required placeholder="+91 98765 43210" />
        <label>Select Product *</label>
        <select name="prod">
          <option>Custom Photo Fridge Magnets (from ₹${config.magnetPrice})</option>
          <option>Custom Pin Badges (from ₹${config.badgePrice})</option>
          <option>Gift Combo / Hamper (from ₹${config.hamperPrice})</option>
        </select>
        <label>Quantity *</label><input name="qty" type="number" min="1" value="4" required />
        <label>Custom Message / Instructions</label><textarea name="msg" rows="3" placeholder="Tell us your caption or date..."></textarea>
        <button type="submit" class="btn btn-primary" style="width:100%;">Send Order on WhatsApp</button>
      </form>
    </section>
  </main>
  <footer style="border-top:2px solid var(--brown);padding:3rem 0;text-align:center;margin-top:3rem;">
    <p><strong>Two Idiots Studio</strong> · Instagram: @${config.instagramHandle} · Email: ${config.email}</p>
    <p style="margin-top:0.5rem;">Made with ❤️ by Two Idiots Studio</p>
  </footer>
  <a class="floating-wa" href="https://wa.me/${cleanPhone}" target="_blank" rel="noopener">💬 WhatsApp Us</a>
</body>
</html>`;

  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'two-idiots-studio-single-file-demo.html';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
