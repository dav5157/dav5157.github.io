function encodePath(path) {
  return path.replace(/\s+/g, '%20');
}

function parseCoords(str) {
  const m = str.match(/([\d.]+)°([NS])\s*([\d.]+)°([EW])/);
  if (!m) return { lat: 0, lng: 0 };
  let lat = parseFloat(m[1]);
  let lng = parseFloat(m[3]);
  if (m[2] === 'S') lat = -lat;
  if (m[4] === 'W') lng = -lng;
  return { lat, lng };
}

const RAW_DESTINATIONS = [
  { name: "Assisi", slug: "assisi", country: "Italy", coords: "43.07°N 12.62°E", cover: "assets/Photography/Assisi/DSC_7412.jpg", images: ['DSC_7412'] },
  { name: "Bangkok", slug: "bangkok", country: "Thailand", coords: "13.75°N 100.50°E", cover: "assets/Photography/Bangkok/DSC_1096.jpg", images: ['DSC_1096'] },
  { name: "Berlin", slug: "berlin", country: "Germany", coords: "52.52°N 13.40°E", cover: "assets/Photography/Berlin/DSC_5903.jpg", images: ['DSC_5903'] },
  { name: "Bologna", slug: "bologna", country: "Italy", coords: "44.49°N 11.34°E", cover: "assets/Photography/Bologna/DSC_7552.jpg", images: ['DSC_7552'] },
  { name: "Budapest", slug: "budapest", country: "Hungary", coords: "47.50°N 19.04°E", cover: "assets/Photography/Budapest/DSC_0136.jpg", images: ['DSC_0136', 'DSC_0244'] },
  { name: "Cinque Terre", slug: "cinque-terre", country: "Italy", coords: "44.13°N 9.71°E", cover: "assets/Photography/Cinque Terre/DSC_7078.jpg", images: ['DSC_7078'] },
  { name: "Copenhagen", slug: "copenhagen", country: "Denmark", coords: "55.68°N 12.57°E", cover: "assets/Photography/Copenhagen/DSC_2700.jpg", images: ['DSC_2700', 'DSC_6730'] },
  { name: "Dalian", slug: "dalian", country: "China", coords: "38.91°N 121.62°E", cover: "assets/Photography/Dalian/DSC_3115.jpg", images: ['DSC_3115', 'DSC_3117', 'DSC_3137', 'DSC_3138', 'DSC_3145', 'DSC_3148', 'DSC_3151', 'DSC_3152', 'DSC_3156', 'DSC_3161', 'DSC_3163-2', 'DSC_3166', 'DSC_3172', 'DSC_3173', 'DSC_3179', 'DSC_3182', 'DSC_3188'] },
  { name: "Dongguan", slug: "dongguan", country: "China", coords: "23.02°N 113.75°E", cover: "assets/Photography/Dongguan/DSC_3200.jpg", images: ['DSC_3200', 'DSC_3201', 'DSC_3202', 'DSC_3222', 'DSC_3224', 'DSC_3229', 'DSC_3230', 'DSC_3236', 'DSC_3247', 'DSC_3251', 'DSC_3254', 'DSC_3302'] },
  { name: "Edinburgh", slug: "edinbrugh", country: "Scotland", coords: "55.95°N 3.19°W", cover: "assets/Photography/Edinbrugh/DSC_6232.jpg", images: ['DSC_6232', 'DSC_6246'] },
  { name: "Fez", slug: "fez", country: "Morocco", coords: "34.04°N 4.99°W", cover: "assets/Photography/Fez/DSC_9006.jpg", images: ['DSC_9006', 'DSC_9151'] },
  { name: "Florence", slug: "florence", country: "Italy", coords: "43.77°N 11.26°E", cover: "assets/Photography/Florence/DSC_7235.jpg", images: ['DSC_7235', 'DSC_7484'] },
  { name: "Gothenburg", slug: "gothenburg", country: "Sweden", coords: "57.71°N 11.97°E", cover: "assets/Photography/Gothenburg/DSC_6603.jpg", images: ['DSC_6603'] },
  { name: "Helsingør", slug: "helsingor", country: "Denmark", coords: "56.03°N 12.61°E", cover: "assets/Photography/Helsingor/DSC_5124.jpg", images: ['DSC_5124', 'DSC_5160'] },
  { name: "Hong Kong", slug: "hong-kong", country: "China", coords: "22.32°N 114.17°E", cover: "assets/Photography/Hong Kong/DSC_1545.jpg", images: ['DSC_1545', 'DSC_1547', 'DSC_1560', 'DSC_1636', 'DSC_1637', 'DSC_1646', 'DSC_1663', 'DSC_1832', 'DSC_1880', 'DSC_1952', 'DSC_1970', 'DSC_1975', 'DSC_2009', 'DSC_2145', 'DSC_2147', 'DSC_3821', 'DSC_9160', 'DSC_9170', 'DSC_9206', 'DSC_9276', 'DSC_9307', 'DSC_9361-5', 'DSC_9473-2', 'DSC_9610', 'DSC_9617', 'DSC_9635', 'DSC_9651', 'DSC_9675', 'DSC_9764', 'DSC_9766', 'DSC_9794', 'DSC_9796', 'DSC_9797', 'IMG_5937'] },
  { name: "Japan", slug: "japan", country: "Japan", coords: "36.20°N 138.25°E", cover: "assets/Photography/Japan/DSC_2290.jpg", images: ['DSC_2290', 'DSC_2307', 'DSC_2338', 'DSC_2370', 'DSC_2372', 'DSC_2387', 'DSC_2392', 'DSC_2404', 'DSC_2440', 'DSC_2471', 'DSC_2486', 'DSC_2508', 'DSC_2511', 'DSC_2516', 'DSC_2550', 'DSC_2715', 'DSC_2719', 'DSC_2732', 'DSC_2743', 'DSC_2900', 'DSC_2929'] },
  { name: "Krakow", slug: "krakow", country: "Poland", coords: "50.06°N 19.94°E", cover: "assets/Photography/Krakow/DSC_2363.jpg", images: ['DSC_2363', 'DSC_2459'] },
  { name: "Kuala Lumpur", slug: "kuala-lumpur", country: "Malaysia", coords: "3.14°N 101.69°E", cover: "assets/Photography/Kuala Lumpur/DSC_4035.jpg", images: ['DSC_4035', 'DSC_4329'] },
  { name: "Linz–Sankt Florian", slug: "linz-sankt-florian", country: "Austria", coords: "48.21°N 14.38°E", cover: "assets/Photography/Linz-Sankt Florian/DSC_0926.jpg", images: ['DSC_0926'] },
  { name: "London", slug: "london", country: "United Kingdom", coords: "51.51°N 0.13°W", cover: "assets/Photography/London/DSC_8717.jpg", images: ['DSC_8632', 'DSC_8717'] },
  { name: "Lund", slug: "lund", country: "Sweden", coords: "55.70°N 13.19°E", cover: "assets/Photography/Lund/DSC_8306.jpg", images: ['DSC_8306'] },
  { name: "Marrakech", slug: "marrakech", country: "Morocco", coords: "31.63°N 7.98°W", cover: "assets/Photography/Marrakech/DSC_9266.jpg", images: ['DSC_9266', 'DSC_9620'] },
  { name: "Munich", slug: "munich", country: "Germany", coords: "48.14°N 11.58°E", cover: "assets/Photography/Munich/DSC_0901.jpg", images: ['DSC_0901'] },
  { name: "Padova", slug: "padova", country: "Italy", coords: "45.41°N 11.88°E", cover: "assets/Photography/Padova/DSC_7928.jpg", images: ['DSC_7928'] },
  { name: "Prague", slug: "prague", country: "Czechia", coords: "50.08°N 14.42°E", cover: "assets/Photography/Prague/DSC_2203.jpg", images: ['DSC_2203'] },
  { name: "Sahara Desert", slug: "sahara-desert", country: "Morocco", coords: "31.05°N 4.00°W", cover: "assets/Photography/Sahara Desert/DSC_9440.jpg", images: ['DSC_9440', 'DSC_9509', 'DSC_9583'] },
  { name: "Shanghai", slug: "shanghai", country: "China", coords: "31.23°N 121.47°E", cover: "assets/Photography/Shanghai/DSC_2994.jpg", images: ['DSC_2994', 'DSC_3018', 'DSC_3028', 'DSC_3055-2', 'DSC_3055', 'DSC_3060', 'DSC_3062', 'DSC_3090', 'DSC_3102-2'] },
  { name: "Singapore", slug: "singapore", country: "Singapore", coords: "1.35°N 103.82°E", cover: "assets/Photography/Singapore/DSC_4110.jpg", images: ['DSC_4110', 'DSC_4142'] },
  { name: "Stockholm", slug: "stockholm", country: "Sweden", coords: "59.33°N 18.07°E", cover: "assets/Photography/Stockholm/DSC_5606.jpg", images: ['DSC_5606'] },
  { name: "Venice", slug: "venice", country: "Italy", coords: "45.44°N 12.32°E", cover: "assets/Photography/Venice/DSC_8052.jpg", images: ['DSC_8052', 'DSC_8206', 'DSC_8262'] },
  { name: "Verona", slug: "verona", country: "Italy", coords: "45.44°N 10.99°E", cover: "assets/Photography/Verona/DSC_7817.jpg", images: ['DSC_7817', 'DSC_7844'] },
  { name: "Vienna", slug: "vienna", country: "Austria", coords: "48.21°N 16.37°E", cover: "assets/Photography/Vienna/DSC_0567.jpg", images: ['DSC_0567', 'DSC_0593'] },
];

