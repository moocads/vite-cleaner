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

export type Service = {
  slug: string;
  title: string;
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
    shortDescription: "Professional care for tailored pieces, delicate fabrics and everyday favourites.",
    description:
      "Fabric-aware cleaning and careful finishing help suits, dresses, coats and special garments return ready to wear.",
    image: "/images/hero-care-hd.png",
    icon: Sparkles,
    items: ["Suits and jackets", "Dresses and formalwear", "Coats", "Sweaters", "Delicate fabrics"],
  },
  {
    slug: "wash-fold",
    title: "Wash & Fold",
    shortDescription: "Everyday laundry, professionally washed, dried and neatly folded.",
    description:
      "A practical service for household laundry and busy weeks, finished neatly and ready to put away.",
    image: "/images/audience-families.png",
    icon: WashingMachine,
    items: ["Everyday clothing", "Towels", "Bed sheets", "Casual wear", "Household laundry"],
  },
  {
    slug: "shirt-laundry",
    title: "Shirt Laundry",
    shortDescription: "Clean, pressed shirts with a crisp, consistent finish.",
    description:
      "Professional laundering and pressing for business shirts, with finishing preferences recorded for future visits.",
    image: "/images/audience-professionals.png",
    icon: Shirt,
    items: ["Business shirts", "Casual shirts", "Blouses", "Folded shirts", "Pressed shirts"],
  },
  {
    slug: "alterations",
    title: "Alterations",
    shortDescription: "Practical repairs and fit adjustments that keep garments in rotation.",
    description:
      "From hems and sleeves to zippers and waist adjustments, our team can assess the work your garment needs.",
    image: "/images/sustainable-care.png",
    icon: Scissors,
    items: ["Hemming", "Sleeve adjustments", "Waist adjustments", "Zipper repair", "General mending"],
  },
  {
    slug: "specialty-care",
    title: "Specialty Care",
    shortDescription: "Assessment-led care for shoes, leather, suede and specialty garments.",
    description:
      "Special materials need individual review. Bring the item to a Vite location so our team can confirm the right care approach.",
    image: "/images/audience-seasonal.png",
    icon: SprayCan,
    items: ["Shoes", "Leather", "Suede", "Down garments", "Specialty outerwear"],
  },
  {
    slug: "wedding-dress-cleaning",
    title: "Wedding Dress Care",
    shortDescription: "Careful assessment, cleaning and finishing for meaningful garments.",
    description:
      "Wedding dresses and intricate formalwear are reviewed before service so detailing, fabric and construction can be considered.",
    image: "/images/service-tracking.png",
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
