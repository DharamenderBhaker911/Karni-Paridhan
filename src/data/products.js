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
    basePrice: 4499,
    priceStep: 350,
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
    basePrice: 3499,
    priceStep: 300,
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
    basePrice: 12999,
    priceStep: 850,
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
  const price = cfg.basePrice + ((idx * cfg.priceStep) % 3500);
  const originalPrice = Math.round(price * 1.25);
  const badge = cfg.badges[idx % cfg.badges.length];
  const tone = cfg.tones[idx % cfg.tones.length];

  return {
    id: prod.id,
    name: name,
    category: prod.category,
    price: price,
    originalPrice: originalPrice,
    image: prod.images[0],
    gallery: prod.images,
    tone: tone,
    details: `Exquisite ${prod.category} crafted for special occasions, featuring premium fabric and authentic Rajasthani heritage craftsmanship.`,
    sizes: ["S", "M", "L", "XL", "XXL"],
    badge: badge,
  };
});
