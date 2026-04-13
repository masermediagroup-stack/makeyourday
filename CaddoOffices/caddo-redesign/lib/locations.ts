export type Location = {
  slug: string;
  name: string;
  subtitle: string;
  address: string;
  phone: string;
  startingPrice: number;
  region: "north-dallas" | "collin-county" | "tarrant-county";
  heroImage: string;
  isComingSoon?: boolean;
};

export const locations: Location[] = [
  {
    slug: "allen",
    name: "Allen",
    subtitle: "Watters Rd near Bethany and 75",
    address: "550 S Watters Rd, Allen, TX 75013",
    phone: "214-396-5305",
    startingPrice: 499,
    region: "collin-county",
    heroImage: "https://picsum.photos/seed/allen-office/1200/800",
  },
  {
    slug: "flower-mound",
    name: "Flower Mound",
    subtitle: "Long Prairie Rd business district",
    address: "2600 Lakeside Pkwy, Flower Mound, TX 75022",
    phone: "214-396-5305",
    startingPrice: 499,
    region: "north-dallas",
    heroImage: "https://picsum.photos/seed/flower-office/1200/800",
  },
  {
    slug: "frisco",
    name: "Frisco",
    subtitle: "Legacy and Stonebriar corridor",
    address: "6160 Warren Pkwy, Frisco, TX 75034",
    phone: "214-396-5305",
    startingPrice: 529,
    region: "collin-county",
    heroImage: "https://picsum.photos/seed/frisco-office/1200/800",
  },
  {
    slug: "frisco-westridge",
    name: "Frisco Westridge",
    subtitle: "Opening soon in West Frisco",
    address: "Westridge Dr, Frisco, TX",
    phone: "214-396-5305",
    startingPrice: 549,
    region: "collin-county",
    heroImage: "https://picsum.photos/seed/westridge-office/1200/800",
    isComingSoon: true,
  },
  {
    slug: "lakewood",
    name: "Lakewood",
    subtitle: "East Dallas neighborhood office",
    address: "6340 Gaston Ave, Dallas, TX 75214",
    phone: "214-396-5305",
    startingPrice: 529,
    region: "north-dallas",
    heroImage: "https://picsum.photos/seed/lakewood-office/1200/800",
  },
  {
    slug: "mapleshade",
    name: "Mapleshade",
    subtitle: "Richardson and Plano corridor",
    address: "15303 Dallas Pkwy, Addison, TX 75001",
    phone: "214-396-5305",
    startingPrice: 499,
    region: "north-dallas",
    heroImage: "https://picsum.photos/seed/mapleshade-office/1200/800",
  },
  {
    slug: "mckinney",
    name: "McKinney",
    subtitle: "Central McKinney business district",
    address: "6401 Eldorado Pkwy, McKinney, TX 75070",
    phone: "214-396-5305",
    startingPrice: 499,
    region: "collin-county",
    heroImage: "https://picsum.photos/seed/mckinney-office/1200/800",
  },
  {
    slug: "north-tarrant",
    name: "North Tarrant",
    subtitle: "North Fort Worth corridor",
    address: "4200 Heritage Trace Pkwy, Fort Worth, TX 76244",
    phone: "214-396-5305",
    startingPrice: 489,
    region: "tarrant-county",
    heroImage: "https://picsum.photos/seed/tarrant-office/1200/800",
  },
  {
    slug: "plano-north",
    name: "Plano North",
    subtitle: "Preston and Park corridor",
    address: "5700 Tennyson Pkwy, Plano, TX 75024",
    phone: "214-396-5305",
    startingPrice: 519,
    region: "north-dallas",
    heroImage: "https://picsum.photos/seed/plano-office/1200/800",
  },
  {
    slug: "prosper",
    name: "Prosper",
    subtitle: "Growing North DFW business hub",
    address: "1040 S Preston Rd, Prosper, TX 75078",
    phone: "214-396-5305",
    startingPrice: 499,
    region: "collin-county",
    heroImage: "https://picsum.photos/seed/prosper-office/1200/800",
  },
];
