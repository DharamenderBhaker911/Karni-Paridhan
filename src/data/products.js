export const images = {
  logo: new URL("../../assets/logo.png", import.meta.url).href,
};

// Import all product images dynamically from the assets directory using Vite's import.meta.glob
const rawImages = import.meta.glob(
  "../../assets/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",
  { eager: true, import: "default" }
);

// Group images by category and product sub-folder
const productMap = {};

Object.entries(rawImages).forEach(([path, url]) => {
  const normalizedPath = path.replace(/\\/g, "/");
  const parts = normalizedPath.split("/");

  // Path format: "../../assets/CategoryFolder/ProductFolder/image.jpg"
  const assetsIdx = parts.indexOf("assets");
  if (assetsIdx === -1 || parts.length < assetsIdx + 4) return;

  const categoryDir = parts[assetsIdx + 1];
  const folderDir = parts[assetsIdx + 2];
  const fileName = parts[assetsIdx + 3];

  if (!fileName || categoryDir.includes(".")) return;

  // Map directory names to official category names used in navigation
  let categoryName = "";
  const catLower = categoryDir.toLowerCase();
  if (catLower === "anarkali") {
    categoryName = "Anarkali";
  } else if (catLower === "kurta-set") {
    categoryName = "Kurta-Set";
  } else if (catLower.includes("posak") || catLower.includes("rajputi")) {
    categoryName = "Rajputi Posak";
  } else if (catLower === "suit") {
    categoryName = "Suit";
  } else {
    return; // Ignore non-product asset folders
  }

  const productId = `${categoryName.toLowerCase().replace(/[^a-z0-9]/g, "-")}-${folderDir.toLowerCase().replace(/[^a-z0-9]/g, "-")}`;

  if (!productMap[productId]) {
    productMap[productId] = {
      id: productId,
      category: categoryName,
      folder: folderDir,
      images: [],
    };
  }

  productMap[productId].images.push(url);
});

