/* ============================
   MAREN — script.js
   ============================ */

// ---- CURSOR ----
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mx = 0, my = 0, fx = 0, fy = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
});

(function animFollower() {
  fx += (mx - fx) * 0.12;
  fy += (my - fy) * 0.12;
  follower.style.left = fx + 'px';
  follower.style.top  = fy + 'px';
  requestAnimationFrame(animFollower);
})();

// ---- NAV SCROLL ----
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });
}

// ---- BAG DATA ----
// ADD YOUR OWN ITEMS HERE
// For colors: use hex codes. name/title is shown on hover of swatch.
// For image: replace imageSrc with a relative path like "images/bag1.jpg"
//            set imageSrc to null to keep the placeholder

const bags = [
  {
    name:         'The Lena Tote',
    category:     'Tote Bag',
    tagline:      '"Spacious enough for your whole world."',
    material:     'Full-grain leather',
    size:         '38 × 28 × 12 cm',
    lead:         '2–3 weeks',
    price:        '€ 185',
    available:    true,
    imageSrc:     null,   // e.g. 'images/lena-tote.jpg'
    colors: [
      { hex: '#8B6F5E', name: 'Caramel' },
      { hex: '#2C2C2C', name: 'Midnight' },
      { hex: '#C4A882', name: 'Sand' }
    ]
  },
  {
    name:         'The Mara Crossbody',
    category:     'Crossbody',
    tagline:      '"Small bag, big energy."',
    material:     'Vegetable-tanned leather',
    size:         '24 × 18 × 7 cm',
    lead:         '2–3 weeks',
    price:        '€ 130',
    available:    true,
    imageSrc:     null,   // e.g. 'images/mara-crossbody.jpg'
    colors: [
      { hex: '#6B4F3A', name: 'Cognac' },
      { hex: '#E8DCCF', name: 'Nude' },
      { hex: '#3D3630', name: 'Espresso' }
    ]
  },
  {
    name:         'The Noor Bucket',
    category:     'Bucket Bag',
    tagline:      '"Effortless, always."',
    material:     'Soft pebbled leather',
    size:         '28 × 30 × 14 cm',
    lead:         '3–4 weeks',
    price:        '€ 160',
    available:    true,
    imageSrc:     null,   // e.g. 'images/noor-bucket.jpg'
    colors: [
      { hex: '#A0876E', name: 'Hazel' },
      { hex: '#2C2C2C', name: 'Midnight' }
    ]
  },
  {
    name:         'The Ines Clutch',
    category:     'Clutch',
    tagline:      '"Made for those evenings."',
    material:     'Vegetable-tanned leather',
    size:         '28 × 16 × 4 cm',
    lead:         '2 weeks',
    price:        '€ 95',
    available:    false,
    imageSrc:     null,   // e.g. 'images/ines-clutch.jpg'
    colors: [
      { hex: '#8B6F5E', name: 'Caramel' },
      { hex: '#C4A882', name: 'Sand' },
      { hex: '#1A1612', name: 'Black' }
    ]
  }
];

// ---- SHOWCASE ----
let current = 0;
const stage        = document.getElementById('showcaseStage');
const itemImage    = document.getElementById('itemImage');
const itemNumberBg = document.getElementById('itemNumberBg');
const itemName     = document.getElementById('itemName');
const itemTagline  = document.getElementById('itemTagline');
const itemCategory = document.getElementById('itemCategory');
const itemAvail    = document.getElementById('itemAvailability');
const itemMaterial = document.getElementById('itemMaterial');
const itemSize     = document.getElementById('itemSize');
const itemLead     = document.getElementById('itemLead');
const itemPrice    = document.getElementById('itemPrice');
const itemColors   = document.getElementById('itemColors');
const dotsWrap     = document.getElementById('showcaseDots');
const counterCur   = document.getElementById('currentIndex');
const counterTotal = document.getElementById('totalItems');
const prevBtn      = document.getElementById('prevBtn');
const nextBtn      = document.getElementById('nextBtn');

if (stage) {
  // Set total
  counterTotal.textContent = String(bags.length).padStart(2, '0');

  // Build dots
  bags.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Go to item ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });

  function render(bag, idx) {
    counterCur.textContent = String(idx + 1).padStart(2, '0');
    itemNumberBg.textContent = String(idx + 1).padStart(2, '0');
    itemName.textContent     = bag.name;
    itemTagline.textContent  = bag.tagline;
    itemCategory.textContent = bag.category;
    itemMaterial.textContent = bag.material;
    itemSize.textContent     = bag.size;
    itemLead.textContent     = bag.lead;
    itemPrice.textContent    = bag.price;

    // Availability
    if (bag.available) {
      itemAvail.textContent = 'Available';
      itemAvail.classList.remove('unavailable');
    } else {
      itemAvail.textContent = 'Sold out';
      itemAvail.classList.add('unavailable');
    }

    // Image
    itemImage.innerHTML = '';
    if (bag.imageSrc) {
      const img = document.createElement('img');
      img.src = bag.imageSrc;
      img.alt = bag.name;
      itemImage.appendChild(img);
    } else {
      itemImage.innerHTML = `
        <div class="placeholder-inner">
          <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M28 30C28 24.477 31.134 20 35 20H45C48.866 20 52 24.477 52 30" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            <rect x="16" y="30" width="48" height="38" rx="3" stroke="currentColor" stroke-width="1.5"/>
            <path d="M28 44h24M28 52h16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
          <span>Your photo here</span>
        </div>
      `;
    }

    // Colors
    itemColors.innerHTML = '';
    bag.colors.forEach(c => {
      const sw = document.createElement('span');
      sw.className = 'swatch';
      sw.style.background = c.hex;
      sw.title = c.name;
      itemColors.appendChild(sw);
    });

    // Dots
    document.querySelectorAll('.dot').forEach((d, i) => {
      d.classList.toggle('active', i === idx);
    });
  }

  function goTo(idx) {
    if (idx === current) return;
    stage.classList.add('transitioning');
    setTimeout(() => {
      current = (idx + bags.length) % bags.length;
      render(bags[current], current);
      stage.classList.remove('transitioning');
    }, 350);
  }

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));

  // Keyboard nav
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft')  goTo(current - 1);
    if (e.key === 'ArrowRight') goTo(current + 1);
  });

  // Swipe
  let touchStartX = 0;
  stage.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  stage.addEventListener('touchend',   e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) goTo(current + (dx < 0 ? 1 : -1));
  });

  // Initial render
  render(bags[0], 0);
}

// ---- CONTACT FORM ----
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    // Add your form submission logic here (e.g. Formspree, EmailJS, etc.)
    // For now, just show success message:
    formSuccess.classList.add('visible');
    contactForm.querySelector('.btn-submit').style.display = 'none';
    setTimeout(() => {
      contactForm.reset();
      formSuccess.classList.remove('visible');
      contactForm.querySelector('.btn-submit').style.display = '';
    }, 5000);
  });
}

// ---- SCROLL REVEAL ----
const revealEls = document.querySelectorAll('.about-col, .collection-header, .contact-info-block');
const observer = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.animationDelay = (i * 0.08) + 's';
      entry.target.style.animation = 'fadeUp 0.7s ease forwards';
      entry.target.style.opacity = '0';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
revealEls.forEach(el => {
  el.style.opacity = '0';
  observer.observe(el);
});