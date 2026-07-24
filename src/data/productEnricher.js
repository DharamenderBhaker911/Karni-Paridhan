// ─── Rich Product Data Enhancer ────────────────────────────────────────────
// Adds all PDP-level data to every product dynamically.
// Everything flows from the base products.js data — nothing is hardcoded per-product.

const SIZES_ALL   = ["XS", "S", "M", "L", "XL", "XXL", "3XL"];
const SIZES_POSAK = ["S", "M", "L", "XL", "Custom"];

const COLOR_PALETTES = {
  Anarkali: [
    { name: "Maroon",  hex: "#7A1F2B", availableSizes: ["S","M","L","XL","XXL"] },
    { name: "Navy",    hex: "#1B2A4A", availableSizes: ["XS","S","M","L","XL"] },
    { name: "Teal",    hex: "#2C7873", availableSizes: ["S","M","L","XL"] },
    { name: "Blush",   hex: "#E8B4B8", availableSizes: ["XS","S","M","L","XL","XXL","3XL"] },
  ],
  "Kurta-Set": [
    { name: "Ivory",   hex: "#F5F0E8", availableSizes: ["XS","S","M","L","XL","XXL","3XL"] },
    { name: "Rose",    hex: "#C8737A", availableSizes: ["S","M","L","XL","XXL"] },
    { name: "Sage",    hex: "#6B8F71", availableSizes: ["XS","S","M","L","XL"] },
    { name: "Cobalt",  hex: "#1F3A8A", availableSizes: ["S","M","L","XL"] },
  ],
  "Rajputi Posak": [
    { name: "Crimson", hex: "#9B1B2A", availableSizes: ["S","M","L","XL","Custom"] },
    { name: "Gold",    hex: "#C8A96A", availableSizes: ["S","M","L","Custom"] },
    { name: "Emerald", hex: "#1A5C3A", availableSizes: ["S","M","L","XL"] },
    { name: "Royal",   hex: "#2D1B69", availableSizes: ["M","L","XL","Custom"] },
  ],
  Suit: [
    { name: "Natural", hex: "#D4C5A9", availableSizes: ["XS","S","M","L","XL","XXL","3XL"] },
    { name: "Navy",    hex: "#1B2A4A", availableSizes: ["XS","S","M","L","XL","XXL"] },
    { name: "Crimson", hex: "#9B1B2A", availableSizes: ["S","M","L","XL","XXL"] },
    { name: "Teal",    hex: "#2C7873", availableSizes: ["XS","S","M","L","XL"] },
  ],
};

const HIGHLIGHTS_MAP = {
  Anarkali: [
    { icon: "✨", label: "Premium Fabric" },
    { icon: "🪡", label: "Handcrafted Embroidery" },
    { icon: "🧵", label: "Fine Thread Work" },
    { icon: "👗", label: "Includes Dupatta" },
    { icon: "🌸", label: "Festive Design" },
    { icon: "📐", label: "Comfort Fit" },
  ],
  "Kurta-Set": [
    { icon: "🧶", label: "Soft Cotton Silk" },
    { icon: "🎨", label: "Printed Motifs" },
    { icon: "✂️", label: "Tailored Finish" },
    { icon: "👗", label: "3-Piece Set" },
    { icon: "🫧", label: "Machine Washable" },
    { icon: "📐", label: "Regular Fit" },
  ],
  "Rajputi Posak": [
    { icon: "👑", label: "Royal Heritage" },
    { icon: "🏅", label: "Pure Silk Base" },
    { icon: "✨", label: "Antique Gold Work" },
    { icon: "🪡", label: "Heavy Gota Patti" },
    { icon: "🎀", label: "Traditional Odhni" },
    { icon: "💎", label: "Artisan Craftsmanship" },
  ],
  Suit: [
    { icon: "🪡", label: "Embroidered Yoke" },
    { icon: "🧵", label: "Fine Thread Work" },
    { icon: "👗", label: "3-Piece Set" },
    { icon: "✂️", label: "Straight Cut Fit" },
    { icon: "🌸", label: "Printed Dupatta" },
    { icon: "🫧", label: "Gentle Hand Wash" },
  ],
};