// ─── Suit: Hardcoded rich product details (29 products) ────────────────────
const SUIT_PRODUCTS = {
  "1": {
    name: "Embroidered Paisley / Yoke Kurta Set",
    details: "A classic straight-cut kurta featuring a rich navy backdrop adorned with vibrant floral and botanical prints. The defining highlight is the intricate embroidered neck yoke shaped in a dramatic, curved paisley / heart motif embellished with fine threadwork and subtle sequin highlights. V-cut notch neck, three-quarter sleeves with decorative borders, paired with a matching printed dupatta.",
    bestFor: "Semi-formal gatherings, festive dinners, and evening celebrations where detailed neckwork takes center stage.",
    badge: "Best Seller",
    price: 899,
    originalPrice: 3599,
  },
  "2": {
    name: "Kashmiri-Inspired Floral Print & Scarf Set",
    details: "An elegant, rich charcoal-black straight kurta paired with a high-contrast crimson red Dupatta/Shawl. The outfit features large, dramatic floral motifs around the hem (daman) and along the drape, giving it a classic royal or Kashmiri-inspired aesthetic. High-neck embroidered placket with delicate button detailing, straight-fit dark trousers, and a heavy drape dupatta.",
    bestFor: "Winter festivities, evening receptions, and formal cultural events.",
    badge: "New",
    price: 1099,
    originalPrice: 4399,
  },
  "3": {
    name: "Traditional Block-Printed / Ajrakh Motif Set",
    details: "A vibrant maroon straight-fit kurta set embellished with classic ethnic motifs (booti / Ajrakh inspired). It highlights rich Gota Patti or Zardozi embroidery across the neck placket and deep sleeve cuffs. V-neckline framed with heavy gold embroidered lattice work, matching printed straight pants, and a patterned dupatta with tasseled borders.",
    bestFor: "Puja ceremonies, pre-wedding festivities (Haldi/Mehendi), and cultural festivals.",
    badge: "Festive",
    price: 949,
    originalPrice: 3799,
  },
  "4": {
    name: "Pastel Chanderi / Silk Floral Set",
    details: "A serene, light sage green straight kurta crafted from a crisp fabric like Chanderi or Tissue Silk. It features delicate pink floral booti prints distributed evenly across the shirt and sheer dupatta. Subtle embroidered neck and sleeve borders, straight trousers, and a lightweight sheer dupatta with printed borders and corner tassels.",
    bestFor: "Daytime events, summer celebrations, formal lunch gatherings, and office festivities.",
    badge: "Popular",
    price: 799,
    originalPrice: 3199,
  },
  "5": {
    name: "Contemporary Geo-Striped Tie-Neck Set",
    details: "A modern, fashion-forward straight suit featuring bold geometric and vertical stripe prints in earth tones (olive, teal, cream, and grey). Stand collar with a stylish scarf/tie neck detail, flared bell-style sleeves with dark fringe/tassel accents, and a relaxed, breezy drape.",
    bestFor: "Modern ethnic wear, casual outings, resort wear, or smart-casual workwear.",
    badge: "Trending",
    price: 849,
    originalPrice: 3399,
  },
  "6": {
    name: "Beige Printed Yoke Kurta Set",
    details: "Subtle Printed Chanderi/Silk Suit Set with Embroidered Yoke. Keyhole Neckline, Subtle Motif Prints, Matching Striped Dupatta with Scallop Lace Trim. A timeless beige suit featuring a beautifully embroidered yoke with delicate threadwork.",
    bestFor: "Office festivities, casual outings, and daytime social events.",
    badge: "New",
    price: 749,
    originalPrice: 2999,
  },
  "7": {
    name: "Solid Off-White Minimalist Kurta Set",
    details: "Plain / Solid Silk-Blend Straight Kurta Set with Border Accents. Minimalist Back-View Straight Cut, Subtle Gota/Gold Border Detailing on Cuffs and Hem. An effortlessly elegant off-white kurta that lets the craftsmanship speak through its refined gold border accents.",
    bestFor: "Formal meetings, pooja events, and minimalist festive wear.",
    badge: "Signature",
    price: 699,
    originalPrice: 2799,
  },
  "8": {
    name: "Solid Crimson Red Silk Set with Printed Dupatta",
    details: "Plain Raw Silk/Chanderi Kurta Set with Scallop Trim & Contrast Floral Dupatta. V-Neckline with Scallop Lace Trim, Tiny Booti Embroidery, Statement Floral Printed Dupatta. A bold crimson red kurta set that makes a vivid impression at any celebration.",
    bestFor: "Festivals, sangeet nights, and celebratory gatherings.",
    badge: "Popular",
    price: 899,
    originalPrice: 3599,
  },
  "9": {
    name: "Teal Blue Silk Kurta Set",
    details: "Deep Teal Solid Kurta Set with Printed Organza/Silk Dupatta. Rich Jewel Tone, Elegant Scalloped Borders, Contrast Floral Block-Printed Dupatta. A stunning deep teal kurta set with rich jewel-tone appeal and elegant scalloped borders.",
    bestFor: "Evening receptions, festive lunches, and cultural celebrations.",
    badge: "Best Seller",
    price: 949,
    originalPrice: 3799,
  },
  "10": {
    name: "Pastel Pink Embroidered Suit Set",
    details: "Light Pink Chanderi/Silk Kurta Set with Pearl/Gota Neck Embroidery. Festive Pastel Silk Suit, Delicately Embellished V-Neck, Dual-Tone Printed Dupatta. A soft pastel pink suit exuding grace and feminine elegance with delicate pearl-inspired embroidery.",
    bestFor: "Baby showers, roka ceremonies, and festive family gatherings.",
    badge: "New",
    price: 849,
    originalPrice: 3399,
  },
  "11": {
    name: "Bright Yellow Festive Gota Suit Set",
    details: "Haldi/Festive Yellow Chanderi Silk Suit Set with Gota Patti Neckline. Deep V-Neck with Intricate Gold Gota Work, Straight Pants, Tasselled Sheer Dupatta. A vibrant yellow suit bursting with festive energy, adorned with rich gold gota patti embroidery.",
    bestFor: "Haldi ceremony, festive puja, and spring celebrations.",
    badge: "Festive",
    price: 999,
    originalPrice: 3999,
  },
  "12": {
    name: "Ivory & Mint Blue Yoke Set",
    details: "Pastel Mint & Cream Printed Silk Kurta Set. Arch-Style Yoke Embroidery, Matching Straight Pants, Flowy Printed Dupatta Draped over Shoulders. A serene two-tone ivory and mint blue suit with a beautiful arch-style embroidered yoke.",
    bestFor: "Day functions, casual ethnic outings, and semi-formal events.",
    badge: "Trending",
    price: 849,
    originalPrice: 3399,
  },
  "13": {
    name: "Indo-Western Kalamkari Printed Shirt/Tunic",
    details: "Modern Kalamkari Print Collared Tunic / Short Shirt Kurti. Western Collar with Neck Tie Detail, Cuffed Long Sleeves, Fusion Wear for Jeans/Trousers. A contemporary fusion piece blending traditional kalamkari art prints with a Western shirt silhouette.",
    bestFor: "Modern ethnic wear, office casual, and indo-western styling with jeans or trousers.",
    badge: "New",
    price: 649,
    originalPrice: 2599,
  },
  "14": {
    name: "Hand-Painted Floral Ivory Kurta Set",
    details: "Ivory Hand-Painted Watercolor Floral Kurta Set. Off-White Base with Vibrant Blue Floral Daman (Hem) Art, Notch Collar/Mandarin Neckline. An artistic ivory kurta set featuring hand-painted watercolour floral artwork along the daman.",
    bestFor: "Art-inspired occasions, garden parties, and daytime festive wear.",
    badge: "Signature",
    price: 1099,
    originalPrice: 4399,
  },
  "15": {
    name: "Beige Floral Printed Festive Kurta Set",
    details: "All-Over Rose Print Chanderi Kurta Set with Embroidered Neck Placket. Traditional Rose/Botanical Prints, Geometric Embroidered Yoke, Matching Printed Dupatta. A classically beautiful beige kurta adorned with rose and botanical prints throughout.",
    bestFor: "Festive functions, mehendi ceremonies, and cultural events.",
    badge: "Popular",
    price: 799,
    originalPrice: 3199,
  },
  "16": {
    name: "Grey & Yellow Abstract Scallop Kurta Set",
    details: "Abstract Printed Silk Suit Set with Scalloped Hem & Stole. Contemporary grey base with bold yellow floral accents, scalloped border hem, matching straight trousers, and wrapped matching stole/dupatta. A contemporary artistic suit with striking yellow-on-grey contrast.",
    bestFor: "Modern cultural events, art exhibitions, and semi-formal occasions.",
    badge: "Trending",
    price: 899,
    originalPrice: 3599,
  },
  "17": {
    name: "Indigo Block-Print Straight Cotton-Silk Suit",
    details: "Indigo Block-Print Straight Cotton-Silk Suit (Back-View Detail). Traditional booti/geometric block prints, embroidered back yoke/collar, printed sleeve borders, and wide-leg palazzo pants. A classic indigo suit with intricate block print detailing and a beautiful embroidered back yoke.",
    bestFor: "Casual ethnic wear, beach outings, and resort fashion.",
    badge: "New",
    price: 849,
    originalPrice: 3399,
  },
  "18": {
    name: "Charcoal Blue Silk Set with Floral Organza Dupatta",
    details: "Charcoal Navy Textured Silk Suit with Scalloped Organza Dupatta. V-neck with fine hand-embroidery, subtle booti work on shirt, paired with a dual-tone printed organza dupatta with scalloped edges. A sophisticated charcoal blue suit that balances rich texture with delicate embroidery.",
    bestFor: "Evening receptions, formal dinners, and corporate festive events.",
    badge: "Best Seller",
    price: 1149,
    originalPrice: 4599,
  },
  "19": {
    name: "Rust Red Kalamkari Motif Kurta Set",
    details: "Rust Red Silk Kalamkari-Inspired Printed Kurta Set. Bell/flared sleeves, traditional botanical floral motifs across the drape, notch neck, and matching straight pants. A warm rust red suit with artistic kalamkari-inspired motifs and beautiful flared sleeves.",
    bestFor: "Festive outings, cultural festivals, and traditional celebrations.",
    badge: "Festive",
    price: 949,
    originalPrice: 3799,
  },
  "20": {
    name: "Teal & Maroon Geometric Panel Kurta Set",
    details: "Teal Blue Printed Panel Straight Suit with Arch Motifs. Vertical contrast maroon stripes, traditional jharokha/arch booti prints along the hem and body, notch neck with metallic accent buttons. A striking teal and maroon combination with bold geometric panel details.",
    bestFor: "Festive occasions, semi-formal cultural events, and evening functions.",
    badge: "Popular",
    price: 899,
    originalPrice: 3599,
  },
  "21": {
    name: "Powder Pink Rose Yoke Embroidered Set",
    details: "Powder Pink Chanderi/Silk Suit with Floral Embroidered Yoke. Delicate rose motif embroidery around the neck placket and sleeve cuffs, straight trousers, and fully printed sheer dupatta. A delicate powder pink suit with intricate rose embroidery on the yoke.",
    bestFor: "Engagements, festive gatherings, and spring celebrations.",
    badge: "New",
    price: 849,
    originalPrice: 3399,
  },
  "22": {
    name: "Pastel Mint Green Heavy Yoke Suit",
    details: "Mint Green Chanderi Suit with Mirror & Thread Yoke Embroidery. All-over subtle floral booti print, densely embroidered neck yoke with sequin/mirror work, matching printed dupatta border. A refreshing mint green suit with a statement mirror-work embroidered yoke.",
    bestFor: "Festive events, sangeet functions, and celebratory occasions.",
    badge: "Signature",
    price: 1049,
    originalPrice: 4199,
  },
  "23": {
    name: "Beige Floral Branch Hand-Paint Style Set",
    details: "Off-White / Beige Floral Branch Printed Silk Set with Organza Dupatta. Minimalist base with artistic floral branch prints near the daman (hem), detailed button placket, sheer floral dupatta with tassel edges. An artistic beige suit with delicate floral branch prints at the hem.",
    bestFor: "Garden parties, brunch outings, and understated festive wear.",
    badge: "Popular",
    price: 799,
    originalPrice: 3199,
  },
  "24": {
    name: "Dusty Plum Oversized Floral Chiffon Set",
    details: "Dusty Mauve / Plum Silk Suit with Watercolour Floral Prints. Monochromatic suit set featuring oversized hand-painted style lily/lotus motifs, V-neckline, light organza/chiffon draped dupatta. A moody, romantic dusty plum suit with dramatic watercolour floral prints.",
    bestFor: "Evening receptions, cocktail parties, and modern festive occasions.",
    badge: "Trending",
    price: 999,
    originalPrice: 3999,
  },
  "25": {
    name: "Midnight Black Floral Daman Printed Suit",
    details: "Midnight Black Floral Daman Printed Satin-Silk Suit. Vibrant red and orange floral placement print along the bottom hem and sheer organza dupatta, contrast fabric button placket. A bold, dramatic black suit with vibrant floral placement prints along the daman.",
    bestFor: "Evening galas, formal receptions, and high-fashion festive events.",
    badge: "Exclusive",
    price: 1199,
    originalPrice: 4799,
  },
  "26": {
    name: "Indigo Floral Print Kurta with Contrast Ochre Palazzo",
    details: "Indigo Block Printed Cotton Kurta Set with Ochre Palazzo. Classic indigo blue base with floral block print and embroidered Gota/Thread Work Yoke. Paired with Ochre Yellow wide-leg palazzo pants with samosa/lace border. Block Printed lightweight dupatta in cotton-malmal/kota doria fabric.",
    bestFor: "Casual wear, daily office, or summer outings. Perfect for a relaxed yet ethnic look.",
    badge: "New",
    price: 749,
    originalPrice: 2999,
  },
  "27": {
    name: "Off-White Chikankari Silk Suit with Kalamkari Dupatta",
    details: "Off-White Chikankari Embroidered Suit Set. Premium off-white/ivory base with thread-work chikankari and delicate sequin embroidery at the neckline. Paired with a striped and kalamkari/art printed dupatta that gives this simple suit an elegant and artistic look.",
    bestFor: "Pooja-path, daytime festive events, and sober meetings.",
    badge: "Signature",
    price: 1049,
    originalPrice: 4199,
  },
  "28": {
    name: "Orchid Pink Chanderi Jacquard Suit with Embroidered Organza Dupatta",
    details: "Pink Chanderi Silk Festive Suit with Embroidered Organza Dupatta. Pastel/Orchid pink shade in Chanderi Jacquard (woven) fabric with fine zari and thread embroidery at the neck. Matching pink silk-blend straight pants. Paired with a cutwork-bordered, all-over floral embroidered sheer organza dupatta.",
    bestFor: "Wedding functions (Roka/Mehendi), festivals, and family get-togethers.",
    badge: "Festive",
    price: 1149,
    originalPrice: 4599,
  },
  "29": {
    name: "Crimson Red Modern Geometric Motif Silk Suit Set",
    details: "Crimson Red Silk Suit with Abstract Geometric Print. Deep crimson/maroon silk kurta with modern abstract/geometric motifs on the sleeves and daman. Paired with matching solid straight-cut pants. A bold, fashion-forward ethnic statement piece.",
    bestFor: "Indo-western cocktail parties, dinner dates, and modern festivals.",
    badge: "Trending",
    price: 999,
    originalPrice: 3999,
  },
};

