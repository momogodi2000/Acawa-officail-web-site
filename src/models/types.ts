// Core Types for ACAWA Platform
// Following SOLID principles with clear separation of concerns

export interface GeoLocation {
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  region: string;
  country: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  whatsapp?: string;
}

export interface SocialMedia {
  facebook?: string;
  instagram?: string;
  youtube?: string;
  tiktok?: string;
}

export interface Schedule {
  dayOfWeek: number; // 0 = Sunday, 1 = Monday, etc.
  startTime: string; // "HH:MM"
  endTime: string; // "HH:MM"
  level: KarateLevel;
  ageGroup: AgeGroup;
}

export interface MediaGallery {
  images: string[];
  videos: string[];
  featuredImage: string;
}

export enum KarateLevel {
  BEGINNER = 'Débutant',
  INTERMEDIATE = 'Intermédiaire', 
  ADVANCED = 'Avancé',
  EXPERT = 'Expert',
  MASTER = 'Maître'
}

export enum AgeGroup {
  KIDS = 'Enfants (6-12 ans)',
  TEENS = 'Adolescents (13-17 ans)',
  ADULTS = 'Adultes (18+ ans)',
  SENIORS = 'Séniors (50+ ans)',
  ALL = 'Tous âges'
}

export enum Belt {
  WHITE = 'Ceinture Blanche',
  YELLOW = 'Ceinture Jaune',
  ORANGE = 'Ceinture Orange',
  GREEN = 'Ceinture Verte',
  BLUE = 'Ceinture Bleue',
  BROWN = 'Ceinture Marron',
  BLACK_1DAN = 'Ceinture Noire 1er Dan',
  BLACK_2DAN = 'Ceinture Noire 2ème Dan',
  BLACK_3DAN = 'Ceinture Noire 3ème Dan',
  BLACK_4DAN = 'Ceinture Noire 4ème Dan',
  BLACK_5DAN = 'Ceinture Noire 5ème Dan',
  BLACK_6DAN = 'Ceinture Noire 6ème Dan',
  BLACK_7DAN = 'Ceinture Noire 7ème Dan',
  BLACK_8DAN = 'Ceinture Noire 8ème Dan',
  BLACK_9DAN = 'Ceinture Noire 9ème Dan',
  BLACK_10DAN = 'Ceinture Noire 10ème Dan'
}

export enum CompetitionLevel {
  REGIONAL = 'Régional',
  NATIONAL = 'National',
  CONTINENTAL = 'Continental',
  INTERNATIONAL = 'International',
  WORLD_CHAMPIONSHIP = 'Championnat du Monde',
  OLYMPIC = 'Olympique'
}

export enum EventType {
  TRAINING = 'Entraînement',
  SEMINAR = 'Séminaire',
  COMPETITION = 'Compétition',
  GRADING = 'Passage de Grade',
  WORKSHOP = 'Atelier',
  CULTURAL = 'Événement Culturel'
}

export enum PartnershipType {
  SPONSOR = 'Sponsor',
  MEDIA = 'Média',
  EQUIPMENT = 'Équipement',
  VENUE = 'Lieu',
  EDUCATIONAL = 'Éducatif',
  GOVERNMENT = 'Gouvernemental',
  INTERNATIONAL = 'International'
}

export enum FormType {
  CONTACT = 'CONTACT',
  CLUB_REGISTRATION = 'CLUB_REGISTRATION',
  MEMBERSHIP = 'MEMBERSHIP',
  PARTNERSHIP = 'PARTNERSHIP',
  EVENT_REGISTRATION = 'EVENT_REGISTRATION',
  SEMINAR_REGISTRATION = 'SEMINAR_REGISTRATION'
}

/**
 * Achievement Model - Represents accomplishments
 */
export interface Achievement {
  title: string;
  description: string;
  date: Date;
  level: string;
  organization: string;
  certificate?: string;
}

// Base interfaces for all entities
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

export interface Timestamped {
  createdAt: Date;
  updatedAt: Date;
}

export interface Identifiable {
  id: string;
}
