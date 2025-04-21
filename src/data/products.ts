
export interface ProductData {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  images?: string[];
  category: string;
  description: string;
  isFeatured?: boolean;
  isNew?: boolean;
  sizes?: string[];
  colors?: string[];
  reviews?: {
    rating: number;
    count: number;
  };
  specifications?: {
    [key: string]: string;
  };
}

// Categories
export const categories = [
  { id: "clothing", name: "Clothing", image: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
  { id: "accessories", name: "Accessories", image: "https://images.unsplash.com/photo-1576053139778-7e37f6d76de7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
  { id: "makeup", name: "Makeup", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
  { id: "mens", name: "Men's Clothing", image: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" }
];

export const products: ProductData[] = [
  {
    id: "1",
    name: "Classic Silk Blouse",
    price: 79.99,
    originalPrice: 129.99,
    discount: 38,
    image: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583846782968-6ba762c119c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583846551200-9dcac0c8dd8a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    category: "clothing",
    description: "A timeless silk blouse that transitions seamlessly from office to evening. Crafted from 100% mulberry silk for a luxurious feel and elegant drape.",
    isFeatured: true,
    isNew: false,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White", "Black", "Navy"],
    reviews: {
      rating: 4.8,
      count: 124
    },
    specifications: {
      Material: "100% Mulberry Silk",
      Care: "Dry clean only",
      Origin: "Made in Italy",
      Fit: "Regular fit"
    }
  },
  {
    id: "2",
    name: "Designer Tote Bag",
    price: 149.99,
    originalPrice: 199.99,
    discount: 25,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    category: "accessories",
    description: "A spacious and stylish tote crafted from premium leather. Features a secure zip closure, multiple interior pockets, and a detachable shoulder strap.",
    isFeatured: true,
    isNew: true,
    colors: ["Tan", "Black", "Burgundy"],
    reviews: {
      rating: 4.9,
      count: 86
    },
    specifications: {
      Material: "Full-grain Italian leather",
      Dimensions: "14\" W x 11\" H x 5\" D",
      Features: "Inner laptop sleeve, zip pocket, card slots",
      Hardware: "Gold-tone metal hardware"
    }
  },
  {
    id: "3",
    name: "Luxury Lipstick Set",
    price: 54.99,
    originalPrice: 74.99,
    discount: 27,
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1591360236534-8c12e1e24d9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    category: "makeup",
    description: "This luxurious set includes three creamy, long-lasting lipstick shades that complement every skin tone. The formula is enriched with vitamins and natural oils for hydration.",
    isFeatured: false,
    isNew: true,
    colors: ["Ruby Red", "Soft Mauve", "Coral Pink"],
    reviews: {
      rating: 4.7,
      count: 213
    },
    specifications: {
      Finish: "Satin",
      Coverage: "Medium to full",
      Benefits: "Moisturizing, long-lasting, cruelty-free",
      Size: "0.12 oz each"
    }
  },
  {
    id: "4",
    name: "Premium Cashmere Sweater",
    price: 189.99,
    originalPrice: 249.99,
    discount: 24,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583846551199-e2f7932bf9c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583846552378-6c8ae95c294c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    category: "clothing",
    description: "Indulge in pure luxury with this 100% cashmere sweater. Features a classic crew neck, ribbed cuffs and hem, and a relaxed yet flattering fit.",
    isFeatured: true,
    isNew: false,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Camel", "Gray", "Navy", "Burgundy"],
    reviews: {
      rating: 4.9,
      count: 158
    },
    specifications: {
      Material: "100% Grade A Mongolian cashmere",
      Care: "Hand wash cold or dry clean",
      Weight: "12-gauge knit",
      Style: "Relaxed fit with ribbed trim"
    }
  },
  {
    id: "5",
    name: "Men's Italian Leather Boots",
    price: 259.99,
    originalPrice: 329.99,
    discount: 21,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1607522370275-f14c93dd7f72?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    category: "mens",
    description: "Handcrafted in Italy, these premium leather boots combine style and durability. Features a Goodyear welt construction, leather lining, and rubber sole for all-day comfort.",
    isFeatured: false,
    isNew: false,
    sizes: ["7", "8", "9", "10", "11", "12"],
    colors: ["Brown", "Black"],
    reviews: {
      rating: 4.8,
      count: 92
    },
    specifications: {
      Material: "Full-grain Italian calfskin leather",
      Construction: "Goodyear welted",
      Sole: "Rubber",
      Lining: "Full leather lining"
    }
  },
  {
    id: "6",
    name: "Diamond Stud Earrings",
    price: 499.99,
    originalPrice: 699.99,
    discount: 29,
    image: "https://images.unsplash.com/photo-1585559700398-1385b3a8aeb5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1585559700398-1385b3a8aeb5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1589128777073-263566ae5e4d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    category: "accessories",
    description: "Timeless elegance meets modern sophistication with these classic diamond stud earrings. Set in 14k white gold with a secure screw back closure.",
    isFeatured: true,
    isNew: false,
    reviews: {
      rating: 5.0,
      count: 64
    },
    specifications: {
      Material: "14k White Gold",
      Diamond: "0.5 carat total weight, VS clarity, F-G color",
      Setting: "4-prong",
      Closure: "Screw back"
    }
  },
  {
    id: "7",
    name: "Luxury Foundation",
    price: 42.99,
    originalPrice: 52.99,
    discount: 19,
    image: "https://images.unsplash.com/photo-1599733594230-5cd05e31c2d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1599733594230-5cd05e31c2d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600612253971-422e7f7faeb6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1617897903246-719242758050?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    category: "makeup",
    description: "This breathable, buildable foundation delivers flawless coverage while nourishing your skin. Formulated with hyaluronic acid and vitamin E for all-day hydration.",
    isFeatured: false,
    isNew: true,
    colors: ["Fair", "Light", "Medium", "Tan", "Deep"],
    reviews: {
      rating: 4.6,
      count: 327
    },
    specifications: {
      Finish: "Natural satin",
      Coverage: "Medium to full, buildable",
      Benefits: "Hydrating, oil-free, non-comedogenic",
      Size: "1.0 fl oz"
    }
  },
  {
    id: "8",
    name: "Men's Tailored Suit",
    price: 599.99,
    originalPrice: 799.99,
    discount: 25,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1592878849122-5c6d3589e1a8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    category: "mens",
    description: "This impeccably tailored wool suit features a modern slim fit, notch lapels, and a two-button closure. Includes matching trousers with a flat front and tailored leg.",
    isFeatured: true,
    isNew: false,
    sizes: ["38R", "40R", "42R", "44R", "46R", "48R"],
    colors: ["Charcoal", "Navy", "Black"],
    reviews: {
      rating: 4.8,
      count: 73
    },
    specifications: {
      Material: "Super 120s Italian wool",
      Lining: "Full silk lining",
      Closure: "Two-button jacket",
      Pockets: "Flap pockets, interior pockets"
    }
  }
];
