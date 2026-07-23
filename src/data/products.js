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
