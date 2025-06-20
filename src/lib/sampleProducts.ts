import { Product } from '../types';

// Generate a large number of sample products
export const generateSampleProducts = () => {
  const categories = ['vr', 'audio', 'monitors', 'accessories', 'smart-home', 'cameras', 'networking', 'laptops', 'gaming', 'phones', 'tablets', 'printers'];
  const productTypes = {
    vr: ['VR Headset', 'AR Glasses', 'Motion Controllers', 'VR Accessories'],
    audio: ['Headphones', 'Speakers', 'Microphones', 'Sound Cards', 'Earbuds'],
    monitors: ['Gaming Monitor', 'Ultrawide Display', '4K Monitor', 'Professional Display'],
    accessories: ['Gaming Mouse', 'Mechanical Keyboard', 'Mouse Pad', 'USB Hub'],
    'smart-home': ['Smart Speaker', 'Security Camera', 'Smart Thermostat', 'Smart Lights'],
    cameras: ['DSLR Camera', 'Mirrorless Camera', 'Action Camera', 'Webcam'],
    networking: ['WiFi Router', 'Network Switch', 'Mesh System', 'Network Card'],
    laptops: ['Gaming Laptop', 'Ultrabook', 'Workstation', 'Chromebook'],
    gaming: ['Gaming Console', 'Controller', 'Gaming Chair', 'Gaming Desk'],
    phones: ['Smartphone', 'Phone Case', 'Screen Protector', 'Phone Charger'],
    tablets: ['iPad', 'Android Tablet', 'Drawing Tablet', 'Tablet Stand'],
    printers: ['Laser Printer', '3D Printer', 'Photo Printer', 'All-in-One']
  };

  const products: Product[] = [];
  let id = 1;

  // Generate 800-1000 products
  const targetCount = Math.floor(Math.random() * (1000 - 800 + 1)) + 800;

  while (products.length < targetCount) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const productType = productTypes[category][Math.floor(Math.random() * productTypes[category].length)];
    const brand = ['TechPro', 'NextGen', 'Elite', 'Prime', 'Ultra', 'Pro', 'Max', 'Advanced'][Math.floor(Math.random() * 8)];
    const model = ['X', 'Pro', 'Elite', 'Plus', 'Max', 'Ultra', 'S', 'Premium'][Math.floor(Math.random() * 8)];
    const year = 2024 + Math.floor(Math.random() * 2);

    const name = `${brand} ${productType} ${model} ${year}`;
    const price = Math.floor(Math.random() * (2000 - 50 + 1)) + 50;
    const stock = Math.floor(Math.random() * 100) + 1;

    // Use category-specific image URLs that we know exist
    const imageUrls = {
      vr: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac',
      audio: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb',
      monitors: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf',
      accessories: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46',
      'smart-home': 'https://images.unsplash.com/photo-1558002038-1055907df827',
      cameras: 'https://images.unsplash.com/photo-1589872307379-0ffdf9829123',
      networking: 'https://images.unsplash.com/photo-1648412814506-fb5c0c0f59cf',
      laptops: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853',
      gaming: 'https://images.unsplash.com/photo-1542751371-adc38448a05e',
      phones: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9',
      tablets: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0',
      printers: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6'
    };

    products.push({
      id,
      name,
      description: `Experience the next level of technology with the ${name}. Featuring advanced capabilities and premium build quality.`,
      price,
      image_url: `${imageUrls[category]}?auto=format&fit=crop&w=800&q=80`,
      category,
      stock,
      created_at: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString()
    });

    id++;
  }

  return products;
};