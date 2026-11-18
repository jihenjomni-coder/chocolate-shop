export interface Chocolate {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  priceAED: number;
  weight: string;
  category: "Signature" | "Truffles" | "Pralines" | "Artisan Bars";
  badge?: string;
  image: string;
  cocoaPercent: string;
  notes: string[];
}

export const CHOCOLATES: Chocolate[] = [
  {
    id: "dubai-pistachio-kunafa",
    name: "Royal Dubai Pistachio & Kunafa Bar",
    subtitle: "Crispy golden kataifi & roasted Iranian pistachio cream",
    description:
      "Our viral signature creation: silky Belgian milk chocolate encasing crunchy toasted kataifi pastry folded into rich pistachio tahini praline and finished with edible 24K gold leaf dust.",
    priceAED: 85,
    weight: "200g",
    category: "Signature",
    badge: "Bestseller",
    image:
      "https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=900&q=85",
    cocoaPercent: "42% Milk Cocoa",
    notes: ["Roasted Pistachio", "Crispy Kataifi", "Caramelized Milk"],
  },
  {
    id: "saffron-24k-gold-truffles",
    name: "24K Gold & Saffron Ganache Truffles",
    subtitle: "Box of 9 hand-rolled saffron & cardamom truffles",
    description:
      "Velvety dark chocolate ganache infused with royal Khorasan saffron threads and freshly ground green cardamom, hand-dusted with shimmering gold.",
    priceAED: 120,
    weight: "180g (9 pcs)",
    category: "Truffles",
    badge: "24K Gold Edition",
    image:
      "https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&w=900&q=85",
    cocoaPercent: "68% Dark Cocoa",
    notes: ["Persian Saffron", "Green Cardamom", "Velvet Ganache"],
  },
  {
    id: "hazelnut-gianduja-rocher",
    name: "Piedmont Hazelnut Gianduja Rocher",
    subtitle: "Whole roasted hazelnuts in caramelized praline",
    description:
      "Whole IGP Piedmont hazelnuts folded into smooth gianduja chocolate and enrobed in a crisp shell of toasted hazelnut nibs and dark milk couverture.",
    priceAED: 95,
    weight: "190g (8 pcs)",
    category: "Pralines",
    badge: "Chef's Pick",
    image:
      "https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=900&q=85",
    cocoaPercent: "54% Dark-Milk",
    notes: ["Toasted Hazelnut", "Gianduja Cream", "Feuilletine Crunch"],
  },
  {
    id: "madagascar-single-origin-dark",
    name: "78% Sambirano Valley Single-Origin Bar",
    subtitle: "Intense dark artisan slab with bright berry notes",
    description:
      "Stone-ground from rare criollo and trinitario cacao beans harvested in Madagascar's Sambirano Valley, delivering deep cocoa complexity and a clean citrus-berry finish.",
    priceAED: 65,
    weight: "120g",
    category: "Artisan Bars",
    image:
      "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=900&q=85",
    cocoaPercent: "78% Single-Origin",
    notes: ["Red Berries", "Roasted Cacao", "Warm Spice"],
  },
  {
    id: "fleur-de-sel-caramel-bonbons",
    name: "Fleur de Sel Liquid Caramel Bonbons",
    subtitle: "Hand-painted golden domes with molten sea-salt caramel",
    description:
      "Delicate dark chocolate shells brushed with gold cocoa butter, filled with slow-cooked Amber normandy butter caramel and Guérande sea salt crystals.",
    priceAED: 110,
    weight: "160g (8 pcs)",
    category: "Truffles",
    badge: "Popular",
    image:
      "https://images.unsplash.com/photo-1587132137056-bfbf0166836e?auto=format&fit=crop&w=900&q=85",
    cocoaPercent: "64% Dark Shell",
    notes: ["Burnt Butter Caramel", "Fleur de Sel", "Madagascar Vanilla"],
  },
  {
    id: "damask-rose-pistachio-white",
    name: "Damask Rose & Crushed Pistachio Silk Bar",
    subtitle: "Caramelized white chocolate with organic rose petals",
    description:
      "Golden caramelized blonde & white couverture studded with organic Damask rose petals, Bronte pistachio slivers, and a whisper of sea salt.",
    priceAED: 75,
    weight: "140g",
    category: "Artisan Bars",
    image:
      "https://images.unsplash.com/photo-1623660053975-cf75a8be0908?auto=format&fit=crop&w=900&q=85",
    cocoaPercent: "36% Blonde & White",
    notes: ["Damask Rose", "Biscuit Caramel", "Emerald Pistachio"],
  },
  {
    id: "arabic-qahwa-medjool-praline",
    name: "Arabic Qahwa & Medjool Date Pralines",
    subtitle: "Emirati roasted coffee ganache & caramelized date heart",
    description:
      "A tribute to Arabian hospitality: lightly spiced Arabic coffee ganache layered over a jewel of organic Liwa Medjool date paste and walnut praline.",
    priceAED: 135,
    weight: "210g (12 pcs)",
    category: "Signature",
    badge: "Heritage Collection",
    image:
      "https://images.unsplash.com/photo-1542843137-8791a6904d14?auto=format&fit=crop&w=900&q=85",
    cocoaPercent: "62% Dark Couverture",
    notes: ["Arabic Coffee", "Liwa Medjool Date", "Toasted Walnut"],
  },
  {
    id: "macadamia-gold-praline-collection",
    name: "Royal Macadamia & Honeycomb Gold Box",
    subtitle: "Luxury gift assortment of caramelized nut pralines",
    description:
      "Crunchy Australian macadamia praline and golden wildflower honeycomb shards enveloped in velvety milk and dark chocolate, presented in our signature gold-foil gift box.",
    priceAED: 165,
    weight: "260g (16 pcs)",
    category: "Pralines",
    badge: "Luxury Gift Box",
    image:
      "https://images.unsplash.com/photo-1526081347589-7fa3cb41b4b2?auto=format&fit=crop&w=900&q=85",
    cocoaPercent: "48% & 70% Assorted",
    notes: ["Roasted Macadamia", "Wildflower Honeycomb", "Creamy Praline"],
  },
];
