import { pexelsPhoto } from "@/lib/constants/productImages";

/** Large hero / grocery market scene (Pexels, verified 200). */
export const HERO_MAIN_IMAGE = pexelsPhoto(17236203, 1600);

/** Category tiles under the hero visual (image, route, label). */
export const HERO_QUICK_AISLES: {
  id: string;
  label: string;
  href: string;
  image: string;
}[] = [
  {
    id: "rice",
    label: "Rice",
    href: "/rice",
    image: pexelsPhoto(7851798, 400),
  },
  {
    id: "wheat",
    label: "Wheat",
    href: "/wheat",
    image: pexelsPhoto(11726089, 400),
  },
  {
    id: "dairy",
    label: "Dairy",
    href: "/dairy",
    image: pexelsPhoto(1640777, 400),
  },
  {
    id: "fish",
    label: "Fish",
    href: "/fish",
    image: pexelsPhoto(12955634, 400),
  },
];