// Category configs for generating realistic product names, pricing, and tags
// Prices are AFTER 75% off — originals are ~4x (before discount)
const categoryConfig = {
  Anarkali: {
    titles: [
      "Royal Silk Anarkali Suit",
      "Gota Patti Anarkali Ensemble",
      "Floral Printed Anarkali Set",
      "Embroidered Velvet Anarkali",
      "Classic Flare Anarkali Suit",
      "Designer Georgette Anarkali",
      "Festive Chanderi Anarkali",
      "Traditional Zari Work Anarkali",
      "Pastel Elegance Anarkali Set",
      "Bridal Heritage Anarkali",
    ],
    // Sale price range: ₹700 – ₹2000 (after 75% off)
    basePrice: 700,
    priceStep: 130,
    priceRange: 1300,   // max - min
    badges: ["New", "Festive", "Best Seller", "Popular", "Signature"],
    tones: [
      "Pure silk flare with intricate neck embroidery",
      "Soft flowing georgette with gota accents",
      "Festive pastel tone with hand embroidery",
    ],
  },
  "Kurta-Set": {
    titles: [
      "Pearl White Kurta Co-ord",
      "Embroidered Chanderi Kurta Set",
      "Silk Blend Straight Kurta Set",
      "Rose Garden Printed Kurta Set",
      "Festive Mirror Work Kurta Set",
      "Designer A-Line Kurta Set",
      "Traditional Zari Detailing Kurta Set",
      "Pastel Cotton Silk Kurta Set",
      "Royal Velvet Kurta Ensemble",
    ],
    // Sale price range: ₹500 – ₹1600 (after 75% off)
    basePrice: 500,
    priceStep: 110,
    priceRange: 1100,   // max - min
    badges: ["Best Seller", "New", "Limited", "Trending"],
    tones: [
      "Comfortable cotton silk with delicate embroidery",
      "Handcrafted mirror work detailing",
      "Elegant straight fit with statement sleeves",
    ],
  },
  "Rajputi Posak": {
    titles: [
      "Mint Royal Rajputi Poshak",
      "Ivory Heritage Rajputi Ensemble",
      "Crimson Zari Rajputi Poshak",
      "Emerald Gold Rajputi Poshak",
      "Royal Pink Gota Patti Poshak",
      "Golden Rajputi Ceremonial Poshak",
      "Maroon Satin Rajputi Poshak",
      "Sky Blue Silk Rajputi Poshak",
      "Velvet Regal Rajputi Poshak",
    ],
    // Sale price range: ₹1200 – ₹2500 (after 75% off)
    basePrice: 1200,
    priceStep: 130,
    priceRange: 1300,   // max - min
    badges: ["Signature", "Royal Edit", "Exclusive", "Heritage"],
    tones: [
      "Pure satin base with antique gold work",
      "Ceremonial poshak with traditional heavy gota patti",
      "Luminous royal drape with artisan craftsmanship",
    ],
  },
};

