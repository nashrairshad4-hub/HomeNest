export type PropertyType = 'House' | 'Villa' | 'Apartment' | 'Penthouse' | 'Commercial';
export type PropertyStatus = 'Available' | 'Sold' | 'Pending';
export type UserRole = 'user' | 'admin';

export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  avatar?: string;
  joinedDate: string;
}

export interface Property {
  id: number;
  title: string;
  description: string;
  price: number; // Stored in numeric format (e.g. 45000000)
  location: string; // City name (e.g. 'Faisalabad', 'Lahore')
  address: string;
  propertyType: PropertyType;
  bedrooms: number;
  bathrooms: number;
  area: string; // e.g. '1 Kanal', '10 Marla'
  yearBuilt: number;
  image: string;
  galleryImages: string[];
  amenities: string[];
  status: PropertyStatus;
  featured?: boolean;
  userId: number;
  createdAt: string;
  sellerName?: string;
  sellerEmail?: string;
  sellerPhone?: string;
}

export interface Inquiry {
  id: number;
  propertyId: number;
  propertyTitle: string;
  userId?: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
}

export interface FilterState {
  keyword: string;
  location: string;
  propertyType: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  sortBy: 'newest' | 'price_asc' | 'price_desc' | 'oldest';
}
