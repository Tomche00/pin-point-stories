export type Language = 'en' | 'mk';

export const translations = {
  en: {
    // Navigation
    nav: {
      map: 'Map',
      rent: 'Rent',
      about: 'About',
      brandName: 'Macedonia Explorer',
    },

    // Map page
    map: {
      subtitle: 'Interactive Map',
      title: 'Explore North Macedonia',
      description: 'Discover monuments, cities, and natural wonders across the country.',
      locations: 'locations',
      filters: 'Filters',
      navigate: 'Navigate',
    },

    // Rent page
    rent: {
      subtitle: 'Rentals',
      title: 'Rent Properties',
      description: 'Find your perfect rental property across the most beautiful locations in North Macedonia.',
      comingSoon: 'Coming Soon',
      comingSoonDesc: "We're curating the best rental options — from mountain cabins to lakeside retreats. Check back soon.",
      locationsMapped: '250+ locations being mapped',
    },

    // About page
    about: {
      subtitle: 'About',
      title: 'Macedonia Explorer',
      description: 'Your gateway to discovering the beauty, history, and hidden gems of North Macedonia through an interactive map experience.',
      missionTitle: 'Our Mission',
      missionText: 'We are dedicated to showcasing the incredible destinations, monuments, and natural wonders that make North Macedonia a unique and captivating place to explore. Our interactive map helps visitors discover hidden gems and plan their perfect Macedonian adventure.',
      offerTitle: 'What We Offer',
      offerText: "From ancient monuments and vibrant cities to pristine camping spots and breathtaking natural landscapes, we provide comprehensive information about Macedonia's most remarkable locations. Each pin on our map tells a story waiting to be discovered.",
      contactTitle: 'Get in Touch',
    },

    // Location types
    types: {
      monument: 'Monuments',
      city: 'Cities',
      recreation: 'Recreation',
      nature: 'Nature',
      camping: 'Camping',
      restaurant: 'Restaurants',
      accommodation: 'Hotels',
      viewpoint: 'Viewpoints',
      hiking: 'Hiking',
      water: 'Lakes & Rivers',
      monastery: 'Monasteries',
      museum: 'Museums',
      adventure: 'Adventure Sports',
    },
  },

  mk: {
    nav: {
      map: 'Мапа',
      rent: 'Изнајмување',
      about: 'За нас',
      brandName: 'Истражи Македонија',
    },

    map: {
      subtitle: 'Интерактивна Мапа',
      title: 'Истражи ја Северна Македонија',
      description: 'Откријте споменици, градови и природни убавини низ целата земја.',
      locations: 'локации',
      filters: 'Филтри',
      navigate: 'Навигирај',
    },

    rent: {
      subtitle: 'Изнајмување',
      title: 'Изнајми Имот',
      description: 'Пронајдете го вашиот идеален имот за изнајмување низ најубавите локации во Северна Македонија.',
      comingSoon: 'Наскоро',
      comingSoonDesc: 'Ги подготвуваме најдобрите опции за изнајмување — од планински куќи до езерски одморалишта. Навратете повторно наскоро.',
      locationsMapped: '250+ локации се мапираат',
    },

    about: {
      subtitle: 'За нас',
      title: 'Истражи Македонија',
      description: 'Вашата порта за откривање на убавината, историјата и скриените богатства на Северна Македонија преку интерактивно искуство со мапа.',
      missionTitle: 'Наша Мисија',
      missionText: 'Посветени сме на прикажување на неверојатните дестинации, споменици и природни чуда кои ја прават Северна Македонија уникатно и привлечно место за истражување. Нашата интерактивна мапа им помага на посетителите да откријат скриени богатства и да ја испланираат својата совршена македонска авантура.',
      offerTitle: 'Што Нудиме',
      offerText: 'Од древни споменици и живописни градови до нетакнати кампинг места и прекрасни природни пејзажи, ние обезбедуваме сеопфатни информации за најзначајните локации во Македонија. Секоја иглица на нашата мапа раскажува приказна која чека да биде откриена.',
      contactTitle: 'Контактирајте нè',
    },

    types: {
      monument: 'Споменици',
      city: 'Градови',
      recreation: 'Рекреација',
      nature: 'Природа',
      camping: 'Кампување',
      restaurant: 'Ресторани',
      accommodation: 'Хотели',
      viewpoint: 'Видиковци',
      hiking: 'Планинарење',
      water: 'Езера и Реки',
      monastery: 'Манастири',
      museum: 'Музеи',
      adventure: 'Авантуристички Спортови',
    },
  },
} as const;

// Structural type for translations (values are strings, not literal types)
type DeepStringify<T> = {
  [K in keyof T]: T[K] extends string ? string : DeepStringify<T[K]>;
};

export type TranslationKeys = DeepStringify<typeof translations.en>;