const destinations = RAW_DESTINATIONS.map((d, i) => {
  const { lat, lng } = parseCoords(d.coords);
  const dir = d.cover.substring(0, d.cover.lastIndexOf('/') + 1);
  return {
    id: d.slug,
    name: d.name,
    country: d.country,
    coords: d.coords,
    lat, lng,
    frame: String(i + 1).padStart(3, "0"),
    cover: encodePath(d.cover),
    photos: d.images.map((img) => ({
      src: encodePath(dir + img + '.jpg'),
      caption: `${d.name}, ${d.country}`
    }))
  };
});

/* ------------------------------ State ------------------------------ */

let currentDest = null;
let currentIndex = 0;

/* ------------------------------ Elements ------------------------------ */

const destGrid = document.getElementById("dest-grid");
const destView = document.getElementById("dest-view");
const galleryView = document.getElementById("gallery-view");
const galleryGrid = document.getElementById("gallery-grid");
const galleryTitle = document.getElementById("gallery-title");
const galleryMeta = document.getElementById("gallery-meta");
const backBtn = document.getElementById("back-btn");

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCaption = document.getElementById("lightboxCaption");
const counter = document.getElementById("counter");
const closeBtn = document.getElementById("closeBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const backToTop = document.getElementById("backToTop");
const scrollDown = document.getElementById("scrollDown");

/* ------------------------------ Nav scroll effect ------------------------------ */

function initNav() {
  const nav = document.querySelector('nav');
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 50);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* --------------------------- Scroll-to-about --------------------------- */

if (scrollDown) {
  scrollDown.addEventListener('click', () => {
    const target = document.getElementById('about-contact');
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
}

/* --------------------------- Photo stats --------------------------- */

function updatePhotoStats() {
  const destCountEl = document.getElementById('dest-count');
  const totalPhotosEl = document.getElementById('total-photos');
  const countriesCountEl = document.getElementById('countries-count');
  if (!destCountEl && !totalPhotosEl) return;

  const totalPhotos = destinations.reduce((sum, d) => sum + d.photos.length, 0);
  const countries = new Set(destinations.map((d) => d.country));

  if (destCountEl) destCountEl.textContent = destinations.length;
  if (totalPhotosEl) totalPhotosEl.textContent = totalPhotos;
  if (countriesCountEl) countriesCountEl.textContent = countries.size;
}

/* --------------------------- Destination grid --------------------------- */

function renderDestinations() {
  if (!destGrid) return;

  destGrid.innerHTML = destinations
    .map(
      (d) => `
      <article class="dest-card fade-in" data-id="${d.id}" tabindex="0" role="button" aria-label="View ${d.name} gallery">
        <span class="corner tl"></span>
        <span class="corner tr"></span>
        <span class="corner bl"></span>
        <span class="corner br"></span>
        <span class="dest-frame-no">${d.coords}</span>
        <img src="${d.cover}" alt="${d.name}, ${d.country}" loading="lazy" decoding="async">
        <div class="dest-info">
          <h3>${d.name}</h3>
          <div class="meta">
            <span>${d.country}</span>
            <span class="dot">&middot;</span>
            <span>${d.photos.length} frame${d.photos.length !== 1 ? 's' : ''}</span>
          </div>
        </div>
      </article>`
    )
    .join("");

  destGrid.querySelectorAll(".dest-card").forEach((card) => {
    card.addEventListener("click", () => openGallery(card.dataset.id));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openGallery(card.dataset.id);
      }
    });
    revealObserver.observe(card);
  });
}

