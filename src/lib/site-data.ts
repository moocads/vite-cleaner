import type { LucideIcon } from "lucide-react";
import {
  Baby,
  BedDouble,
  BriefcaseBusiness,
  Building2,
  Dumbbell,
  HeartPulse,
  Hotel,
  Scissors,
  Shirt,
  Sparkles,
  SprayCan,
  Store,
  UtensilsCrossed,
  WashingMachine,
} from "lucide-react";

export const orderOnlineUrl = "#";
export const bluebitsUrl = "https://www.bluebits.ca/";

export type Service = {
  slug: string;
  title: string;
  detailTitle: string;
  shortDescription: string;
  description: string;
  image: string;
  icon: LucideIcon;
  items: readonly string[];
};

export const services = [
  {
    slug: "dry-cleaning",
    title: "Dry Cleaning",
    detailTitle: "Dry Cleaning",
    shortDescription: "Professional care for tailored pieces, delicate fabrics and everyday favourites.",
    description:
      "Give your suits, silk dresses, wool coats, and fine garments the specialized care they deserve. Using non-toxic, eco-conscious solvents and precise temp-controlled finishing, our dry cleaning process dissolves tough stains and lifts odours without breaking down delicate fibres or fading rich colours. Every item undergoes a multi-point inspection, complete with hand-finishing and custom pressing so your clothes return looking crisp, fresh, and ready to wear.",
    image: "/images/hero-care-hd.jpg",
    icon: Sparkles,
    items: ["Suits and jackets", "Dresses and formalwear", "Coats", "Sweaters", "Delicate fabrics"],
  },
  {
    slug: "wash-fold",
    title: "Wash & Fold",
    detailTitle: "Wash & Fold",
    shortDescription: "Everyday laundry, professionally washed, dried and neatly folded.",
    description:
      "Stop spending hours sorting, washing, and folding. Our Wash & Fold service treats your everyday wardrobe t-shirts, denim, activewear, socks, and linens to professional-grade laundering. We separate items by temperature and colour profile, use hypoallergenic, eco-certified detergents, and tumble-dry on gentle heat settings to prevent shrinkage and fabric wear. Your laundry is then precisely hand-folded, organized, and packaged so putting it away is effortless.",
    image: "/images/service-wash-fold.jpg",
    icon: WashingMachine,
    items: ["Everyday clothing", "Towels", "Bed sheets", "Casual wear", "Household laundry"],
  },
  {
    slug: "shirt-laundry",
    title: "Shirt Laundry",
    detailTitle: "Shirt Laundry",
    shortDescription: "Clean, pressed shirts with a crisp, consistent finish.",
    description:
      "Make a lasting impression with crisp, perfectly laundered dress shirts. Our dedicated shirt care process targets collar ring and cuff grime using specialized pre-treatments before gentle laundering. Shirts are tension-pressed to eliminate wrinkles, keep collars structured, and maintain cuff geometry without causing fabric shine or seam stress.",
    image: "/images/audience-professionals.jpg",
    icon: Shirt,
    items: ["Business shirts", "Casual shirts", "Blouses", "Folded shirts", "Pressed shirts"],
  },
  {
    slug: "alterations",
    title: "Alterations",
    detailTitle: "Alterations & Tailoring",
    shortDescription: "Practical repairs and fit adjustments that keep garments in rotation.",
    description:
      "A great fit makes all the difference. Whether adjusting a new suit jacket, hemming trousers, replacing broken zippers, or reshaping a vintage dress, our master tailors deliver clean, seamless alterations. We preserve the original stitching style, seam allowances, and hem finishes whenever possible, ensuring your garments fit your body comfortably while retaining their original aesthetic design.",
    image: "/images/sustainable-care.jpg",
    icon: Scissors,
    items: ["Hemming", "Sleeve adjustments", "Waist adjustments", "Zipper repair", "General mending"],
  },
  {
    slug: "specialty-care",
    title: "Specialty Care",
    detailTitle: "Specialty Care (Leather, Suede, Shoes & Outerwear)",
    shortDescription: "Assessment-led care for shoes, leather, suede and specialty garments.",
    description:
      "Materials like natural leather, buttery suede, heavy winter parkas, and designer footwear require specialized techniques that standard cleaning can’t provide. Our Specialty Care department assesses each item’s material composition and structural integrity before beginning custom treatment. From re-hydrating dried leather and restoring suede pile to cleaning down jackets and cobbling worn soles, we extend the lifespan of your prized luxury items.",
    image: "/images/service-special-care.jpg",
    icon: SprayCan,
    items: ["Shoes", "Leather", "Suede", "Down garments", "Specialty outerwear"],
  },
  {
    slug: "wedding-dress-cleaning",
    title: "Wedding Dress Care",
    detailTitle: "Wedding Dress & Heirloom Preservation",
    shortDescription: "Careful assessment, cleaning and finishing for meaningful garments.",
    description:
      "Your wedding gown is a priceless keepsake. Our wedding dress preservation specialists conduct a microscopic inspection to identify unseen stains that can turn yellow over time. Using fabric-specific, gentle solvents, we hand-clean intricate beadwork, lace, and train layers.",
    image: "/images/service-wedding-dress.jpg",
    icon: HeartPulse,
    items: ["Wedding dresses", "Formal gowns", "Detailed fabrics", "Veils", "Special occasion pieces"],
  },
] as const satisfies readonly Service[];

export const locations = [
  {
    slug: "sherbourne-street",
    name: "Sherbourne Street",
    address: "59B Sherbourne St, Toronto, ON",
    mapUrl: "https://maps.app.goo.gl/PeNFGErFumMGT5KG7?g_st=ic",
    kind: "Store",
  },
  {
    slug: "toronto-street",
    name: "Toronto Street",
    address: "1 Toronto St #106, Toronto, ON",
    mapUrl: "https://maps.app.goo.gl/QrkteMYHsmNgo1Kq8?g_st=ic",
    kind: "Store",
  },
  {
    slug: "bay-street",
    name: "Bay Street",
    address: "1100 Bay St, Toronto, ON M5S 2Y1",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=1100+Bay+St%2C+Toronto%2C+ON+M5S+2Y1",
    kind: "Store",
  },
  {
    slug: "production-facility",
    name: "Production Facility",
    address: "41 Metropolitan Rd, Scarborough, ON M1R 2T5",
    mapUrl: "https://maps.app.goo.gl/vZQ4raNsjQxMTS6z7?g_st=ic",
    kind: "Production Facility",
  },
] as const;

export const commercialIndustries = [
  { title: "Hospitality", description: "Hotels, Airbnb hosts and furnished apartments", icon: Hotel },
  { title: "Food Service", description: "Restaurants, clubs and event spaces", icon: UtensilsCrossed },
  { title: "Health & Wellness", description: "Clinics, dental offices, physiotherapy and spas", icon: HeartPulse },
  { title: "Beauty & Fitness", description: "Salons, studios and fitness clubs", icon: Dumbbell },
  { title: "Care & Education", description: "Daycares, senior homes and schools", icon: Baby },
  { title: "Workplaces", description: "Offices, uniforms and multi-location businesses", icon: Building2 },
] as const;

export const commercialItems = [
  { label: "Towels", icon: Sparkles },
  { label: "Linens", icon: BedDouble },
  { label: "Bed sheets", icon: BedDouble },
  { label: "Uniforms", icon: BriefcaseBusiness },
  { label: "Tablecloths", icon: UtensilsCrossed },
  { label: "Napkins", icon: UtensilsCrossed },
  { label: "Robes", icon: Shirt },
  { label: "Cleaning cloths", icon: Store },
] as const;
