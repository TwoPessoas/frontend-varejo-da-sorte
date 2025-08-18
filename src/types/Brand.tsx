import type { Client } from "./Client";

export interface Brand {
  id: number;
  name: string;
  category: string;
  logo: string;
  //description: string;
  //featured: boolean;
}

export interface BrandCategory {
  id: string;
  //name: string;
  icon: string;
}

export interface LogoProps {
  name: string;
  //featured: boolean;
}