/* ----------------------------- Gallery view ----------------------------- */

function openGallery(id) {
  currentDest = destinations.find((d) => d.id === id);
  if (!currentDest) return;

  galleryTitle.textContent = currentDest.name;
  galleryMeta.textContent = `${currentDest.country} \u2014 ${currentDest.coords}`;

  galleryGrid.innerHTML = currentDest.photos
    .map(
      (p, i) => `
      <div class="gallery-item" data-index="${i}" tabindex="0" role="button" aria-label="Open photo ${i + 1}">
        <img src="${p.src}" alt="${p.caption}" loading="lazy" decoding="async">
        <span class="frame-tag">${currentDest.frame}/${String(i + 1).padStart(2, "0")}</span>
      </div>`
    )
    .join("");

  galleryGrid.querySelectorAll(".gallery-item").forEach((item) => {
    item.addEventListener("click", () => openLightbox(Number(item.dataset.index)));
    item.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightbox(Number(item.dataset.index));
      }
    });
  });

  destView.classList.add("hidden");
  galleryView.classList.remove("hidden");
  galleryGrid.classList.remove("gallery-view-enter");
  void galleryGrid.offsetWidth;
  galleryGrid.classList.add("gallery-view-enter");
  document.querySelector(".container").scrollIntoView({ behavior: "smooth", block: "start" });
}