const FABRIC_CARE_MAP = {
  Anarkali: [
    { label: "Fabric",   value: "Georgette / Silk Blend" },
    { label: "Work",     value: "Zari & Thread Embroidery" },
    { label: "Neck",     value: "Round Neck with Embroidery" },
    { label: "Sleeves",  value: "3/4 Sleeves with Gota Border" },
    { label: "Fit",      value: "Flared / A-Line" },
    { label: "Wash",     value: "Dry Clean Recommended" },
  ],
  "Kurta-Set": [
    { label: "Fabric",   value: "Cotton Silk / Chanderi" },
    { label: "Work",     value: "Block Print / Mirror Work" },
    { label: "Neck",     value: "V-Neck with Piping" },
    { label: "Sleeves",  value: "Full / 3/4 Sleeves" },
    { label: "Fit",      value: "Straight / Regular" },
    { label: "Wash",     value: "Hand Wash Cold / Gentle Machine" },
  ],
  "Rajputi Posak": [
    { label: "Fabric",   value: "Pure Satin / Raw Silk" },
    { label: "Work",     value: "Gota Patti & Zardozi" },
    { label: "Neck",     value: "Traditional Kancheoli" },
    { label: "Sleeves",  value: "Elbow Length with Lace" },
    { label: "Fit",      value: "Flared Lehnga Silhouette" },
    { label: "Wash",     value: "Dry Clean Only" },
  ],
  Suit: [
    { label: "Fabric",   value: "Chanderi / Silk Blend / Cotton Silk" },
    { label: "Work",     value: "Embroidery / Block Print / Gota Patti" },
    { label: "Neck",     value: "V-Neck / Keyhole / Mandarin Neck" },
    { label: "Sleeves",  value: "3/4 / Full / Bell Sleeves" },
    { label: "Fit",      value: "Straight / Regular Cut" },
    { label: "Wash",     value: "Hand Wash Cold / Dry Clean" },
  ],
};

const SPECS_MAP = {
  Anarkali: [
    ["Material",   "Georgette with Silk Lining"],
    ["Pattern",    "Floral / Ethnic Print"],
    ["Occasion",   "Festive, Wedding, Party"],
    ["Length",     "Kurta 48\" + Churidar 38\""],
    ["Dupatta",    "Included (2.5 m)"],
    ["Packaging",  "Eco-friendly Box"],
  ],
  "Kurta-Set": [
    ["Material",   "Cotton Silk"],
    ["Pattern",    "Printed / Embroidered"],
    ["Occasion",   "Casual, Festive, Office"],
    ["Kurta Len.", "44\" (size M)"],
    ["Includes",   "Kurta + Pant + Dupatta"],
    ["Packaging",  "Branded Bag"],
  ],
  "Rajputi Posak": [
    ["Material",   "Pure Satin / Raw Silk"],
    ["Pattern",    "Zari & Gota Patti Work"],
    ["Occasion",   "Wedding, Heritage Events"],
    ["Kameez",     "46\" Length (size M)"],
    ["Includes",   "Kancheoli + Ghagra + Odhni"],
    ["Packaging",  "Premium Heritage Box"],
  ],
  Suit: [
    ["Material",   "Chanderi / Silk Blend / Cotton Silk"],
    ["Pattern",    "Printed / Embroidered / Block Print"],
    ["Occasion",   "Festive, Casual, Semi-formal"],
    ["Kurta Len.", "44\" (size M)"],
    ["Includes",   "Kurta + Pant + Dupatta"],
    ["Packaging",  "Branded Gift Bag"],
  ],
};

const FAQS_MAP = {
  Anarkali: [
    { q: "Does this come with a dupatta?", a: "Yes! Every Anarkali set includes a matching dupatta." },
    { q: "Is the product ready to dispatch?", a: "Yes, all in-stock products dispatch within 24 hours of order confirmation." },
    { q: "Can I exchange for a different size?", a: "Absolutely. We offer hassle-free size exchange within 7 days of delivery." },
    { q: "Is this suitable for weddings?", a: "Yes, our Anarkali range is specifically designed for festive and wedding occasions." },
    { q: "What care instructions should I follow?", a: "Dry clean is recommended to preserve the embroidery and fabric quality." },
  ],
  "Kurta-Set": [
    { q: "Is this set machine washable?", a: "Yes, on a gentle cycle with cold water. We recommend hand wash for best results." },
    { q: "Does the set include a dupatta?", a: "Yes, all kurta sets come with a matching or contrasting dupatta." },
    { q: "What is the return policy?", a: "We offer a 7-day easy return or exchange policy for all products." },
    { q: "Are the sizes true to fit?", a: "Our sizes follow standard Indian measurements. Refer to the size guide for accurate fit." },
  ],
  "Rajputi Posak": [
    { q: "Can I get a custom size?", a: "Yes, custom stitching is available. Please mention your measurements in the order notes." },
    { q: "How long does delivery take?", a: "Standard delivery: 4–6 working days. Express delivery available at checkout." },
    { q: "Is the posak suitable for bridal use?", a: "Yes, our Rajputi Posak range is crafted specifically for bridal and ceremonial occasions." },
    { q: "What is included in the set?", a: "The complete set includes Kancheoli (blouse), Ghagra (skirt), and Odhni (veil)." },
    { q: "Is dry cleaning mandatory?", a: "Yes, dry cleaning is highly recommended to preserve the intricate gota patti work." },
  ],
  Suit: [
    { q: "Is this a 3-piece set?", a: "Yes! Every suit set includes a kurta, matching pants, and a dupatta." },
    { q: "What fabric is used?", a: "Our suits are crafted from premium Chanderi, Silk Blend, or Cotton Silk fabrics depending on the style." },
    { q: "Can I hand wash this suit?", a: "Yes, gentle hand wash in cold water is recommended. For embroidered pieces, dry cleaning is advised." },
    { q: "What is the return or exchange policy?", a: "We offer a 7-day easy return or exchange policy for all products." },
    { q: "Is custom stitching available?", a: "Yes, please mention your measurements in the order notes and we will accommodate your request." },
  ],
};