export const products = Object.values(productMap).map((prod, idx) => {
  // ── Suit category: use rich per-product data ──────────────────────────────
  if (prod.category === "Suit") {
    const folderNum = prod.folder.trim();
    const suitData = SUIT_PRODUCTS[folderNum];
    if (suitData) {
      return {
        id: prod.id,
        name: suitData.name,
        category: "Suit",
        price: suitData.price,
        originalPrice: suitData.originalPrice,
        image: prod.images[0],
        gallery: prod.images,
        tone: suitData.details.slice(0, 80) + "…",
        details: suitData.details,
        bestFor: suitData.bestFor,
        sizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
        badge: suitData.badge,
      };
    }
    // Fallback for unknown suit folders
    return {
      id: prod.id,
      name: `Ethnic Suit Set (${prod.folder})`,
      category: "Suit",
      price: 799,
      originalPrice: 3199,
      image: prod.images[0],
      gallery: prod.images,
      tone: "Elegant straight-fit kurta with matching dupatta",
      details: "Exquisite ethnic suit crafted for special occasions, featuring premium fabric and authentic Rajasthani heritage craftsmanship.",
      sizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
      badge: "New",
    };
  }

  // ── Other categories: use config-driven data ──────────────────────────────
  const cfg = categoryConfig[prod.category] || categoryConfig["Anarkali"];
  const titleTemplate = cfg.titles[idx % cfg.titles.length];
  const name = `${titleTemplate} (${prod.folder})`;

  // Sale price (after 75% off) within the defined range
  const salePrice = cfg.basePrice + ((idx * cfg.priceStep) % cfg.priceRange);
  // Original price = sale price / 0.25  → 4× (75% off means you save 75%)
  const originalPrice = Math.round(salePrice * 4);

  const badge = cfg.badges[idx % cfg.badges.length];
  const tone = cfg.tones[idx % cfg.tones.length];

  return {
    id: prod.id,
    name: name,
    category: prod.category,
    price: salePrice,
    originalPrice: originalPrice,
    image: prod.images[0],
    gallery: prod.images,
    tone: tone,
    details: `Exquisite ${prod.category} crafted for special occasions, featuring premium fabric and authentic Rajasthani heritage craftsmanship.`,
    sizes: ["S", "M", "L", "XL", "XXL"],
    badge: badge,
  };
});
