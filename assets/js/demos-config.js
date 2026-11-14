/**
 * EtehadWP Demo Registry
 * Add new demos here without modifying page layout or components.
 */
window.ETEHAAD_CONFIG = {
  brand: {
    name: 'اتحاد وردپرس',
    siteUrl: 'https://etehadwp.com/',
    servicesUrl: 'https://etehadwp.com/product-category/website-design/',
    specialServicesUrl: 'https://etehadwp.com/product-category/services/',
    aboutUrl: 'https://etehadwp.com/about-us/',
    contactUrl: 'https://etehadwp.com/contact-us/',
    phone: '09910011146',
    phoneHref: 'tel:+989910011146',
    email: 'info@etehadwp.com',
    emailHref: 'mailto:info@etehadwp.com',
    githubUrl: 'https://github.com/etehadwp'
  },
  categories: [
    { id: 'all', label: 'همه دموها' },
    { id: 'shop', label: 'فروشگاهی' },
    { id: 'corporate', label: 'شرکتی' },
    { id: 'personal', label: 'شخصی و رزومه' },
    { id: 'service', label: 'خدماتی' },
    { id: 'other', label: 'سایر دسته‌ها' }
  ],
  demos: [
    {
      id: 'digital',
      title: 'فروشگاه کالای دیجیتال',
      category: 'shop',
      categoryLabel: 'فروشگاهی',
      badge: 'پربازدید',
      demoPath: '/digital/',
      previewPath: 'preview/?demo=digital',
      orderUrl: 'https://etehadwp.com/product/digital-store-design/',
      image: 'https://etehadwp.com/wp-content/uploads/2026/11/digital-store-design.webp',
      fallbackImage: 'assets/images/demos/digital.svg',
      description: 'فروشگاه تخصصی موبایل، لپ‌تاپ و گجت با مگامنو، فیلتر مشخصات فنی، مقایسه کالا و پیشنهاد لحظه‌ای.',
      keywords: ['دیجیتال', 'کالای دیجیتال', 'دیجی کالا', 'موبایل', 'لپ‌تاپ', 'گجت', 'الکترونیک', 'فروشگاهی'],
      features: [
        'مگامنو و دسته‌بندی چندسطحی محصولات',
        'فیلتر مشخصات فنی، رنگ، حافظه و برند',
        'امکان مقایسه کالاها و لیست علاقه‌مندی',
        'صفحه اختصاصی محصول با سبد خرید ووکامرس'
      ],
      stack: ['WordPress', 'WooCommerce', 'Elementor']
    },
    {
      id: 'fashion',
      title: 'فروشگاه مد و پوشاک',
      category: 'shop',
      categoryLabel: 'فروشگاهی',
      badge: 'مدرن',
      demoPath: '/fashion/',
      previewPath: 'preview/?demo=fashion',
      orderUrl: 'https://etehadwp.com/product/fashion-store-design/',
      image: 'https://etehadwp.com/wp-content/uploads/2026/11/fashion-store-design.webp',
      fallbackImage: 'assets/images/demos/fashion.svg',
      description: 'ویترین مدرن برندهای پوشاک و مزون با نمایش کالکشن‌ها، انتخاب سایز و رنگ و ثبت سفارش آنلاین.',
      keywords: ['مد', 'پوشاک', 'لباس', 'مزون', 'کفش', 'کت و شلوار', 'استایل', 'فروشگاهی'],
      features: [
        'تعریف محصولات متغیر بر اساس سایز و رنگ',
        'معرفی کالکشن‌های فصلی و مدل‌های آماده',
        'دسته‌بندی پوشاک زنانه، مردانه و اکسسوری',
        'فرایند خرید سریع و واکنش‌گرا در موبایل'
      ],
      stack: ['WordPress', 'WooCommerce', 'Elementor']
    },
    {
      id: 'beauty',
      title: 'فروشگاه آرایشی و اکسسوری',
      category: 'shop',
      categoryLabel: 'فروشگاهی',
      badge: 'لوکس',
      demoPath: '/beauty/',
      previewPath: 'preview/?demo=beauty',
      orderUrl: 'https://etehadwp.com/product/beauty-store-design/',
      image: 'https://etehadwp.com/wp-content/uploads/2026/11/beauty-store-design.webp',
      fallbackImage: 'assets/images/demos/beauty.svg',
      description: 'طراحی شیک برای فروشگاه‌های عطر، ادکلن و لوازم آرایشی با شمارنده تخفیف ویژه و معرفی رایحه‌ها.',
      keywords: ['آرایشی', 'بهداشتی', 'عطر', 'ادکلن', 'اکسسوری', 'میکاپ', 'زیبایی', 'فروشگاهی'],
      features: [
        'معرفی تخصصی رایحه، حجم و ویژگی محصول',
        'پیشنهاد ویژه با تایمر شمارش معکوس',
        'مقایسه محصولات و مشاهده سریع کالا',
        'چیدمان جذاب برای برندهای زیبایی و عطر'
      ],
      stack: ['WordPress', 'WooCommerce', 'Elementor']
    },
    {
      id: 'beauty-plus',
      title: 'فروشگاه مراقبت پوست و زیبایی بیوتی پلاس',
      category: 'shop',
      categoryLabel: 'فروشگاهی',
      badge: 'جدید',
      demoPath: '/beauty-plus/',
      previewPath: 'preview/?demo=beauty-plus',
      orderUrl: 'https://etehadwp.com/product/beauty-plus-store-design/',
      image: 'https://etehadwp.com/wp-content/uploads/2026/11/beauty-plus-store-design.webp',
      fallbackImage: 'assets/images/demos/beauty-plus.svg',
      description: 'فروشگاه تخصصی محصولات مراقبت پوست و مو با استوری‌های دسته‌بندی، حراجی و معرفی برندهای معتبر.',
      keywords: ['بیوتی پلاس', 'مراقبت پوست', 'روتین پوستی', 'ضدآفتاب', 'مراقبت مو', 'بهداشتی', 'فروشگاهی'],
      features: [
        'استوری‌های تعاملی دسته‌بندی و برندها',
        'بخش حراجی و کمپین‌های فروش فصلی',
        'دسته‌بندی بر اساس نوع پوست و کاربرد',
        'رابط کاربری روشن، تمیز و موبایل‌محور'
      ],
      stack: ['WordPress', 'WooCommerce', 'Elementor']
    }
  ]
};