if (backBtn) {
  backBtn.addEventListener("click", (e) => {
    e.preventDefault();
    galleryView.classList.add("hidden");
    destView.classList.remove("hidden");
    currentDest = null;
  });
}

/* -------------------------------- Lightbox -------------------------------- */

function openLightbox(index) {
  if (!currentDest) return;
  currentIndex = index;
  updateLightbox();
  lightbox.classList.add("active");
  document.body.style.overflow = "hidden";
}

function updateLightbox() {
  const photo = currentDest.photos[currentIndex];
  lightboxImg.src = photo.src;
  lightboxImg.alt = photo.caption;
  lightboxCaption.textContent = photo.caption;
  counter.textContent = `FRAME ${currentDest.frame}/${String(currentIndex + 1).padStart(2, "0")} \u2014 ${currentIndex + 1} OF ${currentDest.photos.length}`;
}

function closeLightbox() {
  lightbox.classList.remove("active");
  document.body.style.overflow = "";
}

function showPrev() {
  if (!currentDest) return;
  currentIndex = (currentIndex - 1 + currentDest.photos.length) % currentDest.photos.length;
  updateLightbox();
}

function showNext() {
  if (!currentDest) return;
  currentIndex = (currentIndex + 1) % currentDest.photos.length;
  updateLightbox();
}

