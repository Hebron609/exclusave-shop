// src/data/products.js

// ✅ Import all images properly
import handheldFan from '@/assets/img/white-portable-handheld-fan.png'
import studyLamp from '@/assets/img/stylish-table-lamp.png'
import blender from '@/assets/img/portable-personal-blender.png'
import earbuds from '@/assets/img/wireless-headphones-case-white-isolated-background.png'
import iphoneFront from "@/assets/img/Iphone 15promax.jpg";
import iphoneSide from "@/assets/img/Iphone15promax-side.jpg";
import iphoneBack from "@/assets/img/Iphone15promax-back.jpg";
import samsung1 from "@/assets/img/samsung-phone.jpg";
import samsung2 from "@/assets/img/samsung-phone-2.jpg";
import samsung3 from "@/assets/img/samsung-phone-3.jpg";
import laptop from "@/assets/img/13inch-macbook-pro-m2-013.webp";
import tablet1 from "@/assets/img/iPad-Air-5th-Gen-back.webp";
import tablet2 from "@/assets/img/iPad-Air-5th-Gen-front.webp";

// ✅ Consistent product data
export const products = [
  {
    id: 1,
    name: 'Portable Handheld Fan',
    category: 'Technology',
    condition: 'New',
    description:
      'Compact USB rechargeable fan, perfect for students and office use.',
    price: 'GH₵ 59.99',
    images: [handheldFan],
  },
  {
    id: 2,
    name: 'Study LED Lamp',
    category: 'Technology',
    condition: 'New',
    description:
      'Energy-efficient LED desk lamp with adjustable brightness levels.',
    price: 'GH₵ 129.99',
    images: [studyLamp],
  },
  {
    id: 3,
    name: 'Portable Personal Blender',
    category: 'Home',
    condition: 'New',
    description:
      'Rechargeable blender for making smoothies and shakes on the go.',
    price: 'GH₵ 39.99',
    images: [blender],
  },
  {
    id: 4,
    name: 'Wireless Earbuds',
    category: 'Technology',
    condition: 'New',
    description:
      'High-quality sound and noise cancellation with long battery life.',
    price: 'GH₵ 49.99',
    images: [earbuds, iphoneSide, earbuds],
  },
  {
    id: 5,
    name: "iPhone 15 Pro Max",
    category: "Mobile Phones",
    condition: 'New',
    description:
      'Apple iPhone 15 Pro Max with A17 Pro chip, 6.7-inch Super Retina XDR display, and triple camera system.',
    price: "GH₵ 4599.99",
    images: [iphoneFront, iphoneSide, iphoneBack],
  },
  {
    id: 6,
    name: "Samsung Galaxy S22",
    category: "Mobile Phones",
    condition: 'New',
    description:
      'Samsung Galaxy S22 with AMOLED display, 8GB RAM, and 256GB storage — flagship performance.',
    price: "GH₵ 4899.99",
    images: [samsung1, samsung2, samsung3],
  },
  {
    id: 7,
    name: 'MacBook Pro M2',
    category: 'Technology',
    condition: 'New',
    description:
      'Apple MacBook Pro M2 Chip 13-inch, 8-core CPU and 10-core GPU for powerful performance.',
    price: 'GH₵ 12,499.00',
    images: [laptop, laptop, laptop],
  },
  {
    id: 8,
    name: 'iPad Air 5th Gen',
    category: 'Mobile Phones',
    condition: 'New',
    description:
      '10.9-inch display, M1 chip, and Apple Pencil support — perfect for students.',
    price: 'GH₵ 4,999.00',
    images: [tablet1, tablet2, tablet1],
  },
]
