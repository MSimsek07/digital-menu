import type { Category, Meal } from './types';

export const categories: Category[] = [
  {
    id: 'ana-yemekler',
    name: 'Ana Yemekler',
    imageUrl: 'https://placehold.co/600x400',
  },
  {
    id: 'corbalar',
    name: 'Çorbalar',
    imageUrl: 'https://placehold.co/600x400',
  },
  {
    id: 'tatlilar',
    name: 'Tatlılar',
    imageUrl: 'https://placehold.co/600x400',
  },
  {
    id: 'icecekler',
    name: 'İçecekler',
    imageUrl: 'https://placehold.co/600x400',
  },
];

export const meals: Meal[] = [
  // Ana Yemekler
  {
    id: 'adana-kebab',
    name: 'Adana Kebab',
    category: 'ana-yemekler',
    price: 250,
    description: 'Acılı, zırhta çekilmiş kuzu etinden yapılan, geleneksel bir lezzet. Közlenmiş domates, biber ve sumaklı soğan ile servis edilir.',
    ingredients: ['Kuzu eti', 'Kuyruk yağı', 'Pul biber', 'Tuz'],
    imageUrl: 'https://placehold.co/800x600',
  },
  {
    id: 'iskender-kebab',
    name: 'İskender Kebab',
    category: 'ana-yemekler',
    price: 280,
    description: 'Döner etinin, pide parçaları üzerinde, domates sosu ve tereyağı ile sunulduğu, yoğurt eşliğinde servis edilen Bursa klasiği.',
    ingredients: ['Döner eti', 'Pide', 'Yoğurt', 'Domates sosu', 'Tereyağı'],
    imageUrl: 'https://placehold.co/800x600',
  },
  {
    id: 'karniyarik',
    name: 'Karnıyarık',
    category: 'ana-yemekler',
    price: 220,
    description: 'Kızartılmış patlıcanların, kıymalı iç harç ile doldurularak fırınlandığı, Türk mutfağının sevilen bir yemeğidir.',
    ingredients: ['Patlıcan', 'Kıyma', 'Soğan', 'Domates', 'Biber'],
    imageUrl: 'https://placehold.co/800x600',
  },

  // Çorbalar
  {
    id: 'mercimek-corbasi',
    name: 'Mercimek Çorbası',
    category: 'corbalar',
    price: 80,
    description: 'Kırmızı mercimek, soğan ve havuç ile hazırlanan, üzerine nane ve pul biberli tereyağı gezdirilerek servis edilen besleyici bir başlangıç.',
    ingredients: ['Kırmızı mercimek', 'Soğan', 'Havuç', 'Nane', 'Tereyağı'],
    imageUrl: 'https://placehold.co/800x600',
  },
  {
    id: 'yayla-corbasi',
    name: 'Yayla Çorbası',
    category: 'corbalar',
    price: 90,
    description: 'Yoğurt, pirinç ve nane ile hazırlanan, ferahlatıcı ve doyurucu bir çorba.',
    ingredients: ['Yoğurt', 'Pirinç', 'Nane', 'Yumurta', 'Un'],
    imageUrl: 'https://placehold.co/800x600',
  },

  // Tatlılar
  {
    id: 'baklava',
    name: 'Baklava',
    category: 'tatlilar',
    price: 150,
    description: 'İncecik açılmış yufkaların arasına Antep fıstığı veya ceviz serilerek yapılan, şerbetle tatlandırılan geleneksel bir tatlı.',
    ingredients: ['Yufka', 'Antep fıstığı', 'Şeker', 'Tereyağı'],
    imageUrl: 'https://placehold.co/800x600',
  },
  {
    id: 'kunefe',
    name: 'Künefe',
    category: 'tatlilar',
    price: 160,
    description: 'İki kat tel kadayıf arasına konulan tuzsuz peynirle hazırlanan, sıcak şerbetle servis edilen, Antakya yöresine özgü bir lezzet.',
    ingredients: ['Tel kadayıf', 'Tuzsuz peynir', 'Tereyağı', 'Şerbet'],
    imageUrl: 'https://placehold.co/800x600',
  },

  // İçecekler
  {
    id: 'ayran',
    name: 'Ayran',
    category: 'icecekler',
    price: 40,
    description: 'Yoğurt ve suyun karıştırılmasıyla elde edilen, ferahlatıcı ve sağlıklı geleneksel Türk içeceği.',
    ingredients: ['Yoğurt', 'Su', 'Tuz'],
    imageUrl: 'https://placehold.co/800x600',
  },
  {
    id: 'turk-kahvesi',
    name: 'Türk Kahvesi',
    category: 'icecekler',
    price: 60,
    description: 'İnce çekilmiş kahve çekirdeklerinin cezvede pişirilmesiyle hazırlanan, telvesiyle birlikte sunulan, köklü bir geleneğe sahip kahve.',
    ingredients: ['Kahve', 'Su', 'Şeker (isteğe bağlı)'],
    imageUrl: 'https://placehold.co/800x600',
  },
];
