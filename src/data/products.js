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
  } else if (catLower === "purse") {
    categoryName = "Purse";
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

// ─── Rajputi Posak: Rich product details per folder ──────────────────────────
const RAJPUTI_PRODUCTS = {
  // ── Existing Collection (1–51) ────────────────────────────────────────────
  "1":  { name: "Royal Crimson Gota Patti Rajputi Poshak",   details: "A regal crimson red Rajputi Poshak crafted in pure satin with heavy antique gold Gota Patti border work. The ghaghra features a sweeping A-line silhouette with wide gold patti hem, matching embroidered choli with scallop-edge gold trim, and a gossamer organza dupatta delicately embroidered with traditional Rajasthani motifs.",  bestFor: "Royal weddings, roka ceremonies, and grand festive celebrations.", badge: "Royal Edit",  price: 1899, originalPrice: 7599 },
  "2":  { name: "Emerald Zari Weave Heritage Poshak",          details: "Opulent emerald green Rajputi Poshak woven with fine Zari threadwork throughout. A classic flared ghaghra with intricate geometric zari border, cinched embroidered choli with keyhole neckline, and a matching embroidered silk dupatta with kiran lace edges.",                                                             bestFor: "Teej, Navratri, and bridal events.",                               badge: "Heritage",   price: 2199, originalPrice: 8799 },
  "3":  { name: "Ivory Pearl Silk Rajputi Bridal Poshak",      details: "Luxurious ivory and champagne Rajputi Poshak in premium tussar silk. Pearl and Kundan embellishments adorn the choli neckline and sleeve borders. The full ghaghra is paneled with delicate floral block prints and a heavy gold border. Comes with an embroidered net dupatta.",                                           bestFor: "Bridal trousseau, wedding rituals, and engagement events.",        badge: "Signature",  price: 2499, originalPrice: 9999 },
  "4":  { name: "Deep Navy Blue Mirror Work Poshak",           details: "Traditional dark navy Rajputi Poshak featuring hundreds of tiny hand-stitched mirror-work (shisha) pieces over the ghaghra and choli. Rich velvet choli with embroidered borders and a contrast gold-yellow dupatta with mirrored corner tassels.",                                                                             bestFor: "Cultural festivals, Rajasthani folk events, and traditional galas.", badge: "Exclusive",  price: 1749, originalPrice: 6999 },
  "5":  { name: "Rose Gold Chanderi Festive Poshak",           details: "Delicate rose gold Rajputi Poshak crafted in Chanderi silk with subtle woven booti motifs across the ghaghra. The choli features a sweetheart neckline with pearl-string embellishments and three-quarter sleeves with gold gota trim. Paired with a sheer floral dupatta.",                                                  bestFor: "Festive occasions, sangeet nights, and mehendi ceremonies.",      badge: "Festive",   price: 1499, originalPrice: 5999 },
  "6":  { name: "Maroon Velvet Rajputi Ceremonial Poshak",     details: "Rich maroon velvet Rajputi Poshak with dense Zardozi embroidery on the choli and ghaghra hem. The ghaghra features a wide gold antique border and inner lining for a structured silhouette. A jewel-tone dupatta with gold sequin borders completes the ensemble.",                                                          bestFor: "Winter weddings, royal ceremonies, and grand receptions.",        badge: "Royal Edit",  price: 2299, originalPrice: 9199 },
  "7":  { name: "Sky Blue Bandhej Ghaghra Poshak",             details: "Traditional sky blue Rajputi Poshak featuring hand-tied Bandhej (Bandhani) pattern across the full ghaghra and dupatta. Light silk choli with embroidered yoke. The vibrant tie-dye pattern in white-on-blue symbolises Rajasthani folk heritage at its finest.",                                                                bestFor: "Teej puja, folk festivals, and heritage cultural events.",       badge: "Heritage",   price: 1349, originalPrice: 5399 },
  "8":  { name: "Saffron Yellow Leheriya Silk Poshak",         details: "Vibrant saffron and yellow Rajputi Poshak with authentic Leheriya wave-print silk ghaghra. The diagonal wave pattern in contrasting gold and white runs across the entire ghaghra. The matching embroidered choli features elbow-length sleeves with gold gota trim.",                                                                bestFor: "Haldi ceremony, Teej, and spring festivals.",                   badge: "Festive",   price: 1299, originalPrice: 5199 },
  "9":  { name: "Peacock Green Gota Embellished Poshak",       details: "Rich peacock green Rajputi Poshak with sweeping gota patti and sequin embellishment. The ghaghra has a grand 7-tier flare with alternating gold borders on each tier. The choli features a deep V-back with gold cord closure and padded cups for a perfect fit.",                                                              bestFor: "Wedding receptions, anniversary celebrations, and festive galas.", badge: "Exclusive", price: 1999, originalPrice: 7999 },
  "10": { name: "Rani Pink Silk Rajputi Poshak",                details: "Brilliant rani pink Rajputi Poshak in pure silk with a classic flared ghaghra. The border features traditional gold Rajasthani motifs with green accent embroidery. The choli has a square neckline with gold sequin work, while the dupatta is printed with matching floral motifs.",                                        bestFor: "Engagement ceremonies, Navratri, and family celebrations.",     badge: "Signature",  price: 1599, originalPrice: 6399 },
  "11": { name: "Antique Gold Brocade Heritage Poshak",         details: "Stunning antique gold and cream Rajputi Poshak in Banarasi brocade with intricate woven motifs throughout the ghaghra. The choli is crafted in matching brocade with a boat neckline and full sleeves embellished with stone setting along the cuffs.",                                                                           bestFor: "Pre-wedding functions, puja rituals, and royal family events.",  badge: "Heritage",   price: 2099, originalPrice: 8399 },
  "12": { name: "Midnight Blue Gota Rajputi Poshak",            details: "Deep midnight blue Rajputi Poshak with traditional heavy gold gota patti work. The flared ghaghra has five rows of gota patti at the hem, while the choli features a U-neckline with full gota-trimmed sleeves. The dupatta is a matching blue net with gold sequin borders.",                                             bestFor: "Formal weddings, royal family occasions, and engagement parties.", badge: "Royal Edit", price: 1799, originalPrice: 7199 },
  "13": { name: "Turquoise Bandhani Silk Rajputi Poshak",       details: "Vivid turquoise Rajputi Poshak featuring traditional Bandhani tie-dye pattern in white dots across the entire ghaghra and dupatta. Light embroidered choli in solid turquoise with gold gota trim. A classic piece celebrating authentic Rajasthani folk craft.",                                                                bestFor: "Folk festivals, Teej, and cultural exhibitions.",              badge: "Festive",   price: 1249, originalPrice: 4999 },
  "14": { name: "Dusty Rose Organza Rajputi Poshak",            details: "Romantic dusty rose Rajputi Poshak in lightweight organza with all-over sequin and thread embroidery. The sheer ghaghra floats gracefully over a satin lining. The choli has an off-shoulder neckline with ruched sleeves and pearl string detail along the neckline.",                                                        bestFor: "Evening receptions, sangeet, and festive dinner parties.",     badge: "Signature",  price: 1699, originalPrice: 6799 },
  "15": { name: "Bottle Green Zardozi Rajputi Poshak",          details: "Rich bottle green Rajputi Poshak with magnificent Zardozi (gold wire) embroidery across the choli front and ghaghra border. The thick gold wire work creates a three-dimensional textured effect. Classic round neck with gold sequin edging and matching embroidered dupatta.",                                                     bestFor: "Wedding ceremonies, formal festive events, and royal occasions.", badge: "Exclusive", price: 2149, originalPrice: 8599 },
  "16": { name: "Coral Orange Leheriya Rajputi Poshak",         details: "Energetic coral orange Leheriya wave-print Rajputi Poshak in breathable cotton silk. The diagonal tie-dye waves flow across the full ghaghra in contrasting red and white. The choli has a halter-neck design with embroidered gold border trim for a contemporary twist on tradition.",                                        bestFor: "Navratri garba, folk festivals, and outdoor celebrations.",    badge: "Heritage",   price: 1199, originalPrice: 4799 },
  "17": { name: "Lavender Silk Rajputi Ceremonial Poshak",      details: "Soft lavender Rajputi Poshak crafted in double-layered silk with subtle Zari pin-stripe weave. The ghaghra has a classic full flare with gold gota hem border. The choli features a traditional hook-closure back with intricate threadwork across the yoke.",                                                                 bestFor: "Festive puja, engagement functions, and daytime ceremonies.",  badge: "Festive",   price: 1399, originalPrice: 5599 },
  "18": { name: "Classic Sindoori Red Wedding Poshak",          details: "Traditional sindoori red Rajputi Poshak — the quintessential bridal ensemble. Crafted in pure satin with heavy antique gold gota patti border and kiran lace trim throughout the ghaghra. The choli features a deep back with dangling gold tassel drawstrings and traditional Rajputi sleeve styling.",                          bestFor: "Traditional Rajputi weddings, bridal ceremonies, and sangeet.",badge: "Royal Edit",  price: 2399, originalPrice: 9599 },
  "19": { name: "Pastel Peach Bandhej Rajputi Poshak",          details: "Gentle pastel peach Rajputi Poshak with traditional hand-tied Bandhej pattern in soft white and orange. The lightweight silk ghaghra flows beautifully with a natural sway. Matching embroidered choli with boat neckline and short sleeves.",                                                                                       bestFor: "Daytime functions, baby shower celebrations, and Teej puja.",  badge: "Signature",  price: 1299, originalPrice: 5199 },
  "20": { name: "Majestic Purple Gota Patti Poshak",            details: "Regal purple Rajputi Poshak in heavy satin with layered gold gota patti across the ghaghra hem and tier borders. The richly embroidered choli features a bateau neckline with stone-set gold work along the edges. A majestic dupatta with matching gold embroidery finishes the look.",                                           bestFor: "Grand weddings, roka ceremonies, and festival galas.",         badge: "Heritage",   price: 1849, originalPrice: 7399 },
  "21": { name: "Jade Green Mirror Work Folk Poshak",           details: "Vibrant jade green Rajputi Poshak with traditional hand-stitched mirror work (shisha embroidery) across the entire ghaghra and choli. Each mirror is surrounded by bright multicolor thread stitches creating a stunning folk art effect. Perfect expression of authentic Rajasthani rural craft.",                                   bestFor: "Folk cultural events, Navratri, and Rajasthani heritage fairs.", badge: "Exclusive", price: 1549, originalPrice: 6199 },
  "22": { name: "Champagne Gold Tissue Silk Poshak",            details: "Luxurious champagne and gold Rajputi Poshak in shimmering tissue silk that catches and reflects light beautifully. The ghaghra features woven gold Zari motifs throughout. Matching choli with V-neckline and intricately embroidered borders with kundan stone accents.",                                                          bestFor: "Evening receptions, bridal showers, and engagement celebrations.", badge: "Signature", price: 2249, originalPrice: 8999 },
  "23": { name: "Brick Red Kota Doria Rajputi Poshak",          details: "Classic brick red Rajputi Poshak crafted in lightweight Kota Doria fabric with a beautiful open-weave texture. The ghaghra features gold gota patti trim at the hem and mid-panels. The airy choli in matching Kota Doria is ideal for warm weather festivities.",                                                                bestFor: "Summer weddings, daytime puja, and warm weather festivals.",   badge: "Heritage",   price: 1149, originalPrice: 4599 },
  "24": { name: "Royal Blue Zardozi Silk Poshak",               details: "Majestic royal blue Rajputi Poshak in pure silk with exquisite Zardozi gold wire embroidery forming floral paisley patterns across the choli front. The ghaghra border features a wide gold Zardozi hem band. The silk dupatta carries matching corner motifs.",                                                                       bestFor: "Royal weddings, formal receptions, and heritage celebrations.", badge: "Royal Edit", price: 2099, originalPrice: 8399 },
  "25": { name: "Orange Floral Block Print Rajputi Poshak",     details: "Cheerful orange Rajputi Poshak with authentic Rajasthani hand block print (Bagru/Sanganeri style) covering the entire ghaghra and dupatta. Traditional floral and leaf motifs in red, green, and white on the orange ground. Light embroidered choli with elbow sleeves.",                                                         bestFor: "Holi celebrations, folk festivals, and casual ethnic wear.",   badge: "Festive",   price: 1099, originalPrice: 4399 },
  "26": { name: "Magenta Pink Heavy Gota Embroidered Poshak",   details: "Vivid magenta Rajputi Poshak with heavy gold gota embroidery and sequin work covering the choli front and ghaghra tiers. The brightly coloured ensemble with rich golden embellishments captures the exuberant spirit of Rajasthani celebrations. Paired with matching net dupatta.",                                                 bestFor: "Navratri, sangeet, and high-energy festive occasions.",        badge: "Exclusive",  price: 1749, originalPrice: 6999 },
  "27": { name: "Off-White Chikankari Rajputi Poshak",          details: "Elegant off-white Rajputi Poshak featuring the refined Chikankari embroidery tradition. Delicate white-on-white shadowwork embroidery covers the choli and upper ghaghra panels. A wide gold gota border at the hem and a sheer ivory dupatta complete this understated yet beautiful ensemble.",                                   bestFor: "Sober wedding functions, puja rituals, and formal festive events.", badge: "Signature", price: 1649, originalPrice: 6599 },
  "28": { name: "Deep Teal Sequin Embellished Poshak",          details: "Glamorous deep teal Rajputi Poshak with all-over hand-sewn sequin and thread embroidery creating a scintillating shimmer effect. The ghaghra has multiple tiers with each border highlighted in gold sequins. The choli features a contemporary off-shoulder design with gold chain detail.",                                     bestFor: "Evening galas, formal receptions, and modern festive celebrations.", badge: "Heritage", price: 1949, originalPrice: 7799 },
  "29": { name: "Mustard Yellow Pichwai Print Poshak",          details: "Unique mustard yellow Rajputi Poshak featuring traditional Pichwai-inspired painting motifs including lotus, cows, and floral swirls hand-painted along the ghaghra panels. The artwork is set against a rich mustard silk ground with gold gota hem border.",                                                                       bestFor: "Art-inspired occasions, cultural events, and unique festive wear.", badge: "Exclusive", price: 1799, originalPrice: 7199 },
  "30": { name: "Crimson Silk Rajputi Poshak with Pearl Work",  details: "Vivid crimson red Rajputi Poshak in pure silk with pearl-string and Kundan embellishment along the choli neckline and sleeve edges. The ghaghra features heavy gold gota patti in multiple rows at the hem. A statement piece radiating bridal grandeur.",                                                                            bestFor: "Bridal ceremonies, grand weddings, and engagement occasions.",  badge: "Royal Edit",  price: 2199, originalPrice: 8799 },
  "31": { name: "Forest Green Bandhani Rajputi Poshak",         details: "Earthy forest green Rajputi Poshak with traditional Bandhani (tie-dye) pattern in natural white and rust across the ghaghra. The rich green fabric with organic circular patterns creates a timeless look. Complemented by a forest green choli with delicate gold trim.",                                                               bestFor: "Heritage walks, eco-themed events, and folk festivals.",       badge: "Heritage",   price: 1249, originalPrice: 4999 },
  "32": { name: "Fuchsia Pink Gota Rajputi Festive Poshak",     details: "Bold fuchsia Rajputi Poshak radiating vibrant energy with layers of gold gota patti across the ghaghra tiers. The deeply embellished choli has a square neckline with dense gota and sequin work. A celebration of bright Rajasthani color culture.",                                                                              bestFor: "Navratri garba, family festivals, and celebration wear.",      badge: "Festive",   price: 1499, originalPrice: 5999 },
  "33": { name: "Cream Tussar Silk Zari Rajputi Poshak",        details: "Refined cream Rajputi Poshak in authentic Tussar silk with woven gold Zari motifs distributed evenly across the ghaghra. The natural Tussar texture adds a unique warmth and depth to the fabric. The choli features a traditional Rajputi boat neckline with Zari piping.",                                                        bestFor: "Traditional weddings, puja ceremonies, and formal festive events.", badge: "Signature", price: 1699, originalPrice: 6799 },
  "34": { name: "Wine Red Velvet Embroidered Rajputi Poshak",   details: "Sumptuous wine red velvet Rajputi Poshak with dense multicolor thread embroidery in traditional Rajasthani motifs (peacock, floral, geometric). The velvet ghaghra has exceptional drape and richness. The choli features a deep V-neckline with matching velvet embroidery.",                                                     bestFor: "Winter weddings, royal ceremonies, and grand festive events.",  badge: "Royal Edit",  price: 2349, originalPrice: 9399 },
  "35": { name: "Peach Georgette Rajputi Poshak",               details: "Flowing peach Rajputi Poshak in lightweight georgette with all-over delicate floral print. The ghaghra has a soft flare perfect for movement and dance. The choli is crafted in matching georgette with intricate gold gota border and keyhole neckline detail.",                                                                      bestFor: "Indoor celebrations, mehendi functions, and casual ethnic wear.", badge: "Festive",  price: 1199, originalPrice: 4799 },
  "36": { name: "Indigo Block Print Rajputi Poshak",            details: "Classic indigo Rajputi Poshak with authentic Bagru hand block print in traditional geometric and floral motifs. Deep indigo blue on natural fabric with rusty orange accents creates a classic earthy palette. Wide gold gota patti hem border on the ghaghra.",                                                                        bestFor: "Heritage cultural events, folk exhibitions, and Rajasthani pride occasions.", badge: "Heritage", price: 1299, originalPrice: 5199 },
  "37": { name: "Silver Grey Sequin Rajputi Poshak",            details: "Glamorous silver-grey Rajputi Poshak with all-over sequin work creating a silvery shimmer across the ghaghra. The contemporary color palette with traditional silhouette makes this a modern classic. The choli features a halter neckline with silver sequin and stone work.",                                                   bestFor: "Evening receptions, destination weddings, and modern festive events.", badge: "Exclusive", price: 1849, originalPrice: 7399 },
  "38": { name: "Mango Yellow Heritage Rajputi Poshak",         details: "Sunny mango yellow Rajputi Poshak in Chanderi silk with vibrant hand block printed border work in red and green. The ghaghra has a full sweep with natural fabric weight for a traditional drape. The choli has a traditional hook-closure back with embroidered yoke.",                                                            bestFor: "Summer festivals, Teej, and traditional outdoor celebrations.",  badge: "Heritage",   price: 1349, originalPrice: 5399 },
  "39": { name: "Cobalt Blue Gota Patti Rajputi Poshak",        details: "Striking cobalt blue Rajputi Poshak with bold gold gota patti embellishment. The ghaghra features triple-row gota patti at the hem and gota accents along each tier seam. The choli has a round neckline with dense gota work across the full front panel.",                                                                     bestFor: "Grand weddings, engagement parties, and major festive occasions.", badge: "Royal Edit", price: 1749, originalPrice: 6999 },
  "40": { name: "Blush Pink Bridal Rajputi Poshak",             details: "Romantic blush pink Rajputi Poshak in heavy satin with delicate pink and gold embroidery throughout. The ghaghra has generous flare with a wide embroidered hem band. The choli features an elegant sweetheart neckline with padded cups and intricate gold sequin work.",                                                       bestFor: "Bridal events, engagement ceremonies, and premium festive wear.", badge: "Signature", price: 2299, originalPrice: 9199 },
  "41": { name: "Teal Green Kundan Rajputi Poshak",             details: "Exquisite teal green Rajputi Poshak with Kundan stone setting work along the choli borders and ghaghra tier edges. Each Kundan stone is hand-set in gold foil for a jewelled appearance. The matching dupatta features Kundan corner clusters for a complete royal look.",                                                          bestFor: "Grand weddings, royal occasions, and heritage celebrations.",   badge: "Exclusive",  price: 2099, originalPrice: 8399 },
  "42": { name: "Scarlet Red Leheriya Rajputi Poshak",          details: "Classic scarlet red Leheriya Rajputi Poshak with bold diagonal wave pattern in gold and orange. The vibrant crimson base with contrasting waves creates maximum visual impact. The choli in matching Leheriya has a traditional backless design with tie-up closure.",                                                                bestFor: "Festive occasions, sangeet, and Navratri celebrations.",       badge: "Heritage",   price: 1349, originalPrice: 5399 },
  "43": { name: "Olive Green Embroidered Folk Poshak",          details: "Earthy olive green Rajputi Poshak with colourful multicolor folk embroidery inspired by traditional Aari and Kashmiri stitching. Birds, flowers, and paisley motifs are hand-embroidered in vibrant thread colours across the choli front and ghaghra yoke.",                                                                          bestFor: "Cultural festivals, folk exhibitions, and art-inspired events.", badge: "Festive",  price: 1449, originalPrice: 5799 },
  "44": { name: "Burgundy Silk Zardozi Rajputi Poshak",         details: "Opulent burgundy Rajputi Poshak in premium silk with fine Zardozi gold wire embroidery. Paisley and floral Zardozi motifs adorn the choli front and ghaghra upper panel. The rich wine-red silk adds depth and gravitas to this ceremonial ensemble.",                                                                           bestFor: "Formal weddings, reception events, and festive galas.",       badge: "Royal Edit",  price: 2149, originalPrice: 8599 },
  "45": { name: "White Cotton Silk Rajputi Poshak",             details: "Pure white Rajputi Poshak in cotton-silk blend with a clean airy silhouette. Gold gota patti hem border and Chikankari shadowwork on the choli front. The pristine white colour with gold accents embodies classic Rajputi elegance in its purest form.",                                                                         bestFor: "Puja rituals, religious ceremonies, and sober festive occasions.", badge: "Signature", price: 1549, originalPrice: 6199 },
  "46": { name: "Mehndi Green Sequin Embellished Poshak",       details: "Festive mehndi green Rajputi Poshak perfect for pre-wedding celebrations. All-over sequin embroidery with gold thread accents creates a sparkling effect. The choli has a square neckline with dense sequin work and the ghaghra features a wide gold sequin border.",                                                               bestFor: "Mehendi ceremony, pre-wedding functions, and festive parties.", badge: "Festive",   price: 1649, originalPrice: 6599 },
  "47": { name: "Amethyst Purple Bandhani Rajputi Poshak",      details: "Rich amethyst purple Rajputi Poshak with authentic hand-tied Bandhani (tie-dye) pattern across the ghaghra and dupatta. The intricate circular dot patterns in white against the deep purple create a mesmerising textile effect. Embroidered choli with gold border accents.",                                                bestFor: "Cultural festivals, Navratri, and traditional celebrations.",  badge: "Heritage",   price: 1299, originalPrice: 5199 },
  "48": { name: "Copper Bronze Tissue Rajputi Poshak",          details: "Unique copper-bronze tissue silk Rajputi Poshak with a metallic sheen. The reflective tissue fabric creates a living, changing shimmer with movement. Embroidered choli with kundan stone detailing and matching tissue dupatta with gold Zari border.",                                                                           bestFor: "Evening weddings, formal receptions, and premium celebrations.", badge: "Exclusive", price: 1999, originalPrice: 7999 },
  "49": { name: "Sky Blue Gota Patti Rajputi Poshak",           details: "Breezy sky blue Rajputi Poshak in lightweight silk with traditional gota patti gold border. The airy blue ghaghra moves beautifully with every step. The choli features a square neckline with gota trim and intricate gold threadwork across the front.",                                                                          bestFor: "Spring festivals, outdoor ceremonies, and daytime celebrations.", badge: "Signature", price: 1449, originalPrice: 5799 },
  "50": { name: "Deep Purple Velvet Rajputi Poshak",            details: "Luxurious deep purple velvet Rajputi Poshak with gold thread embroidery in traditional Rajasthani motifs. The heavy velvet ghaghra has maximum flare ideal for traditional dance performances. The embroidered choli features a Rajputi-style back with drawstring cord closure.",                                                bestFor: "Cultural dance events, winter weddings, and grand festive galas.", badge: "Royal Edit", price: 2249, originalPrice: 8999 },
  "51": { name: "Warm Amber Printed Heritage Rajputi Poshak",   details: "Warm amber Rajputi Poshak with traditional Sanganeri block-printed floral patterns across the ghaghra. The natural fabric with hand-printed motifs in rusty red and green captures authentic Rajasthani artisan heritage. Matching embroidered choli with elbow sleeves.",                                                        bestFor: "Heritage walks, craft fairs, and traditional cultural events.", badge: "Heritage",   price: 1199, originalPrice: 4799 },

  // ── NEW Collection (IM-01 to IM-09) ──────────────────────────────────────
  "IM-01": { name: "Pearl White Bridal Rajputi Poshak — New Collection",       details: "A breathtaking new-season Pearl White Rajputi Poshak from the exclusive Karni Paridhan Imprint Collection. Crafted in premium satin with heavy pearl-string embellishment along the choli neckline, sleeve borders, and ghaghra tiers. The full-flare ghaghra is lined with antique gold gota patti across multiple rows. Paired with an embroidered organza dupatta with scalloped pearl edges — a truly royal bridal statement.",                                                   bestFor: "Bridal trousseau, royal weddings, and grand engagement ceremonies.",   badge: "New",        price: 2499, originalPrice: 9999  },
  "IM-02": { name: "Royal Gold Zardozi Rajputi Poshak — New Collection",        details: "New-season gold and ivory Rajputi Poshak featuring magnificent Zardozi gold wire embroidery across the entire choli front and ghaghra yoke. The heavy gold metallic threadwork forms traditional lotus, peacock, and paisley motifs. The silk ghaghra has exceptional weight and drape with a classic tiered silhouette and wide gold embroidered hem band.",                                                                                                         bestFor: "Grand weddings, royal ceremonies, and premium festive occasions.",     badge: "New",        price: 2399, originalPrice: 9599  },
  "IM-03": { name: "Crimson Red Kundan Rajputi Poshak — New Collection",         details: "A new-season crimson red Rajputi Poshak from the Imprint Collection with spectacular Kundan stone setting across the choli. Each Kundan stone is hand-set in antique gold foil creating a jewel-encrusted appearance. The rich satin ghaghra features heavy gota patti borders, while the dupatta carries matching Kundan corner clusters for a complete bridal look.",                                                                                              bestFor: "Traditional Rajputi weddings, bridal ceremonies, and reception galas.", badge: "New",        price: 2349, originalPrice: 9399  },
  "IM-04": { name: "Emerald Green Mirror Mosaic Rajputi Poshak — New Collection", details: "New-season emerald green Rajputi Poshak featuring a stunning mirror mosaic (Abhla work) covering the choli and ghaghra border panels. Hundreds of hand-stitched mirrors are arranged in geometric patterns surrounded by multicolor silk thread stitching. The vivid emerald silk ghaghra has a grand 9-tier flare for maximum impact on the dance floor.",                                                                                                   bestFor: "Navratri garba, cultural dance events, and vibrant festive celebrations.", badge: "New",     price: 2199, originalPrice: 8799  },
  "IM-05": { name: "Royal Blue Sequin Rajputi Poshak — New Collection",          details: "A dazzling new-season royal blue Rajputi Poshak from the Imprint Collection covered in all-over hand-applied silver and gold sequin work. The sequin embroidery creates a constellation-like effect that shimmers with every movement. Features a contemporary off-shoulder choli design with gold chain straps and a flowing organza dupatta.",                                                                                                                  bestFor: "Evening weddings, formal receptions, and glamour festive events.",     badge: "New",        price: 2099, originalPrice: 8399  },
  "IM-06": { name: "Magenta Pink Gota Rajputi Poshak — New Collection",          details: "Vibrant new-season magenta Rajputi Poshak with maximalist gold gota patti work. The Imprint Collection piece features dense layers of gold gota across every tier of the ghaghra and the full choli front. The bold magenta-and-gold colour combination is a celebration of Rajasthani festive energy at its most exuberant.",                                                                                                                                  bestFor: "Sangeet, wedding parties, and high-energy festive celebrations.",      badge: "New",        price: 1999, originalPrice: 7999  },
  "IM-07": { name: "Antique Gold Silk Rajputi Poshak — New Collection",          details: "Luxurious new-season antique gold Rajputi Poshak from the Imprint Collection in pure heavy silk. The rich gold fabric with Zari woven motifs creates an all-over metallic effect. The choli features a traditional round neckline with Zardozi border work. The dramatic full-length ghaghra with a wide gold border embodies timeless Rajputi splendour.",                                                                                                    bestFor: "Royal occasions, heritage weddings, and grand festive galas.",          badge: "New",        price: 2299, originalPrice: 9199  },
  "IM-08": { name: "Teal Blue Bandhani Rajputi Poshak — New Collection",          details: "Fresh new-season teal Rajputi Poshak with a contemporary take on traditional Bandhani tie-dye. The Imprint Collection piece features large-scale Bandhani pattern in contrasting white and gold on teal silk. The modern interpretation of a folk classic features a structured choli with contemporary neckline and wide gold border ghaghra.",                                                                                                             bestFor: "Modern heritage events, destination weddings, and cultural celebrations.", badge: "New",    price: 1849, originalPrice: 7399  },
  "IM-09": { name: "Ivory Chikankari Rajputi Poshak — New Collection",            details: "Exquisite new-season ivory Rajputi Poshak from the Imprint Collection featuring delicate Chikankari shadowwork embroidery in white-on-white across the choli and upper ghaghra panels. The understated elegance of this piece makes it a standout — refined luxury through quiet craftsmanship. Wide gold gota patti hem border and sheer embroidered dupatta.",                                                                                          bestFor: "Sober bridal functions, puja rituals, and formal festive occasions.",   badge: "New",        price: 1949, originalPrice: 7799  },
};

// ─── Purse: Rich product details per folder ─────────────────────────────────
const PURSE_PRODUCTS = {
  "1": {
    name: "Dhaaga Mustard Suede Round Crossbody Bag",
    details: "Trendy circular/round shape with premium mustard-yellow suede-finish material. Features a quick-access front slip pocket and a beautiful contrasting green tassel charm with a wooden bead. Elegant metal 'Dhaaga' logo plate on the front.",
    badge: "Best Seller",
    price: 699,
    originalPrice: 2799,
  },
  "2": {
    name: "Dhaaga Scenic Embroidered Canvas Handbag",
    details: "Beautifully crafted landscape painting with 3D floral and tree embroidery on a durable canvas body. Sturdy brown faux-leather top handles. A perfect blend of traditional handiwork and modern utility. Subtle 'Dhaaga' metal plate tag on the front.",
    badge: "Signature",
    price: 849,
    originalPrice: 3399,
  },
  "3": {
    name: "Lino Perros Dual-Tone Satchel with Silk Scarf",
    details: "Sophisticated tan and white color-block combination with a stylish printed silk-like scarf wrapped beautifully around the handle. Features a single top handle and a thick branded woven shoulder strap for crossbody wear. Premium silver-tone hardware.",
    badge: "New",
    price: 799,
    originalPrice: 3199,
  },
  "4": {
    name: "Lino Perros Black Contrast-Stitch Tote Bag",
    details: "Sleek black exterior with striking white contrast stitching. Features a convenient front zipper pocket with a long pull tab. Side belt and buckle accents for an edgy structured look. Comfortable dual shoulder straps.",
    badge: "Popular",
    price: 749,
    originalPrice: 2999,
  },
  "5": {
    name: "Lino Perros Minimalist Black Nylon Sling Bag",
    details: "Lightweight and durable nylon/fabric body, perfect for daily use. Curved top silhouette with a subtle front flap detail. Adjustable woven fabric strap with silver hardware clips. Secure top zipper closure to keep essentials safe.",
    badge: "Trending",
    price: 599,
    originalPrice: 2399,
  },
  "6": {
    name: "Lino Perros Taupe Structured Shoulder Tote",
    details: "Clean taupe exterior with a structured professional silhouette. Contrasting brown straps that extend stylishly down the body of the bag. Fine white contrast stitching along the base and straps. Large main compartment ideal for work or everyday essentials.",
    badge: "Best Seller",
    price: 849,
    originalPrice: 3399,
  },
  "7": {
    name: "Lino Perros Coffee Brown Flap Messenger Bag",
    details: "Rich coffee brown faux-leather finish with a smooth flap closure. Includes a wide woven strap for comfort and a slim adjustable strap for a classic look. Features a matching removable luggage-tag style charm. Metallic Lino Perros logo centered on the front flap.",
    badge: "New",
    price: 749,
    originalPrice: 2999,
  },
  "8": {
    name: "Lino Perros Beige Classic Trapezoid Tote",
    details: "Elegant trapezoid silhouette offering a roomy interior. Neutral beige body complemented by rich brown shoulder straps. Luxurious gold-tone rectangular hardware connecting the straps. Perfect for both office wear and casual outings.",
    badge: "Signature",
    price: 899,
    originalPrice: 3599,
  },
  "9": {
    name: "Lino Perros Canvas Tote with Whipstitch Detailing",
    details: "Stylish combination of breathable beige canvas and brown faux-leather trims with a distinctive curved top edge. Easily accessible front slip pocket secured with a braided/whipstitch detailed leather flap. Long comfortable shoulder straps integrated seamlessly into the design.",
    badge: "Popular",
    price: 799,
    originalPrice: 3199,
  },
  "10": {
    name: "Lino Perros Beige Multi-Pocket Utility Sling Bag",
    details: "Multiple zipped compartments including a front pouch for easy organization. Matching tassel details on the zipper pulls. Features a short top handle and a detachable adjustable woven crossbody strap. Soft lightweight and durable fabric ideal for travel or busy days.",
    badge: "Trending",
    price: 649,
    originalPrice: 2599,
  },
  "11": { name: "Lino Perros Coffee Brown Woven Crossbody Bag", details: "Textured woven exterior in rich coffee brown with adjustable crossbody strap and premium hardware accents.", badge: "New", price: 699, originalPrice: 2799 },
  "12": { name: "Lino Perros Beige Bow-Accent Handbag", details: "Elegant beige handbag with a chic bow accent and structured silhouette. Spacious interior with inner pockets.", badge: "Popular", price: 749, originalPrice: 2999 },
  "13": { name: "Lino Perros Monroe Beige Accent Tote Bag", details: "Classic Monroe-style tote in beige with signature accent detailing and comfortable dual carry straps.", badge: "Best Seller", price: 799, originalPrice: 3199 },
  "14": { name: "Lino Perros Avril Classic Beige Tote with Scarf", details: "Timeless Avril-style tote with a matching printed scarf accessory tied on the handle for a chic finish.", badge: "Signature", price: 849, originalPrice: 3399 },
  "15": { name: "Lino Perros Beige Knot-Handle Slouch Bag", details: "Relaxed slouch silhouette with stylish knotted top handles and a soft, flexible body in neutral beige.", badge: "Trending", price: 699, originalPrice: 2799 },
  "16": { name: "Lino Perros Dual-Tone Flap Crossbody Bag", details: "Sophisticated dual-tone color-blocked flap bag with a secure magnetic closure and adjustable strap.", badge: "New", price: 749, originalPrice: 2999 },
  "17": { name: "Lino Perros Avril Dark Brown Classic Tote", details: "Rich dark brown Avril-style tote with structured body, gold-tone hardware, and spacious interior.", badge: "Popular", price: 849, originalPrice: 3399 },
  "18": { name: "Lino Perros Off-White Structured Handbag", details: "Crisp off-white structured handbag with clean lines and premium finishing. Versatile for both formal and casual use.", badge: "Best Seller", price: 799, originalPrice: 3199 },
  "19": { name: "Lino Perros Coffee Textured Top Handle Bag", details: "Textured coffee-tone top handle bag with contrasting trims and a roomy interior compartment.", badge: "New", price: 749, originalPrice: 2999 },
  "20": { name: "Dhaaga Multicolor Embroidered Shoulder Bag", details: "Vibrant multicolor embroidered shoulder bag with artisanal threadwork and comfortable padded straps.", badge: "Signature", price: 899, originalPrice: 3599 },
  "21": { name: "Dhaaga Boho Printed Canvas Tote", details: "Boho-chic printed canvas tote with earthy tones and sturdy handles. Perfect for everyday casual outings.", badge: "Popular", price: 699, originalPrice: 2799 },
  "22": { name: "Dhaaga Woven Jute Tote Bag", details: "Eco-friendly woven jute tote with colorful embroidered accents. Spacious and sustainable.", badge: "Trending", price: 599, originalPrice: 2399 },
  "23": { name: "Designer Floral Embroidered Clutch Bag", details: "Compact floral embroidered clutch with a metal frame clasp. Elegant enough for festive occasions.", badge: "New", price: 499, originalPrice: 1999 },
  "24": { name: "Lino Perros Cherry Red Structured Tote", details: "Bold cherry red structured tote with gold-tone hardware and spacious dual compartments.", badge: "Best Seller", price: 849, originalPrice: 3399 },
  "25": { name: "Lino Perros Tan Leather-Trim Tote", details: "Classic tan tote with premium leather trims and comfortable shoulder straps.", badge: "Popular", price: 799, originalPrice: 3199 },
  "26": { name: "Lino Perros Tan Trapezoid Shoulder Bag", details: "Elegant trapezoid-shaped shoulder bag in tan with signature Lino Perros hardware accents.", badge: "Signature", price: 849, originalPrice: 3399 },
  "27": { name: "Lino Perros Beige Flap Shoulder Bag", details: "Minimalist beige flap shoulder bag with magnetic closure and adjustable strap.", badge: "New", price: 749, originalPrice: 2999 },
  "28": { name: "Lino Perros Beige Woven Detail Tote", details: "Stylish beige tote with woven panel detailing and gold-tone ring connectors.", badge: "Trending", price: 799, originalPrice: 3199 },
  "29": { name: "Lino Perros Coffee Zipper Sling Bag", details: "Compact coffee-tone sling bag with multiple zip compartments and an adjustable crossbody strap.", badge: "Popular", price: 649, originalPrice: 2599 },
  "30": { name: "Lino Perros Coffee Flap Crossbody Bag", details: "Smooth coffee-finish faux leather flap crossbody with premium buckle hardware.", badge: "New", price: 699, originalPrice: 2799 },
  "31": { name: "Lino Perros Beige Canvas Utility Sling", details: "Lightweight beige canvas sling with practical compartments perfect for daily essentials.", badge: "Best Seller", price: 599, originalPrice: 2399 },
  "32": { name: "Lino Perros Off-White Flap Sling Bag", details: "Clean off-white flap sling with minimalist design and adjustable strap.", badge: "Popular", price: 649, originalPrice: 2599 },
  "33": { name: "Ethnic Embroidered Potli Bag", details: "Traditional potli bag with rich ethnic embroidery. Perfect for festive and wedding occasions.", badge: "Festive", price: 549, originalPrice: 2199 },
  "34": { name: "Dhaaga Indigo Block Print Shoulder Bag", details: "Beautiful indigo block-printed shoulder bag with a structured body and wooden button closure.", badge: "Signature", price: 749, originalPrice: 2999 },
  "35": { name: "Dhaaga Printed Sling Bag with Tassel", details: "Artisanal printed sling bag adorned with colorful tassel charm and adjustable fabric strap.", badge: "New", price: 649, originalPrice: 2599 },
  "36": { name: "Dhaaga Ethnic Printed Handbag", details: "Vibrant ethnic-printed handbag with sturdy handles and spacious interior.", badge: "Popular", price: 699, originalPrice: 2799 },
  "37": { name: "Handmade Embroidered Clutch Purse", details: "Hand-embroidered clutch purse with colorful floral motifs and a zip closure.", badge: "Trending", price: 499, originalPrice: 1999 },
  "38": { name: "Handmade Mini Bucket Bag", details: "Cute mini bucket bag with a drawstring top and crossbody strap. A fun everyday companion.", badge: "New", price: 549, originalPrice: 2199 },
  "39": { name: "Dhaaga Rust Printed Canvas Sling", details: "Rust-toned canvas sling with ethnic motif prints and metal snap closure.", badge: "Best Seller", price: 649, originalPrice: 2599 },
  "40": { name: "Dhaaga Boho Embroidered Tote", details: "Bohemian embroidered tote with earthy tones and practical double handles.", badge: "Signature", price: 749, originalPrice: 2999 },
  "41": { name: "Dhaaga Patchwork Shoulder Bag", details: "Charming patchwork-design shoulder bag combining multiple fabrics for a unique artisanal look.", badge: "Popular", price: 699, originalPrice: 2799 },
  "42": { name: "Ethnic Potli Drawstring Bag", details: "Classic potli drawstring bag with rich fabric and decorative tassel. Ideal for festive styling.", badge: "Festive", price: 499, originalPrice: 1999 },
  "43": { name: "Round Sling Saddle Bag", details: "Modern round saddle sling bag with buckle flap and adjustable leather strap.", badge: "Trending", price: 599, originalPrice: 2399 },
  "44": { name: "Dhaaga Structured Flap Mini Bag", details: "Compact structured flap mini bag with contrasting trim and signature metal logo.", badge: "New", price: 649, originalPrice: 2599 },
  "45": { name: "Woven Raffia Shoulder Bag", details: "Chic woven raffia shoulder bag with leather trim handles. Perfect for summer outings.", badge: "Popular", price: 699, originalPrice: 2799 },
  "46": { name: "Beaded Embroidered Clutch", details: "Glamorous beaded embroidered clutch for parties and festive evenings.", badge: "Festive", price: 549, originalPrice: 2199 },
  "47": { name: "Classic Structured Handbag", details: "Timeless structured handbag in neutral tones with top handle and detachable strap.", badge: "Best Seller", price: 799, originalPrice: 3199 },
  "48": { name: "Large Shopper Tote Bag", details: "Spacious shopper tote with reinforced handles and inner organizer pockets.", badge: "New", price: 749, originalPrice: 2999 },
  "49": { name: "Mini Crossbody Compact Bag", details: "Compact mini crossbody with zip closure and long adjustable strap. Great for outings.", badge: "Trending", price: 599, originalPrice: 2399 },
  "50": { name: "Half-Moon Crescent Shoulder Bag", details: "Trendy half-moon crescent shaped shoulder bag with leather strap.", badge: "Popular", price: 649, originalPrice: 2599 },
  "51": { name: "Square Top-Handle Mini Bag", details: "Structured square mini bag with a rigid top handle and gold-tone clasp.", badge: "Signature", price: 699, originalPrice: 2799 },
  "52": { name: "Retro Flap Shoulder Bag", details: "Retro-inspired flap shoulder bag with vintage metal clasp and chain strap.", badge: "New", price: 649, originalPrice: 2599 },
  "53": { name: "Large Casual Hobo Bag", details: "Relaxed hobo silhouette with soft body and shoulder strap. Great for daily casual use.", badge: "Best Seller", price: 749, originalPrice: 2999 },
  "54": { name: "Structured Boxy Satchel Bag", details: "Boxy satchel with dual compartments, front zip pocket, and comfortable handles.", badge: "Popular", price: 799, originalPrice: 3199 },
  "55": { name: "Woven Bucket Bag", details: "Stylish woven bucket bag with drawstring top and leather-trim base.", badge: "Trending", price: 699, originalPrice: 2799 },
  "56": { name: "Textured Flap Mini Crossbody", details: "Textured-finish mini crossbody with flap closure and adjustable chain strap.", badge: "New", price: 599, originalPrice: 2399 },
  "57": { name: "Casual Zip-Around Shoulder Bag", details: "Practical zip-around shoulder bag with multiple outer pockets.", badge: "Popular", price: 699, originalPrice: 2799 },
  "58": { name: "Structured Envelope Clutch", details: "Sleek envelope clutch with magnetic snap and wrist loop. Ideal for formal events.", badge: "Festive", price: 549, originalPrice: 2199 },
  "59": { name: "Compact Camera Crossbody Bag", details: "Small camera-style crossbody with secure zip-top closure and adjustable strap.", badge: "New", price: 599, originalPrice: 2399 },
  "60": { name: "Classic Saddle Crossbody Bag", details: "Timeless saddle crossbody with flap closure and long adjustable strap.", badge: "Best Seller", price: 699, originalPrice: 2799 },
  "61": { name: "Structured Open-Top Tote", details: "Open-top structured tote with rigid handles and a spacious main compartment.", badge: "Signature", price: 749, originalPrice: 2999 },
  "62": { name: "Color-Block Sling Bag", details: "Eye-catching color-block sling bag with contrast panels and adjustable strap.", badge: "Trending", price: 649, originalPrice: 2599 },
  "63": { name: "Designer Chain Strap Shoulder Bag", details: "Chic shoulder bag with a gold-tone chain strap and structured flap closure.", badge: "Popular", price: 799, originalPrice: 3199 },
  "64": { name: "Lino Perros Tan Multi-Pocket Sling", details: "Functional tan sling bag with multiple exterior pockets and woven strap.", badge: "New", price: 699, originalPrice: 2799 },
  "65": { name: "Lino Perros Coffee Compact Sling Bag", details: "Compact coffee-tone sling with flap closure and adjustable woven strap.", badge: "Best Seller", price: 649, originalPrice: 2599 },
  "66": { name: "Lino Perros Tan Structured Tote Bag", details: "Premium tan structured tote with leather trim and gold-tone hardware.", badge: "Signature", price: 849, originalPrice: 3399 },
  "67": { name: "Lino Perros Taupe Sling Shoulder Bag", details: "Elegant taupe sling bag with minimalist design and adjustable strap.", badge: "Popular", price: 699, originalPrice: 2799 },
  "68": { name: "Lino Perros Tan Zip-Top Handbag", details: "Classic tan handbag with zip-top closure and dual carry handles.", badge: "New", price: 799, originalPrice: 3199 },
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
  // ── Rajputi Posak: use rich per-product data ─────────────────────────────
  if (prod.category === "Rajputi Posak") {
    const folderKey = prod.folder.trim();
    const posak = RAJPUTI_PRODUCTS[folderKey];
    if (posak) {
      return {
        id: prod.id,
        name: posak.name,
        category: "Rajputi Posak",
        price: posak.price,
        originalPrice: posak.originalPrice,
        image: prod.images[0],
        gallery: prod.images,
        tone: posak.details.slice(0, 80) + "…",
        details: posak.details,
        bestFor: posak.bestFor,
        sizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
        badge: posak.badge,
      };
    }
    // Fallback for unknown Rajputi folders
    return {
      id: prod.id,
      name: `Royal Rajputi Poshak (${prod.folder})`,
      category: "Rajputi Posak",
      price: 1499,
      originalPrice: 5999,
      image: prod.images[0],
      gallery: prod.images,
      tone: "Ceremonial Rajputi Poshak with traditional craftsmanship",
      details: "Exquisite Rajputi Poshak crafted for special occasions, featuring premium fabric and authentic Rajasthani heritage craftsmanship.",
      sizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
      badge: "New",
    };
  }

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

  // ── Purse category: use rich per-product data ─────────────────────────────
  if (prod.category === "Purse") {
    const folderNum = prod.folder.trim();
    const purseData = PURSE_PRODUCTS[folderNum];
    if (purseData) {
      return {
        id: prod.id,
        name: purseData.name,
        category: "Purse",
        price: purseData.price,
        originalPrice: purseData.originalPrice,
        image: prod.images[0],
        gallery: prod.images,
        tone: purseData.details.slice(0, 80) + "…",
        details: purseData.details,
        sizes: [], // No size selection for purses/bags
        badge: purseData.badge,
        isPurse: true,
      };
    }
    // Fallback for unknown purse folders
    return {
      id: prod.id,
      name: `Stylish Bag (${prod.folder})`,
      category: "Purse",
      price: 699,
      originalPrice: 2799,
      image: prod.images[0],
      gallery: prod.images,
      tone: "Chic and functional bag for everyday use",
      details: "A stylish and functional bag crafted with premium materials. Perfect for everyday use, outings, and special occasions.",
      sizes: [],
      badge: "New",
      isPurse: true,
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