if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
if (prevBtn) prevBtn.addEventListener("click", showPrev);
if (nextBtn) nextBtn.addEventListener("click", showNext);

if (lightbox) {
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
}

document.addEventListener("keydown", (e) => {
  if (!lightbox || !lightbox.classList.contains("active")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") showPrev();
  if (e.key === "ArrowRight") showNext();
});

/* ------------------------------ Scroll reveal ------------------------------ */

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible", "visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

function initScrollReveal() {
  document.querySelectorAll(".fade-in").forEach((el) => revealObserver.observe(el));
}

/* ------------------------------- Back to top ------------------------------- */

if (backToTop) {
  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("visible", window.scrollY > 480);
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* --------------------------------- World map --------------------------------- */

const CONTINENTS = [
  {
    points: [
      [71, -156], [68, -148], [65, -150], [62, -145], [60, -141],
      [58, -137], [55, -133], [52, -131], [49, -125], [48, -124],
      [46, -124], [42, -124], [38, -124], [36, -122], [34, -120],
      [33, -118], [32, -117], [31, -115], [29, -114], [28, -112],
      [27, -111], [25, -110], [24, -108], [23, -106], [22, -105],
      [21, -104], [20, -103], [19, -102], [18, -100], [17, -98],
      [16, -96], [15, -94], [14, -92], [13, -90], [12, -88],
      [13, -86], [14, -84], [9, -79], [8, -83], [10, -85],
      [12, -87], [14, -88], [16, -89], [18, -90], [19, -91],
      [21, -92], [23, -92], [25, -97], [27, -96], [29, -94],
      [30, -93], [30, -91], [29, -89], [30, -87], [30, -85],
      [29, -83], [30, -81], [28, -81], [27, -80], [25, -80],
      [24, -82], [25, -84], [27, -86], [28, -87], [30, -88],
      [32, -88], [35, -76], [37, -76], [39, -75], [40, -74],
      [41, -72], [42, -70], [44, -68], [46, -66], [48, -64],
      [50, -67], [52, -66], [54, -63], [56, -61], [58, -62],
      [60, -65], [61, -68], [62, -72], [62, -78], [61, -82],
      [60, -86], [58, -90], [56, -92], [54, -94], [52, -96],
      [50, -97], [48, -96], [47, -94], [46, -92], [49, -88],
      [52, -86], [54, -88], [56, -90], [58, -92], [60, -94],
      [62, -96], [64, -94], [66, -90], [68, -88], [70, -96],
      [70, -108], [70, -118], [70, -128], [71, -136], [71, -145],
      [71, -156]
    ]
  },
  {
    points: [
      [83, -35], [82, -25], [80, -20], [76, -18], [70, -22],
      [65, -32], [61, -46], [64, -52], [66, -53], [70, -56],
      [76, -68], [79, -64], [82, -55], [83, -45], [83, -35]
    ]
  },
  {
    points: [
      [23, -85], [23, -83], [22, -81], [21, -79], [20, -77],
      [20, -76], [21, -76], [22, -78], [23, -80], [23, -82],
      [23, -85]
    ]
  },
  {
    points: [
      [12, -72], [10, -64], [8, -60], [5, -54], [2, -51],
      [-1, -49], [-4, -38], [-8, -35], [-13, -38], [-16, -40],
      [-23, -43], [-26, -47], [-30, -50], [-34, -56], [-34, -58],
      [-37, -62], [-42, -64], [-46, -66], [-52, -68], [-55, -70],
      [-50, -74], [-46, -73], [-42, -72], [-38, -72], [-33, -71],
      [-28, -70], [-23, -70], [-18, -70], [-14, -72], [-9, -78],
      [-5, -81], [-2, -80], [2, -80], [5, -79], [8, -77],
      [10, -75], [12, -72]
    ]
  },
  {
    points: [
      [58, -3], [56, -3], [54, -2], [52, -4], [50, -4],
      [50, -1], [51, 1], [52, 2], [54, 1], [55, -1],
      [56, -2], [58, -3]
    ]
  },
  {
    points: [
      [55, -10], [54, -10], [52, -10], [51, -9], [52, -7],
      [53, -6], [55, -7], [55, -10]
    ]
  },
  {
    points: [
      [71, 25], [69, 30], [68, 33], [65, 36], [62, 38],
      [60, 40], [58, 38], [56, 36], [55, 35], [54, 32],
      [53, 30], [52, 28], [51, 26], [50, 25], [48, 24],
      [47, 22], [46, 22], [45, 22], [44, 20], [43, 18],
      [42, 18], [41, 20], [40, 20], [39, 20], [38, 22],
      [37, 24], [36, 23], [37, 20], [38, 18], [38, 16],
      [39, 14], [40, 14], [41, 16], [42, 15], [43, 14],
      [43, 12], [42, 10], [40, 9], [41, 6], [42, 4],
      [43, 2], [43, 0], [43, -2], [42, -4], [43, -6],
      [43, -9], [41, -9], [39, -9], [38, -9], [37, -8],
      [36, -6], [37, -4], [38, -3], [39, -1], [40, 1],
      [41, 2], [42, 2], [43, 3], [44, 3], [45, 2],
      [46, 2], [47, -2], [48, -4], [49, -2], [50, -1],
      [51, 1], [51, 3], [52, 4], [53, 5], [54, 6],
      [55, 8], [56, 9], [57, 8], [58, 6], [59, 5],
      [60, 5], [61, 5], [62, 5], [63, 6], [64, 8],
      [65, 10], [66, 13], [67, 14], [68, 16], [69, 18],
      [70, 20], [71, 22], [71, 25]
    ]
  },
  {
    points: [
      [37, 10], [35, 12], [34, 14], [33, 16], [33, 20],
      [32, 24], [32, 28], [32, 32], [30, 34], [28, 36],
      [26, 37], [24, 38], [22, 38], [20, 39], [18, 40],
      [16, 40], [14, 41], [12, 43], [10, 43], [8, 43],
      [4, 42], [2, 42], [0, 42], [-2, 41], [-4, 41],
      [-6, 40], [-8, 40], [-10, 40], [-12, 40], [-14, 40],
      [-16, 40], [-18, 38], [-20, 36], [-22, 35], [-24, 34],
      [-26, 32], [-28, 30], [-30, 28], [-32, 22], [-34, 20],
      [-33, 18], [-32, 16], [-30, 15], [-28, 14], [-26, 13],
      [-24, 12], [-22, 12], [-20, 12], [-18, 12], [-17, 12],
      [-15, 13], [-13, 13], [-11, 13], [-9, 13], [-7, 13],
      [-6, 12], [-4, 11], [-2, 10], [0, 9], [2, 8],
      [4, 9], [5, 7], [5, 5], [5, 3], [5, 1],
      [5, -1], [5, -3], [6, -5], [4, -8], [3, -9],
      [4, -10], [6, -10], [8, -11], [10, -15], [12, -16],
      [14, -17], [16, -17], [18, -17], [21, -17], [23, -16],
      [25, -15], [27, -13], [29, -12], [31, -10], [33, -8],
      [35, -6], [36, -4], [37, -2], [37, 2], [37, 5],
      [37, 8], [37, 10]
    ]
  },
  {
    points: [
      [-12, 49], [-14, 50], [-16, 50], [-18, 49], [-20, 48],
      [-22, 48], [-25, 47], [-24, 45], [-22, 44], [-20, 44],
      [-18, 44], [-15, 44], [-14, 45], [-12, 47], [-12, 49]
    ]
  },
  {
    points: [
      [77, 105], [76, 120], [75, 130], [76, 140], [74, 148],
      [72, 155], [70, 162], [68, 168], [66, 170], [64, 172],
      [62, 170], [60, 165], [58, 160], [56, 156], [54, 154],
      [52, 156], [50, 152], [48, 148], [46, 146], [45, 140],
      [44, 136], [43, 132], [42, 131], [40, 130], [38, 128],
      [36, 128], [35, 129], [34, 128], [33, 126], [32, 126],
      [31, 122], [30, 120], [28, 116], [26, 114], [24, 114],
      [22, 114], [20, 112], [18, 110], [16, 108], [14, 107],
      [12, 106], [10, 106], [8, 106], [6, 105], [4, 104],
      [2, 104], [1, 104], [0, 103], [1, 101], [2, 100],
      [3, 101], [4, 99], [5, 97], [6, 95], [6, 92],
      [6, 90], [6, 88], [6, 85], [6, 82], [6, 80],
      [7, 78], [8, 77], [9, 76], [10, 75], [12, 74],
      [15, 73], [18, 72], [20, 70], [22, 68], [23, 68],
      [24, 66], [25, 62], [25, 60], [26, 58], [27, 56],
      [28, 54], [29, 52], [30, 48], [30, 46], [31, 44],
      [32, 42], [33, 40], [34, 38], [35, 36], [36, 36],
      [37, 34], [38, 32], [39, 30], [40, 29], [41, 29],
      [42, 30], [43, 32], [44, 34], [45, 38], [46, 40],
      [47, 42], [48, 44], [49, 46], [50, 40], [51, 42],
      [52, 44], [53, 46], [54, 48], [55, 50], [56, 52],
      [57, 54], [58, 56], [58, 58], [57, 60], [56, 62],
      [55, 66], [55, 70], [55, 73], [54, 75], [53, 78],
      [52, 80], [51, 82], [50, 87], [51, 90], [52, 94],
      [52, 98], [52, 100], [52, 104], [54, 104], [56, 102],
      [58, 100], [60, 100], [62, 98], [64, 96], [66, 94],
      [68, 92], [70, 88], [73, 84], [75, 82], [77, 84],
      [77, 90], [77, 95], [77, 100], [77, 105]
    ]
  },
  {
    points: [
      [45, 142], [44, 144], [42, 145], [40, 144], [38, 143],
      [36, 141], [34, 140], [33, 139], [32, 138], [31, 136],
      [30, 135], [31, 134], [32, 135], [33, 136], [34, 138],
      [35, 139], [36, 140], [38, 141], [40, 142], [42, 143],
      [44, 142], [45, 142]
    ]
  },
  {
    points: [
      [-12, 133], [-12, 135], [-11, 137], [-12, 139], [-12, 141],
      [-13, 142], [-14, 143], [-14, 145], [-16, 146], [-18, 147],
      [-20, 149], [-22, 150], [-24, 152], [-24, 153], [-26, 153],
      [-28, 153], [-30, 153], [-33, 151], [-35, 150], [-37, 149],
      [-38, 147], [-39, 145], [-38, 143], [-38, 141], [-37, 138],
      [-35, 136], [-35, 134], [-35, 132], [-35, 130], [-35, 128],
      [-35, 126], [-35, 124], [-35, 122], [-35, 120], [-35, 118],
      [-33, 116], [-32, 115], [-31, 115], [-30, 114], [-28, 114],
      [-26, 114], [-24, 114], [-22, 114], [-20, 115], [-19, 117],
      [-17, 119], [-15, 122], [-14, 126], [-13, 128], [-12, 130],
      [-12, 133]
    ]
  },
  {
    points: [
      [-41, 145], [-41, 147], [-42, 148], [-43, 148], [-43, 147],
      [-43, 146], [-42, 145], [-41, 145]
    ]
  },
  {
    points: [
      [-35, 174], [-36, 175], [-37, 177], [-38, 178], [-39, 178],
      [-40, 177], [-41, 176], [-42, 175], [-43, 174], [-44, 173],
      [-45, 172], [-46, 171], [-47, 170], [-47, 169], [-46, 168],
      [-45, 167], [-44, 168], [-43, 168], [-42, 169], [-41, 170],
      [-40, 171], [-39, 172], [-38, 172], [-37, 172], [-36, 173],
      [-35, 174]
    ]
  }
];

function renderWorldMap() {
  const svg = document.getElementById("world-map");
  const hero = document.getElementById("hero");
  const tooltip = document.getElementById("mapTooltip");
  const tooltipName = document.getElementById("mapTooltipName");
  const tooltipMeta = document.getElementById("mapTooltipMeta");

  if (!svg || !hero) return;

  const svgNS = "http://www.w3.org/2000/svg";
  const width = 960;
  const height = 500;

  const project = (lat, lng) => {
    const x = (lng + 180) * (width / 360);
    const y = (90 - lat) * (height / 180);
    return [x, y];
  };

  const el = (tag, attrs) => {
    const node = document.createElementNS(svgNS, tag);
    Object.entries(attrs).forEach(([k, v]) => node.setAttribute(k, v));
    return node;
  };

  CONTINENTS.forEach((c) => {
    const d = c.points
      .map(([lat, lng], i) => {
        const [x, y] = project(lat, lng);
        return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(" ") + " Z";
    svg.appendChild(el("path", { class: "map-land", d }));
  });

  for (let lng = -180; lng <= 180; lng += 30) {
    const [x] = project(0, lng);
    svg.appendChild(
      el("line", {
        class: lng === 0 ? "map-graticule major" : "map-graticule",
        x1: x, y1: 0, x2: x, y2: height
      })
    );
  }
  for (let lat = -90; lat <= 90; lat += 30) {
    const [, y] = project(lat, 0);
    svg.appendChild(
      el("line", {
        class: lat === 0 ? "map-graticule major" : "map-graticule",
        x1: 0, y1: y, x2: width, y2: y
      })
    );
  }

  svg.appendChild(el("rect", { class: "map-outline", x: 0.5, y: 0.5, width: width - 1, height: height - 1 }));

  destinations.forEach((d) => {
    const [x, y] = project(d.lat, d.lng);

    const dotGroup = el("g", { class: "map-pin" });
    const halo = el("circle", { class: "map-dot-halo", cx: x, cy: y, r: 4 });
    const dot = el("circle", { class: "map-dot", cx: x, cy: y, r: 3.4 });
    const hit = el("circle", {
      class: "map-hit",
      cx: x, cy: y, r: 11,
      tabindex: "0",
      role: "button",
      "aria-label": `${d.name}, ${d.country}`
    });

    dotGroup.appendChild(halo);
    dotGroup.appendChild(dot);
    dotGroup.appendChild(hit);

    const showTooltip = () => {
      const rect = hero.getBoundingClientRect();
      const scaleX = rect.width / width;
      const scaleY = rect.height / height;
      tooltip.style.left = `${x * scaleX}px`;
      tooltip.style.top = `${y * scaleY}px`;
      tooltipName.textContent = `${d.name}, ${d.country}`;
      tooltipMeta.textContent = `${d.coords} \u2014 ${d.photos.length} frames`;
      tooltip.classList.add("visible");
      dot.setAttribute("r", 4.6);
    };
    const hideTooltip = () => {
      tooltip.classList.remove("visible");
      dot.setAttribute("r", 3.4);
    };
    const activate = () => {
      hideTooltip();
      openGallery(d.id);
    };

    hit.addEventListener("mouseenter", showTooltip);
    hit.addEventListener("mouseleave", hideTooltip);
    hit.addEventListener("focus", showTooltip);
    hit.addEventListener("blur", hideTooltip);
    hit.addEventListener("click", activate);
    hit.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        activate();
      }
    });

    svg.appendChild(dotGroup);
  });
}

/* --------------------------------- Init --------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initScrollReveal();
  updatePhotoStats();
  renderDestinations();
  renderWorldMap();

  const params = new URLSearchParams(window.location.search);
  const place = params.get('place');
  if (place) {
    const dest = destinations.find((d) => d.name === place);
    if (dest) openGallery(dest.id);
  }
});