const REVIEWS_DATA = [
  {
    id: 1, name: "Priya Sharma", location: "Jaipur",
    rating: 5, date: "15 Jul 2026",
    text: "Absolutely stunning! The embroidery is exquisite and the fabric is so smooth. Got so many compliments at the wedding. Will definitely order again!",
    verified: true, avatar: "PS",
  },
  {
    id: 2, name: "Meera Agarwal", location: "Delhi",
    rating: 5, date: "10 Jul 2026",
    text: "Perfect fit and the quality is premium. The packaging was beautiful too — felt like a luxury purchase. Highly recommended!",
    verified: true, avatar: "MA",
  },
  {
    id: 3, name: "Sunita Patel", location: "Ahmedabad",
    rating: 4, date: "5 Jul 2026",
    text: "Beautiful design and great material. Delivered on time. The dupatta color matches perfectly. Will be ordering more colours!",
    verified: true, avatar: "SP",
  },
  {
    id: 4, name: "Kavya Rathore", location: "Udaipur",
    rating: 5, date: "28 Jun 2026",
    text: "The Rajputi Posak quality is exceptional. The gota patti work is intricate and the satin fabric has a lovely sheen. It felt so regal!",
    verified: true, avatar: "KR",
  },
];

const SIZE_GUIDE = {
  headers: ["Size", "Bust (in)", "Waist (in)", "Hip (in)", "Length (in)"],
  rows: [
    ["XS",  "32",  "26",  "35",  "42"],
    ["S",   "34",  "28",  "37",  "44"],
    ["M",   "36",  "30",  "39",  "46"],
    ["L",   "38",  "32",  "41",  "48"],
    ["XL",  "40",  "34",  "43",  "48"],
    ["XXL", "42",  "36",  "45",  "48"],
    ["3XL", "44",  "38",  "47",  "48"],
  ],
  modelInfo: { height: "5'7\"", size: "S", bust: "34\"", waist: "26\"", hip: "36\"" },
};

export function enrichProduct(product) {
  const cat = product.category;
  return {
    ...product,
    tagline: {
      Anarkali:       "Wear the grace of tradition",
      "Kurta-Set":    "Elegance meets everyday comfort",
      "Rajputi Posak":"Born royal. Crafted for queens.",
      Suit:           "Crafted for every celebration.",
    }[cat] || "Celebrating Indian heritage",
    rating: (4.6 + Math.random() * 0.4).toFixed(1),
    reviewCount: 85 + Math.floor(Math.random() * 320),
    colors: COLOR_PALETTES[cat] || COLOR_PALETTES.Anarkali,
    highlights: HIGHLIGHTS_MAP[cat] || [],
    fabricCare: FABRIC_CARE_MAP[cat] || [],
    specs: SPECS_MAP[cat] || [],
    faqs: FAQS_MAP[cat] || [],
    reviews: REVIEWS_DATA,
    sizeGuide: SIZE_GUIDE,
    deliveryDate: getDeliveryDate(),
    sizes: cat === "Rajputi Posak" ? SIZES_POSAK : SIZES_ALL,
    // color-keyed gallery map: colour name → image array slice
    colorGalleries: buildColorGalleries(product.gallery || [product.image]),
  };
}

function getDeliveryDate() {
  const d = new Date();
  d.setDate(d.getDate() + 4 + Math.floor(Math.random() * 3));
  return d.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "short" });
}

function buildColorGalleries(images) {
  // Distribute images across colours so each colour shows a subset
  const map = {};
  const palettes = Object.values(COLOR_PALETTES);
  const all = palettes.flat();
  all.forEach((c, i) => {
    const start = i % Math.max(1, images.length);
    map[c.name] = images.slice(start).concat(images.slice(0, start));
  });
  return map;
}
