export type ProductCategory = 'most-sold-out' | 'seasonal' | 'best-of-year';
export type RiskLevel = 'green' | 'yellow' | 'red';

export interface ProductReview {
  author: string;
  location: string;
  role: string;
  rating: number;
  comment: string;
}

export interface Product {
  id: string;
  title: string;
  brand: string;
  seller: string;
  sellerLocation: string;
  sellerVerified: boolean;
  maffLicense: string;
  price: number;
  unit: string;
  rating: number;
  reviewCount: number;
  category: ProductCategory;
  categoryBadge: string;
  riskLevel: RiskLevel;
  riskLabel: string;
  riskDescription: string;
  npkRatio: string;
  suitability: string;
  targetCrops: string[];
  imageUrl: string;
  stockStatus: string;
  inStock: boolean;
  stockRemaining?: number;
  highlightTag: string;
  // Deep Agronomic & Market Intelligence Details
  applicationGuide: string;
  dosageRate: string;
  soilPhRange: string;
  leachingResistance: string;
  reviews: ProductReview[];
}

export const PRODUCTS: Product[] = [
  // =========================================================================
  // 1. THE MOST SOLD OUT FERTILIZERS
  // =========================================================================
  {
    id: 'p-1',
    title: 'Phosphate-Rich Super 16-16-8+TE',
    brand: 'Angkor SuperFert',
    seller: 'Angkor Agri Supply Co.',
    sellerLocation: 'Battambang Main Depot',
    sellerVerified: true,
    maffLicense: 'MAFF-FERT-2024-8841',
    price: 34.5,
    unit: '50kg Bag',
    rating: 4.9,
    reviewCount: 342,
    category: 'most-sold-out',
    categoryBadge: 'Most Sold Out',
    riskLevel: 'green',
    riskLabel: 'Low Market Risk • High Demand',
    riskDescription: 'Optimal soil moisture window. High inventory velocity across lowland agricultural basins.',
    npkRatio: '16-16-8 + Micro TE',
    suitability: 'Paddy Rice & Wet Season Basal Planting',
    targetCrops: ['Wet Rice', 'Corn', 'Cassava'],
    imageUrl: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=600&q=80',
    stockStatus: '98% Depleted',
    inStock: true,
    stockRemaining: 12,
    highlightTag: 'Fastest Selling',
    applicationGuide: 'Incorporate into puddled soil 1 day before transplanting or direct broadcasting. Ensures vigorous early tillering.',
    dosageRate: '150 - 200 kg / hectare (3 to 4 bags)',
    soilPhRange: 'pH 5.5 - 6.8 (Neutral to Slightly Acidic)',
    leachingResistance: 'High (Coated granules withstand heavy rainfall)',
    reviews: [
      {
        author: 'Sokha Chhay',
        location: 'Battambang (Moung Ruessei)',
        role: 'Commercial Rice Farmer (12 ha)',
        rating: 5,
        comment: 'Transplanted Phka Rumduol rice with this 16-16-8 batch. Yield jumped by 18% with strong root development.'
      },
      {
        author: 'Borith Keo',
        location: 'Siem Reap (Chikreng)',
        role: 'Agricultural Cooperative Leader',
        rating: 4.9,
        comment: 'Depot stock sells out within 2 days every season. Best basal fertilizer available in the province.'
      }
    ]
  },
  {
    id: 'p-2',
    title: 'Granular Urea 46% Pure Nitrogen',
    brand: 'Mekong Prime Agri',
    seller: 'Mekong Delta Agri-Trade',
    sellerLocation: 'Kandal Agro Hub',
    sellerVerified: true,
    maffLicense: 'MAFF-FERT-2024-5102',
    price: 28.0,
    unit: '50kg Bag',
    rating: 4.8,
    reviewCount: 480,
    category: 'most-sold-out',
    categoryBadge: 'Most Sold Out',
    riskLevel: 'yellow',
    riskLabel: 'Moderate Caution • Price Watch',
    riskDescription: 'High nitrogen demand across lowland zones. Next import vessel docking next week; maintain price caution.',
    npkRatio: '46-0-0',
    suitability: 'Vegetative Growth & Leaf Surface Rapid Expansion',
    targetCrops: ['Leafy Vegetables', 'Paddy Tillering', 'Sugarcane'],
    imageUrl: 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&w=600&q=80',
    stockStatus: 'Only 18 Bags Left',
    inStock: true,
    stockRemaining: 18,
    highlightTag: 'Limited Depot Stock',
    applicationGuide: 'Top-dress during maximum tillering and panicle initiation. Apply in standing water 2-3 cm for best nitrogen uptake.',
    dosageRate: '80 - 120 kg / hectare (Split into 2 applications)',
    soilPhRange: 'pH 5.0 - 7.5 (Broad compatibility)',
    leachingResistance: 'Medium (Avoid applying directly before unseasonal flash floods)',
    reviews: [
      {
        author: 'Phanith Vong',
        location: 'Kandal (Saang)',
        role: 'Vegetable Grower',
        rating: 4.8,
        comment: 'Pure white prills with zero caking. Leaves turned deep lush green within 48 hours of foliar application.'
      }
    ]
  },
  {
    id: 'p-3',
    title: 'Potassium Nitrate Soluble Booster',
    brand: 'Battambang BioCrop',
    seller: 'Battambang Crop Solutions',
    sellerLocation: 'Battambang South Hub',
    sellerVerified: true,
    maffLicense: 'MAFF-FERT-2024-9912',
    price: 42.0,
    unit: '25kg Sack',
    rating: 4.9,
    reviewCount: 215,
    category: 'most-sold-out',
    categoryBadge: 'Most Sold Out',
    riskLevel: 'green',
    riskLabel: 'Low Market Risk • High Demand',
    riskDescription: 'Critical pre-harvest cell hardening driver. Depot reserves almost completely booked by fruit orchardists.',
    npkRatio: '13-0-45',
    suitability: 'Grain Hardening, Sweetness & Yield Density',
    targetCrops: ['Fragrant Rice', 'Cassava', 'Durian', 'Watermelon'],
    imageUrl: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&w=600&q=80',
    stockStatus: 'Only 6 Sacks Left',
    inStock: true,
    stockRemaining: 6,
    highlightTag: 'Flash Stock Alert',
    applicationGuide: 'Dissolve in clean spray tank for foliar misting or drip fertigation during grain filling / fruit bulking.',
    dosageRate: '25 - 50 kg / hectare via fertigation or 500g per 100L spray',
    soilPhRange: 'pH 6.0 - 7.2',
    leachingResistance: 'High (Fully systemic plant uptake within 4 hours)',
    reviews: [
      {
        author: 'Dara Heng',
        location: 'Kampot (Tuek Chhou)',
        role: 'Durian Producer',
        rating: 5,
        comment: 'Fruit weight and flesh brix sweetness increased significantly. Zero fruit cracking this season.'
      }
    ]
  },

  // =========================================================================
  // 2. EFFECTIVE FERTILIZERS FOR THIS SEASON
  // =========================================================================
  {
    id: 'p-4',
    title: 'Monsoon Balance NPK 15-15-15 Slow-Release',
    brand: 'Tonle Sap BioTech',
    seller: 'Tonle Sap Agro Supply',
    sellerLocation: 'Siem Reap Logistics Hub',
    sellerVerified: true,
    maffLicense: 'MAFF-FERT-2024-4419',
    price: 36.0,
    unit: '50kg Bag',
    rating: 4.9,
    reviewCount: 310,
    category: 'seasonal',
    categoryBadge: 'This Season Match',
    riskLevel: 'green',
    riskLabel: 'Low Market Risk • Monsoon Match',
    riskDescription: 'Polymer coated granules prevent nitrogen washout during heavy seasonal downpours.',
    npkRatio: '15-15-15 + Polymer Coat',
    suitability: 'Rainfed Lowland Rice & Floodplain Agriculture',
    targetCrops: ['Monsoon Rice', 'Maize', 'Soybean'],
    imageUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80',
    stockStatus: 'Fresh Season Batch',
    inStock: true,
    highlightTag: 'Seasonal Recommendation',
    applicationGuide: 'Uniformly broadcast across wet fields. Polymer coating steadily releases balanced NPK over 60 days.',
    dosageRate: '200 - 250 kg / hectare',
    soilPhRange: 'pH 5.2 - 6.8',
    leachingResistance: 'Very High (Engineered specifically for monsoon precipitation)',
    reviews: [
      {
        author: 'Chamnan Pich',
        location: 'Siem Reap (Puok)',
        role: 'Lowland Rice Farmer',
        rating: 5,
        comment: 'Heavy rains flooded our paddy for 4 days, but the slow-release granules held nutrients without washing away!'
      }
    ]
  },
  {
    id: 'p-5',
    title: 'Humic Acid Soil Revitalizer Complex',
    brand: 'Kompong Cham BioTech',
    seller: 'Kompong Cham AgroChem',
    sellerLocation: 'Kompong Cham Central',
    sellerVerified: false,
    maffLicense: 'MAFF-FERT-2024-7731',
    price: 24.0,
    unit: '20L Container',
    rating: 4.7,
    reviewCount: 142,
    category: 'seasonal',
    categoryBadge: 'This Season Match',
    riskLevel: 'yellow',
    riskLabel: 'Moderate Caution • Soil Test Advised',
    riskDescription: 'Unlocks fixed phosphorus in wet acidic soils (pH < 5.6) during early vegetative season.',
    npkRatio: 'Humic 15% + Fulvic 4%',
    suitability: 'Degraded Laterite & Heavy Acidic Clay',
    targetCrops: ['Pepper', 'Rubber', 'Cassava'],
    imageUrl: 'https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?auto=format&fit=crop&w=600&q=80',
    stockStatus: 'High Season Availability',
    inStock: true,
    highlightTag: 'Soil pH Neutralizer',
    applicationGuide: 'Dilute 1L into 200L water and drench tree baselines or furrow lines prior to organic fertilizer broadcast.',
    dosageRate: '10 - 20 Liters / hectare',
    soilPhRange: 'pH 4.5 - 5.8 (Strongly acidic soils)',
    leachingResistance: 'High (Binds organic carbon to soil clay particles)',
    reviews: [
      {
        author: 'Thy Vanna',
        location: 'Tbong Khmum (Memot)',
        role: 'Cassava Plantation Owner',
        rating: 4.7,
        comment: 'Loosened compacted red clay soil and improved fertilizer absorption by at least 25%.'
      }
    ]
  },
  {
    id: 'p-6',
    title: 'Zinc-Sulfate Micronutrient Foliar Spray',
    brand: 'Green Harvest Agro',
    seller: 'Green Harvest Agro Vending',
    sellerLocation: 'Pursat Farm Hub',
    sellerVerified: true,
    maffLicense: 'MAFF-FERT-2024-2190',
    price: 19.5,
    unit: '5kg Pail',
    rating: 4.6,
    reviewCount: 88,
    category: 'seasonal',
    categoryBadge: 'This Season Match',
    riskLevel: 'red',
    riskLabel: 'Red Alert • Severe Weather Advisory',
    riskDescription: 'Zone 4 drought alert: Apply foliar only with verified field irrigation access to avoid leaf scorch.',
    npkRatio: 'Zn 22% + S 16%',
    suitability: 'Rice Seedling Nursery & Young Transplants',
    targetCrops: ['Rice Seedlings', 'Citrus', 'Cashew'],
    imageUrl: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=600&q=80',
    stockStatus: 'In Stock',
    inStock: true,
    highlightTag: 'Nursery Formula',
    applicationGuide: 'Dissolve in cold water and spray during early morning before 9:00 AM to cure leaf chlorosis and stunting.',
    dosageRate: '2.5 - 5 kg / hectare foliar spray',
    soilPhRange: 'pH 6.5 - 8.0 (Alkaline and calcareous soils)',
    leachingResistance: 'Medium (Requires rainfall-free window for 3 hours post spray)',
    reviews: [
      {
        author: 'Sambath Lay',
        location: 'Pursat (Bakan)',
        role: 'Seed Nursery Specialist',
        rating: 4.6,
        comment: 'Cured yellow seedling tips in 5 days. Be sure to spray before the hot midday sun.'
      }
    ]
  },

  // =========================================================================
  // 3. THE BEST FERTILIZERS OF THE YEAR
  // =========================================================================
  {
    id: 'p-7',
    title: 'Gold Standard Bio-Organic EcoPellets',
    brand: 'Siem Reap Natural Agri',
    seller: 'Siem Reap Agronomy Ltd',
    sellerLocation: 'Siem Reap Eco Zone',
    sellerVerified: true,
    maffLicense: 'MAFF-FERT-2024-1002',
    price: 22.0,
    unit: '40kg Bag',
    rating: 5.0,
    reviewCount: 612,
    category: 'best-of-year',
    categoryBadge: 'Best of the Year',
    riskLevel: 'green',
    riskLabel: 'Low Market Risk • ★ 2025 Award',
    riskDescription: 'MAFF-certified organic formulation delivering average 22% yield gain and zero chemical runoff.',
    npkRatio: '4-3-3 + 65% Organic Matter',
    suitability: 'Export-Grade Crops & Regenerative Soil Building',
    targetCrops: ['Organic Rice', 'Kampot Pepper', 'Cashew', 'Mango'],
    imageUrl: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=600&q=80',
    stockStatus: 'Award Winner 2025',
    inStock: true,
    highlightTag: 'Farmer Choice #1',
    applicationGuide: 'Broadcast into topsoil during land preparation. Restores beneficial microflora and soil earthworm activity.',
    dosageRate: '400 - 600 kg / hectare (10 to 15 bags)',
    soilPhRange: 'pH 5.0 - 7.5 (Regulates extreme soils)',
    leachingResistance: 'Excellent (Composted humic matrix retains moisture)',
    reviews: [
      {
        author: 'Vireak Chan',
        location: 'Siem Reap (Banteay Srei)',
        role: 'Certified Organic Producer',
        rating: 5,
        comment: 'Voted best fertilizer by our farmer coop for 3 years running. Soil texture feels rich and fertile.'
      }
    ]
  },
  {
    id: 'p-8',
    title: 'DAP (Diammonium Phosphate) 18-46-0 Prime',
    brand: 'Prasat Agri-Chemical',
    seller: 'Prasat Agri-Chemical Import',
    sellerLocation: 'Phnom Penh Industrial Zone',
    sellerVerified: true,
    maffLicense: 'MAFF-FERT-2024-3320',
    price: 46.5,
    unit: '50kg Bag',
    rating: 4.9,
    reviewCount: 780,
    category: 'best-of-year',
    categoryBadge: 'Best of the Year',
    riskLevel: 'yellow',
    riskLabel: 'Moderate Caution • Global Raw Material Watch',
    riskDescription: 'Consistently voted top basal root fertilizer by 1,200+ commercial grain producers.',
    npkRatio: '18-46-0 High P2O5',
    suitability: 'Deep Root Inoculation & Early Tillering',
    targetCrops: ['Rice', 'Maize', 'Sugarcane', 'Fruit Trees'],
    imageUrl: 'https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?auto=format&fit=crop&w=600&q=80',
    stockStatus: 'Top Rated Annual Performer',
    inStock: true,
    highlightTag: 'High Performance',
    applicationGuide: 'Place 5 cm below seed or seedling transplant zone. Immediate phosphorus release stimulates deep taproot penetration.',
    dosageRate: '100 - 150 kg / hectare',
    soilPhRange: 'pH 5.8 - 7.5',
    leachingResistance: 'High (Phosphorus strongly binds to soil mineral complex)',
    reviews: [
      {
        author: 'Rithy Kem',
        location: 'Takeo (Tram Kak)',
        role: 'Grain Multiplier',
        rating: 4.9,
        comment: 'Tremendous root proliferation. Young rice plants withstood early dry spells without yellowing.'
      }
    ]
  },
  {
    id: 'p-9',
    title: 'Quick-Acting Liquid Calcium-Boron Chelate',
    brand: 'Cardamom Bio-Nutrients',
    seller: 'Cardamom Bio-Nutrients',
    sellerLocation: 'Koh Kong Logistics Depot',
    sellerVerified: true,
    maffLicense: 'MAFF-FERT-2024-6681',
    price: 31.0,
    unit: '10L Canister',
    rating: 4.9,
    reviewCount: 425,
    category: 'best-of-year',
    categoryBadge: 'Best of the Year',
    riskLevel: 'green',
    riskLabel: 'Low Market Risk • High Demand',
    riskDescription: 'Eliminates blossom end rot, preventing up to 35% pre-harvest fruit drop.',
    npkRatio: 'Ca 16% + B 2.5% Chelate',
    suitability: 'Flowering & Fruit Setting Stages',
    targetCrops: ['Durian', 'Longan', 'Mango', 'Tomato'],
    imageUrl: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=600&q=80',
    stockStatus: 'Premium Grade Certified',
    inStock: true,
    highlightTag: 'Orchard Excellence',
    applicationGuide: 'Spray at 10% flower bloom and again 14 days after petal fall for maximum fruit retention.',
    dosageRate: '2 - 4 Liters / hectare diluted in 1000L water',
    soilPhRange: 'pH 5.5 - 7.0',
    leachingResistance: 'High (Chelated for immediate leaf stomata absorption)',
    reviews: [
      {
        author: 'Kosuke Meas',
        location: 'Battambang (Samlout)',
        role: 'Export Fruit Grower',
        rating: 5,
        comment: 'Essential for export-grade durian and longan. Shell firmness and shelf-life improved remarkably.'
      }
    ]
  },
  // Additional products for carousel demonstration
  {
    id: 'p-10',
    title: 'NPK 20-20-15+TE High Yield Complex',
    brand: 'Khmer Agro Boost',
    seller: 'Kandal Agro Hub',
    sellerLocation: 'Kandal Agro Hub',
    sellerVerified: true,
    maffLicense: 'MAFF-FERT-2024-8192',
    price: 37.5,
    unit: '50kg Bag',
    rating: 4.8,
    reviewCount: 198,
    category: 'most-sold-out',
    categoryBadge: 'Most Sold Out',
    riskLevel: 'green',
    riskLabel: 'Low Market Risk • High Demand',
    riskDescription: 'Rapidly absorbing NPK blend with chelated trace elements for high vegetative expansion.',
    npkRatio: '20-20-15 + TE',
    suitability: 'Paddy Rice, Maize, Commercial Vegetable Farming',
    targetCrops: ['Rice', 'Corn', 'Vegetables'],
    imageUrl: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=600&q=80',
    stockStatus: 'Only 14 Bags Left',
    inStock: true,
    stockRemaining: 14,
    highlightTag: 'High Potassium Focus',
    applicationGuide: 'Broadcast evenly prior to irrigation or secondary tilling.',
    dosageRate: '150 - 220 kg / hectare',
    soilPhRange: 'pH 5.5 - 7.2',
    leachingResistance: 'High',
    reviews: []
  },
  {
    id: 'p-11',
    title: 'Bio-Silicon Rice Husk Ash Soil Conditioner',
    brand: 'Mekong Eco Solutions',
    seller: 'Angkor Agri Supply Co.',
    sellerLocation: 'Battambang Main Depot',
    sellerVerified: true,
    maffLicense: 'MAFF-FERT-2024-9110',
    price: 18.0,
    unit: '40kg Bag',
    rating: 4.7,
    reviewCount: 114,
    category: 'most-sold-out',
    categoryBadge: 'Most Sold Out',
    riskLevel: 'green',
    riskLabel: 'Low Market Risk • Organic Certified',
    riskDescription: 'Strengthens rice stalk resistance against wind logging and stem borer insects.',
    npkRatio: 'Si 60% + Organic Carbon',
    suitability: 'Lowland Paddy Fields & Fragile Clay Soiling',
    targetCrops: ['Rice', 'Sugarcane'],
    imageUrl: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=600&q=80',
    stockStatus: 'Only 9 Bags Left',
    inStock: true,
    stockRemaining: 9,
    highlightTag: 'Stem Strengthening',
    applicationGuide: 'Mix with basal fertilizer during seedbed preparation.',
    dosageRate: '200 - 300 kg / hectare',
    soilPhRange: 'pH 5.0 - 7.5',
    leachingResistance: 'Very High',
    reviews: []
  },
  {
    id: 'p-12',
    title: 'Soluble Boron & Magnesium Foliar Elixir',
    brand: 'Tonle Sap BioTech',
    seller: 'Tonle Sap Agro Supply',
    sellerLocation: 'Siem Reap Logistics Hub',
    sellerVerified: true,
    maffLicense: 'MAFF-FERT-2024-6721',
    price: 26.5,
    unit: '5L Bottle',
    rating: 4.8,
    reviewCount: 92,
    category: 'seasonal',
    categoryBadge: 'This Season Match',
    riskLevel: 'green',
    riskLabel: 'Low Market Risk • High Demand',
    riskDescription: 'Prevents hollow-stem disorder and promotes high pollination rate during humid season.',
    npkRatio: 'B 10% + Mg 5%',
    suitability: 'Orchard Flowering & Vegetable Blossom Stage',
    targetCrops: ['Durian', 'Pepper', 'Chili', 'Tomato'],
    imageUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80',
    stockStatus: 'In Season High Supply',
    inStock: true,
    highlightTag: 'Pollination Booster',
    applicationGuide: 'Dilute 30ml per 20L knapsack sprayer and apply early morning.',
    dosageRate: '1 - 2 L / hectare',
    soilPhRange: 'pH 5.5 - 7.0',
    leachingResistance: 'High',
    reviews: []
  },
  {
    id: 'p-13',
    title: 'Controlled-Release NPK 19-9-19 Tropical Formula',
    brand: 'Battambang BioCrop',
    seller: 'Battambang Crop Solutions',
    sellerLocation: 'Battambang South Hub',
    sellerVerified: true,
    maffLicense: 'MAFF-FERT-2024-7834',
    price: 44.0,
    unit: '50kg Bag',
    rating: 5.0,
    reviewCount: 380,
    category: 'best-of-year',
    categoryBadge: 'Best of the Year',
    riskLevel: 'green',
    riskLabel: 'Low Market Risk • Top Grade Award',
    riskDescription: '90-day extended release cycle ensuring sustained nitrogen and potassium nutrition without burn.',
    npkRatio: '19-9-19 + PolyResin',
    suitability: 'High-Value Fruit Trees, Rubber & Pepper',
    targetCrops: ['Pepper', 'Durian', 'Mango', 'Rubber'],
    imageUrl: 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&w=600&q=80',
    stockStatus: 'Gold Standard 2025',
    inStock: true,
    highlightTag: '90-Day Sustained Release',
    applicationGuide: 'Bury in shallow circular trench around drip canopy perimeter.',
    dosageRate: '250 - 350g per mature tree',
    soilPhRange: 'pH 5.5 - 6.8',
    leachingResistance: 'Exceptional',
    reviews: []
  },
  {
    id: 'p-14',
    title: 'Seaweed Marine Extract Root Stimulator',
    brand: 'Siem Reap Natural Agri',
    seller: 'Siem Reap Agronomy Ltd',
    sellerLocation: 'Siem Reap Eco Zone',
    sellerVerified: true,
    maffLicense: 'MAFF-FERT-2024-1188',
    price: 29.0,
    unit: '10L Jug',
    rating: 4.9,
    reviewCount: 512,
    category: 'best-of-year',
    categoryBadge: 'Best of the Year',
    riskLevel: 'green',
    riskLabel: 'Low Market Risk • Organic Winner',
    riskDescription: 'Cold-water kelp extract rich in natural auxins, cytokinins, and organic betaines.',
    npkRatio: 'Pure Ascophyllum Nodosum Extract',
    suitability: 'All Crops Transplant Recovery & Drought Resistance',
    targetCrops: ['Rice', 'Cassava', 'Pepper', 'Fruit'],
    imageUrl: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&w=600&q=80',
    stockStatus: 'Agronomist Choice 2025',
    inStock: true,
    highlightTag: 'Transplant Inoculant',
    applicationGuide: 'Root dip before planting or spray foliage during early growth.',
    dosageRate: '2 - 3 L / hectare',
    soilPhRange: 'pH 5.0 - 7.5',
    leachingResistance: 'Very High',
    reviews: []
  }
];

export const REGIONS = [
  'Battambang Agricultural Basin',
  'Siem Reap & Tonle Sap Catchment',
  'Kandal & Mekong Delta Periphery',
  'Kampong Cham Cassava Belt',
  'Takeo Rice Production Cluster'
];
